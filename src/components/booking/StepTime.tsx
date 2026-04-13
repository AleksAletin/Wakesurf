'use client';

import { useMemo } from 'react';
import { useBookingStore } from '@/store/booking';
import { ArrowLeft, Anchor } from 'lucide-react';
import { SERVICES, GAZEBOS, BOATS, WORKING_HOURS } from '@/lib/data';
import Image from 'next/image';

export default function StepTime() {
  const { category, serviceId, timeSlot, boatId, setTimeSlot, setBoat, setStep } = useBookingStore();
  const isWake = category === 'wakesurf';

  const slots = useMemo(() => {
    if (category === 'gazebo') {
      return [{ time: '10:00', label: '10:00 — 22:00 (весь день)' }];
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) return [];

    const hours = WORKING_HOURS.wake;
    const duration = service.durationMinutes;
    const result: { time: string; label: string }[] = [];

    for (let h = hours.start; h < hours.end; h++) {
      for (let m = 0; m < 60; m += 30) {
        const endMin = h * 60 + m + duration;
        const endH = Math.floor(endMin / 60);
        const endM = endMin % 60;
        if (endH > hours.end) break;

        const startStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        result.push({ time: startStr, label: startStr });
      }
    }
    return result;
  }, [category, serviceId]);

  const boatImages: Record<string, string> = {
    'tige-24v': '/images/boat-3.jpg',
    'centurion-c4': '/images/boat-4.jpg',
  };

  return (
    <div>
      <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Назад
      </button>

      {/* Boat selection for wake */}
      {isWake && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Выберите катер</h2>
          <div className="grid grid-cols-2 gap-3">
            {BOATS.map((boat) => (
              <button
                key={boat.id}
                onClick={() => setBoat(boat.id)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all text-left ${
                  boatId === boat.id
                    ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="relative h-28">
                  <Image
                    src={boatImages[boat.id] || '/images/boat-1.jpg'}
                    alt={boat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {boatId === boat.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="font-bold text-white text-sm">{boat.name}</div>
                    <div className="text-white/60 text-xs">{boat.capacity} мест</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Оба катера создают идеальную волну для вейксёрфинга
          </p>
        </div>
      )}

      {/* Time selection */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Выберите время</h2>

      {category === 'gazebo' ? (
        <button
          onClick={() => setTimeSlot('10:00')}
          className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
            timeSlot === '10:00'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-blue-300 text-gray-700'
          }`}
        >
          10:00 — 22:00 (весь день)
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => setTimeSlot(slot.time)}
              className={`p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                timeSlot === slot.time
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 text-gray-700'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
