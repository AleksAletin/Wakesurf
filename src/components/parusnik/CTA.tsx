'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TreePine, Phone, MessageCircle } from 'lucide-react';
import { SITES } from '@/lib/sites';

export default function ParusnikCTA() {
  const site = SITES.parusnik;
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <Image src="/images/sunset.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-stone-900/80" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Забронируйте беседку
        </h2>
        <p className="text-xl text-white/60 mb-10 max-w-lg mx-auto">
          Выберите дату, беседку и приезжайте отдыхать
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-stone-100 transition-all shadow-xl"
          >
            <TreePine className="w-5 h-5" />
            Забронировать онлайн
          </Link>
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-500 transition-all shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Позвонить
          </a>
        </div>
      </div>
    </section>
  );
}
