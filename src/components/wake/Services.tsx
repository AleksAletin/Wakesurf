'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Waves, Sailboat, ArrowRight, Clock, Users } from 'lucide-react';
import { SERVICES, formatPrice } from '@/lib/data';

const serviceCards = [
  {
    service: 'wake-25',
    title: 'Вейксёрф 25 мин',
    desc: 'Идеальный сет для первого знакомства с волной или быстрого заряда адреналина.',
    image: '/images/wake-6.jpg',
    icon: Waves,
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    service: 'wake-60',
    title: 'Вейксёрф 60 мин',
    desc: 'Полный час на воде от причала до причала. Максимум волны и кайфа.',
    image: '/images/wake-11.jpg',
    icon: Waves,
    gradient: 'from-violet-600 to-blue-500',
  },
  {
    service: 'sup',
    title: 'SUP-борд',
    desc: 'Спокойная прогулка по водохранилищу. Закат на воде — бесценно.',
    image: '/images/water-1.jpg',
    icon: Sailboat,
    gradient: 'from-emerald-600 to-teal-500',
  },
  {
    service: 'boat-tour',
    title: 'Прогулка на катере',
    desc: 'Купание, пляжи, фото на воде. 30 минут чистого удовольствия.',
    image: '/images/boat-3.jpg',
    icon: Sailboat,
    gradient: 'from-orange-500 to-amber-500',
  },
];

const actionPhotos = [
  { src: '/images/wake-8.jpg', alt: 'Райдер' },
  { src: '/images/wake-10.jpg', alt: 'За катером' },
  { src: '/images/wake-13.jpg', alt: 'На волне' },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-cyan-600 bg-cyan-50 px-4 py-1.5 rounded-full mb-4">
            Услуги
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            На воде и на берегу
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Выбери своё приключение — от экстрима на волне до тихой прогулки на SUP
          </p>
        </div>

        {/* Main service cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {serviceCards.map((card) => {
            const service = SERVICES.find((s) => s.id === card.service);
            if (!service) return null;
            const Icon = card.icon;

            return (
              <Link key={card.service} href={`/booking?service=${card.service}`}>
                <div className="group relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden cursor-pointer">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className="absolute top-4 right-4">
                    <div className={`bg-gradient-to-r ${card.gradient} px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg`}>
                      от {formatPrice(service.weekdayPrice)}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm mb-3">{card.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{service.durationMinutes} мин</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />до {service.capacity} чел</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        Забронировать <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action photo strip */}
        <div className="grid grid-cols-3 gap-4">
          {actionPhotos.map((photo) => (
            <div key={photo.src} className="relative h-[160px] sm:h-[200px] rounded-2xl overflow-hidden group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
