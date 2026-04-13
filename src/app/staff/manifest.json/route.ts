import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: 'PandaWake Staff',
    short_name: 'PW Staff',
    description: 'Управление бронированиями PandaWake и Парусник',
    start_url: '/staff',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
