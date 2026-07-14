"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";
import AllPageHero from "@/components/allPageHero";
import BSSPointsList from "@/components/bssPointsList";

const BSSMap = dynamic(() => import("@/components/bssMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center border border-[#e5e5e5] text-[#0b0b0c]/40">
      Loading map...
    </div>
  ),
});

export default function BSSPoints() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      <AllPageHero
        eyebrow="BSS Points"
        heading={[
          "BSS Points across",
          <><span className="text-[#e30613]">Sri Lanka</span></>,
        ]}
        description="Our Battery Swapping Station (BSS) network is designed to provide fast, reliable, and convenient battery exchange services for electric vehicle riders across Sri Lanka."
      />
      <main className="bg-white text-[#0b0b0c]">
        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
                BSS Points
            </p>
            <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px] lg:text-[48px]">
                BSS Points across Sri Lanka
            </h2>
            <p className="font-body mt-6 text-[18px] leading-relaxed text-[#4a4a4d]">
                Our Battery Swapping Station (BSS) network is designed to provide fast,
                reliable, and convenient battery exchange services for electric vehicle
                riders across Sri Lanka. Starting from the Western Province and expanding
                nationwide, each station enables riders to swap a depleted battery for a
                fully charged one in just a few minutes—eliminating long charging times and
                making everyday travel more efficient, sustainable, and hassle-free.
            </p>
            </div>
        </section>

        {/* Map */}
        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <BSSMap />
        </section>

        {/* BSS point directory */}
        <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-24 lg:px-8">
          <BSSPointsList selectedId={selectedId} onSelect={setSelectedId} />
        </section>
      </main>
      <Footer />
    </div>
  );
}