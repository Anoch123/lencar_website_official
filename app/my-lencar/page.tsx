import Image from "next/image";
import Footer from "@/components/footer";
import AllPageHero from "@/components/allPageHero"
import FaqAccordion from "@/components/Faqaccordion";

const BIKES = [
  {
    name: "eRc 80",
    slug: "erc-80",
    tagline: "The everyday city commuter.",
    image: "/images/bikes/erc-80.jpg",
    specs: [
      { label: "Range", value: "80 km" },
      { label: "Top speed", value: "45 km/h" },
    ],
  },
  {
    name: "eRc 80+",
    slug: "erc-80-plus",
    tagline: "More range, more power, same footprint.",
    image: "/images/bikes/erc-80-plus.jpg",
    specs: [
      { label: "Range", value: "100 km" },
      { label: "Top speed", value: "50 km/h" },
    ],
  },
  {
    name: "Zivi",
    slug: "zivi",
    tagline: "Light, agile, built for tight city streets.",
    image: "/images/bikes/zivi.jpg",
    specs: [
      { label: "Range", value: "60 km" },
      { label: "Top speed", value: "40 km/h" },
    ],
  },
];

export default function MyLencar() {
  return (
    <div>
      {/* Hero sits outside any constrained wrapper so its own full-bleed logic works cleanly */}
      <AllPageHero
        eyebrow="Our lineup"
        heading={["Electric bikes for", "the ride ahead"]}
        description="Explore our range of smart electric vehicles designed for the modern rider."
      />

      <main className="bg-white text-[#0b0b0c]">
        {/* -------------------------------------------------------------- */}
        {/* Bikes / products                                                */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div>
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              Our lineup
            </p>
            <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px]">
              Electric bikes for the ride ahead
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {BIKES.map((bike) => (
              <a
                key={bike.name}
                href={`/lencar-bikes/${bike.slug}`}
                className="group flex flex-col overflow-hidden border border-[#e5e5e5] transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0c]">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[22px] font-black italic uppercase tracking-tight text-[#0b0b0c]">
                    {bike.name}
                  </h3>
                  <p className="font-body mt-1 text-[14px] leading-relaxed text-[#6b6b70]">
                    {bike.tagline}
                  </p>

                  <div className="mt-5 flex gap-6 border-t border-[#e5e5e5] pt-5">
                    {bike.specs.map((spec) => (
                      <div key={spec.label}>
                        <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[#a3a3a8]">
                          {spec.label}
                        </p>
                        <p className="font-display mt-0.5 text-[15px] font-bold text-[#0b0b0c]">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <span className="font-body mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#e30613]">
                    View model
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* FAQ                                                             */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-24 lg:px-8">
          <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
            FAQ
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-[26px] font-black uppercase leading-[1.15] tracking-tight text-[#0b0b0c] sm:text-[30px]">
            You can find our help here — we've listed some frequently asked
            questions below.
          </h2>

          <FaqAccordion />
        </section>
      </main>

      <Footer />
    </div>
  );
}