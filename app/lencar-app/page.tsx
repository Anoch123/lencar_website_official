import Footer from "@/components/footer";
import FeatureScroll from "@/components/FeatureScroll";
import AllPageHero from "@/components/allPageHero";
import AppDownload from "@/components/appDownload";

export default function LencarApp() {
  return (
      <div>
        <AllPageHero
          eyebrow="Lencar App"
          heading={["Unlock More With", "Lencar App."]}
          description="Real-time GPS, anti-theft alerts, battery updates, and ride stats — all in one app."
          ctas={[
            { label: "Download User Manual", href: "./my-lencar", variant: "primary" },
            ]}
        />
            <main className="bg-white text-[#0b0b0c]">
                {/* Intro */}
                <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
                            Lencar App
                        </p>
                        <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px] lg:text-[48px]">
                            Unlock More With the Lencar App.
                        </h2>
                        <p className="font-body mt-6 text-[18px] leading-relaxed text-[#4a4a4d]">
                            Real-time GPS, anti-theft alerts, battery updates, and ride stats — all in one app. Scroll down to see what the NIU App can do for you.
                        </p>
                    </div>
                    <FeatureScroll />
                </section>
                <AppDownload />     
            </main>
            <Footer />
        </div>
    );
}
