'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Users, Check } from 'lucide-react';
import { GAZEBOS, formatPrice } from '@/lib/data';

const gazeboImages: Record<string, string> = {
  'gazebo-1': '/images/gazebo-1.jpg',
  'gazebo-2': '/images/gazebo-2.jpg',
  'gazebo-3': '/images/gazebo-3.jpg',
  'gazebo-4': '/images/gazebo-4.jpg',
  'gazebo-5': '/images/gazebo-1.jpg',
  'gazebo-6': '/images/gazebo-2.jpg',
  'gazebo-7': '/images/gazebo-3.jpg',
  'gazebo-10': '/images/gazebo-4.jpg',
  'gazebo-11': '/images/gazebo-1.jpg',
  'gazebo-12': '/images/gazebo-2.jpg',
};

export default function GazeboGrid() {
  return (
    <section id="gazebos" className="py-24 px-4 sm:px-6 bg-stone-100/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
            Беседки
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-900 mb-4">
            Выберите свою беседку
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            {GAZEBOS.length} беседок разного размера — от уютных на 6 до просторных на 20 человек
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GAZEBOS.map((gazebo) => (
            <Link key={gazebo.id} href={`/booking?gazebo=${gazebo.id}`}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={gazeboImages[gazebo.id] || '/images/gazebo-1.jpg'}
                    alt={`Беседка №${gazebo.number}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-white text-stone-900 text-sm font-bold px-3 py-1 rounded-full shadow">
                      №{gazebo.number}
                    </span>
                    <span className="bg-white/90 text-stone-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" /> до {gazebo.capacity}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-stone-500 mb-3">{gazebo.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {gazebo.features.slice(0, 3).map((f) => (
                      <span key={f} className="inline-flex items-center gap-0.5 text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                        <Check className="w-2.5 h-2.5" />
                        {f}
                      </span>
                    ))}
                    {gazebo.features.length > 3 && (
                      <span className="text-[11px] text-stone-400 px-1">+{gazebo.features.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-stone-100">
                    <div>
                      <span className="text-lg font-bold text-stone-900">{formatPrice(gazebo.weekdayPrice)}</span>
                      <span className="text-xs text-stone-400 ml-1">будни</span>
                    </div>
                    {gazebo.weekendPrice !== gazebo.weekdayPrice && (
                      <span className="text-sm font-semibold text-emerald-700">{formatPrice(gazebo.weekendPrice)} вых</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
