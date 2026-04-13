import { create } from 'zustand';
import { ServiceCategory, SourceSite } from '@/types';

interface BookingState {
  step: number;
  category: ServiceCategory | null;
  serviceId: string | null;
  date: Date | null;
  timeSlot: string | null;
  boatId: string | null;
  guests: number;
  withInstructor: boolean;
  clientName: string;
  clientPhone: string;
  clientTelegram: string;
  notes: string;
  sourceSite: SourceSite;

  setStep: (step: number) => void;
  setCategory: (cat: ServiceCategory) => void;
  setService: (id: string) => void;
  setDate: (date: Date) => void;
  setTimeSlot: (time: string) => void;
  setBoat: (boatId: string) => void;
  setGuests: (n: number) => void;
  setWithInstructor: (v: boolean) => void;
  setClientInfo: (name: string, phone: string, telegram?: string) => void;
  setNotes: (notes: string) => void;
  setSourceSite: (site: SourceSite) => void;
  reset: () => void;
}

const initialState = {
  step: 0,
  category: null as ServiceCategory | null,
  serviceId: null as string | null,
  date: null as Date | null,
  timeSlot: null as string | null,
  boatId: null as string | null,
  guests: 1,
  withInstructor: false,
  clientName: '',
  clientPhone: '',
  clientTelegram: '',
  notes: '',
  sourceSite: 'pandawake' as SourceSite,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setCategory: (category) => set({ category, step: 1 }),
  setService: (serviceId) => set({ serviceId, step: 2 }),
  setDate: (date) => set({ date, step: 3 }),
  setTimeSlot: (timeSlot) => set({ timeSlot, step: 4 }),
  setBoat: (boatId) => set({ boatId }),
  setGuests: (guests) => set({ guests }),
  setWithInstructor: (withInstructor) => set({ withInstructor }),
  setClientInfo: (clientName, clientPhone, clientTelegram = '') =>
    set({ clientName, clientPhone, clientTelegram }),
  setNotes: (notes) => set({ notes }),
  setSourceSite: (sourceSite) => set({ sourceSite }),
  reset: () => set(initialState),
}));
