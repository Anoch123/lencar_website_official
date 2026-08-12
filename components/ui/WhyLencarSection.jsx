"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  MapPin,
  ShieldCheck,
  Smartphone,
  X,
  Search,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { bssPoints } from "@/lib/constants/bssPoints";

/* ------------------------------------------------------------------ */
/* Feature data                                                       */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    id: "battery-swap",
    icon: Wrench,
    title: "Battery Swapping Technology",
    description:
      "No more waiting for hours to recharge. Simply swap your battery at a Lencar Battery Swapping Station and get back on the road in just a few minutes.",
    popupType: "video",
  },
  {
    id: "swapping-network",
    icon: MapPin,
    title: "Swapping Network",
    description:
      "A growing network of Battery Swapping Stations across Sri Lanka. Find the nearest one and get moving in minutes.",
    popupType: "network",
  },
  {
    id: "powertrain",
    icon: ShieldCheck,
    title: "Powertrain",
    description:
      "A 5-year warranty covers the powertrain. Built for durability, backed by reliable support, and designed for long-term peace of mind.",
    popupType: "powertrain",
  },
  {
    id: "smart-app",
    icon: Smartphone,
    title: "Smart Mobile App",
    description:
      "Stay connected to your scooter anytime. Check battery level, track rides, find nearby battery swap stations, and manage your scooter — all from the Lencar app.",
    popupType: "app",
  },
];

/* ------------------------------------------------------------------ */
/* Modal — heading passed down as a prop from the parent               */
/* ------------------------------------------------------------------ */

function Modal({ isOpen, onClose, heading, children }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-heading"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* panel */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141416] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-7 py-6">
          <h3
            id="feature-modal-heading"
            className="font-display text-2xl font-black uppercase italic tracking-tight text-[#f5f4f1]"
          >
            {heading}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#c7c7cc] transition-colors hover:bg-[#01e044]/15 hover:text-[#01e044] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01e044]"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-7 py-7">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Popup content — one per feature type                                */
/* ------------------------------------------------------------------ */

function BatterySwapVideoContent() {
  return (
    <div className="overflow-hidden rounded-2xl bg-black">
      <video
        className="aspect-video w-full"
        src="/videos/battery-swap-demo.mp4"
        poster="/images/why_choose_us.png"
        controls
        playsInline
      />
    </div>
  );
}

const MAX_VISIBLE_STATIONS = 6;

function SwappingNetworkContent() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = bssPoints.filter((p) =>
    `${p.name} ${p.region} ${p.address}`.toLowerCase().includes(q)
  );
  const visible = filtered.slice(0, MAX_VISIBLE_STATIONS);
  const remaining = filtered.length - visible.length;

  return (
    <div className="flex flex-col gap-5">
      <p className="font-body text-sm leading-relaxed text-[#a3a3a8]">
        {bssPoints.length}+ Battery Swapping Stations across Sri Lanka. Search
        by area or station name to find the closest one.
      </p>

      <div className="relative">
        <Search
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b70]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by area, region, or station"
          className="font-body w-full rounded-xl border border-white/[0.08] bg-[#0b0b0c] py-2.5 pl-10 pr-4 text-sm text-[#f5f4f1] placeholder:text-[#6b6b70] focus:outline-none focus:ring-2 focus:ring-[#01e044]/50"
        />
      </div>

      <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
        {visible.length === 0 && (
          <li className="font-body py-4 text-center text-sm text-[#6b6b70]">
            No stations match "{query}".
          </li>
        )}
        {visible.map((station) => (
          <li
            key={station.id}
            className="rounded-xl border border-white/[0.06] bg-[#0b0b0c] px-4 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-body truncate text-sm font-semibold text-[#f5f4f1]">
                  {station.name}
                </p>
                <p className="font-body mt-0.5 text-xs leading-relaxed text-[#a3a3a8]">
                  {station.address}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#01e044]">
                  <Clock size={12} strokeWidth={2.5} />
                  <span className="font-body">{station.hours}</span>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  station.mapsQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body shrink-0 rounded-full border border-white/[0.1] px-3 py-1.5 text-xs font-semibold text-[#f5f4f1] transition-colors hover:border-[#01e044]/50 hover:text-[#01e044]"
              >
                Directions
              </a>
            </div>
          </li>
        ))}
        {remaining > 0 && (
          <li className="font-body py-1 text-center text-xs text-[#6b6b70]">
            +{remaining} more station{remaining === 1 ? "" : "s"} — refine
            your search or open the full locator
          </li>
        )}
      </ul>

      <Link
        href="/bss-points"
        className="font-body mt-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#01e044] px-5 py-3 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#02c93d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01e044]"
      >
        Open full BSS locator
        <ArrowUpRight size={15} strokeWidth={2.5} />
      </Link>
    </div>
  );
}

function PowertrainContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/powertrain.webp"
          alt="Lencar powertrain cutaway"
          fill
          sizes="(min-width: 640px) 32rem, 100vw"
          className="object-contain p-2 rounded"
        />
      </div>
      <p className="font-body text-sm leading-relaxed text-[#a3a3a8]">
        Engineered for Sri Lankan roads and backed by a 5-year powertrain
        warranty.
      </p>
    </div>
  );
}

function SmartAppContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/downloading.png"
          alt="Lencar smart mobile app preview"
          fill
          sizes="(min-width: 640px) 32rem, 100vw"
          className="object-contain p-2"
        />
      </div>
      <Link
        href="/lencar-app"
        className="font-body inline-flex items-center justify-center gap-1.5 rounded-full bg-[#01e044] px-5 py-3 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#02c93d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01e044]"
      >
        Go to the Lencar App page
        <ArrowUpRight size={15} strokeWidth={2.5} />
      </Link>
    </div>
  );
}

function PopupContent({ type }) {
  switch (type) {
    case "video":
      return <BatterySwapVideoContent />;
    case "network":
      return <SwappingNetworkContent />;
    case "powertrain":
      return <PowertrainContent />;
    case "app":
      return <SmartAppContent />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function WhyLencarSection() {
  const [activeFeature, setActiveFeature] = useState(null);

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
              src="/images/why_choose_us.png"
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
                Why Choose us?
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

              {FEATURES.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  onOpen={() => setActiveFeature(feature)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!activeFeature}
        onClose={() => setActiveFeature(null)}
        heading={activeFeature?.title}
      >
        {activeFeature && <PopupContent type={activeFeature.popupType} />}
      </Modal>
    </section>
  );
}

function FeatureCard({ feature, onOpen }) {
  const Icon = feature.icon;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative rounded-2xl border border-white/[0.06] bg-[#141416] p-6 text-left transition-colors duration-300 hover:border-[#01e044]/40 hover:bg-[#17171a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01e044] sm:pl-8"
    >
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
        </div>
      </div>
    </button>
  );
}