"use client";

import { useEffect, useRef, useState } from "react";
import { Home, Unplug, BatteryCharging, Clock, Zap, ShieldCheck } from "lucide-react";

const STEPS = [
    {
        icon: Unplug,
        title: "Pull the empty pack",
        note: "One latch, no tools. Slides straight out of the deck.",
    },
    {
        icon: Home,
        title: "Dock it at home",
        note: "Sets into the cradle by itself, standard wall outlet.",
    },
    {
        icon: BatteryCharging,
        title: "Grab a charged spare",
        note: "Keep a second pack topped up, swap in seconds.",
    },
];

const SPECS = [
    { icon: Clock, value: "8 SEC", label: "Average swap time" },
    { icon: Zap, value: "3.5 HRS", label: "Full charge, wall outlet" },
    { icon: ShieldCheck, value: "UL 2271", label: "Certified cell safety" },
];

const PACK_CELLS = 5;

function DockIllustration() {
    const ref = useRef<HTMLDivElement>(null);
    const [docked, setDocked] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    io.disconnect();
                    const t = setTimeout(() => setDocked(true), 350);
                    return () => clearTimeout(t);
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="relative flex h-[420px] w-full items-end justify-center overflow-hidden rounded-[14px] border border-black/[0.08] bg-[#f7f7f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:h-[480px]"
        >
            {/* faint blueprint grid, reads as engineered rather than decorative */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
            />

            {/* wall socket */}
            <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.12] bg-white shadow-sm">
                <span className="h-2 w-2 rounded-full bg-black/25" />
            </div>

            {/* cradle rails */}
            <div className="relative mb-10 flex h-[260px] w-[120px] items-end justify-between sm:h-[300px] sm:w-[140px]">
                <div className="h-full w-[6px] rounded-full bg-black/[0.08]" />
                <div className="h-full w-[6px] rounded-full bg-black/[0.08]" />
                <div className="absolute bottom-0 left-1/2 h-3 w-[136px] -translate-x-1/2 rounded-[3px] bg-black/[0.1] shadow-sm sm:w-[156px]" />

                {/* battery pack, travels down into the cradle */}
                <div
                    className="absolute left-1/2 w-[92px] -translate-x-1/2 rounded-[8px] border border-black/[0.1] bg-[#151517] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.35)] transition-transform duration-[1100ms] ease-out sm:w-[108px]"
                    style={{
                        top: docked ? "36px" : "-160px",
                        height: "230px",
                    }}
                >
                    <div className="absolute left-1/2 top-[-8px] h-2 w-8 -translate-x-1/2 rounded-t-[2px] bg-white/15" />

                    <div className="flex h-full flex-col-reverse gap-[4px] p-3">
                        {Array.from({ length: PACK_CELLS }).map((_, i) => (
                            <span
                                key={i}
                                className="w-full flex-1 rounded-[2px] transition-colors duration-500 ease-out"
                                style={{
                                    backgroundColor: docked ? "#e30613" : "rgba(255,255,255,0.06)",
                                    transitionDelay: docked ? `${900 + i * 140}ms` : "0ms",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* status readout */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 shadow-sm">
                <span
                    className="h-[7px] w-[7px] rounded-full transition-colors duration-500"
                    style={{
                        backgroundColor: docked ? "#e30613" : "rgba(0,0,0,0.15)",
                        transitionDelay: docked ? "1600ms" : "0ms",
                    }}
                />
                <span
                    className="font-mono text-[11px] font-bold tracking-[0.24em] transition-colors duration-500"
                    style={{ color: docked ? "#0a0a0a" : "rgba(0,0,0,0.3)", transitionDelay: docked ? "1600ms" : "0ms" }}
                >
                    {docked ? "CHARGING" : "STANDBY"}
                </span>
            </div>
        </div>
    );
}

export default function HomeSwapping() {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
                    {/* copy + steps */}
                    <div className="flex flex-col justify-center">
                        <p className="font-mono inline-flex w-fit items-center gap-2 text-[12px] font-bold tracking-[0.24em] text-[#e30613]">
                            <span className="relative flex h-[7px] w-[7px]">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e30613] opacity-60" />
                                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#e30613]" />
                            </span>
                            HOME SWAPPING
                        </p>
                        <h2 className="font-display mt-4 max-w-md text-[30px] font-black uppercase italic leading-[1.05] tracking-tight text-black sm:text-[38px]">
                            Never Wait
                            <br />
                            For A Charge.
                        </h2>
                        <p className="font-body mt-5 max-w-md text-[15px] leading-relaxed text-black/45">
                            No stations, no queues. Keep a spare pack charging at home and swap it into the
                            deck in the time it takes to lock up.
                        </p>

                        <ol className="mt-10 flex flex-col gap-6">
                            {STEPS.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <li key={step.title} className="flex gap-4">
                                        <span className="font-mono mt-[2px] text-[13px] font-bold text-black/25">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="mt-[1px] text-[#e30613]">
                                            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                                        </span>
                                        <div>
                                            <p className="font-body text-[14px] font-semibold text-black">
                                                {step.title}
                                            </p>
                                            <p className="font-body mt-1 text-[13px] leading-relaxed text-black/40">
                                                {step.note}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    {/* dock illustration */}
                    <DockIllustration />
                </div>

                {/* spec strip — datasheet-style credibility line */}
                <div className="mt-16 grid grid-cols-1 divide-y divide-black/[0.08] rounded-[10px] border border-black/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {SPECS.map((spec) => {
                        const Icon = spec.icon;
                        return (
                            <div key={spec.label} className="flex items-center gap-4 px-6 py-6">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f7f6] text-[#e30613]">
                                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                                </span>
                                <div>
                                    <p className="font-mono text-[16px] font-bold tracking-tight text-black">
                                        {spec.value}
                                    </p>
                                    <p className="font-body text-[12px] text-black/40">{spec.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="font-body mt-6 text-center text-[12px] text-black/30">
                    Compatible with every Lencar model · pack certified to UL 2271
                </p>
            </div>
        </section>
    );
}