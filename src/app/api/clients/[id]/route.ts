import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/clients/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  // Get their bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('client_id', id)
    .order('date', { ascending: false });

  return NextResponse.json({ ...client, bookings: bookings || [] });
}

// PATCH /api/clients/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  if (body.name) updates.name = body.name;
  if (body.telegram !== undefined) updates.telegram = body.telegram;
  if (body.email !== undefined) updates.email = body.email;
  if (body.notes !== undefined) updates.notes = body.notes;

  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
