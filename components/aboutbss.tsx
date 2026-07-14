"use client";

import Image from "next/image";
import {
  BatteryCharging,
  ArrowDownToLine,
  Bike,
  Clock3,
  ShieldCheck,
} from "lucide-react";

type Step = {
  icon: typeof ArrowDownToLine;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: ArrowDownToLine,
    title: "Dock the flat one",
    description:
      "Slide your depleted battery into any open slot on the station.",
  },
  {
    icon: BatteryCharging,
    title: "Grab a full one",
    description:
      "The cabinet unlocks a fully charged battery for you, instantly.",
  },
  {
    icon: Bike,
    title: "Ride on",
    description:
      "Back on the road in under a minute, with your full range restored.",
  },
];

const STATS = [
  { icon: Clock3, value: "< 60 sec", label: "average swap time" },
  { icon: BatteryCharging, value: "100%", label: "charged, every time" },
  { icon: ShieldCheck, value: "24/7", label: "self-serve access" },
];

export default function Aboutbss() {
  return (
    <section className="relative overflow-hidden bg-[#f5f7f2] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* -------------------------------------------------------------- */}
        {/* Header                                                         */}
        {/* -------------------------------------------------------------- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#2fa84b]">
            Lencar charge network
          </p>
          <h2 className="font-display mt-3 text-[2.25rem] font-bold leading-[1.08] tracking-tight text-[#10231a] sm:text-[2.75rem]">
            Swap flat for full,
            <br className="hidden sm:block" /> in under a minute.
          </h2>
          <p className="font-body mt-4 text-[15px] leading-relaxed text-[#5b6b60] sm:text-base">
            No cables. No waiting around. No watching the battery icon tick
            down on your ride home. Pull up to any Lencar station, swap your
            battery, and keep riding — fully charged, every time.
          </p>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Image + steps                                                  */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          {/* Cabinet image with live-status badges */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(16,35,26,0.04)] sm:p-6 lg:p-8">
            <div className="relative aspect-square w-full min-h-[320px] sm:min-h-[450px] lg:min-h-[600px]">
              <Image
                src="/images/bss.webp"
                alt="Lencar battery swap cabinet with charged battery slots"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                className="object-contain scale-110"
                priority
              />
            </div>
          </div>

            {/* floating status badge — top right */}
            <div className="absolute -right-3 top-8 flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-2 shadow-[0_4px_16px_rgba(16,35,26,0.10)] sm:-right-6">
              <span className="badge-pulse h-2 w-2 shrink-0 rounded-full bg-[#2fa84b]" />
              <span className="font-body text-[12px] font-semibold text-[#10231a]">
                Slot 04
              </span>
              <span className="font-body text-[12px] text-[#5b6b60]">
                available
              </span>
            </div>

            {/* floating status badge — bottom left */}
            <div className="absolute -left-3 bottom-10 flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-2 shadow-[0_4px_16px_rgba(16,35,26,0.10)] sm:-left-6">
              <BatteryCharging size={14} className="text-[#f5a623]" />
              <span className="font-body text-[12px] font-semibold text-[#10231a]">
                9 of 12
              </span>
              <span className="font-body text-[12px] text-[#5b6b60]">
                fully charged
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-8 left-[23px] top-8 hidden w-px bg-[#10231a]/10 sm:block"
            />
            <ol className="flex flex-col gap-5">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="group relative flex items-start gap-4 rounded-2xl border border-black/[0.05] bg-white p-5 transition-colors duration-300 hover:border-[#2fa84b]/40 sm:pl-6"
                  >
                    <span className="font-body absolute -left-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#10231a] text-[11px] font-bold text-white sm:left-3 sm:top-1/2 sm:-translate-y-1/2">
                      {i + 1}
                    </span>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2fa84b]/10 text-[#1f7a37] transition-transform duration-300 group-hover:scale-105 sm:ml-6">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-body text-[16px] font-semibold text-[#10231a]">
                        {step.title}
                      </h3>
                      <p className="font-body mt-1 text-[14px] leading-relaxed text-[#5b6b60]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Stat strip                                                     */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-14 grid grid-cols-1 gap-3 rounded-2xl border border-black/[0.05] bg-white p-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-black/[0.06] sm:p-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-0 py-2 sm:justify-center sm:px-6"
              >
                <Icon size={20} className="shrink-0 text-[#2fa84b]" />
                <div>
                  <p className="font-body text-[18px] font-bold leading-none text-[#10231a]">
                    {stat.value}
                  </p>
                  <p className="font-body mt-1 text-[12px] leading-none text-[#5b6b60]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* CTA                                                            */}
        {/* -------------------------------------------------------------- */}
        {/* <div className="mt-10 flex justify-center">
          <a
            href="#find-a-station"
            className="font-body inline-flex items-center gap-2 rounded-full bg-[#10231a] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1f7a37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fa84b]"
          >
            Find a swap station near you
          </a>
        </div> */}
      </div>

      <style jsx>{`
        .badge-pulse {
          box-shadow: 0 0 0 0 rgba(47, 168, 75, 0.55);
          animation: pulse 2.2s ease-out infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(47, 168, 75, 0.45);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(47, 168, 75, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(47, 168, 75, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .badge-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}