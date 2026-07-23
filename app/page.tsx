import AboutBSS from "@/components/ui/aboutbss";
import FeatureBar from "@/components/ui/FeatureBar";
import Footer from "@/components/common/footer";
import Hero from "@/components/ui/hero";
import WhyLencarSection from "@/components/ui/WhyLencarSection";
import ImpactStats from "@/components/ui/impactStats";
import HomeSwapping from "@/components/ui/homeSwapping";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <FeatureBar />
      <WhyLencarSection />
      <ImpactStats distanceKm={2094513.9886} />
      <AboutBSS />
      {/* <HomeSwapping /> */}
      <Footer />
    </main>
  );
}
