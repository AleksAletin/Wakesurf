'use client';

import { useAdminStore } from '@/store/admin';
import { BOATS, formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Calendar, Users, Wallet, TrendingUp, Clock, Anchor, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Booking } from '@/types';
import Link from 'next/link';

function PendingBookingCard({ booking }: { booking: Booking }) {
  const updateBookingStatus = useAdminStore((s) => s.updateBookingStatus);

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium text-gray-900">{booking.clientName}</div>
          <div className="text-sm text-gray-500 mt-1">{booking.serviceName}</div>
          <div className="text-sm text-gray-500">
            {booking.startTime}–{booking.endTime} &middot; {booking.guests} гостей
          </div>
          <div className="text-sm font-medium text-gray-900 mt-1">
            {formatPrice(booking.totalPrice)}
          </div>
        </div>
        <Badge status={booking.status} />
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
          className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-green-700 transition-colors"
        >
          Подтвердить
        </button>
        <button
          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
          className="flex-1 bg-red-50 text-red-600 text-sm font-medium py-2 rounded-xl hover:bg-red-100 transition-colors"
        >
          Отклонить
        </button>
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const { bookings, selectedDate } = useAdminStore();

  const todayBookings = bookings.filter((b) => b.date === selectedDate);
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const confirmedToday = todayBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'completed'
  );
  const revenueToday = confirmedToday.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const uniqueClients = new Set(bookings.map((b) => b.clientPhone)).size;

  const displayDate = format(new Date(selectedDate + 'T00:00:00'), 'd MMMM yyyy', {
    locale: ru,
  });

  const stats = [
    {
      label: 'Броней сегодня',
      value: todayBookings.length,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Выручка сегодня',
      value: formatPrice(revenueToday),
      icon: Wallet,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Общая выручка',
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Уникальных клиентов',
      value: uniqueClients,
      icon: Users,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-500 mt-1">{displayDate}</p>
        </div>
        <Link
          href="/admin/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Новая запись
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Boats today */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Anchor className="w-5 h-5" />
          Катера сегодня
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {BOATS.map((boat) => {
            const boatBookings = todayBookings.filter((b) => b.boatId === boat.id);
            return (
              <Card key={boat.id} className="p-4">
                <div className="font-medium text-gray-900 mb-2">{boat.name}</div>
                {boatBookings.length === 0 ? (
                  <p className="text-sm text-gray-400">Нет броней</p>
                ) : (
                  <div className="space-y-2">
                    {boatBookings.map((b) => (
                      <div
                        key={b.id}
                        className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <div>
                          <span className="font-medium text-gray-700">{b.startTime}–{b.endTime}</span>
                          <span className="text-gray-500 ml-2">{b.clientName}</span>
                        </div>
                        <Badge status={b.status} />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pending bookings */}
      {pendingBookings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Ожидают подтверждения
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pendingBookings.map((b) => (
              <PendingBookingCard key={b.id} booking={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
