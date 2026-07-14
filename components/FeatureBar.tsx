"use client";

import { useState } from "react";
import {
  MapPin,
  Wrench,
  Award,
} from "lucide-react";

import BookTestRideModal from "@/components/BookTestRideModal";


const features = [
  {
    icon: MapPin,
    title: (
      <>
        <span className="text-[#01e044]">1000+ Dealers</span> worldwide
      </>
    ),
    desc: "Comprehensive service network",
  },
  {
    icon: Wrench,
    title: (
      <>
        <span className="text-[#01e044]">2 Years</span> Warranty
      </>
    ),
    desc: "on vehicle & battery",
  },
  {
    icon: Award,
    title: (
      <>
        <span className="text-[#01e044]">Best in test</span> 1000PS 2025
      </>
    ),
    desc: "Ranked #1",
  },
];


export default function FeatureBar() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full border border-[#3a3a3a] bg-[#202020]">
      <div
        className="
          mx-auto flex
          w-full max-w-[1440px]
          flex-col-reverse
          items-center
          justify-between
          gap-8
          px-5
          py-8
          sm:px-8
          xl:flex-row
        "
      >
        {/* Buttons */}
        <div
          className="
            flex w-full
            flex-col gap-4
            sm:flex-row
            xl:w-auto
            xl:shrink-0
          "
        >
          <button
            className="
              w-full
              whitespace-nowrap
              rounded-md
              bg-[#01e044]
              px-7
              py-3
              font-medium
              text-white
              transition
              hover:bg-[#01e044]/90
              sm:w-auto
            "
            onClick={() => setOpen(true)}
          >
            Book a test ride
          </button>

          <button
            className="
              w-full
              whitespace-nowrap
              rounded-md
              border
              border-white/40
              px-8
              py-3
              font-medium
              text-white
              transition
              hover:bg-white
              hover:text-black
              sm:w-auto
            "
            onClick={() => (window.location.href = "/dealer-network")}
          >
            Find a dealer
          </button>
        </div>

        {/* Features */}
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-6
            sm:grid-cols-2
            sm:gap-8
            xl:w-auto
            xl:grid-cols-3
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex min-w-0 items-center gap-4">
                <Icon
                  size={42}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#01e044]"
                />

                <div className="min-w-0 leading-tight">
                  <h3
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-white
                      sm:text-base
                      lg:text-lg
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="truncate text-sm text-white opacity-90 lg:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BookTestRideModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}