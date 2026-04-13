'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TreePine, Fish, Sailboat, Anchor, ArrowRight, Clock, Users } from 'lucide-react';
import { GAZEBOS, formatPrice } from '@/lib/data';

const services = [
  {
    id: 'gazebos',
    title: 'Беседки',
    desc: `${GAZEBOS.length} беседок с мангалом, кухней и видом на воду. От компактных на 6 человек до больших на 20.`,
    image: '/images/gazebo-1.jpg',
    icon: TreePine,
    price: `от ${formatPrice(5000)}`,
    link: '/booking',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'fishing',
    title: 'Рыбалка',
    desc: 'Форелевый пруд с дневным и ночным тарифом. Снасти, подсачек и садок — обязательны.',
    image: '/images/club-1.jpg',
    icon: Fish,
    price: 'от 2 500 ₽',
    link: '/booking',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'tour',
    title: 'Прогулки на катере',
    desc: '30 минут по водохранилищу. Купание, пляжи, фотосессия. По выходным.',
    image: '/images/boat-1.jpg',
    icon: Sailboat,
    price: '6 000 ₽',
    link: '/booking',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'sup',
    title: 'SUP и катамараны',
    desc: 'SUP-борд — 1 000 ₽/час, катамаран — 500 ₽/30 мин. Тихая прогулка по воде.',
    image: '/images/pier.jpg',
    icon: Anchor,
    price: 'от 500 ₽',
    link: '/booking',
    color: 'bg-cyan-100 text-cyan-700',
  },
];

export default function ParusnikServices() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
            Чем заняться
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-900 mb-4">
            Услуги клуба
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Всё для отдыха на берегу и на воде — от шашлыков до рыбалки
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link key={svc.id} href={svc.link}>
                <div className="group flex gap-5 p-5 bg-white rounded-2xl border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${svc.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-stone-900">{svc.title}</h3>
                    </div>
                    <p className="text-sm text-stone-500 mb-2 line-clamp-2">{svc.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-700">{svc.price}</span>
                      <span className="flex items-center gap-1 text-xs text-stone-400 group-hover:text-emerald-600 transition-colors">
                        Подробнее <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
