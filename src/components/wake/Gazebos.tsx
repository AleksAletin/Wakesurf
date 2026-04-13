'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function Gazebos() {
  const featured = GAZEBOS.filter((g) => [1, 3, 5, 6].includes(g.number));

  return (
    <section id="gazebos" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
              Беседки
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
              Отдых на берегу
            </h2>
            <p className="text-gray-500 text-lg max-w-md">
              10 беседок с мангалом, кухней и видом на воду. С 10:00 до 22:00.
            </p>
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            Все беседки <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((gazebo) => (
            <Link key={gazebo.id} href={`/booking?gazebo=${gazebo.id}`}>
              <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={gazeboImages[gazebo.id] || '/images/gazebo-1.jpg'}
                    alt={`Беседка №${gazebo.number}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">
                      №{gazebo.number}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" /> до {gazebo.capacity}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{gazebo.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {gazebo.features.slice(0, 3).map((f) => (
                      <span key={f} className="inline-flex items-center gap-0.5 text-[11px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md">
                        <Check className="w-2.5 h-2.5 text-emerald-500" />
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{formatPrice(gazebo.weekdayPrice)}</span>
                      <span className="text-xs text-gray-400 ml-1">будни</span>
                    </div>
                    {gazebo.weekendPrice !== gazebo.weekdayPrice && (
                      <span className="text-xs text-gray-400">{formatPrice(gazebo.weekendPrice)} вых</span>
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
