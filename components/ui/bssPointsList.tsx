"use client";

import { bssPoints } from "@/lib/constants/bssPoints";
import { useMemo, useState } from "react";

const REGIONS = ["All", ...Array.from(new Set(bssPoints.map((p) => p.region)))];

export default function BSSPointsList({
  selectedId,
  onSelect,
}: {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [activeRegion, setActiveRegion] = useState("All");

  const filteredPoints = useMemo(() => {
    if (activeRegion === "All") return bssPoints;
    return bssPoints.filter((point) => point.region === activeRegion);
  }, [activeRegion]);

  return (
    <div>
      {/* Region filter */}
      <div className="flex flex-wrap gap-2">
        {REGIONS.map((region) => {
          const isActive = region === activeRegion;
          return (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`font-body px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors ${
                isActive
                  ? "bg-[#e30613] text-white"
                  : "border border-[#e5e5e5] text-[#4a4a4d] hover:border-[#0b0b0c] hover:text-[#0b0b0c]"
              }`}
            >
              {region}
            </button>
          );
        })}
      </div>

      {/* BSS point grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPoints.map((point) => {
          const active = point.id === selectedId;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelect?.(point.id)}
              className={`flex flex-col justify-between border p-6 text-left transition-shadow hover:shadow-lg ${
                active ? "border-[#e30613]" : "border-[#e5e5e5]"
              }`}
            >
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e30613]">
                  {point.region}
                </p>
                <h3 className="font-display mt-2 text-[19px] font-black uppercase italic tracking-tight text-[#0b0b0c]">
                  {point.name}
                </h3>
                <p className="font-body mt-3 text-[14px] leading-relaxed text-[#4a4a4d]">
                  {point.address}
                </p>
                <p className="font-body mt-1 text-[13px] text-[#6b6b70]">
                  {point.hours}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-5 border-t border-[#e5e5e5] pt-5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    point.mapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0b0b0c] transition-colors hover:text-[#e30613]"
                >
                  Get directions
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </button>
          );
        })}
      </div>

      {filteredPoints.length === 0 && (
        <p className="font-body mt-10 text-[14px] text-[#6b6b70]">
          No BSS points in this region yet.
        </p>
      )}
    </div>
  );
}