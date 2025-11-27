import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import MetricsTable from "@/components/home/MetricsTable";
import ProcessFlow from "@/components/home/ProcessFlow";
import HowItWork from "@/components/home/HowItWork";
import Benefits from "@/components/home/Benefits";
import CtaBanner from "@/components/home/CtaBanner";
import Footer from "@/components/home/Footer";

export default function Index() {
  return (
    <main className="min-h-screen bg-white dark:bg-background font-sans">
      <Header />
      <HeroSection />
      <Features />
      <MetricsTable />
      <ProcessFlow />
      <HowItWork />
      <Benefits />
      <CtaBanner />
      <Footer />
    </main>
  );
}
