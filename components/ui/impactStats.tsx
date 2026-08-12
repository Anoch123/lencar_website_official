"use client";

import { useEffect, useRef, useState } from "react";
import { Route, Leaf } from "lucide-react";

const compactFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
});

function StatChip({
    icon,
    value,
    unit,
    label,
    active,
}: {
    icon: React.ReactNode;
    value: number;
    unit: string;
    label: string;
    active: boolean;
}) {
    const display = compactFormatter.format(value);

    return (
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-2 pr-3 backdrop-blur-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7CFF6B]">
                {icon}
            </span>
            <div className="flex items-baseline gap-1">
                <span
                    className="font-mono text-[15px] font-bold tabular-nums text-white transition-all duration-500 ease-out"
                    style={{
                        opacity: active ? 1 : 0,
                        transform: active ? "translateY(0)" : "translateY(6px)",
                    }}
                >
                    {display}
                </span>
                <span className="font-mono text-[10px] font-bold tracking-[0.08em] text-white/60">
                    {unit}
                </span>
            </div>
            <span className="font-body hidden text-[11px] font-medium uppercase tracking-[0.04em] text-white/45 sm:inline">
                {label}
            </span>
        </div>
    );
}

export default function ImpactStats({ distanceKm }: { distanceKm?: number }) {
    const co2PerKm = 40;
    const dist = distanceKm ?? 0;
    const co2SavedKg = (co2PerKm * dist) / 1000;

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

    return (
        <div ref={ref} className="flex flex-wrap items-center gap-2">
            <StatChip
                icon={<Route className="h-3 w-3" strokeWidth={2.6} />}
                value={dist}
                unit="KMs"
                label="Distance traveled"
                active={active}
            />
            <StatChip
                icon={<Leaf className="h-3 w-3" strokeWidth={2.6} />}
                value={co2SavedKg}
                unit="KG CO₂"
                label="Emissions saved"
                active={active}
            />
        </div>
    );
}