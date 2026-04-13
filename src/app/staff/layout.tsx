import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'PandaWake Staff',
  description: 'Панель управления для персонала',
  manifest: '/staff/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PW Staff',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f172a',
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {children}
    </div>
  );
}
