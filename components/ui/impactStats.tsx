"use client";

import { useEffect, useRef, useState } from "react";
import { Route, Leaf, ChevronRight } from "lucide-react";
import { useScooterDistance } from "@/hooks/useScooterDistance";

// Full precision, comma-grouped — no compact ("2.1M") abbreviation.
const fullFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
});

// Renders a value as individual characters, each remounted (and therefore
// re-animated) whenever `tick` changes — the split-flap "live" effect.
function FlipText({ text, distance }: { text: string; distance: number }) {
    return (
        <span className="stat-flip">
            {text.split("").map((ch, i) => (
                <span key={`${distance.toFixed(1)}-${i}`} className="stat-flip__char text-[#01e044]">
                    {ch}
                </span>
            ))}
        </span>
    );
}

function StatBlock({
    icon,
    value,
    unit,
    label,
    active,
    distance,
}: {
    icon: React.ReactNode;
    value: number;
    unit: string;
    label: string;
    active: boolean;
    distance: number;
}) {
    const display = fullFormatter.format(value);

    return (
        <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#7CFF6B]/30 bg-[#7CFF6B]/10 text-[#01e044]">
                {icon}
            </span>
            <div className="flex flex-col leading-none">
                <span className="font-body flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#01e044]">
                    {label}
                    <span className="stat-live-dot" aria-hidden="true" />
                </span>
                <span className="mt-1.5 flex items-baseline gap-1.5">
                    <span
                        className="font-mono text-[18px] font-bold tabular-nums text-white transition-opacity duration-500 ease-out"
                        style={{ opacity: active ? 1 : 0 }}
                    >
                        <FlipText text={display} distance={distance} />
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-[0.08em] text-[#01e044]">
                        {unit}
                    </span>
                </span>
            </div>
        </div>
    );
}

export default function ImpactStats({ distanceKm }: { distanceKm?: number }) {
    const co2PerKm = 40;

    const { distance, active, setActive } = useScooterDistance(distanceKm);
    const co2SavedKg = (co2PerKm * distance) / 1000;

    const placeholderRef = useRef<HTMLDivElement>(null);
    const [pinned, setPinned] = useState(false);
    // Whether the pinned panel is tucked away to the side (only the tab shows).
    const [collapsed, setCollapsed] = useState(true);

    // Show immediately on first load, don't wait for a scroll-triggered
    // IntersectionObserver callback.
    useEffect(() => {
        setActive(true);
    }, [setActive]);

    // Reveal once the bar first scrolls into view (kept as a fallback/guard
    // in case the hero isn't in view on mount for some layouts).
    useEffect(() => {
        const el = placeholderRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setActive(true);
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [setActive]);

    // Pin to the top of the viewport once its normal spot scrolls above it.
    useEffect(() => {
        const el = placeholderRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                const nowPinned = !entry.isIntersecting && entry.boundingClientRect.top < 0;
                setPinned(nowPinned);
                // Every time it freshly becomes pinned, snap it back to the
                // collapsed (tucked-to-the-side) state — the user has to
                // tap the tab to bring it back out.
                if (nowPinned) setCollapsed(true);
            },
            { threshold: 0 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const statConfigs = [
        {
            key: "distance",
            icon: <Route className="h-3.5 w-3.5" strokeWidth={2.6} />,
            value: distance,
            unit: "KM",
            label: "Distance traveled",
        },
        {
            key: "co2",
            icon: <Leaf className="h-3.5 w-3.5" strokeWidth={2.6} />,
            value: co2SavedKg,
            unit: "KG CO₂",
            label: "Emissions saved",
        },
    ];

    const renderStats = () => (
        <div className="flex flex-col gap-4">
            {statConfigs.map((stat) => (
                <StatBlock
                    key={stat.key}
                    icon={stat.icon}
                    value={stat.value}
                    unit={stat.unit}
                    label={stat.label}
                    active={active}
                    distance={distance}
                />
            ))}
        </div>
    );

    return (
        <>
            {/* Keeps its layout slot even while the pinned copy is showing,
                so the hero doesn't jump when the bar detaches. */}
            <div ref={placeholderRef} style={{ visibility: pinned ? "hidden" : "visible" }}>
                {renderStats()}
            </div>

            {pinned && (
                <>
                    <button
                        type="button"
                        className="stat-tab"
                        onClick={() => setCollapsed((c) => !c)}
                        aria-label={collapsed ? "Show impact stats" : "Hide impact stats"}
                        aria-expanded={!collapsed}
                    >
                        <ChevronRight
                            className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
                            strokeWidth={2.6}
                        />
                    </button>

                    <div className={`stat-pinned ${collapsed ? "stat-pinned--collapsed" : ""}`}>
                        {renderStats()}
                    </div>
                </>
            )}

            <style jsx>{`
                .stat-tab {
                    position: fixed;
                    top: 16px;
                    left: 16px;
                    z-index: 61;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 9999px;
                    border: 1px solid rgba(124, 255, 107, 0.3);
                    background: rgba(1, 20, 8, 0.85);
                    color: #01e044;
                    cursor: pointer;
                    backdrop-filter: blur(6px);
                    transition: background 0.2s ease;
                }

                .stat-tab:hover {
                    background: rgba(1, 20, 8, 1);
                }

                .stat-pinned {
                    position: fixed;
                    top: 12px;
                    left: 60px;
                    z-index: 60;
                    background: rgba(1, 20, 8, 0.85);
                    backdrop-filter: blur(6px);
                    border-radius: 12px;
                    padding: 12px 16px;
                    opacity: 1;
                    transform: translateX(0);
                    pointer-events: auto;
                    transition:
                        transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 0.35s ease;
                }

                .stat-pinned--collapsed {
                    opacity: 0;
                    transform: translateX(-24px);
                    pointer-events: none;
                }

                :global(.stat-flip) {
                    display: inline-flex;
                    overflow: hidden;
                }

                :global(.stat-flip__char) {
                    display: inline-block;
                    transform-origin: 50% 100%;
                    animation: statFlipIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                @keyframes statFlipIn {
                    0% {
                        opacity: 0;
                        transform: rotateX(70deg) translateY(-35%);
                    }
                    60% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 1;
                        transform: rotateX(0deg) translateY(0);
                    }
                }

                :global(.stat-live-dot) {
                    width: 5px;
                    height: 5px;
                    border-radius: 9999px;
                    background: #7cff6b;
                    animation: statLivePulse 1.8s ease-out infinite;
                }

                @keyframes statLivePulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(124, 255, 107, 0.55);
                    }
                    70% {
                        box-shadow: 0 0 0 6px rgba(124, 255, 107, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(124, 255, 107, 0);
                    }
                }
            `}</style>
        </>
    );
}