'use client';

import { useState } from 'react';
import { useAdminStore } from '@/store/admin';
import { formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import BookingEditModal from '@/components/admin/BookingEditModal';
import { Search, Phone, Pencil, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Booking } from '@/types';
import Link from 'next/link';

const STATUS_FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'pending', label: 'Ожидают' },
  { key: 'confirmed', label: 'Подтверждено' },
  { key: 'completed', label: 'Завершено' },
  { key: 'cancelled', label: 'Отменено' },
] as const;

const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  pandawake: { label: 'PW', color: 'bg-cyan-100 text-cyan-700' },
  parusnik: { label: 'ПР', color: 'bg-emerald-100 text-emerald-700' },
};

function BookingCard({ booking, onEdit }: { booking: Booking; onEdit: () => void }) {
  const updateBookingStatus = useAdminStore((s) => s.updateBookingStatus);

  const dateDisplay = format(new Date(booking.date + 'T00:00:00'), 'd MMM yyyy', { locale: ru });
  const sourceInfo = SOURCE_LABELS[booking.sourceSite] || SOURCE_LABELS.pandawake;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{booking.clientName}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sourceInfo.color}`}>
            {sourceInfo.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge status={booking.status} />
          <button onClick={onEdit} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-2">{booking.serviceName}</div>
      {booking.boatId && (
        <div className="text-xs text-gray-400 mt-0.5">
          {booking.boatId === 'tige-24v' ? 'Tige 24v' : 'Centurion C4'}
        </div>
      )}

      <div className="text-sm text-gray-500 mt-1">
        {dateDisplay} · {booking.startTime}–{booking.endTime} · {booking.guests} гостей
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Phone className="w-3.5 h-3.5 text-gray-400" />
        <a href={`tel:${booking.clientPhone}`} className="text-sm text-blue-600 hover:underline">
          {booking.clientPhone}
        </a>
      </div>

      {booking.notes && (
        <div className="text-sm text-gray-500 mt-2 bg-gray-50 rounded-lg px-3 py-2">{booking.notes}</div>
      )}

      <div className="text-sm font-medium text-gray-900 mt-2">{formatPrice(booking.totalPrice)}</div>

      {booking.status === 'pending' && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
            className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-green-700"
          >
            Подтвердить
          </button>
          <button
            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
            className="flex-1 bg-red-50 text-red-600 text-sm font-medium py-2 rounded-xl hover:bg-red-100"
          >
            Отклонить
          </button>
        </div>
      )}

      {booking.status === 'confirmed' && (
        <div className="mt-3">
          <button
            onClick={() => updateBookingStatus(booking.id, 'completed')}
            className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-blue-700"
          >
            Завершить
          </button>
        </div>
      )}
    </Card>
  );
}

export default function BookingsPage() {
  const { bookings, sourceFilter, setSourceFilter } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const filtered = bookings
    .filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && b.sourceSite !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return b.clientName.toLowerCase().includes(q) || b.clientPhone.includes(q) || b.serviceName.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      const dateCmp = b.date.localeCompare(a.date);
      if (dateCmp !== 0) return dateCmp;
      return a.startTime.localeCompare(b.startTime);
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Брони</h1>
        <Link
          href="/admin/new"
          className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Записать
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по имени, телефону, услуге..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        {/* Source filter */}
        <div className="flex bg-gray-100 rounded-lg p-0.5 mr-2">
          {[
            { key: 'all', label: 'Все' },
            { key: 'pandawake', label: '🏄 PW' },
            { key: 'parusnik', label: '⛵ ПР' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setSourceFilter(f.key as 'all' | 'pandawake' | 'parusnik')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                sourceFilter === f.key ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Status filter */}
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm col-span-2">Нет броней</p>
        ) : (
          filtered.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onEdit={() => setEditingBooking(b)}
            />
          ))
        )}
      </div>

      {/* Edit modal */}
      {editingBooking && (
        <BookingEditModal
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
        />
      )}
    </div>
  );
}
