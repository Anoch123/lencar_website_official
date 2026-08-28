import Footer from "@/components/common/footer";
import FeatureScroll from "@/components/ui/FeatureScroll";
import AllPageHero from "@/components/ui/allPageHero";
import AppDownload from "@/components/ui/appDownload";
import { seoMetadata } from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Lencar App | Unlock More With the App",
  description: "Download the Lencar app for real-time GPS, anti-theft alerts, battery updates, and ride stats — all in one app.",
  path: "/lencar-app",
});

export default function LencarApp() {
  return (
      <div>
        <AllPageHero
          eyebrow="Lencar App"
          heading={["Stay Connected with Lencar", "Mobile App."]}
          description="Take full control of your Lencar electric scooter with the Lencar Mobile App."
          imageSrc="/images/lencar_app.png"
          ctas={[
            { label: "Download User Manual", href: "/pdfs/ezr-app-user-manual.pdf", variant: "primary" },
            ]}
        />
            <main className="bg-white text-[#0b0b0c]">
                {/* Intro */}
                <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
                            Lencar App
                        </p>
                        <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px] lg:text-[48px]">
                            Unlock More With the Lencar App.
                        </h2>
                        <p className="font-body mt-6 text-[18px] leading-relaxed text-[#4a4a4d]">
                            The Lencar Mobile App keeps you connected wherever you go. Scrol down to see what the Lencar EZR Power Hub App can do,
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
