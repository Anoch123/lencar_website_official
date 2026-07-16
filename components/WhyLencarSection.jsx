"use client";

import Image from "next/image";
import { Wrench, ShieldCheck, Award, Motorbike, brush, Brush } from "lucide-react";

const FEATURES = [
  {
    icon: Wrench,
    title: "Technology",
    description:
      "Smart battery swapping technology enables riders to replace batteries within minutes, eliminating long charging times.",
    cta: { label: "Find a store near Colombo", href: "#store-locator" },
  },
  {
    icon: ShieldCheck,
    title: "Warranty",
    description:
      "A 5-year warranty covers the powertrain, ensuring reliability and peace of mind.",
  },
  {
    icon: Motorbike,
    title: "Range",
    description:
      "Battery swapping technology provides unlimited range for uninterrupted travel.",
  },
  {
    icon: Brush,
    title: "Service",
    description:
      "Lifetime battery service eliminates concerns about battery maintenance and replacement.",
  },
  {
    icon: Award,
    title: "After-Sales Service",
    description:
      "A nationwide dealer network and dedicated technical support ensure reliable customer service.",
  },
];

export default function WhyLencarSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0b0c] py-20 sm:py-28">
      {/* faint radial wash so the black doesn't go flat on large screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, rgba(228,36,28,0.10) 0%, rgba(11,11,12,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] sm:min-h-[540px] lg:min-h-[640px]">
            <Image
              src="/images/whylencar.jpeg"
              alt="A LENCAR rider smiling on a scooter in a European city street"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            {/* legibility gradient */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#01e044]">
                Why LENCAR
              </p>
              <h2 className="font-display mt-3 text-[2.5rem] font-black uppercase italic leading-[0.92] tracking-tight text-[#f5f4f1] sm:text-[3.4rem] lg:text-[3rem]">
                More than
                <br />
                just a scooter
              </h2>
              <p className="font-body mt-4 max-w-sm text-[15px] leading-relaxed text-[#c7c7cc]">
                At Lencar, we believe transportation should be affordable, environmentally friendly, and hassle-free. Our electric scooters are designed for Sri Lankan roads while delivering outstanding performance and convenience.
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Feature column                                             */}
          {/* ---------------------------------------------------------- */}
          <div className="flex flex-col">
            <div className="relative flex flex-1 flex-col gap-5">
              {/* route line: one continuous path linking every stop */}
              <div
                aria-hidden
                className="route-line absolute bottom-6 left-[27px] top-6 hidden w-px sm:block"
              />

              {FEATURES.map((feature, index) => (
                <FeatureCard key={`${feature.title}-${index}`} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  return (
    <div className="group relative rounded-2xl border border-white/[0.06] bg-[#141416] p-6 transition-colors duration-300 hover:border-[#01e044]/40 hover:bg-[#17171a] sm:pl-8">

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#01e044]/10 text-[#ff4d43] transition-transform duration-300 group-hover:scale-105">
          <Icon size={20} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h3 className="font-body text-[17px] font-semibold text-[#01e044]">
            {feature.title}
          </h3>
          <p className="font-body mt-1.5 text-[14px] leading-relaxed text-[#a3a3a8]">
            {feature.description}
          </p>

          {/* {feature.cta && (
            <a
              href={feature.cta.href}
              className="font-body mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#01e044] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#ff3b30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d43]"
            >
              {feature.cta.label}
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          )} */}
        </div>
      </div>
    </div>
  );
}