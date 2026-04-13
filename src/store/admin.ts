import { create } from 'zustand';
import { Booking, SourceSite } from '@/types';

// Helper to generate dates
const d = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

const today = d(0);
const tomorrow = d(1);
const dayAfter = d(2);
const yesterday = d(-1);
const twoDaysAgo = d(-2);

export const DEMO_BOOKINGS: Booking[] = [
  // === СЕГОДНЯ ===
  // Утренние вейк-сеты
  {
    id: '1', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Алексей Петров', clientPhone: '+7 (916) 123-45-67', clientTelegram: '@alexpetr',
    date: today, startTime: '09:00', endTime: '09:25', guests: 3, totalPrice: 5200,
    status: 'confirmed', withInstructor: true, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '2', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Мария Иванова', clientPhone: '+7 (903) 987-65-43',
    date: today, startTime: '09:30', endTime: '10:30', guests: 5, totalPrice: 10000,
    status: 'confirmed', withInstructor: false, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '3', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Дмитрий Козлов', clientPhone: '+7 (925) 555-12-34', clientTelegram: '@dkozlov',
    date: today, startTime: '10:30', endTime: '10:55', guests: 2, totalPrice: 5200,
    status: 'pending', withInstructor: true, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '4', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Кирилл Волков', clientPhone: '+7 (916) 888-99-00',
    date: today, startTime: '11:00', endTime: '12:00', guests: 4, totalPrice: 10000,
    status: 'confirmed', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '5', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Анастасия Лебедева', clientPhone: '+7 (977) 111-22-33',
    date: today, startTime: '12:00', endTime: '12:25', guests: 2, totalPrice: 5200,
    status: 'confirmed', withInstructor: true, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  // Дневные
  {
    id: '6', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Павел Сидоров', clientPhone: '+7 (926) 444-55-66', clientTelegram: '@psidorov',
    date: today, startTime: '14:00', endTime: '15:00', guests: 6, totalPrice: 10000,
    status: 'confirmed', withInstructor: false, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '7', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Ольга Морозова', clientPhone: '+7 (905) 666-77-88',
    date: today, startTime: '15:00', endTime: '15:25', guests: 2, totalPrice: 5200,
    status: 'pending', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  // Беседки сегодня
  {
    id: '8', serviceId: 'gazebo-3', serviceName: 'Беседка №3', category: 'gazebo',
    clientName: 'Сергей Николаев', clientPhone: '+7 (916) 777-88-99',
    date: today, startTime: '10:00', endTime: '22:00', guests: 15, totalPrice: 18000,
    status: 'confirmed', withInstructor: false, gazeboId: 'gazebo-3',
    notes: 'День рождения Андрея, торт привезут к 14:00', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  {
    id: '9', serviceId: 'gazebo-5', serviceName: 'Беседка №5', category: 'gazebo',
    clientName: 'Екатерина Смирнова', clientPhone: '+7 (903) 222-33-44', clientTelegram: '@katesmirn',
    date: today, startTime: '10:00', endTime: '22:00', guests: 10, totalPrice: 16000,
    status: 'confirmed', withInstructor: false, gazeboId: 'gazebo-5',
    notes: 'Корпоратив, нужен мангал и дрова', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  {
    id: '10', serviceId: 'gazebo-1', serviceName: 'Беседка №1', category: 'gazebo',
    clientName: 'Игорь Белов', clientPhone: '+7 (926) 333-44-55',
    date: today, startTime: '10:00', endTime: '22:00', guests: 8, totalPrice: 12000,
    status: 'confirmed', withInstructor: false, gazeboId: 'gazebo-1', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  // SUP сегодня
  {
    id: '11', serviceId: 'sup', serviceName: 'SUP-борд', category: 'sup',
    clientName: 'Виктория Попова', clientPhone: '+7 (915) 999-88-77',
    date: today, startTime: '16:00', endTime: '17:00', guests: 2, totalPrice: 1000,
    status: 'confirmed', withInstructor: false, sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },

  // === ЗАВТРА ===
  {
    id: '12', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Елена Смирнова', clientPhone: '+7 (977) 333-44-55', clientTelegram: '@elenasm',
    date: tomorrow, startTime: '09:00', endTime: '10:00', guests: 4, totalPrice: 9000,
    status: 'confirmed', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '13', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Анна Волкова', clientPhone: '+7 (905) 222-33-44',
    date: tomorrow, startTime: '10:00', endTime: '10:25', guests: 2, totalPrice: 4700,
    status: 'pending', withInstructor: true, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '14', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Максим Тихонов', clientPhone: '+7 (916) 555-66-77',
    date: tomorrow, startTime: '11:00', endTime: '12:00', guests: 7, totalPrice: 9000,
    status: 'confirmed', withInstructor: true, boatId: 'tige-24v',
    notes: 'Мальчишник! Все новички, нужен терпеливый инструктор', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '15', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Софья Кузнецова', clientPhone: '+7 (903) 111-22-33',
    date: tomorrow, startTime: '14:00', endTime: '14:25', guests: 3, totalPrice: 4700,
    status: 'confirmed', withInstructor: true, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  // Беседки завтра
  {
    id: '16', serviceId: 'gazebo-7', serviceName: 'Беседка №7', category: 'gazebo',
    clientName: 'Ольга Кузнецова', clientPhone: '+7 (903) 111-22-33',
    date: tomorrow, startTime: '10:00', endTime: '22:00', guests: 18, totalPrice: 16000,
    status: 'confirmed', withInstructor: false, gazeboId: 'gazebo-7',
    notes: 'Семейный праздник, дети 5+, нужна волейбольная площадка', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  {
    id: '17', serviceId: 'gazebo-10', serviceName: 'Беседка №10', category: 'gazebo',
    clientName: 'Артём Соколов', clientPhone: '+7 (926) 888-99-11',
    date: tomorrow, startTime: '10:00', endTime: '22:00', guests: 4, totalPrice: 5000,
    status: 'pending', withInstructor: false, gazeboId: 'gazebo-10', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  // Прогулка завтра
  {
    id: '18', serviceId: 'boat-tour', serviceName: 'Прогулка на катере', category: 'tour',
    clientName: 'Наталья Федорова', clientPhone: '+7 (977) 222-33-44',
    date: tomorrow, startTime: '17:00', endTime: '17:30', guests: 6, totalPrice: 6000,
    status: 'confirmed', withInstructor: false, sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },

  // === ПОСЛЕЗАВТРА ===
  {
    id: '19', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Денис Орлов', clientPhone: '+7 (916) 444-55-66', clientTelegram: '@denisorl',
    date: dayAfter, startTime: '10:00', endTime: '11:00', guests: 5, totalPrice: 10000,
    status: 'confirmed', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '20', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Ирина Новикова', clientPhone: '+7 (905) 777-88-99',
    date: dayAfter, startTime: '11:00', endTime: '11:25', guests: 2, totalPrice: 5200,
    status: 'pending', withInstructor: true, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '21', serviceId: 'gazebo-4', serviceName: 'Беседка №4', category: 'gazebo',
    clientName: 'Роман Егоров', clientPhone: '+7 (926) 111-00-22',
    date: dayAfter, startTime: '10:00', endTime: '22:00', guests: 20, totalPrice: 18000,
    status: 'confirmed', withInstructor: false, gazeboId: 'gazebo-4',
    notes: 'Корпоратив IT-компании, 20 чел, волейбол + вейк', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },

  // === ВЧЕРА (завершённые) ===
  {
    id: '22', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Алексей Петров', clientPhone: '+7 (916) 123-45-67',
    date: yesterday, startTime: '10:00', endTime: '10:25', guests: 2, totalPrice: 4700,
    status: 'completed', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '23', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Павел Сидоров', clientPhone: '+7 (926) 444-55-66',
    date: yesterday, startTime: '11:00', endTime: '12:00', guests: 4, totalPrice: 9000,
    status: 'completed', withInstructor: true, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '24', serviceId: 'gazebo-6', serviceName: 'Беседка №6', category: 'gazebo',
    clientName: 'Татьяна Зайцева', clientPhone: '+7 (903) 555-66-77',
    date: yesterday, startTime: '10:00', endTime: '22:00', guests: 12, totalPrice: 14000,
    status: 'completed', withInstructor: false, gazeboId: 'gazebo-6', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  {
    id: '25', serviceId: 'sup', serviceName: 'SUP-борд', category: 'sup',
    clientName: 'Мария Иванова', clientPhone: '+7 (903) 987-65-43',
    date: yesterday, startTime: '15:00', endTime: '16:00', guests: 2, totalPrice: 1000,
    status: 'completed', withInstructor: false, sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },

  // === 2 ДНЯ НАЗАД (завершённые) ===
  {
    id: '26', serviceId: 'wake-60', serviceName: 'Вейксёрф 60 мин', category: 'wakesurf',
    clientName: 'Кирилл Волков', clientPhone: '+7 (916) 888-99-00',
    date: twoDaysAgo, startTime: '09:00', endTime: '10:00', guests: 3, totalPrice: 9000,
    status: 'completed', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '27', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Виктория Попова', clientPhone: '+7 (915) 999-88-77',
    date: twoDaysAgo, startTime: '11:00', endTime: '11:25', guests: 2, totalPrice: 4700,
    status: 'completed', withInstructor: true, boatId: 'centurion-c4', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '28', serviceId: 'gazebo-2', serviceName: 'Беседка №2', category: 'gazebo',
    clientName: 'Дмитрий Козлов', clientPhone: '+7 (925) 555-12-34',
    date: twoDaysAgo, startTime: '10:00', endTime: '22:00', guests: 10, totalPrice: 10000,
    status: 'completed', withInstructor: false, gazeboId: 'gazebo-2',
    notes: 'Рыбалка + шашлыки', sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
  {
    id: '29', serviceId: 'wake-25', serviceName: 'Вейксёрф 25 мин', category: 'wakesurf',
    clientName: 'Анастасия Лебедева', clientPhone: '+7 (977) 111-22-33',
    date: twoDaysAgo, startTime: '14:00', endTime: '14:25', guests: 2, totalPrice: 4700,
    status: 'completed', withInstructor: false, boatId: 'tige-24v', sourceSite: 'pandawake', createdAt: new Date().toISOString(),
  },
  {
    id: '30', serviceId: 'boat-tour', serviceName: 'Прогулка на катере', category: 'tour',
    clientName: 'Игорь Белов', clientPhone: '+7 (926) 333-44-55',
    date: twoDaysAgo, startTime: '17:00', endTime: '17:30', guests: 7, totalPrice: 6000,
    status: 'completed', withInstructor: false, sourceSite: 'parusnik', createdAt: new Date().toISOString(),
  },
];

interface AdminState {
  bookings: Booking[];
  selectedDate: string;
  sourceFilter: 'all' | SourceSite;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  setSelectedDate: (date: string) => void;
  setSourceFilter: (filter: 'all' | SourceSite) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  bookings: DEMO_BOOKINGS,
  selectedDate: today,
  sourceFilter: 'all',
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBookingStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    })),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setSourceFilter: (sourceFilter) => set({ sourceFilter }),
}));
