'use client';

import { useState } from 'react';
import { useBookingStore } from '@/store/booking';
import { SERVICES, GAZEBOS, INSTRUCTOR_PRICES, formatPrice, isWeekend } from '@/lib/data';
import Button from '@/components/ui/Button';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function StepDetails() {
  const store = useBookingStore();
  const { category, serviceId, date, guests, withInstructor, setGuests, setWithInstructor, setStep, setClientInfo, setNotes } = store;
  const [name, setName] = useState(store.clientName);
  const [phone, setPhone] = useState(store.clientPhone);
  const [telegram, setTelegram] = useState(store.clientTelegram);
  const [notes, setLocalNotes] = useState(store.notes);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const service = SERVICES.find((s) => s.id === serviceId);
  const gazebo = GAZEBOS.find((g) => g.id === serviceId);
  const maxCapacity = service?.capacity || gazebo?.capacity || 20;
  const isWake = category === 'wakesurf';

  function handleSubmit() {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Введите имя';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Введите корректный номер';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setClientInfo(name, phone, telegram);
    setNotes(notes);
    setStep(5);
  }

  const instructorPrice = service?.durationMinutes === 60 ? INSTRUCTOR_PRICES['60min'] : INSTRUCTOR_PRICES['25min'];

  return (
    <div>
      <button onClick={() => setStep(3)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Назад
      </button>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Детали бронирования</h2>

      <div className="space-y-5">
        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Количество гостей</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 hover:border-blue-300"
            >
              -
            </button>
            <span className="text-xl font-bold text-gray-900 w-8 text-center">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(maxCapacity, guests + 1))}
              className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 hover:border-blue-300"
            >
              +
            </button>
            <span className="text-sm text-gray-400">макс. {maxCapacity}</span>
          </div>
        </div>

        {/* Instructor */}
        {isWake && (
          <div
            onClick={() => setWithInstructor(!withInstructor)}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              withInstructor ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <UserPlus className={`w-5 h-5 ${withInstructor ? 'text-blue-600' : 'text-gray-400'}`} />
              <div>
                <div className="font-medium text-gray-900">Инструктор</div>
                <div className="text-sm text-gray-500">+ {formatPrice(instructorPrice)}</div>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              withInstructor ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
            }`}>
              {withInstructor && <span className="text-white text-sm">✓</span>}
            </div>
          </div>
        )}

        <hr className="border-gray-100" />

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors({}); }}
            placeholder="Алексей"
            className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors({}); }}
            placeholder="+7 (900) 123-45-67"
            className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-500 transition-colors ${
              errors.phone ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telegram (необязательно)</label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
          <textarea
            value={notes}
            onChange={(e) => setLocalNotes(e.target.value)}
            rows={2}
            placeholder="Пожелания, особые требования..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <Button onClick={handleSubmit} fullWidth size="lg">
          Подтвердить бронирование
        </Button>
      </div>
    </div>
  );
}
