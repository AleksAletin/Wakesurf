import { Booking, Client } from '@/types';

const BASE = '';

export async function fetchBookings(params?: {
  date?: string;
  status?: string;
  source?: string;
  from?: string;
  to?: string;
}): Promise<Booking[]> {
  const sp = new URLSearchParams();
  if (params?.date) sp.set('date', params.date);
  if (params?.status) sp.set('status', params.status);
  if (params?.source) sp.set('source', params.source);
  if (params?.from) sp.set('from', params.from);
  if (params?.to) sp.set('to', params.to);
  const res = await fetch(`${BASE}/api/bookings?${sp}`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function createBooking(data: {
  serviceId: string;
  category: string;
  clientName: string;
  clientPhone: string;
  clientTelegram?: string;
  date: string;
  startTime: string;
  guests: number;
  withInstructor: boolean;
  notes?: string;
  sourceSite: string;
}): Promise<unknown> {
  const res = await fetch(`${BASE}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create booking');
  }
  return res.json();
}

export async function updateBookingStatus(id: string, status: string): Promise<unknown> {
  const res = await fetch(`${BASE}/api/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
}

export async function fetchClients(search?: string): Promise<Client[]> {
  const sp = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${BASE}/api/clients${sp}`);
  if (!res.ok) throw new Error('Failed to fetch clients');
  return res.json();
}

export async function fetchSchedule(date: string): Promise<unknown> {
  const res = await fetch(`${BASE}/api/schedule?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch schedule');
  return res.json();
}
