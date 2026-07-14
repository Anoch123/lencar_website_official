import AboutBSS from "@/components/aboutbss";
import FeatureBar from "@/components/FeatureBar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import WhyLencarSection from "@/components/WhyLencarSection";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <FeatureBar />
      <WhyLencarSection />
      <AboutBSS />
      <Footer />
    </main>
  );
}
