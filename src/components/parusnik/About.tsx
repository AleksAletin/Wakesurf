'use client';

import Image from 'next/image';
import { MapPin, Clock, Car, TreePine, Fish, Waves } from 'lucide-react';

const features = [
  { icon: TreePine, title: 'Беседки', desc: '10 беседок с мангалом и кухней' },
  { icon: Fish, title: 'Рыбалка', desc: 'Форелевый пруд с дневным тарифом' },
  { icon: Waves, title: 'Вода', desc: 'Катера, SUP, катамараны' },
  { icon: Car, title: 'Парковка', desc: 'Охраняемая, 150 ₽' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
              О клубе
            </span>
            <h2 className="text-4xl font-black text-stone-900 mb-6">
              Яхт-клуб Парусник
            </h2>
            <p className="text-stone-600 text-lg mb-4 leading-relaxed">
              Уютная территория на правом берегу Клязьминского водохранилища,
              всего в 15 км от МКАД по Дмитровскому шоссе.
            </p>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Беседки на любой вкус — от компактных для двоих до больших для компании из 20 человек.
              Мангалы, кухни, вид на воду. Детские площадки, волейбол, рыбалка.
              Работаем ежедневно с 10:00 до 22:00.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                    <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">{f.title}</div>
                      <div className="text-xs text-stone-500">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                д. Семкино, 28
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                10:00 — 22:00
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <Image src="/images/club-1.jpg" alt="Территория клуба" fill className="object-cover" />
            </div>
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <Image src="/images/gazebo-3.jpg" alt="Беседка" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <Image src="/images/sunset.jpg" alt="Закат" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
