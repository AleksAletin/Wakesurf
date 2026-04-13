'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useBookingStore } from '@/store/booking';
import StepCategory from './StepCategory';
import StepService from './StepService';
import StepDate from './StepDate';
import StepTime from './StepTime';
import StepDetails from './StepDetails';
import StepConfirm from './StepConfirm';
import BookingSummary from './BookingSummary';

const steps = ['Услуга', 'Вариант', 'Дата', 'Время', 'Данные', 'Готово'];

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const { step, setCategory, setService, reset } = useBookingStore();

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const gazeboParam = searchParams.get('gazebo');
    if (serviceParam) {
      setCategory('wakesurf');
      setService(serviceParam);
    } else if (gazeboParam) {
      setCategory('gazebo');
      setService(gazeboParam);
    }
  }, [searchParams, setCategory, setService]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Бронирование</h1>
        {step > 0 && step < 5 && (
          <button onClick={reset} className="text-sm text-gray-400 hover:text-gray-600">
            Начать заново
          </button>
        )}
      </div>

      {step < 5 && (
        <div className="flex gap-1 mb-8">
          {steps.slice(0, 5).map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1.5 rounded-full transition-colors ${
                i <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
              <div className={`text-xs mt-1 ${
                i === step ? 'text-blue-600 font-medium' : 'text-gray-400'
              }`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {step === 0 && <StepCategory />}
        {step === 1 && <StepService />}
        {step === 2 && <StepDate />}
        {step === 3 && <StepTime />}
        {step === 4 && <StepDetails />}
        {step === 5 && <StepConfirm />}
      </div>

      {step >= 2 && step < 5 && <BookingSummary />}
    </div>
  );
}
