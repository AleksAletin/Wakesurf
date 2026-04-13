import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/clients?search=Петров
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  // Get all clients with booking stats
  let query = supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  const { data: clients, error } = await query.limit(200);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get booking stats for each client
  const clientIds = (clients || []).map((c: Record<string, unknown>) => c.id);
  const { data: bookings } = await supabase
    .from('bookings')
    .select('client_id, total_price, date, status')
    .in('client_id', clientIds)
    .neq('status', 'cancelled');

  const statsMap = new Map<string, { count: number; spent: number; lastDate: string }>();
  (bookings || []).forEach((b: Record<string, unknown>) => {
    const cid = b.client_id as string;
    const existing = statsMap.get(cid) || { count: 0, spent: 0, lastDate: '' };
    existing.count++;
    existing.spent += b.total_price as number;
    if ((b.date as string) > existing.lastDate) existing.lastDate = b.date as string;
    statsMap.set(cid, existing);
  });

  const result = (clients || []).map((c: Record<string, unknown>) => {
    const stats = statsMap.get(c.id as string) || { count: 0, spent: 0, lastDate: '' };
    return {
      id: c.id,
      name: c.name,
      phone: c.phone,
      telegram: c.telegram,
      email: c.email,
      notes: c.notes,
      totalBookings: stats.count,
      totalSpent: stats.spent,
      lastVisit: stats.lastDate || null,
    };
  }).sort((a: { totalSpent: number }, b: { totalSpent: number }) => b.totalSpent - a.totalSpent);

  return NextResponse.json(result);
}
