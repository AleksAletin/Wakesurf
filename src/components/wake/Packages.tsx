'use client';

import Link from 'next/link';
import { Gift, Briefcase, Cake, Sparkles, ArrowRight } from 'lucide-react';

const packages = [
  {
    icon: Cake,
    title: 'День рождения на воде',
    description: 'Беседка + 2 часа вейксёрфа + инструктор.',
    tag: '-15%',
    color: 'from-pink-500 to-rose-500',
    price: 'от 25 000 ₽',
  },
  {
    icon: Briefcase,
    title: 'Корпоратив',
    description: 'Большая беседка + катер на день + SUP.',
    tag: 'хит',
    color: 'from-violet-500 to-indigo-500',
    price: 'от 45 000 ₽',
  },
  {
    icon: Gift,
    title: 'Подарочный сертификат',
    description: 'На любую сумму. Доставка в Telegram за 5 минут.',
    tag: 'new',
    color: 'from-amber-500 to-orange-500',
    price: 'от 4 700 ₽',
  },
];

export default function Packages() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
            Спецпредложения
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Готовые пакеты
          </h2>
          <p className="text-gray-500 text-lg">Для особых событий и компаний</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <Link key={pkg.title} href="/booking">
                <div className="group relative rounded-3xl p-6 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pkg.color} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity`} />

                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`bg-gradient-to-r ${pkg.color} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                      {pkg.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-gray-900">{pkg.price}</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-gray-400 group-hover:text-cyan-600 transition-colors">
                      Подробнее <ArrowRight className="w-4 h-4" />
                    </span>
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
