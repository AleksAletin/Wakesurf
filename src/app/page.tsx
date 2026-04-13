import Header from '@/components/wake/Header';
import Hero from '@/components/wake/Hero';
import Services from '@/components/wake/Services';
import Boats from '@/components/wake/Boats';
import Gazebos from '@/components/wake/Gazebos';
import Gallery from '@/components/wake/Gallery';
import Packages from '@/components/wake/Packages';
import WakeCrossPromo from '@/components/wake/CrossPromo';
import CTA from '@/components/wake/CTA';
import Footer from '@/components/wake/Footer';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Boats />
        <Gazebos />
        <Gallery />
        <Packages />
        <WakeCrossPromo />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
