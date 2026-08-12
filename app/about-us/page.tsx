"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/common/footer";
import AllPageHero from "@/components/ui/allPageHero";
import BookTestRideModal from "@/components/ui/BookTestRideModal";
import { STATS } from "@/lib/constants/about_us";

export default function AboutUsPage() {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <div>
      {/* Hero sits outside any constrained wrapper so its own full-bleed logic works cleanly */}
      <AllPageHero
        eyebrow="About Lencar"
        heading={[
          "Developed Globally, Perfected Locally.",
        ]}
        description="At Lencar, we believe in a cleaner and greener future.Our innovative battery-swapping technology makes every ride more convenient, efficient, and sustainable."
        ctas={[
          { label: "Explore My lencar", href: "./my-lencar", variant: "primary" },
          { label: "Book a test ride", onClick: () => setBookOpen(true), variant: "outline" },
        ]}
        imageSrc="/images/Aboutus.png"
      />

      <BookTestRideModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <main className="bg-white text-[#0b0b0c]">
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
              Our story
            </p>
            <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:text-[40px] lg:text-[48px]">
              Futureproof e-mobility
            </h2>
            <p className="font-body mt-6 text-[18px] leading-relaxed text-[#4a4a4d]">
              As the world embraces cleaner energy, LENCAR leads the shift to sustainable e-mobility. Developed by SL-Mobility, LENCAR offers 100% locally developed and assembled e-scooters with modern European-inspired designs—an eco-friendly, affordable, and smart choice for urban travel.
            </p>
          </div>

          {/* Stat strip */}
          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 border-y border-[#e5e5e5] py-10 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-display text-[28px] font-black italic text-[#0F4C81]">
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
                src="/images/powertrain.webp"
                alt="SL Mobility research and development team"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-10">
              <div>
                <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
                  Our objective
                </h3>
                <p className="font-body mt-3 text-[17px] leading-relaxed text-[#3a3a3d]">
                  Our objective is to develop futureproof e-mobility solutions so that Sri Lankan roads will have quiet, eco-friendly, and efficient vehicles for a greener and cleaner future.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
                  Innovation for Sri Lanka
                </h3>
                <p className="font-body mt-3 text-[17px] leading-relaxed text-[#3a3a3d]">
                  Driven with a purpose to deliver sustainable e-mobility solutions to meet the future needs of transportation, SL Mobility began its journey back in 2015 with a team of qualified automobile engineers from the University of Moratuwa, Sri Lanka. This local expertise was combined with further knowledge and innovative thinking from a group of European establishments. As the team continues to push the boundaries of e-mobility, the result is a breakthrough e-mobility innovation for Sri Lanka.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 mt-15">

            <p className="font-body mt-0 text-[17px] leading-relaxed text-[#3a3a3d]">
              Our core business involves the development of electric motors and other powertrain-related components for electric vehicles. This is brought about by our strong commitment to Research and Development and the constant efforts to develop, implement and innovate solutions. This allows us to stay ahead of the curve in terms of global progress in this evolving industry. Knowledge gathering, product testing and process implementation play a vital role in our research & development process. Our R & D team consists of highly skilled and qualified engineers and scientists with a passion to make a positive change to the environment.
            </p>
          </div>
        </section>

        {/* <NewsletterSignup /> */}

      </main>

      <Footer />
    </div>
  );
}