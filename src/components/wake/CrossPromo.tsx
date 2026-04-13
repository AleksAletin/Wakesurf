'use client';

import Image from 'next/image';
import { TreePine, ArrowRight } from 'lucide-react';
import { SITES } from '@/lib/sites';

export default function WakeCrossPromo() {
  const parusnik = SITES.parusnik;
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/gazebo-3.jpg"
            alt="Беседка"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-stone-800/70" />
          <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-emerald-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <TreePine className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-1">Нужна беседка или рыбалка?</h3>
              <p className="text-white/60">
                Беседки с мангалом, рыбалка и катамараны — в яхт-клубе {parusnik.shortName}
              </p>
            </div>
            <a
              href={parusnik.url}
              target="_blank"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all whitespace-nowrap"
            >
              {parusnik.shortName} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
