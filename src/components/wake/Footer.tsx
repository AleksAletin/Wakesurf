'use client';

import { Phone, MapPin, Clock, Send, MessageCircle, Camera } from 'lucide-react';
import { CONTACT } from '@/lib/data';

export default function Footer() {
  return (
    <footer id="contacts" className="bg-gray-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">P</span>
              </div>
              <span className="font-black text-xl">PandaWake</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Вейксёрф, вейкборд и отдых на Клязьминском водохранилище.
              Яхт-клуб Парусник.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Контакты</h3>
            <div className="space-y-3">
              <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 text-cyan-500" /> {CONTACT.phone}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" className="flex items-center gap-2.5 text-gray-400 hover:text-green-400 transition-colors text-sm">
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
              </a>
              <a href={CONTACT.telegram} target="_blank" className="flex items-center gap-2.5 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                <Send className="w-4 h-4 text-blue-500" /> Telegram
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Где мы</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-500" />
                <span>{CONTACT.address}</span>
              </div>
              <div className="flex items-start gap-2.5 text-gray-400 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-cyan-500" />
                <div>
                  <div>Вейк: 7:00 — закат</div>
                  <div>Клуб: 10:00 — 22:00</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Соцсети</h3>
            <div className="flex gap-3">
              <a href={CONTACT.instagram} target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all">
                <Camera className="w-5 h-5" />
              </a>
              <a href={CONTACT.telegram} target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href={CONTACT.whatsapp} target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-xl flex items-center justify-center transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-600 text-sm">
          PandaWake {new Date().getFullYear()}. Яхт-клуб Парусник, Клязьминское водохранилище.
        </div>
      </div>
    </footer>
  );
}
