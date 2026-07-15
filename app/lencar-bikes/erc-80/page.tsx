"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import BookTestRideModal from "@/components/BookTestRideModal";

const SPECS = [
  { label: "Range", value: "80 km" },
  { label: "Top speed", value: "45 km/h" },
  { label: "Charging time", value: "4 hrs" },
  { label: "Payload", value: "150 kg" },
];

const HIGHLIGHTS = [
  "Compact frame built for tight city parking",
  "Swappable battery for quick top-ups",
  "IoT connectivity via the Lencar app",
  "Designed and tested for Sri Lankan roads",
];

export default function LencarERC80() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <main className="bg-white text-[#0b0b0c]">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <a
            href="/my-lencar"
            className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#6b6b70] transition-colors hover:text-[#e30613]"
          >
            <span aria-hidden="true">←</span> Back to lineup
          </a>
        </div>

        {/* Overview */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0c]">
            <Image
              src="/images/bikes/erc-80.jpg"
              alt="eRc 80"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              The everyday city commuter.
            </p>
            <h1 className="font-display mt-4 text-[44px] font-black italic uppercase leading-[0.98] tracking-tight text-[#0b0b0c] sm:text-[56px]">
              eRc 80
            </h1>
            <p className="font-body mt-6 max-w-md text-[16px] leading-relaxed text-[#4a4a4d]">
              Built for the daily commute, the eRc 80 balances range and
              agility so it&apos;s just as comfortable weaving through city
              traffic as it is parked outside your door.
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
              <a
                href="/my-lencar"
                className="font-body inline-flex items-center justify-center border border-[#0b0b0c] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#e30613] hover:text-[#e30613]"
              >
                Back to lineup
              </a>
            </div>
          </div>
        </section>

        <BookTestRideModal isOpen={open} onClose={() => setOpen(false)} bikeName="eRc 80" />

        {/* Highlights */}
        <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
            <h2 className="font-display max-w-xl text-[26px] font-black uppercase italic leading-[1.1] tracking-tight text-[#0b0b0c] sm:text-[32px]">
              Why riders choose the eRc 80
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
      </main>

      <Footer />
    </div>
  );
}