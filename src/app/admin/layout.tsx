'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Wallet } from 'lucide-react';
import { ReactNode } from 'react';

const navItems = [
  { label: 'Дашборд', icon: LayoutDashboard, href: '/admin' },
  { label: 'Расписание', icon: Calendar, href: '/admin/schedule' },
  { label: 'Брони', icon: Calendar, href: '/admin/bookings' },
  { label: 'Клиенты', icon: Users, href: '/admin/clients' },
  { label: 'Финансы', icon: Wallet, href: '/admin/finances' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-1 flex-col bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">PandaWake</div>
              <div className="text-xs text-gray-500">Админ-панель</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to site */}
          <div className="px-3 py-4 border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              &larr; На сайт
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:pl-64">
        <div className="p-4 md:p-6 pb-24 md:pb-6">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 text-xs font-medium transition-colors ${
                  active ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
