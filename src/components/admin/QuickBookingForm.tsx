'use client';

import { useState } from 'react';
import { useAdminStore } from '@/store/admin';
import { SERVICES, GAZEBOS, BOATS, INSTRUCTOR_PRICES, formatPrice, isWeekend } from '@/lib/data';
import { Booking, ServiceCategory, SourceSite } from '@/types';
import Button from '@/components/ui/Button';
import { ArrowLeft, Check, Anchor, Users, Clock, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const allServices = [
  ...SERVICES.map((s) => ({ id: s.id, name: s.name, category: s.category as ServiceCategory, type: 'service' as const })),
  ...GAZEBOS.map((g) => ({ id: g.id, name: `Беседка №${g.number} (до ${g.capacity} чел)`, category: 'gazebo' as ServiceCategory, type: 'gazebo' as const })),
];

interface Props {
  onComplete?: () => void;
  onCancel?: () => void;
  compact?: boolean;
}

export default function QuickBookingForm({ onComplete, onCancel, compact }: Props) {
  const addBooking = useAdminStore((s) => s.addBooking);

  const [serviceId, setServiceId] = useState('');
  const [boatId, setBoatId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [guests, setGuests] = useState(1);
  const [withInstructor, setWithInstructor] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientTelegram, setClientTelegram] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState<SourceSite>('pandawake');
  const [saved, setSaved] = useState(false);

  const selected = allServices.find((s) => s.id === serviceId);
  const service = SERVICES.find((s) => s.id === serviceId);
  const gazebo = GAZEBOS.find((g) => g.id === serviceId);
  const isWake = selected?.category === 'wakesurf';

  // Calculate price
  const dateObj = new Date(date);
  const weekend = isWeekend(dateObj);
  let price = 0;
  if (service) price = weekend ? service.weekendPrice : service.weekdayPrice;
  if (gazebo) price = weekend ? gazebo.weekendPrice : gazebo.weekdayPrice;
  const instrPrice = withInstructor && service ? (service.durationMinutes === 60 ? INSTRUCTOR_PRICES['60min'] : INSTRUCTOR_PRICES['25min']) : 0;
  const total = price + instrPrice;

  function handleSubmit() {
    if (!serviceId || !clientName || !clientPhone || !date || !time) return;

    const serviceName = service?.name || (gazebo ? `Беседка №${gazebo.number}` : serviceId);
    const durationMin = service?.durationMinutes || 720;
    const [h, m] = time.split(':').map(Number);
    const endMin = h * 60 + m + durationMin;
    const endTime = `${String(Math.floor(endMin / 60)).padStart(2, '0')}:${String(endMin % 60).padStart(2, '0')}`;

    const booking: Booking = {
      id: Date.now().toString(),
      serviceId,
      serviceName,
      category: selected!.category,
      clientName,
      clientPhone,
      clientTelegram,
      date,
      startTime: time,
      endTime,
      guests,
      totalPrice: total,
      status: 'confirmed',
      withInstructor,
      boatId: isWake ? (boatId || 'tige-24v') : undefined,
      gazeboId: selected?.category === 'gazebo' ? serviceId : undefined,
      notes,
      sourceSite: source,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onComplete?.();
    }, 1500);
  }

  if (saved) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Записано!</h3>
        <p className="text-gray-500 mt-1">{clientName} — {service?.name || `Беседка`}</p>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <div className="space-y-4">
      {onCancel && (
        <button onClick={onCancel} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      )}

      {/* Service selection */}
      <div>
        <label className={labelClass}>Услуга *</label>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className={inputClass}
        >
          <option value="">Выберите услугу...</option>
          <optgroup label="Вейксёрф">
            {allServices.filter((s) => s.category === 'wakesurf').map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </optgroup>
          <optgroup label="Беседки">
            {allServices.filter((s) => s.category === 'gazebo').map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </optgroup>
          <optgroup label="Другое">
            {allServices.filter((s) => !['wakesurf', 'gazebo'].includes(s.category)).map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Boat selection for wake */}
      {isWake && (
        <div>
          <label className={labelClass}>Катер</label>
          <div className="grid grid-cols-2 gap-2">
            {BOATS.map((boat) => (
              <button
                key={boat.id}
                onClick={() => setBoatId(boat.id)}
                className={`p-3 rounded-xl border-2 text-left text-sm transition-all ${
                  boatId === boat.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-gray-900">{boat.name}</span>
                </div>
                <span className="text-xs text-gray-400">{boat.capacity} мест</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Дата *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Время *</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Guests & Instructor */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Гостей</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">-</button>
            <span className="text-lg font-bold text-gray-900 w-8 text-center">{guests}</span>
            <button onClick={() => setGuests(Math.min(20, guests + 1))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">+</button>
          </div>
        </div>
        {isWake && (
          <div>
            <label className={labelClass}>Инструктор</label>
            <button
              onClick={() => setWithInstructor(!withInstructor)}
              className={`w-full p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                withInstructor ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'
              }`}
            >
              {withInstructor ? '✓ Да' : 'Нет'} (+{formatPrice(service?.durationMinutes === 60 ? 2000 : 1000)})
            </button>
          </div>
        )}
      </div>

      {/* Client info */}
      <div className="border-t border-gray-100 pt-4">
        <label className={labelClass}>Клиент</label>
        <div className="space-y-2">
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Имя *" className={inputClass} />
          <input type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="Телефон *" className={inputClass} />
          <input type="text" value={clientTelegram} onChange={(e) => setClientTelegram(e.target.value)} placeholder="Telegram (необязательно)" className={inputClass} />
        </div>
      </div>

      {/* Source & Notes */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Источник</label>
          <div className="flex gap-1">
            <button
              onClick={() => setSource('pandawake')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                source === 'pandawake' ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              PandaWake
            </button>
            <button
              onClick={() => setSource('parusnik')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                source === 'parusnik' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Парусник
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Заметка</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Доп. инфо" className={inputClass} />
        </div>
      </div>

      {/* Price summary */}
      {serviceId && (
        <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Итого {weekend ? '(вых)' : '(будни)'}
            {withInstructor ? ' + инструктор' : ''}
          </span>
          <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
        </div>
      )}

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        fullWidth
        size="lg"
        disabled={!serviceId || !clientName || !clientPhone}
      >
        Записать клиента
      </Button>
    </div>
  );
}
