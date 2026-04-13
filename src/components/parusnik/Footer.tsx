'use client';

import { Phone, MapPin, Clock, Send, MessageCircle, Anchor, Camera, Waves } from 'lucide-react';
import { SITES } from '@/lib/sites';
import { CONTACT } from '@/lib/data';

const site = SITES.parusnik;
const wake = SITES.wake;

export default function ParusnikFooter() {
  return (
    <footer id="contacts" className="bg-stone-900 text-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-emerald-700 rounded-full flex items-center justify-center">
                <Anchor className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight">Парусник</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">яхт-клуб</span>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Беседки, рыбалка и отдых на Клязьминском водохранилище.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-stone-300">Контакты</h3>
            <div className="space-y-3">
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2.5 text-stone-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 text-emerald-500" /> {site.phone}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" className="flex items-center gap-2.5 text-stone-400 hover:text-green-400 transition-colors text-sm">
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-stone-300">Где мы</h3>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                {CONTACT.address}
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-emerald-500" />
                <div>Ежедневно 10:00 — 22:00</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-stone-300">Партнёры</h3>
            <a
              href={wake.url}
              target="_blank"
              className="flex items-center gap-3 p-3 bg-stone-800 rounded-xl hover:bg-stone-700 transition-colors"
            >
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Waves className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{wake.name}</div>
                <div className="text-xs text-stone-500">Вейксёрф на Клязьме</div>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800/50 text-center text-stone-600 text-sm">
          Яхт-клуб Парусник {new Date().getFullYear()}. Клязьминское водохранилище.
        </div>
      </div>
    </footer>
  );
}
