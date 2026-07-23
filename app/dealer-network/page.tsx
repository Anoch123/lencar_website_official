import Footer from "@/components/common/footer";
import DealerNetwork from "@/components/ui/Dealernetwork";
import AllPageHero from "@/components/ui/allPageHero";
import { STATS } from "@/lib/constants/dealer_network";

export default function NetworkPage() {
  return (
    <div>
      <AllPageHero
        eyebrow="Find us"
        heading={["Dealer network"]}
        description="Showrooms and service centers across Sri Lanka, ready to help you find your Lencar, book a test ride, or keep your vehicle running at its best."
        imageSrc="/images/Showroom.png"
      />

      <main className="bg-white text-[#0b0b0c]">
        {/* -------------------------------------------------------------- */}
        {/* Intro / lede                                                    */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              Find us
            </p>
            <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px] lg:text-[48px]">
              Dealer network
            </h2>
            <p className="font-body mt-6 text-[18px] leading-relaxed text-[#4a4a4d]">
              Showrooms and service centers across Sri Lanka, ready to help
              you find your Lencar, book a test ride, or keep your vehicle
              running at its best.
            </p>
          </div>

          {/* Stat strip */}
          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 border-y border-[#e5e5e5] py-10 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-display text-[28px] font-black italic text-[#e30613]">
                  {stat.value}
                </dt>
                <dd className="font-body mt-1 text-[13px] leading-snug text-[#6b6b70]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Dealer directory                                                */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <DealerNetwork />
        </section>
      </main>

      <Footer />
    </div>
  );
}