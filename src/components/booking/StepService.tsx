'use client';

import { useBookingStore } from '@/store/booking';
import { SERVICES, GAZEBOS, formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft, Users, Clock } from 'lucide-react';

export default function StepService() {
  const { category, serviceId, setService, setStep } = useBookingStore();

  const items = category === 'gazebo'
    ? GAZEBOS.map((g) => ({
        id: g.id,
        name: `Беседка №${g.number}`,
        description: g.description,
        weekdayPrice: g.weekdayPrice,
        weekendPrice: g.weekendPrice,
        capacity: g.capacity,
        duration: 'весь день',
      }))
    : SERVICES
        .filter((s) => {
          if (category === 'sup') return s.category === 'sup' || s.category === 'tour';
          return s.category === category;
        })
        .map((s) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          weekdayPrice: s.weekdayPrice,
          weekendPrice: s.weekendPrice,
          capacity: s.capacity,
          duration: `${s.durationMinutes} мин`,
        }));

  return (
    <div className="space-y-3">
      <button onClick={() => setStep(0)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-2">
        <ArrowLeft className="w-4 h-4" /> Назад
      </button>
      <h2 className="text-lg font-semibold text-gray-900">Выберите вариант</h2>
      {items.map((item) => (
        <Card
          key={item.id}
          onClick={() => setService(item.id)}
          selected={serviceId === item.id}
          hoverable
          className="p-5"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-500 mt-1">{item.description}</div>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />до {item.capacity}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="font-bold text-gray-900">{formatPrice(item.weekdayPrice)}</div>
              {item.weekendPrice !== item.weekdayPrice && (
                <div className="text-xs text-gray-400">{formatPrice(item.weekendPrice)} вых</div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
