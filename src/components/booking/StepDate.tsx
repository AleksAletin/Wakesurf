'use client';

import { useState, useMemo } from 'react';
import { useBookingStore } from '@/store/booking';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isBefore, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function StepDate() {
  const { date: selectedDate, setDate, setStep } = useBookingStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const result: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [currentMonth]);

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div>
      <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Назад
      </button>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите дату</h2>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-semibold text-gray-900 capitalize">
            {format(currentMonth, 'LLLL yyyy', { locale: ru })}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const inMonth = isSameMonth(day, currentMonth);
            const isPast = isBefore(day, today) && !isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const dayOfWeek = day.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <button
                key={i}
                onClick={() => !isPast && inMonth && setDate(day)}
                disabled={isPast || !inMonth}
                className={`
                  h-11 rounded-xl text-sm font-medium transition-all
                  ${!inMonth ? 'text-gray-200' : ''}
                  ${isPast && inMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${inMonth && !isPast && !isSelected ? 'hover:bg-blue-50 cursor-pointer' : ''}
                  ${isSelected ? 'bg-blue-600 text-white shadow-md' : ''}
                  ${isToday(day) && !isSelected ? 'ring-2 ring-blue-300' : ''}
                  ${isWeekend && inMonth && !isPast && !isSelected ? 'text-blue-600' : ''}
                  ${inMonth && !isPast && !isSelected && !isWeekend ? 'text-gray-900' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        <span className="text-blue-600">Синие</span> — выходные (цена выше)
      </p>
    </div>
  );
}
