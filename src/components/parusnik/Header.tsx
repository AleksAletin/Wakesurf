'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Anchor } from 'lucide-react';
import { SITES } from '@/lib/sites';

const site = SITES.parusnik;

export default function ParusnikHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#services', label: 'Услуги' },
    { href: '#gazebos', label: 'Беседки' },
    { href: '#about', label: 'О клубе' },
    { href: '#contacts', label: 'Контакты' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200/50 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center shadow-lg">
              <Anchor className="w-5 h-5 text-amber-200" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight transition-colors ${
                scrolled ? 'text-emerald-900' : 'text-white'
              }`}>
                Парусник
              </span>
              <span className={`text-[10px] uppercase tracking-widest transition-colors ${
                scrolled ? 'text-stone-400' : 'text-white/50'
              }`}>
                яхт-клуб
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-stone-600 hover:text-emerald-800' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-stone-600 hover:text-emerald-700' : 'text-white/70 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
            <Link
              href="/booking"
              className="bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all hover:shadow-lg"
            >
              Забронировать
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 ${scrolled ? 'text-stone-600' : 'text-white'}`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 px-4 py-4 space-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-700 font-medium py-2.5 px-3 rounded-xl hover:bg-stone-50"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
