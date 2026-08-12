"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MapPinned, BatteryCharging, type LucideIcon } from "lucide-react";

/**
 * Fonts (add via next/font in your root layout):
 *   Display: Barlow Condensed / Oswald  -> --font-display
 *   Body:    Manrope / Inter            -> --font-body
 *   Mono:    JetBrains Mono             -> --font-mono
 */

const FEATURES: {
  id: number;
  tab: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}[] = [
    {
      id: 1,
      tab: "SCREEN 01",
      title: "Battery percentage",
      desc: "View your scooter's battery level in real time, so you always know how much power is left.",
      icon: MapPinned,
      image: "/images/phone3.jpeg",
      imageAlt: "lencar_app_battery_percentage_screen",
    },
    {
      id: 2,
      tab: "SCREEN 02",
      title: "Remaining riding distance ",
      desc: "See how far you can ride with your current battery charge before needing to swap.",
      icon: BatteryCharging,
      image: "/images/phone3.jpeg",
      imageAlt: "lencar_app_remaining_distance_screen",
    },
    {
      id: 3,
      tab: "SCREEN 02",
      title: "Nearest battery swapping station ",
      desc: "Easily find the nearest Lencar Battery Swapping Station with just a few taps.",
      icon: BatteryCharging,
      image: "/images/phone4.jpeg",
      imageAlt: "lencar_app_nearest_bss_screen",
    },
    {
      id: 4,
      tab: "SCREEN 02",
      title: "Payment Details",
      desc: "View your payment history and manage your battery swapping payments securely within the app.",
      icon: BatteryCharging,
      image: "/images/lencar_app_payment_details.png",
      imageAlt: "lencar_app_payment_details",
    },
    {
      id: 5,
      tab: "SCREEN 02",
      title: "Notifications",
      desc: "Receive instant alerts about successful swaps, payments, and important updates.",
      icon: BatteryCharging,
      image: "/images/lencar_app_notifications.png",
      imageAlt: "lencar_app_notifications",
    },
  ];

export default function FeatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Clamp so the last screen holds once reached — no wraparound.
    const idx = Math.min(FEATURES.length - 1, Math.max(0, Math.floor(v * FEATURES.length)));
    setActiveIndex(idx);
  });

  const feature = FEATURES[activeIndex];
  const Icon = feature.icon;

  return (
    <div
      ref={containerRef}
      style={{ height: `${FEATURES.length * 150}vh` }}
      className="relative bg-white font-[family-name:var(--font-body),ui-sans-serif]"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden py-10 pl-5 sm:pl-10 md:pl-16">
        {/* Ambient glow behind the image */}
        <div className="pointer-events-none absolute right-[8%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FFB25B]/[0.08] blur-[100px]" />

        <div className="grid h-full w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Copy column */}
          <div className="relative order-last h-[200px] w-full pr-5 sm:h-[180px] sm:pr-10 md:order-first md:h-[280px] md:pr-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center space-y-3"
              >

                <h3 className="font-[family-name:var(--font-display),ui-sans-serif] text-3xl font-bold uppercase leading-[1.05] tracking-wide text-black sm:text-4xl md:mt-0 mt-8 md:text-5xl">
                  {feature.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-black/70 sm:text-base">
                  {feature.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Onboarding-style nav dots, doubling as scroll progress */}
            <div className="mt-8 flex items-center gap-2 md:absolute md:-bottom-2 md:mt-0">
              {FEATURES.map((f, idx) => (
                <div
                  key={f.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex
                      ? "w-8 bg-[#FFB25B] shadow-[0_0_10px_1px_rgba(255,178,91,0.6)]"
                      : "w-1.5 bg-black/15"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Image column — now fills the full sticky height */}
          <div className="relative order-first h-[45vh] w-full sm:h-[55vh] md:order-last md:h-full">
            <div className="relative h-full w-full overflow-hidden md:rounded-l-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={feature.id}
                  src={feature.image}
                  alt={feature.imageAlt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}