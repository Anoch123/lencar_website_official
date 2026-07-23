import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/common/footer";
import BookTestRideButton from "@/components/ui/BookTestRideButton";

// Same data source the listing page uses — move this to a shared file
// (e.g. @/lib/bikes.ts) once you're ready, so both pages read from one place.
const BIKES = [
  {
    name: "eRc 80",
    slug: "erc-80",
    tagline: "The everyday city commuter.",
    image: "/images/bikes/erc-80.jpg",
    specs: [
      { label: "Range", value: "80 km" },
      { label: "Top speed", value: "45 km/h" },
      { label: "Charging time", value: "4 hrs" },
      { label: "Payload", value: "150 kg" },
    ],
    description:
      "Built for the daily commute, the eRc 80 balances range and agility so it's just as comfortable weaving through city traffic as it is parked outside your door.",
  },
  {
    name: "eRc 80+",
    slug: "erc-80-plus",
    tagline: "More range, more power, same footprint.",
    image: "/images/bikes/erc-80-plus.jpg",
    specs: [
      { label: "Range", value: "100 km" },
      { label: "Top speed", value: "50 km/h" },
      { label: "Charging time", value: "4.5 hrs" },
      { label: "Payload", value: "160 kg" },
    ],
    description:
      "The eRc 80+ takes the same everyday footprint and pushes the range and top speed further, for riders who need a bit more out of every charge.",
  },
  {
    name: "Zivi",
    slug: "zivi",
    tagline: "Light, agile, built for tight city streets.",
    image: "/images/bikes/zivi.jpg",
    specs: [
      { label: "Range", value: "60 km" },
      { label: "Top speed", value: "40 km/h" },
      { label: "Charging time", value: "3.5 hrs" },
      { label: "Payload", value: "120 kg" },
    ],
    description:
      "Zivi is the lightest bike in the lineup — nimble enough for narrow streets and tight parking, without giving up everyday reliability.",
  },
];

export function generateStaticParams() {
  return BIKES.map((bike) => ({ slug: bike.slug }));
}

export default function BikeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const bike = BIKES.find((b) => b.slug === params.slug);

  if (!bike) {
    notFound();
  }

  return (
    <div>
      <main className="bg-white text-[#0b0b0c]">
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0c]">
            <Image
              src={bike.image}
              alt={bike.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              {bike.tagline}
            </p>
            <h1 className="font-display mt-4 text-[40px] font-black italic uppercase leading-[0.98] tracking-tight text-[#0b0b0c] sm:text-[48px]">
              {bike.name}
            </h1>
            <p className="font-body mt-6 max-w-md text-[16px] leading-relaxed text-[#4a4a4d]">
              {bike.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#e5e5e5] pt-8">
              {bike.specs.map((spec) => (
                <div key={spec.label}>
                  <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[#a3a3a8]">
                    {spec.label}
                  </p>
                  <p className="font-display mt-1 text-[18px] font-bold text-[#0b0b0c]">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BookTestRideButton
                bikeName={bike.name}
                className="font-body inline-flex items-center justify-center bg-[#e30613] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#c90512]"
              />
              <a
                href="/bikes"
                className="font-body inline-flex items-center justify-center border border-[#0b0b0c] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#e30613] hover:text-[#e30613]"
              >
                Back to lineup
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}