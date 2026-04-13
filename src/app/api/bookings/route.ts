import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SERVICES, GAZEBOS, INSTRUCTOR_PRICES, isWeekend } from '@/lib/data';

// GET /api/bookings?date=2026-04-13&status=confirmed&source=pandawake&boat_id=tige-24v
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const status = searchParams.get('status');
  const source = searchParams.get('source');
  const boatId = searchParams.get('boat_id');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let query = supabase
    .from('bookings')
    .select('*, clients(name, phone, telegram)')
    .order('date', { ascending: false })
    .order('start_time', { ascending: true });

  if (date) query = query.eq('date', date);
  if (status && status !== 'all') query = query.eq('status', status);
  if (source) query = query.eq('source_site', source);
  if (boatId) query = query.eq('boat_id', boatId);
  if (from) query = query.gte('date', from);
  if (to) query = query.lte('date', to);

  const { data, error } = await query.limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map to frontend format
  const bookings = (data || []).map((b: Record<string, unknown>) => ({
    id: b.id,
    serviceId: b.service_id,
    serviceName: b.service_name,
    category: b.category,
    clientName: (b.clients as Record<string, unknown>)?.name || '',
    clientPhone: (b.clients as Record<string, unknown>)?.phone || '',
    clientTelegram: (b.clients as Record<string, unknown>)?.telegram || '',
    date: b.date,
    startTime: typeof b.start_time === 'string' ? b.start_time.slice(0, 5) : '',
    endTime: typeof b.end_time === 'string' ? b.end_time.slice(0, 5) : '',
    guests: b.guests,
    totalPrice: b.total_price,
    status: b.status,
    withInstructor: b.with_instructor,
    boatId: b.boat_id,
    gazeboId: b.gazebo_id,
    notes: b.notes,
    sourceSite: b.source_site,
    createdAt: b.created_at,
  }));

  return NextResponse.json(bookings);
}

// POST /api/bookings
export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    serviceId, category, clientName, clientPhone, clientTelegram,
    date, startTime, guests, withInstructor, notes, sourceSite,
  } = body;

  // Validate required fields
  if (!serviceId || !clientName || !clientPhone || !date || !startTime) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Calculate price server-side
  const service = SERVICES.find((s) => s.id === serviceId);
  const gazebo = GAZEBOS.find((g) => g.id === serviceId);
  const item = service || gazebo;
  if (!item) {
    return NextResponse.json({ error: 'Service not found' }, { status: 400 });
  }

  const dateObj = new Date(date);
  const weekend = isWeekend(dateObj);
  let basePrice = weekend ? item.weekendPrice : item.weekdayPrice;
  let instructorPrice = 0;
  if (withInstructor && service) {
    instructorPrice = service.durationMinutes === 60
      ? INSTRUCTOR_PRICES['60min']
      : INSTRUCTOR_PRICES['25min'];
  }
  const totalPrice = basePrice + instructorPrice;

  // Calculate end time
  const durationMin = service?.durationMinutes || (12 * 60); // gazebo = all day
  const [h, m] = startTime.split(':').map(Number);
  const endMin = h * 60 + m + durationMin;
  const endTime = `${String(Math.floor(endMin / 60)).padStart(2, '0')}:${String(endMin % 60).padStart(2, '0')}`;

  const serviceName = service?.name || (gazebo ? `Беседка №${gazebo.number}` : serviceId);

  // Upsert client
  const { data: clientData, error: clientError } = await supabase
    .from('clients')
    .upsert(
      { name: clientName, phone: clientPhone, telegram: clientTelegram || null },
      { onConflict: 'phone' }
    )
    .select('id')
    .single();

  if (clientError) {
    return NextResponse.json({ error: 'Failed to create client: ' + clientError.message }, { status: 500 });
  }

  // Auto-assign boat for wake bookings
  let boatId = body.boatId || null;
  if (category === 'wakesurf' && !boatId) {
    // Check which boats are free at this time
    const { data: existing } = await supabase
      .from('bookings')
      .select('boat_id')
      .eq('date', date)
      .neq('status', 'cancelled')
      .lte('start_time', endTime)
      .gte('end_time', startTime);

    const busyBoats = new Set((existing || []).map((b: Record<string, unknown>) => b.boat_id));
    boatId = !busyBoats.has('tige-24v') ? 'tige-24v' : !busyBoats.has('centurion-c4') ? 'centurion-c4' : 'tige-24v';
  }

  // Insert booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      client_id: clientData.id,
      service_id: serviceId,
      service_name: serviceName,
      category,
      date,
      start_time: startTime,
      end_time: endTime,
      guests: guests || 1,
      total_price: totalPrice,
      with_instructor: withInstructor || false,
      boat_id: boatId,
      gazebo_id: category === 'gazebo' ? serviceId : null,
      notes: notes || null,
      source_site: sourceSite || 'pandawake',
    })
    .select()
    .single();

  if (bookingError) {
    return NextResponse.json({ error: 'Failed to create booking: ' + bookingError.message }, { status: 500 });
  }

  return NextResponse.json(booking, { status: 201 });
}
