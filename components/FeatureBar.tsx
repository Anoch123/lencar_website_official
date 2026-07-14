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
    <section className="
      w-full
      bg-[#202020]
      border
      border-[#3a3a3a]
    ">

      <div className="
        max-w-[1440px]
        mx-auto
        px-5
        sm:px-8
        py-8
        flex
        flex-col
        xl:flex-row
        items-center
        justify-between
        gap-8
      ">


        {/* Buttons */}
        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
          w-full
          xl:w-auto
        ">

          <button
            className="
              bg-[#01e044]
              hover:bg-[#01e044]
              transition
              text-white
              font-medium
              px-7
              py-3
              rounded-md
              w-full
              sm:w-auto
              whitespace-nowrap
            "
            onClick={() => setOpen(true)}
          >
            Book a test ride
          </button>

          <BookTestRideModal isOpen={open} onClose={() => setOpen(false)} />

          <button
            className="
              border
              border-white/40
              hover:bg-white
              hover:text-black
              transition
              text-white
              font-medium
              px-8
              py-3
              rounded-md
              w-full
              sm:w-auto
              whitespace-nowrap
            "
            onClick={() => window.location.href = '/dealer-network'}
          >
            Find a dealer
          </button>

        </div>



        {/* Features */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-8
          w-full
          xl:w-auto
        ">


          {features.map((item, index)=>{

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-4
                  min-w-0
                "
              >

                <Icon
                  size={42}
                  strokeWidth={1.8}
                  className="
                    text-[#01e044]
                    shrink-0
                  "
                />


                <div className="
                  leading-tight
                ">

                  <h3 className="
                    text-white
                    text-sm
                    sm:text-base
                    lg:text-lg
                    font-bold
                    whitespace-nowrap
                  ">
                    {item.title}
                  </h3>


                  <p className="
                    text-white
                    text-sm
                    lg:text-base
                    opacity-90
                  ">
                    {item.desc}
                  </p>

                </div>

              </div>
            );

          })}


        </div>

      </div>

    </section>
  );
}