'use client';

import { Suspense } from 'react';
import BookingFlow from '@/components/booking/BookingFlow';
import Header from '@/components/wake/Header';

export default function BookingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-20 pb-10">
        <div className="max-w-2xl mx-auto px-4">
          <Suspense fallback={<div className="text-center py-10 text-gray-400">Загрузка...</div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
