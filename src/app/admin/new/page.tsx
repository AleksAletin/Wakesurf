'use client';

import { useRouter } from 'next/navigation';
import QuickBookingForm from '@/components/admin/QuickBookingForm';

export default function AdminNewBooking() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Новая запись</h1>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <QuickBookingForm
          onComplete={() => router.push('/admin')}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
