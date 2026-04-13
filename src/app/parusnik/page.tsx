import type { Metadata } from "next";
import ParusnikHeader from '@/components/parusnik/Header';
import ParusnikHero from '@/components/parusnik/Hero';
import ParusnikServices from '@/components/parusnik/Services';
import GazeboGrid from '@/components/parusnik/GazeboGrid';
import About from '@/components/parusnik/About';
import ParusnikGallery from '@/components/parusnik/Gallery';
import CrossPromo from '@/components/parusnik/CrossPromo';
import ParusnikCTA from '@/components/parusnik/CTA';
import ParusnikFooter from '@/components/parusnik/Footer';

export const metadata: Metadata = {
  title: "Яхт-клуб Парусник — Отдых на Клязьме",
  description: "Беседки с мангалом, рыбалка, прогулки на катере и отдых на Клязьминском водохранилище.",
};

export default function ParusnikHome() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <ParusnikHeader />
      <main>
        <ParusnikHero />
        <ParusnikServices />
        <GazeboGrid />
        <About />
        <ParusnikGallery />
        <CrossPromo />
        <ParusnikCTA />
      </main>
      <ParusnikFooter />
    </div>
  );
}
