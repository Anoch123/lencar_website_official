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
  eyebrow: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: ArrowDownToLine,
    eyebrow: "Step 01",
    title: "10 Seconds",
    description:
      "Remove the depleted battery from your scooter and place it into an available slot at the battery swapping station.",
  },
  {
    icon: BatteryCharging,
    eyebrow: "Step 02",
    title: "20 Seconds",
    description:
      "The station will automatically unlock a fully charged battery. Take it out and insert it into your scooter.",
  },
  {
    icon: Bike,
    eyebrow: "Step 03",
    title: "30 Seconds",
    description:
      "You're ready to go again in under a minute, with a fully charged battery and no long charging wait.",
  },
];

const STATS = [
  { icon: Clock3, value: "< 30 sec", label: "average swap time" },
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
            Swap Your Battery,
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
        <div className="mt-14 grid gap-12 lg:grid-cols-[0.65fr_1.35fr] rounded-2xl border border-black/[0.05] sm:divide-x sm:divide-black/[0.06] ">
          {/* Cabinet image with live-status badges */}
          <div className="relative mx-auto w-full max-w-full sm:max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(16,35,26,0.04)] sm:p-6 lg:p-8">
              <div className="relative aspect-square w-full min-h-[320px] sm:min-h-[450px] lg:min-h-[600px]">
                <Image
                  src="/images/BSS.png"
                  alt="Lencar battery swap cabinet with charged battery slots"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                  className="object-contain scale-110 rounded-[28px] sm:scale-100"
                  priority
                />
              </div>
            </div>

            {/* floating status badge — top right */}
            <div className="absolute right-1 top-8 flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-2 shadow-[0_4px_16px_rgba(16,35,26,0.10)] sm:-right-6">
              <span className="badge-pulse h-2 w-2 shrink-0 rounded-full bg-[#2fa84b]" />
              <span className="font-body text-[12px] font-semibold text-[#10231a]">
                Slot 04
              </span>
              <span className="font-body text-[12px] text-[#5b6b60]">
                available
              </span>
            </div>

          </div>

          {/* Steps — vertical timeline, alternating left/right */}
          <div className="relative py-4">
            {/* central vertical line */}
            <div
              aria-hidden
              className="absolute left-6 top-3 bottom-3 hidden w-[3px] rounded-full bg-[#2fa84b] sm:block sm:left-1/2 sm:-translate-x-1/2"
            />

            <ol className="flex flex-col gap-10 sm:gap-14">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <li key={step.title} className="relative">
                    {/* dot on the line */}
                    <span
                      aria-hidden
                      className="absolute left-6 top-1 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-white bg-[#2fa84b] shadow-[0_2px_8px_rgba(47,168,75,0.45)] sm:block sm:left-1/2"
                    />

                    <div
                      className={`relative ml-0 max-w-lg rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(16,35,26,0.05)] transition-all duration-300 hover:border-[#2fa84b]/50 hover:shadow-[0_6px_20px_rgba(16,35,26,0.08)] ${
                        isLeft
                          ? "sm:mr-auto sm:pr-8 sm:text-left sm:w-[calc(50%-2.5rem)]"
                          : "sm:ml-auto sm:pl-8 sm:text-left sm:w-[calc(50%-2.5rem)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2fa84b]/10 text-[#1f7a37]">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <p className="font-body text-xs font-extrabold uppercase tracking-[0.2em] text-[#2fa84b]">
                          {step.eyebrow}
                        </p>
                      </div>
                      <h3 className="font-display mt-3 text-[22px] font-extrabold leading-tight tracking-tight text-[#10231a] sm:text-[26px]">
                        {step.title}
                      </h3>
                      <p className="font-body mt-2 text-[15px] leading-relaxed text-[#3f4c44] sm:text-[15.5px]">
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
                  <p className="font-body sm:text-[20px] text-[18px] font-bold leading-none text-[#10231a]">
                    {stat.value}
                  </p>
                  <p className="font-body mt-1 text-[15px] text-[12px] leading-none text-[#5b6b60]">
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