'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-white font-black text-lg">P</span>
            </div>
            <span className={`font-black text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              PandaWake
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '#services', label: 'Услуги' },
              { href: '#gazebos', label: 'Беседки' },
              { href: '#about', label: 'Галерея' },
              { href: '#contacts', label: 'Контакты' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/70 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
            <Link
              href="/booking"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Забронировать
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 ${scrolled ? 'text-gray-600' : 'text-white'}`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-1">
          {[
            { href: '#services', label: 'Услуги' },
            { href: '#gazebos', label: 'Беседки' },
            { href: '#about', label: 'Галерея' },
            { href: '#contacts', label: 'Контакты' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 font-medium py-2.5 px-3 rounded-xl hover:bg-gray-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 text-cyan-600 font-medium py-2.5 px-3"
          >
            <Phone className="w-4 h-4" /> {CONTACT.phone}
          </a>
        </div>
      )}
    </header>
  );
}
