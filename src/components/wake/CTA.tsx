'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Waves, MessageCircle, Send } from 'lucide-react';
import { CONTACT } from '@/lib/data';

export default function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <Image
        src="/images/sunset.jpg"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-800/80" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Готовы к волне?
        </h2>
        <p className="text-xl text-white/70 mb-10 max-w-lg mx-auto">
          Бронируйте онлайн или напишите нам — ответим за 5 минут
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <Waves className="w-5 h-5" />
            Забронировать
          </Link>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-green-400 transition-all shadow-lg shadow-green-500/30"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href={CONTACT.telegram}
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30"
          >
            <Send className="w-5 h-5" />
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
