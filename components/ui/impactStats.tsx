"use client";

import { useEffect, useRef, useState } from "react";
import { Route, Leaf } from "lucide-react";

/** Single odometer digit — rolls into place like a real trip meter. */
function DigitTile({ char, active, delay }: { char: string; active: boolean; delay: number }) {
    const isDigit = /[0-9]/.test(char);
    return (
        <span
            className={`font-mono relative flex h-[52px] w-[34px] items-center justify-center overflow-hidden rounded-[3px] text-[32px] font-bold tabular-nums sm:h-[64px] sm:w-[42px] sm:text-[40px] ${
                isDigit ? "bg-[#151517] text-white" : "text-black/25"
            }`}
        >
            <span
                className="transition-transform duration-500 ease-out"
                style={{
                    transform: active ? "translateY(0)" : "translateY(110%)",
                    opacity: active ? 1 : 0,
                    transitionDelay: `${delay}ms`,
                }}
            >
                {char}
            </span>
            {isDigit && (
                <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/40" />
            )}
        </span>
    );
}

/** Gauge badge — a speedometer-style ring around the metric icon. */
function GaugeBadge({ icon }: { icon: React.ReactNode }) {
    return (
        <div className="relative flex h-14 w-14 items-center justify-center">
            <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-[135deg]">
                <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    strokeDasharray="113 151"
                    strokeLinecap="round"
                />
                <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="none"
                    stroke="#e30613"
                    strokeWidth="2"
                    strokeDasharray="85 151"
                    strokeLinecap="round"
                />
            </svg>
            <span className="text-[#e30613]">{icon}</span>
        </div>
    );
}

function TripMeter({
    icon,
    value,
    unit,
    code,
    label,
    note,
    align,
}: {
    icon: React.ReactNode;
    value: number;
    unit: string;
    code: string;
    label: string;
    note: string;
    align: "left" | "right";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActive(true);
                    io.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const digits = Math.round(value)
        .toLocaleString("en-US")
        .split("");

    return (
        <div
            ref={ref}
            className={`flex flex-1 flex-col gap-5 py-12 ${
                align === "left" ? "items-start sm:pr-10" : "items-start sm:items-end sm:pl-10"
            }`}
        >
            <div className={`flex items-center gap-3 ${align === "right" ? "sm:flex-row-reverse" : ""}`}>
                <GaugeBadge icon={icon} />
                <div className={align === "right" ? "sm:text-right" : ""}>
                    <p className="font-mono text-[11px] font-bold tracking-[0.24em] text-black/35">{code}</p>
                    <p className="font-body text-[13px] font-semibold uppercase tracking-[0.06em] text-black/70">
                        {label}
                    </p>
                </div>
            </div>

            <div className={`flex items-end gap-2 ${align === "right" ? "sm:flex-row-reverse" : ""}`}>
                <div className="flex gap-[3px]">
                    {digits.map((char, i) => (
                        <DigitTile key={i} char={char} active={active} delay={i * 70} />
                    ))}
                </div>
                <span className="font-mono mb-2 text-[13px] font-bold tracking-[0.1em] text-[#e30613]">
                    {unit}
                </span>
            </div>

            <p
                className={`font-body max-w-[220px] text-[13px] leading-relaxed text-black/35 ${
                    align === "right" ? "sm:text-right" : ""
                }`}
            >
                {note}
            </p>
        </div>
    );
}

export default function ImpactStats({ distanceKm }: { distanceKm?: number }) {
    const co2PerKm = 40;
    const dist = distanceKm ?? 0;
    const co2SavedKg = (co2PerKm * dist) / 1000;

    return (
        <section className="relative overflow-hidden bg-[#fffff]">
            {/* asphalt grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                    backgroundSize: "3px 3px",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-6xl px-6 pt-16 lg:px-8">
                <p className="font-mono inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.24em] text-[#e30613]">
                    <span className="relative flex h-[7px] w-[7px]">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e30613] opacity-60" />
                        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#e30613]" />
                    </span>
                    LIVE FLEET TELEMETRY
                </p>
                <h2 className="font-display mt-4 max-w-md text-[30px] font-black uppercase italic leading-[1.05] tracking-tight text-black sm:text-[38px]">
                    On The Road.
                    <br />
                    On The Record.
                </h2>
            </div>

            {/* trip meter cluster split by an animated lane divider */}
            <div className="relative mx-auto mt-6 max-w-6xl px-6 lg:px-8">
                <div className="flex flex-col divide-y divide-black/10 sm:flex-row sm:divide-x sm:divide-y-0">
                    <TripMeter
                        icon={<Route className="h-4 w-4" strokeWidth={2.4} />}
                        value={dist}
                        unit="KM"
                        code="DIST"
                        label="Distance traveled"
                        note="Across every Lencar rider, every day."
                        align="left"
                    />
                    <TripMeter
                        icon={<Leaf className="h-4 w-4" strokeWidth={2.4} />}
                        value={co2SavedKg}
                        unit="KG"
                        code="CO2"
                        label="Emissions saved"
                        note="Compared to equivalent petrol scooters."
                        align="right"
                    />
                </div>

                {/* center lane marking, runs the height of the cluster */}
                <div
                    className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[3px] -translate-x-1/2 sm:block"
                    style={{
                        backgroundImage: "repeating-linear-gradient(to bottom, #0F4C81 0 16px, transparent 16px 32px)",
                        animation: "lane-move 1.2s linear infinite",
                    }}
                    aria-hidden="true"
                />
            </div>

            <style>{`
                @keyframes lane-move {
                    from { background-position: 0 0; }
                    to { background-position: 0 32px; }
                }
            `}</style>
        </section>
    );
}