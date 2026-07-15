import AboutBSS from "@/components/aboutbss";
import FeatureBar from "@/components/FeatureBar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import WhyLencarSection from "@/components/WhyLencarSection";
import ImpactStats from "@/components/impactStats";
import HomeSwapping from "@/components/homeSwapping";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <FeatureBar />
      <WhyLencarSection />
      <ImpactStats distanceKm={2094513.9886} />
      <AboutBSS />
      <HomeSwapping />
      <Footer />
    </main>
  );
}
