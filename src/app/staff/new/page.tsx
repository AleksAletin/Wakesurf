'use client';

import { useRouter } from 'next/navigation';
import QuickBookingForm from '@/components/admin/QuickBookingForm';
import { ArrowLeft } from 'lucide-react';

export default function StaffNewBooking() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      <div className="sticky top-0 z-10 bg-slate-950 pt-4 pb-3 border-b border-slate-800 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-white">Новая запись</h1>
      </div>
      <div className="mt-4">
        <QuickBookingForm
          onComplete={() => router.push('/staff')}
          compact
        />
      </div>
    </div>
  );
}
