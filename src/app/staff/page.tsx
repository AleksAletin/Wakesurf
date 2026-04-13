'use client';

import { useAdminStore } from '@/store/admin';
import { BOATS, formatPrice } from '@/lib/data';
import Badge from '@/components/ui/Badge';
import { Calendar, Clock, Users, Phone, Wallet, Check, X, Anchor, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';

export default function StaffDashboard() {
  const { bookings, selectedDate, updateBookingStatus } = useAdminStore();
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.date === today);
  const confirmed = todayBookings.filter((b) => b.status === 'confirmed');
  const pending = todayBookings.filter((b) => b.status === 'pending');
  const todayRevenue = todayBookings.filter((b) => b.status !== 'cancelled').reduce((s, b) => s + b.totalPrice, 0);

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950 pt-4 pb-3 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">PandaWake</h1>
            <p className="text-xs text-slate-400 capitalize">
              {format(new Date(), 'd MMMM, EEEE', { locale: ru })}
            </p>
          </div>
          <Link
            href="/admin"
            className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg"
          >
            Админка →
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mt-4 mb-6">
        <div className="bg-slate-900 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-white">{todayBookings.length}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Броней</div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-cyan-400">{formatPrice(todayRevenue)}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Выручка</div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-amber-400">{pending.length}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Ожидает</div>
        </div>
      </div>

      {/* Pending — needs action */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
            Ждут подтверждения
          </h2>
          <div className="space-y-3">
            {pending.map((b) => (
              <div key={b.id} className="bg-amber-950/30 border border-amber-800/30 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-white">{b.clientName}</div>
                    <div className="text-sm text-slate-400">{b.serviceName}</div>
                  </div>
                  <span className="text-lg font-bold text-amber-400">{formatPrice(b.totalPrice)}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.startTime}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{b.guests} чел</span>
                  {b.boatId && <span className="flex items-center gap-1"><Anchor className="w-3 h-3" />{b.boatId}</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateBookingStatus(b.id, 'confirmed')}
                    className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-bold active:bg-emerald-700"
                  >
                    <Check className="w-4 h-4" /> Подтвердить
                  </button>
                  <button
                    onClick={() => updateBookingStatus(b.id, 'cancelled')}
                    className="flex items-center justify-center gap-1 bg-red-900/50 text-red-400 px-4 py-2.5 rounded-xl text-sm font-medium active:bg-red-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <a
                    href={`tel:${b.clientPhone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center justify-center bg-slate-800 text-slate-400 px-4 py-2.5 rounded-xl active:bg-slate-700"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's timeline */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
          Расписание на сегодня
        </h2>
        {BOATS.map((boat) => {
          const boatBookings = todayBookings.filter((b) => b.boatId === boat.id && b.status !== 'cancelled');
          return (
            <div key={boat.id} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Anchor className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-semibold text-white">{boat.name}</span>
                <span className="text-xs text-slate-600">{boatBookings.length} бронь</span>
              </div>
              {boatBookings.length === 0 ? (
                <div className="text-xs text-slate-600 pl-6">Свободен</div>
              ) : (
                <div className="space-y-2 pl-6">
                  {boatBookings.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((b) => (
                    <div key={b.id} className="flex items-center gap-3 bg-slate-900 rounded-xl p-3">
                      <div className="text-sm font-mono text-cyan-400 w-12">{b.startTime}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{b.clientName}</div>
                        <div className="text-xs text-slate-500">{b.guests} чел · {b.serviceName}</div>
                      </div>
                      <Badge status={b.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* All today's bookings */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
          Все брони ({todayBookings.length})
        </h2>
        <div className="space-y-2">
          {todayBookings
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((b) => (
              <div key={b.id} className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-3">
                <div className="text-sm font-mono text-slate-400 w-12">{b.startTime}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{b.clientName}</div>
                  <div className="text-xs text-slate-500">{b.serviceName} · {b.guests} чел</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">{formatPrice(b.totalPrice)}</div>
                  <Badge status={b.status} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Install PWA hint */}
      <div className="mt-8 text-center text-xs text-slate-600">
        Добавьте на главный экран для быстрого доступа
      </div>

      {/* FAB - new booking */}
      <Link
        href="/staff/new"
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform z-50"
      >
        <Plus className="w-7 h-7 text-white" />
      </Link>
    </div>
  );
}
