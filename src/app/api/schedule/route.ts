import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/schedule?date=2026-04-13 OR ?from=2026-04-13&to=2026-04-19
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let query = supabase
    .from('bookings')
    .select('*, clients(name, phone, telegram)')
    .neq('status', 'cancelled')
    .order('start_time', { ascending: true });

  if (date) {
    query = query.eq('date', date);
  } else if (from && to) {
    query = query.gte('date', from).lte('date', to);
  } else {
    return NextResponse.json({ error: 'Provide date or from/to params' }, { status: 400 });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group by date, then by resource (boat/gazebo)
  const schedule: Record<string, { boats: Record<string, unknown[]>; gazebos: Record<string, unknown[]> }> = {};

  (data || []).forEach((b: Record<string, unknown>) => {
    const d = b.date as string;
    if (!schedule[d]) schedule[d] = { boats: {}, gazebos: {} };

    const booking = {
      id: b.id,
      serviceName: b.service_name,
      category: b.category,
      clientName: (b.clients as Record<string, unknown>)?.name,
      clientPhone: (b.clients as Record<string, unknown>)?.phone,
      startTime: typeof b.start_time === 'string' ? b.start_time.slice(0, 5) : '',
      endTime: typeof b.end_time === 'string' ? b.end_time.slice(0, 5) : '',
      guests: b.guests,
      totalPrice: b.total_price,
      status: b.status,
      withInstructor: b.with_instructor,
      sourceSite: b.source_site,
    };

    if (b.boat_id) {
      const bid = b.boat_id as string;
      if (!schedule[d].boats[bid]) schedule[d].boats[bid] = [];
      schedule[d].boats[bid].push(booking);
    }
    if (b.gazebo_id) {
      const gid = b.gazebo_id as string;
      if (!schedule[d].gazebos[gid]) schedule[d].gazebos[gid] = [];
      schedule[d].gazebos[gid].push(booking);
    }
  });

  return NextResponse.json(schedule);
}
