'use client';

import Image from 'next/image';
import { Camera } from 'lucide-react';
import { CONTACT } from '@/lib/data';

const photos = [
  { src: '/images/wake-6.jpg', alt: 'Вейксёрф — полёт над волной', span: 'col-span-2 row-span-2' },
  { src: '/images/sunset.jpg', alt: 'Закат на водохранилище', span: '' },
  { src: '/images/wake-8.jpg', alt: 'Райдер на волне', span: '' },
  { src: '/images/boat-3.jpg', alt: 'Nautique G25', span: 'col-span-2' },
  { src: '/images/wake-11.jpg', alt: 'В воздухе', span: '' },
  { src: '/images/people-1.jpg', alt: 'Команда PandaWake', span: '' },
  { src: '/images/wake-3.jpg', alt: 'Вейк на Клязьме', span: '' },
  { src: '/images/water-1.jpg', alt: 'Волна', span: '' },
  { src: '/images/wake-9.jpg', alt: 'Катера на воде', span: 'col-span-2' },
  { src: '/images/gazebo-3.jpg', alt: 'Беседка с видом', span: '' },
  { src: '/images/wake-10.jpg', alt: 'За катером', span: '' },
  { src: '/images/boat-1.jpg', alt: 'Марина', span: '' },
  { src: '/images/wake-5.jpg', alt: 'PandaWake crew', span: '' },
  { src: '/images/wake-12.jpg', alt: 'Вейксёрф экшн', span: 'col-span-2 row-span-2' },
  { src: '/images/club-1.jpg', alt: 'Территория клуба', span: '' },
  { src: '/images/wake-7.jpg', alt: 'Портрет райдера', span: '' },
];

export default function Gallery() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-sm font-semibold text-cyan-400 bg-cyan-950 px-4 py-1.5 rounded-full mb-4">
              Атмосфера
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Вайб на воде
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Закаты, волны, компания и драйв — так выглядит идеальный день
            </p>
          </div>
          <a
            href={CONTACT.instagram}
            target="_blank"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <Camera className="w-5 h-5" /> @panda.wake
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {photo.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
