import AboutBSS from "@/components/ui/aboutbss";
import FeatureBar from "@/components/ui/FeatureBar";
import Footer from "@/components/common/footer";
import Hero from "@/components/ui/hero";
import WhyLencarSection from "@/components/ui/WhyLencarSection";
import ImpactStats from "@/components/ui/impactStats";
import HomeSwapping from "@/components/ui/homeSwapping";
import { seoMetadata } from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Lencar | Future Electric Mobility.",
  description:
    "Lencar creates intelligent electric vehicles and sustainable mobility solutions for Sri Lanka. Explore our range of smart electric scooters with battery-swapping technology.",
  path: "/",
});

export default function Home() {
  return (
    <main className="">
      <Hero />
      <FeatureBar />
      <WhyLencarSection />
      {/* <ImpactStats distanceKm={2094513.9886} /> */}
      <AboutBSS />
      {/* <HomeSwapping /> */}
      <Footer />
    </main>
  );
}
