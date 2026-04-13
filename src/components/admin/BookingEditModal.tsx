'use client';

import { useState } from 'react';
import { Booking } from '@/types';
import { useAdminStore } from '@/store/admin';
import { BOATS, formatPrice } from '@/lib/data';
import { X, Check, Anchor, Calendar, Clock, Users, Phone, MessageCircle } from 'lucide-react';

interface Props {
  booking: Booking;
  onClose: () => void;
}

export default function BookingEditModal({ booking, onClose }: Props) {
  const { updateBookingStatus, bookings } = useAdminStore();
  const updateBooking = useAdminStore((s) => s.addBooking); // we'll use full update

  const [status, setStatus] = useState(booking.status);
  const [date, setDate] = useState(booking.date);
  const [startTime, setStartTime] = useState(booking.startTime);
  const [boatId, setBoatId] = useState(booking.boatId || '');
  const [guests, setGuests] = useState(booking.guests);
  const [notes, setNotes] = useState(booking.notes || '');

  function handleSave() {
    // Update in store — mutate the booking directly
    useAdminStore.setState((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === booking.id
          ? { ...b, status, date, startTime, boatId: boatId || b.boatId, guests, notes }
          : b
      ),
    }));
    onClose();
  }

  const statusOptions: { value: Booking['status']; label: string; color: string }[] = [
    { value: 'pending', label: 'Ожидает', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { value: 'confirmed', label: 'Подтверждено', color: 'bg-green-100 text-green-700 border-green-300' },
    { value: 'completed', label: 'Завершено', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'cancelled', label: 'Отменено', color: 'bg-red-100 text-red-700 border-red-300' },
  ];

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-blue-500";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">{booking.clientName}</h2>
            <p className="text-sm text-gray-500">{booking.serviceName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Contact buttons */}
          <div className="flex gap-2">
            <a
              href={`tel:${booking.clientPhone.replace(/[^+\d]/g, '')}`}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200"
            >
              <Phone className="w-4 h-4" /> Позвонить
            </a>
            {booking.clientTelegram && (
              <a
                href={`https://t.me/${booking.clientTelegram.replace('@', '')}`}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-100"
              >
                <MessageCircle className="w-4 h-4" /> Telegram
              </a>
            )}
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Статус</label>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                    status === opt.value ? opt.color + ' border-current' : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Дата</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Время</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Boat */}
          {booking.category === 'wakesurf' && (
            <div>
              <label className={labelClass}>Катер</label>
              <div className="grid grid-cols-2 gap-2">
                {BOATS.map((boat) => (
                  <button
                    key={boat.id}
                    onClick={() => setBoatId(boat.id)}
                    className={`p-2.5 rounded-lg border text-left text-sm transition-all ${
                      boatId === boat.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5" />
                      <span className="font-semibold">{boat.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guests */}
          <div>
            <label className={labelClass}>Гостей</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600">-</button>
              <span className="text-lg font-bold w-8 text-center">{guests}</span>
              <button onClick={() => setGuests(Math.min(20, guests + 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600">+</button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Заметка</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={inputClass + ' resize-none'}
              placeholder="Доп. информация..."
            />
          </div>

          {/* Price & Source */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 text-sm">
            <span className="text-gray-500">
              {booking.sourceSite === 'pandawake' ? '🏄 PandaWake' : '⛵ Парусник'}
            </span>
            <span className="font-bold text-gray-900">{formatPrice(booking.totalPrice)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">
            Отмена
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-1">
            <Check className="w-4 h-4" /> Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
