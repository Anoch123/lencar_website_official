"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import AllPageHero from "@/components/allPageHero";
import NewsletterSignup from "@/components/newslettersignup";
import BookTestRideModal from "@/components/BookTestRideModal";

const STATS = [
  { value: "2015", label: "Founded in Sri Lanka" },
  { value: "UoM", label: "Engineers from University of Moratuwa" },
  { value: "SL + EU", label: "Local expertise, European know-how" },
];

export default function AboutUsPage() {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <div>
      {/* Hero sits outside any constrained wrapper so its own full-bleed logic works cleanly */}
      <AllPageHero
        eyebrow="About Lencar"
        heading={[
          "Building the future",
          <>of <span className="text-[#e30613]">urban mobility.</span></>,
        ]}
        description="We design and develop smart electric vehicles that move people forward, powering everyday journeys for over 4 million riders in more than 50 countries."
        ctas={[
          { label: "Explore My lencar", href: "./my-lencar", variant: "primary" },
          { label: "Book a test ride", onClick: () => setBookOpen(true), variant: "outline" },
        ]}
      />

      <BookTestRideModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <main className="bg-white text-[#0b0b0c]">
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              Our story
            </p>
            <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px] lg:text-[48px]">
              Futureproof e-mobility
            </h2>
            <p className="font-body mt-6 text-[18px] leading-relaxed text-[#4a4a4d]">
              Driven with a purpose to deliver sustainable e-mobility
              solutions, SL Mobility began its journey in 2015 with a team of
              qualified automobile engineers from the University of
              Moratuwa, Sri Lanka — combining local expertise with
              innovative thinking from European establishments.
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
        {/* R&D + objective — image paired with the two remaining ideas    */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0b0b0c] lg:aspect-auto">
              <Image
                src="/images/About us.png"
                alt="SL Mobility research and development team"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-10">
              <div>
                <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
                  Research &amp; development
                </h3>
                <p className="font-body mt-3 text-[17px] leading-relaxed text-[#3a3a3d]">
                  Our core business is developing electric motors and other
                  powertrain components for electric vehicles, backed by a
                  strong commitment to R&amp;D. Knowledge gathering, product
                  testing and process implementation keep us ahead of the
                  curve in a fast-evolving industry — driven by a team of
                  highly skilled engineers and scientists passionate about
                  making a positive change to the environment.
                </p>
              </div>

              <div>
                <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
                  Our objective
                </h3>
                <p className="font-body mt-3 text-[17px] leading-relaxed text-[#3a3a3d]">
                  We're building futureproof e-mobility solutions so Sri
                  Lankan roads carry quiet, eco-friendly and efficient
                  vehicles — for a greener, cleaner future.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 mt-15">
            <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] mb-0 text-[#e30613]">
              Innovation for Sri Lanka
            </h3>
            <p className="font-body mt-0 text-[17px] leading-relaxed text-[#3a3a3d]">
              As the team continues to push the boundaries of e-mobility, the result is a breakthrough e-mobility innovation for Sri Lanka.
              Our core business involves the development of electric motors and other powertrain-related components for electric vehicles. This is brought about by our strong commitment to Research and Development and the constant efforts to develop, implement and innovate solutions. This allows us to stay ahead of the curve in terms of global progress in this evolving industry. Knowledge gathering, product testing and process implementation play a vital role in our research & development process. Our R & D team consists of highly skilled and qualified engineers and scientists with a passion to make a positive change to the environment.
              Our objective is to develop futureproof e-mobility solutions so that Sri Lankan roads will have quiet, eco-friendly, and efficient vehicles for a greener and cleaner future.
            </p>
          </div>
        </section>

        {/* <NewsletterSignup /> */}

      </main>

      <Footer />
    </div>
  );
}