export type ServiceCategory = 'wakesurf' | 'gazebo' | 'sup' | 'tour' | 'fishing' | 'catamaran';
export type SiteAffiliation = 'wake' | 'parusnik' | 'both';
export type SourceSite = 'pandawake' | 'parusnik';

export interface Boat {
  id: string;
  name: string;
  capacity: number;
  description: string;
  image?: string;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  durationMinutes: number;
  weekdayPrice: number;
  weekendPrice: number;
  capacity: number;
  boatId?: string;
  image?: string;
}

export interface Gazebo {
  id: string;
  number: number;
  capacity: number;
  weekdayPrice: number;
  weekendPrice: number;
  description: string;
  features: string[];
  image?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // HH:mm
  endTime: string;
  available: boolean;
  boatId?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  clientName: string;
  clientPhone: string;
  clientTelegram?: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  withInstructor: boolean;
  boatId?: string;
  gazeboId?: string;
  notes?: string;
  sourceSite: SourceSite;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  telegram?: string;
  email?: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit?: string;
  notes?: string;
}

export interface DaySchedule {
  date: string;
  bookings: Booking[];
  weather?: {
    temp: number;
    condition: string;
    windSpeed: number;
    icon: string;
  };
}
