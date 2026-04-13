'use client';

import { useBookingStore } from '@/store/booking';
import { SERVICES, GAZEBOS, INSTRUCTOR_PRICES, formatPrice, isWeekend } from '@/lib/data';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function BookingSummary() {
  const { serviceId, date, timeSlot, guests, withInstructor, category, boatId } = useBookingStore();

  const service = SERVICES.find((s) => s.id === serviceId);
  const gazebo = GAZEBOS.find((g) => g.id === serviceId);

  if (!serviceId) return null;

  const weekend = date ? isWeekend(date) : false;
  let price = 0;
  if (service) price = weekend ? service.weekendPrice : service.weekdayPrice;
  else if (gazebo) price = weekend ? gazebo.weekendPrice : gazebo.weekdayPrice;

  const instructorPrice = withInstructor && service
    ? (service.durationMinutes === 60 ? INSTRUCTOR_PRICES['60min'] : INSTRUCTOR_PRICES['25min'])
    : 0;

  const total = price + instructorPrice;
  const name = service?.name || (gazebo ? `Беседка №${gazebo.number}` : '');

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-blue-900">{name}</span>
        <span className="font-bold text-blue-900">{formatPrice(total)}</span>
      </div>
      <div className="text-xs text-blue-600 space-y-0.5">
        {date && <div>{format(date, 'd MMM, EE', { locale: ru })} {weekend ? '(выходной)' : '(будни)'}</div>}
        {timeSlot && <div>{timeSlot}</div>}
        {guests > 1 && <div>{guests} чел</div>}
        {boatId && <div>Катер: {boatId === 'tige-24v' ? 'Tige 24v' : 'Centurion C4'}</div>}
        {withInstructor && <div>+ Инструктор {formatPrice(instructorPrice)}</div>}
      </div>
    </div>
  );
}
