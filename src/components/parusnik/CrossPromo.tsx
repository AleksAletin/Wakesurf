'use client';

import Image from 'next/image';
import { Waves, ArrowRight } from 'lucide-react';
import { SITES } from '@/lib/sites';

export default function CrossPromo() {
  const wake = SITES.wake;
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/wake-1.jpg"
            alt="Вейксёрф"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-800/70" />
          <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-cyan-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <Waves className="w-8 h-8 text-cyan-300" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-1">Хотите экстрима на воде?</h3>
              <p className="text-white/60">
                Вейксёрф и вейкборд на катерах Tige и Centurion — у наших друзей {wake.name}
              </p>
            </div>
            <a
              href={wake.url}
              target="_blank"
              className="inline-flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-all whitespace-nowrap"
            >
              {wake.name} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
