'use client';

import { Waves, TreePine, Sailboat } from 'lucide-react';
import Card from '@/components/ui/Card';
import { useBookingStore } from '@/store/booking';
import { ServiceCategory } from '@/types';

const categories: { id: ServiceCategory; label: string; desc: string; icon: typeof Waves; color: string }[] = [
  {
    id: 'wakesurf',
    label: 'Вейксёрф / Вейкборд',
    desc: 'Катер + волна + драйв. От 25 минут.',
    icon: Waves,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'gazebo',
    label: 'Беседка',
    desc: 'Мангал, кухня, вид на воду. На весь день.',
    icon: TreePine,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'sup',
    label: 'SUP / Прогулка',
    desc: 'SUP-борд или прогулка на катере.',
    icon: Sailboat,
    color: 'bg-cyan-100 text-cyan-600',
  },
];

export default function StepCategory() {
  const { setCategory } = useBookingStore();

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Что хотите забронировать?</h2>
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Card key={cat.id} onClick={() => setCategory(cat.id)} hoverable className="p-5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{cat.label}</div>
                <div className="text-sm text-gray-500">{cat.desc}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
