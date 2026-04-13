'use client';

import { useBookingStore } from '@/store/booking';
import { useAdminStore } from '@/store/admin';
import { SERVICES, GAZEBOS, INSTRUCTOR_PRICES, formatPrice, isWeekend } from '@/lib/data';
import { CONTACT } from '@/lib/data';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { CheckCircle, Calendar, Clock, Users, Phone, Send } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function StepConfirm() {
  const store = useBookingStore();
  const addBooking = useAdminStore((s) => s.addBooking);

  const service = SERVICES.find((s) => s.id === store.serviceId);
  const gazebo = GAZEBOS.find((g) => g.id === store.serviceId);
  const item = service || gazebo;

  const weekend = store.date ? isWeekend(store.date) : false;
  let basePrice = 0;
  if (service) {
    basePrice = weekend ? service.weekendPrice : service.weekdayPrice;
  } else if (gazebo) {
    basePrice = weekend ? gazebo.weekendPrice : gazebo.weekdayPrice;
  }

  const instructorPrice = store.withInstructor
    ? (service?.durationMinutes === 60 ? INSTRUCTOR_PRICES['60min'] : INSTRUCTOR_PRICES['25min'])
    : 0;

  const totalPrice = basePrice + instructorPrice;
  const dateStr = store.date ? format(store.date, 'd MMMM, EEEE', { locale: ru }) : '';
  const serviceName = service?.name || (gazebo ? `Беседка №${gazebo.number}` : '');

  // Save to admin store
  const booking = {
    id: Date.now().toString(),
    serviceId: store.serviceId!,
    serviceName,
    category: store.category!,
    clientName: store.clientName,
    clientPhone: store.clientPhone,
    clientTelegram: store.clientTelegram,
    date: store.date!.toISOString().split('T')[0],
    startTime: store.timeSlot!,
    endTime: store.timeSlot!, // simplified
    guests: store.guests,
    totalPrice,
    status: 'pending' as const,
    withInstructor: store.withInstructor,
    boatId: store.category === 'wakesurf' ? (store.boatId || 'tige-24v') : undefined,
    gazeboId: store.category === 'gazebo' ? store.serviceId! : undefined,
    notes: store.notes,
    sourceSite: store.sourceSite,
    createdAt: new Date().toISOString(),
  };

  // Add on first render
  if (typeof window !== 'undefined') {
    const key = `booking_added_${booking.id}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      addBooking(booking);
    }
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h2>
      <p className="text-gray-500 mb-6">
        Мы свяжемся с вами для подтверждения в течение 15 минут
      </p>

      <Card className="p-5 text-left mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">{serviceName}</span>
            <span className="font-bold text-blue-600">{formatPrice(totalPrice)}</span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {dateStr}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              {store.timeSlot}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              {store.guests} {store.guests === 1 ? 'гость' : store.guests < 5 ? 'гостя' : 'гостей'}
            </div>
            {store.withInstructor && (
              <div className="text-blue-600 font-medium">+ Инструктор</div>
            )}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              {store.clientName} · {store.clientPhone}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        <a
          href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
            `Здравствуйте! Я оставил заявку на ${serviceName}, ${dateStr} в ${store.timeSlot}. Имя: ${store.clientName}.`
          )}`}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Написать в WhatsApp
        </a>
        <a
          href={CONTACT.telegram}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          <Send className="w-4 h-4" /> Telegram
        </a>
        <Button variant="ghost" onClick={() => store.reset()}>
          Новое бронирование
        </Button>
      </div>
    </div>
  );
}
