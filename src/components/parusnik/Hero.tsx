'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TreePine, MapPin, ChevronDown } from 'lucide-react';

export default function ParusnikHero() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Яхт-клуб Парусник на Клязьме"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-black/30 to-black/10" />

      <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-900/40 backdrop-blur-md border border-emerald-700/30 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium text-white/80">Клязьминское водохранилище, 15 км от МКАД</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-4 tracking-tight">
            Отдых<br />
            <span className="text-amber-200">на природе</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-lg leading-relaxed">
            Беседки с мангалом на берегу, рыбалка, прогулки на катере
            и всё для идеального дня за городом.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-700/30"
            >
              <TreePine className="w-5 h-5" />
              Забронировать беседку
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all"
            >
              Все услуги
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 sm:gap-10">
            {[
              { value: '10+', label: 'беседок' },
              { value: '15 км', label: 'от МКАД' },
              { value: '10:00–22:00', label: 'ежедневно' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && <div className="w-px h-8 bg-white/20 -ml-3 sm:-ml-5" />}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/30" />
      </div>
    </section>
  );
}
