"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/common/footer";
import BookTestRideModal from "@/components/ui/BookTestRideModal";
import { FULL_SPECS, HIGHLIGHTS, SPECS } from "@/lib/constants/lencar_erceighty";

const THUMBNAILS = [
  "/images/erc_bike/img1.jpg",
  "/images/erc_bike/img2.jpg",
  "/images/erc_bike/img3.jpg",
  "/images/erc_bike/img4.jpg",
];

const COLORS = [
  { name: "Blue", hex: "#1919cf" },
  { name: "Green", hex: "#15a728" },
  { name: "Pink", hex: "#b41399" },
  { name: "yellow", hex: "#b1d123" },
];

export default function LencarERC80Plus() {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(THUMBNAILS[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);

  return (
    <div>
      <main className="bg-white text-[#0b0b0c]">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">

          <a href="/my-lencar"
            className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#6b6b70] transition-colors hover:text-[#0F4C81]"
          >
            <span aria-hidden="true">←</span> Back to lineup
          </a>
        </div>

        {/* Overview */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            {/* Big product image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0c]">
              <Image
                src={activeImage}
                alt="eRc 80 Plus"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-opacity duration-200"
              />
            </div>

            {/* Thumbnail gallery */}
            <div className="mt-4 flex gap-3">
              {THUMBNAILS.map((thumb, i) => (
                <button
                  key={thumb + i}
                  onClick={() => setActiveImage(thumb)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden bg-[#0b0b0c] transition-all sm:w-24 ${activeImage === thumb
                      ? "ring-2 ring-[#0F4C81] ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={thumb}
                    alt={`eRc 80 Plus thumbnail ${i + 1}`}
                    fill
                    sizes="(max-width: 639px) 80px, 96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
              The enhanced everyday city commuter.
            </p>
            <h1 className="font-display mt-4 text-[44px] font-black italic uppercase leading-[0.98] tracking-tight text-[#0b0b0c] sm:text-[56px]">
              eRc 80<span className="text-[#0F4C81]">+</span>
            </h1>
            <p className="font-body mt-6 max-w-md text-[16px] leading-relaxed text-[#4a4a4d]">
              A smart electric scooter designed for daily commuting and city travel.
              It offers a riding range of up to 70 km on a full charge and features
              Lencar's advanced battery-swapping technology, allowing riders to replace
              depleted batteries quickly and continue their journey without waiting for charging.
            </p>

            {/* Color selector */}
            <div className="mt-8 border-t border-[#e5e5e5] pt-8">
              <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[#a3a3a8]">
                Available Colours
              </p>
              <div className="mt-3 flex items-center gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    aria-label={color.name}
                    aria-pressed={activeColor.name === color.name}
                    className={`h-8 w-8 flex-shrink-0 rounded-full border transition-all ${color.hex === "#f5f5f4" ? "border-[#e5e5e5]" : "border-transparent"}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

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

            <div className="mt-5 border-t border-[#e5e5e5] pt-5">
              {/* <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[#a3a3a8]">
                Bike at
              </p> */}
              <p className="font-display mt-1 text-[26px] font-black text-[#0b0b0c]">
                LKR 425,000.00
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="font-body rounded inline-flex items-center justify-center bg-[#0F4C81] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[transparent] hover:border hover:border-[#0F4C81] hover:text-[#0F4C81]"
              >
                Book a test ride
              </button>

              <a href="/my-lencar"
                className="font-body rounded inline-flex items-center justify-center border border-[#0b0b0c] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#0F4C81] hover:text-[#0F4C81]"
              >
                Back to lineup
              </a>
            </div>
          </div>
        </section>

        <BookTestRideModal isOpen={open} onClose={() => setOpen(false)} bikeName="eRc 80+" />

        {/* Highlights */}
        <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
            <h2 className="font-display max-w-xl text-[26px] font-black uppercase italic leading-[1.1] tracking-tight text-[#0b0b0c] sm:text-[32px]">
              Why riders choose the eRc 80+
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 bg-[#0F4C81]" />
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
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
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
                  <dt className="font-body flex-shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#a3a3a8]">
                    {spec.label}
                  </dt>
                  <dd className="font-body capitalize text-right text-[14px] leading-snug text-[#0b0b0c]">
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