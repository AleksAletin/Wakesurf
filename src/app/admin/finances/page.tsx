'use client';

import { useMemo } from 'react';
import { useAdminStore } from '@/store/admin';
import { formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';
import { Wallet, TrendingUp, Anchor, TreePine } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function FinancesPage() {
  const { bookings } = useAdminStore();

  const confirmedBookings = useMemo(
    () => bookings.filter((b) => b.status === 'confirmed' || b.status === 'completed'),
    [bookings]
  );

  const totalRevenue = confirmedBookings.reduce((s, b) => s + b.totalPrice, 0);
  const wakeRevenue = confirmedBookings
    .filter((b) => b.category === 'wakesurf' || b.category === 'sup' || b.category === 'tour')
    .reduce((s, b) => s + b.totalPrice, 0);
  const gazeboRevenue = confirmedBookings
    .filter((b) => b.category === 'gazebo')
    .reduce((s, b) => s + b.totalPrice, 0);
  const avgPerBooking =
    confirmedBookings.length > 0
      ? Math.round(totalRevenue / confirmedBookings.length)
      : 0;

  // Last 7 days revenue
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = subDays(today, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const label = format(d, 'd MMM', { locale: ru });
      const dayBookings = confirmedBookings.filter((b) => b.date === dateStr);
      const revenue = dayBookings.reduce((s, b) => s + b.totalPrice, 0);
      days.push({ dateStr, label, revenue });
    }
    return days;
  }, [confirmedBookings]);

  const maxRevenue = Math.max(...last7Days.map((d) => d.revenue), 1);

  // Revenue structure
  const wakePercent = totalRevenue > 0 ? Math.round((wakeRevenue / totalRevenue) * 100) : 0;
  const gazeboPercent = totalRevenue > 0 ? 100 - wakePercent : 0;

  const stats = [
    {
      label: 'Общая выручка',
      value: formatPrice(totalRevenue),
      icon: Wallet,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Выручка (вейк)',
      value: formatPrice(wakeRevenue),
      icon: Anchor,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Выручка (беседки)',
      value: formatPrice(gazeboRevenue),
      icon: TreePine,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      label: 'Средний чек',
      value: formatPrice(avgPerBooking),
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Финансы</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="mt-3">
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Revenue by day (bar chart) */}
      <Card className="p-4">
        <h2 className="font-semibold text-gray-900 mb-4">Выручка по дням</h2>
        <div className="space-y-3">
          {last7Days.map((day) => (
            <div key={day.dateStr} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-16 shrink-0">{day.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(day.revenue / maxRevenue) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 w-24 text-right shrink-0">
                {day.revenue > 0 ? formatPrice(day.revenue) : '—'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue structure */}
      <Card className="p-4">
        <h2 className="font-semibold text-gray-900 mb-4">Структура выручки</h2>
        <div className="h-8 rounded-full overflow-hidden flex bg-gray-100">
          {wakePercent > 0 && (
            <div
              className="bg-blue-500 h-full flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${wakePercent}%` }}
            >
              {wakePercent > 10 ? `Вейк ${wakePercent}%` : ''}
            </div>
          )}
          {gazeboPercent > 0 && (
            <div
              className="bg-orange-400 h-full flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${gazeboPercent}%` }}
            >
              {gazeboPercent > 10 ? `Беседки ${gazeboPercent}%` : ''}
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-600">Вейк — {formatPrice(wakeRevenue)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" />
            <span className="text-gray-600">Беседки — {formatPrice(gazeboRevenue)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
