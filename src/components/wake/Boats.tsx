'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Anchor, Users, Gauge, ArrowRight } from 'lucide-react';

const boats = [
  {
    name: 'Tige 24v',
    desc: 'Премиальный катер для вейксёрфинга. Идеальная волна, плавный ход, мощный балласт.',
    capacity: 7,
    image: '/images/boat-3.jpg',
    photos: ['/images/wake-6.jpg', '/images/wake-9.jpg'],
    features: ['Идеальная волна', 'Балластная система', 'Башня для вейкборда'],
  },
  {
    name: 'Centurion Avalanche C4',
    desc: 'Мощный и управляемый. Отличная волна для вейксёрфа и вейкборда любого уровня.',
    capacity: 7,
    image: '/images/boat-4.jpg',
    photos: ['/images/wake-11.jpg', '/images/wake-10.jpg'],
    features: ['Мощный двигатель', 'Регулируемая волна', 'Аудиосистема'],
  },
];

export default function Boats() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-cyan-400 bg-cyan-950 px-4 py-1.5 rounded-full mb-4">
            Флот
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Наши катера
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Два профессиональных катера для вейксёрфинга — твоя волна ждёт
          </p>
        </div>

        <div className="space-y-12">
          {boats.map((boat, idx) => (
            <div
              key={boat.name}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 items-stretch`}
            >
              {/* Main photo */}
              <div className="relative lg:w-1/2 h-[300px] sm:h-[400px] rounded-3xl overflow-hidden group">
                <Image
                  src={boat.image}
                  alt={boat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-black text-white mb-1">{boat.name}</h3>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {boat.capacity} мест</span>
                    <span className="flex items-center gap-1"><Gauge className="w-4 h-4" /> Про-уровень</span>
                  </div>
                </div>
              </div>

              {/* Info + small photos */}
              <div className="lg:w-1/2 flex flex-col gap-4">
                <div className="bg-gray-900 rounded-3xl p-6 flex-1">
                  <p className="text-gray-300 text-lg mb-5 leading-relaxed">{boat.desc}</p>
                  <div className="space-y-2 mb-6">
                    {boat.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                        <Anchor className="w-4 h-4 text-cyan-500" /> {f}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                  >
                    Забронировать <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {boat.photos.map((src) => (
                    <div key={src} className="relative h-[140px] sm:h-[170px] rounded-2xl overflow-hidden group">
                      <Image
                        src={src}
                        alt={boat.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
