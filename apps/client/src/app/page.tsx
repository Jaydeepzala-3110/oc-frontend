import Faqs from '@/components/home/Faqs';
import HowItWork from '@/components/home/HowItWork';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/home/Footer';
import BrandCarousel from '@/components/home/BrandCarousel';
import Metrics from '@/components/home/Metrics';
import FeaturedCampaigns from '@/components/home/FeaturedCampaigns';
import Benefits from '@/components/home/Benefits';
import CtaBanner from '@/components/home/CtaBanner';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import GoalCards from '@/components/home/GoalCards';

export default function Index() {
  return (
    <main>
      <Header />
      <HeroSection />
      <BrandCarousel />
      <HowItWork />
      {/* <Metrics /> */}
      <GoalCards />
      <FeaturedCampaigns />
      <Testimonials />
      <Benefits />
      <Faqs />
      <CtaBanner />
      <Footer />
    </main>
  );
}
