import { Boat, Service, Gazebo } from '@/types';

export const BOATS: Boat[] = [
  {
    id: 'tige-24v',
    name: 'Tige 24v',
    capacity: 7,
    description: 'Премиальный катер для вейксёрфинга. Идеальная волна для райдеров любого уровня.',
  },
  {
    id: 'centurion-c4',
    name: 'Centurion Avalanche C4',
    capacity: 7,
    description: 'Мощный катер для вейкбординга и вейксёрфинга. Отличная волна и управляемость.',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'wake-25',
    category: 'wakesurf',
    name: 'Вейксёрф / Вейкборд 25 мин',
    description: 'Сет 25 минут на воде. Идеально для начинающих и продвинутых.',
    durationMinutes: 25,
    weekdayPrice: 4700,
    weekendPrice: 5200,
    capacity: 7,
  },
  {
    id: 'wake-60',
    category: 'wakesurf',
    name: 'Вейксёрф / Вейкборд 60 мин',
    description: '60 минут от причала до причала. Максимум времени на воде.',
    durationMinutes: 60,
    weekdayPrice: 9000,
    weekendPrice: 10000,
    capacity: 7,
  },
  {
    id: 'sup',
    category: 'sup',
    name: 'SUP-борд',
    description: 'Аренда SUP-борда на 1 час. Спокойная прогулка по водохранилищу.',
    durationMinutes: 60,
    weekdayPrice: 1000,
    weekendPrice: 1000,
    capacity: 1,
  },
  {
    id: 'boat-tour',
    category: 'tour',
    name: 'Прогулка на катере',
    description: '30 минут на катере. Купание, пляжи, фотосессия на воде.',
    durationMinutes: 30,
    weekdayPrice: 6000,
    weekendPrice: 6000,
    capacity: 7,
  },
];

export const GAZEBOS: Gazebo[] = [
  {
    id: 'gazebo-1',
    number: 1,
    capacity: 12,
    weekdayPrice: 10000,
    weekendPrice: 12000,
    description: 'Уютная круглогодичная беседка в 15 метрах от берега',
    features: ['Мангал под навесом', 'Холодильник', 'Чайник', 'Кондиционер', 'Туалет'],
  },
  {
    id: 'gazebo-2',
    number: 2,
    capacity: 12,
    weekdayPrice: 10000,
    weekendPrice: 12000,
    description: 'Рядом с рыболовным прудом, уютная зона отдыха',
    features: ['Мангал', 'Холодильник', 'Кондиционер', 'Туалет'],
  },
  {
    id: 'gazebo-3',
    number: 3,
    capacity: 20,
    weekdayPrice: 16000,
    weekendPrice: 18000,
    description: 'Просторная беседка с кухонной зоной и ТВ',
    features: ['Кухня с раковиной', 'ТВ', 'Кондиционер', 'Диван', 'Мангал под навесом'],
  },
  {
    id: 'gazebo-4',
    number: 4,
    capacity: 20,
    weekdayPrice: 16000,
    weekendPrice: 18000,
    description: 'Большая беседка рядом с волейбольной площадкой',
    features: ['Кухня', 'Кондиционер', 'Волейбольная площадка', 'Мангал'],
  },
  {
    id: 'gazebo-5',
    number: 5,
    capacity: 15,
    weekdayPrice: 14000,
    weekendPrice: 16000,
    description: 'На причале с видом на воду, качели-диван',
    features: ['Вид на воду', 'Качели-диван', 'Летняя кухня', 'Мангал'],
  },
  {
    id: 'gazebo-6',
    number: 6,
    capacity: 15,
    weekdayPrice: 14000,
    weekendPrice: 16000,
    description: 'Круглогодичная на причале с баром и полной кухней',
    features: ['Барная стойка', 'Полная кухня', 'Платформы на воде', 'Мангал'],
  },
  {
    id: 'gazebo-7',
    number: 7,
    capacity: 20,
    weekdayPrice: 14000,
    weekendPrice: 16000,
    description: 'Просторная у воды, рядом детская и волейбольная площадки',
    features: ['Кухня', 'Детская площадка рядом', 'Волейбол', 'Мангал'],
  },
  {
    id: 'gazebo-10',
    number: 10,
    capacity: 6,
    weekdayPrice: 5000,
    weekendPrice: 5000,
    description: 'Компактная беседка для небольшой компании',
    features: ['Мангал', 'Летняя'],
  },
  {
    id: 'gazebo-11',
    number: 11,
    capacity: 6,
    weekdayPrice: 5000,
    weekendPrice: 5000,
    description: 'Компактная беседка для небольшой компании',
    features: ['Мангал', 'Летняя'],
  },
  {
    id: 'gazebo-12',
    number: 12,
    capacity: 6,
    weekdayPrice: 5000,
    weekendPrice: 5000,
    description: 'Компактная беседка для небольшой компании',
    features: ['Мангал', 'Летняя'],
  },
];

export const INSTRUCTOR_PRICES = {
  '25min': 1000,
  '60min': 2000,
};

export const WORKING_HOURS = {
  wake: { start: 7, end: 21 },
  gazebo: { start: 10, end: 22 },
  general: { start: 10, end: 22 },
};

export const CONTACT = {
  phone: '+7 (980) 184-07-00',
  phoneClub: '+7 (915) 488-81-21',
  whatsapp: 'https://wa.me/79801840700',
  telegram: 'https://t.me/pandawake',
  instagram: 'https://www.instagram.com/panda.wake/',
  vk: 'https://vk.com/pandawake',
  address: 'д. Семкино, 28, г.о. Мытищи, Московская обл.',
  mapUrl: 'https://yandex.ru/maps/-/CDx1rU',
};

export function getPrice(service: Service | Gazebo, date: Date): number {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  return isWeekend ? service.weekendPrice : service.weekdayPrice;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
