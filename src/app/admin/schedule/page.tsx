'use client';

import { useAdminStore } from '@/store/admin';
import { BOATS } from '@/lib/data';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7..21

export default function SchedulePage() {
  const { bookings, selectedDate, setSelectedDate } = useAdminStore();

  const dateObj = new Date(selectedDate + 'T00:00:00');
  const displayDate = format(dateObj, 'd MMMM yyyy, EEEE', { locale: ru });

  const goBack = () => setSelectedDate(format(subDays(dateObj, 1), 'yyyy-MM-dd'));
  const goForward = () => setSelectedDate(format(addDays(dateObj, 1), 'yyyy-MM-dd'));

  const todayBookings = bookings.filter((b) => b.date === selectedDate);

  return (
    <div className="space-y-6">
      {/* Header with date navigation */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Расписание</h1>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={goBack}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-gray-700 font-medium">{displayDate}</span>
          <button
            onClick={goForward}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Boats schedule grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {BOATS.map((boat) => {
          const boatBookings = todayBookings.filter((b) => b.boatId === boat.id);

          return (
            <Card key={boat.id} className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{boat.name}</h3>
              <div className="space-y-1">
                {HOURS.map((hour) => {
                  const hourStr = String(hour).padStart(2, '0');
                  const booking = boatBookings.find((b) => {
                    const startHour = parseInt(b.startTime.split(':')[0], 10);
                    const endHour = parseInt(b.endTime.split(':')[0], 10);
                    const endMin = parseInt(b.endTime.split(':')[1], 10);
                    const effectiveEnd = endMin > 0 ? endHour + 1 : endHour;
                    return hour >= startHour && hour < effectiveEnd;
                  });

                  if (booking) {
                    const isStart =
                      parseInt(booking.startTime.split(':')[0], 10) === hour;
                    const bgColor =
                      booking.status === 'confirmed'
                        ? 'bg-blue-50 border-blue-200'
                        : booking.status === 'pending'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200';

                    return (
                      <div
                        key={hour}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${bgColor}`}
                      >
                        <span className="text-sm font-mono text-gray-500 w-12">
                          {hourStr}:00
                        </span>
                        {isStart ? (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {booking.clientName}
                              </span>
                              <Badge status={booking.status} />
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {booking.startTime}–{booking.endTime} &middot;{' '}
                              {booking.guests} гостей
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            продолжение
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={hour}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm font-mono text-gray-300 w-12">
                        {hourStr}:00
                      </span>
                      <span className="text-xs text-gray-300">&mdash;</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
