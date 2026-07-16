"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import BookTestRideModal from "@/components/BookTestRideModal";

const SPECS = [
  { label: "Range", value: "90+ km" },
  { label: "Top speed", value: "65 km/h" },
  { label: "Motor Power", value: "2kw" },
  { label: "Battery", value: "72 - 30AH Lithium Iron Phosphate" },
];

const HIGHLIGHTS = [
  "Long Riding Range",
  "Powerful Performance",
  "Advanced Safety Features",
  "IoT connectivity via the Lencar app"
];

const FULL_SPECS = [
  { label: "Motor Power", value: "1.5kW rated power, 2kW peak power" },
  { label: "Brakes", value: "220mm dual disc, opposite-cylinder calipers" },
  { label: "Brake System", value: "Hydraulic" },
  { label: "Tires", value: "3.50 – 10 vacuum tire" },
  { label: "Rear Suspension", value: "Hydraulic shock absorber" },
  { label: "Charger", value: "8A national-standard lithium battery charger" },
  { label: "Controller", value: "Double-layer self-cooling controller" },
  { label: "Security", value: "Dual remote-control alarm, laser-cut remote & key" },
  { label: "Storage", value: "Expanded cabin space" },
];

export default function LencarZivi() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <main className="bg-white text-[#0b0b0c]">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          
            <a href="/my-lencar"
            className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#6b6b70] transition-colors hover:text-[#e30613]">
            <span aria-hidden="true">←</span> Back to lineup
          </a>
        </div>

        {/* Overview */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0c]">
            <Image
              src="/images/bikes/zivi.jpg"
              alt="Zivi"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              The stylish city commuter.
            </p>
            <h1 className="font-display mt-4 text-[44px] font-black italic uppercase leading-[0.98] tracking-tight text-[#0b0b0c] sm:text-[56px]">
              Zivi
            </h1>
            <p className="font-body mt-6 max-w-md text-[16px] leading-relaxed text-[#4a4a4d]">
              The premium electric scooter built for riders who need greater efficiency and longer-distance travel. With a range of up to 90 km, the Zivi combines stylish design with modern technology. It also features Lencar’s battery-swapping system, enabling seamless battery replacement for uninterrupted mobility.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-[#e5e5e5] pt-8">
              {SPECS.map((spec) => (
                <div key={spec.label}>
                  <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-[#a3a3a8]">
                    {spec.label}
                  </dt>
                  <dd className="font-display mt-1 text-[18px] font-bold text-[#0b0b0c]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="font-body inline-flex items-center justify-center bg-[#e30613] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#c90512]"
              >
                Book a test ride
              </button>
              
                <a href="/my-lencar"
                className="font-body inline-flex items-center justify-center border border-[#0b0b0c] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#e30613] hover:text-[#e30613]"
              >
                Back to lineup
              </a>
            </div>
          </div>
        </section>

        <BookTestRideModal isOpen={open} onClose={() => setOpen(false)} bikeName="Zivi" />

        {/* Highlights */}
        <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
            <h2 className="font-display max-w-xl text-[26px] font-black uppercase italic leading-[1.1] tracking-tight text-[#0b0b0c] sm:text-[32px]">
              Why riders choose Zivi
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 bg-[#e30613]" />
                  <span className="font-body text-[15px] leading-relaxed text-[#3a3a3d]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Full specifications */}
        <section className="border-t border-[#e5e5e5] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              Under the hood
            </p>
            <h2 className="font-display mt-4 max-w-xl text-[26px] font-black uppercase italic leading-[1.1] tracking-tight text-[#0b0b0c] sm:text-[32px]">
              Full specifications
            </h2>

            <dl className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {FULL_SPECS.map((spec, i) => (
                <div
                  key={spec.label + i}
                  className="flex items-baseline justify-between gap-6 border-b border-[#e5e5e5] py-4"
                >
                  <dt className="font-body flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3a3a8]">
                    {spec.label}
                  </dt>
                  <dd className="font-body text-right text-[14px] leading-snug text-[#0b0b0c]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}