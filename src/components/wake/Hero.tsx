'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Waves, MapPin, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Яхт-клуб Парусник на Клязьминском водохранилище"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/90">Клязьминское водохранилище</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-4 tracking-tight">
            Поймай<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">свою волну</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
            Вейксёрф и вейкборд на катерах Tige и Centurion.
            Беседки с мангалом прямо на берегу.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Waves className="w-5 h-5 group-hover:animate-pulse" />
              Забронировать
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all"
            >
              Узнать больше
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 sm:gap-10">
            {[
              { value: '7+', label: 'лет опыта' },
              { value: '2', label: 'катера' },
              { value: '10+', label: 'беседок' },
              { value: '1000+', label: 'клиентов' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && <div className="w-px h-8 bg-white/20 -ml-3 sm:-ml-5" />}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}
