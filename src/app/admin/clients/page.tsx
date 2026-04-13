'use client';

import { useMemo } from 'react';
import { useAdminStore } from '@/store/admin';
import { formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';
import { Phone, Users } from 'lucide-react';

interface ClientAggregate {
  name: string;
  phone: string;
  bookingCount: number;
  totalSpent: number;
}

export default function ClientsPage() {
  const { bookings } = useAdminStore();

  const clients = useMemo(() => {
    const map = new Map<string, ClientAggregate>();

    bookings.forEach((b) => {
      const existing = map.get(b.clientPhone);
      if (existing) {
        existing.bookingCount += 1;
        existing.totalSpent += b.totalPrice;
      } else {
        map.set(b.clientPhone, {
          name: b.clientName,
          phone: b.clientPhone,
          bookingCount: 1,
          totalSpent: b.totalPrice,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [bookings]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
        <p className="text-gray-500 mt-1">
          <Users className="w-4 h-4 inline mr-1" />
          {clients.length} клиентов
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <Card key={client.phone} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-gray-900">{client.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <a
                    href={`tel:${client.phone}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {client.phone}
                  </a>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {formatPrice(client.totalSpent)}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {client.bookingCount} {client.bookingCount === 1 ? 'бронь' : client.bookingCount < 5 ? 'брони' : 'броней'}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
