'use client';

import Image from 'next/image';

const photos = [
  { src: '/images/club-1.jpg', alt: 'Территория клуба', span: 'col-span-2 row-span-2' },
  { src: '/images/gazebo-1.jpg', alt: 'Беседка на берегу', span: '' },
  { src: '/images/sunset.jpg', alt: 'Закат на воде', span: '' },
  { src: '/images/gazebo-4.jpg', alt: 'Уютный интерьер', span: '' },
  { src: '/images/pier.jpg', alt: 'Причал', span: '' },
  { src: '/images/boat-1.jpg', alt: 'Марина', span: 'col-span-2' },
  { src: '/images/gazebo-2.jpg', alt: 'Вид с причала', span: '' },
  { src: '/images/gazebo-3.jpg', alt: 'Терраса', span: '' },
  { src: '/images/club-2.jpg', alt: 'Клуб Парусник', span: '' },
  { src: '/images/water-1.jpg', alt: 'Водная гладь', span: '' },
];

export default function ParusnikGallery() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-emerald-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-amber-300 bg-amber-900/30 px-4 py-1.5 rounded-full mb-4">
            Фотогалерея
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Атмосфера Парусника
          </h2>
          <p className="text-emerald-300/60 text-lg max-w-md mx-auto">
            Природа, закаты и тёплые вечера на берегу
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
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
