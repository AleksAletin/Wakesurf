'use client';

import { Suspense } from 'react';
import BookingFlow from '@/components/booking/BookingFlow';
import ParusnikHeader from '@/components/parusnik/Header';

export default function ParusnikBookingPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <ParusnikHeader />
      <main className="pt-20 pb-10">
        <div className="max-w-2xl mx-auto px-4">
          <Suspense fallback={<div className="text-center py-10 text-stone-400">Загрузка...</div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
