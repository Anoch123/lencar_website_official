"use client";

import { bssPoints } from "@/lib/constants/bssPoints";
import { useEffect, useMemo, useState } from "react";

const REGIONS = ["All", ...Array.from(new Set(bssPoints.map((p) => p.region)))];
const ALL_DISTRICTS = "All";

export default function BSSPointsList({
  selectedId,
  onSelect,
}: {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeDistrict, setActiveDistrict] = useState(ALL_DISTRICTS);

  // Districts available depend on the selected province — recompute whenever
  // the region changes, and always keep "All" as the first option.
  const availableDistricts = useMemo(() => {
    const pool =
      activeRegion === "All"
        ? bssPoints
        : bssPoints.filter((p) => p.region === activeRegion);
    return [ALL_DISTRICTS, ...Array.from(new Set(pool.map((p) => p.district))).sort()];
  }, [activeRegion]);

  // If the current district isn't valid for the newly selected province
  // (e.g. switching from Western -> Northwestern), reset it to "All".
  useEffect(() => {
    if (!availableDistricts.includes(activeDistrict)) {
      setActiveDistrict(ALL_DISTRICTS);
    }
  }, [availableDistricts, activeDistrict]);

  const filteredPoints = useMemo(() => {
    return bssPoints.filter((point) => {
      const matchesRegion = activeRegion === "All" || point.region === activeRegion;
      const matchesDistrict =
        activeDistrict === ALL_DISTRICTS || point.district === activeDistrict;
      return matchesRegion && matchesDistrict;
    });
  }, [activeRegion, activeDistrict]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
                    ? "bg-[#0F4C81] text-white"
                    : "border border-[#e5e5e5] text-[#4a4a4d] hover:border-[#0b0b0c] hover:text-[#0b0b0c]"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* District selector — scoped to the selected province */}
        <label className="flex items-center gap-3 sm:shrink-0">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6b6b70]">
            District
          </span>
          <div className="relative">
            <select
              value={activeDistrict}
              onChange={(e) => setActiveDistrict(e.target.value)}
              className="font-body min-w-[180px] appearance-none border border-[#e5e5e5] bg-white py-2 pl-4 pr-9 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0b0b0c] transition-colors hover:border-[#0b0b0c] focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
            >
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district === ALL_DISTRICTS ? "All districts" : district}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b70]"
            >
              ▾
            </span>
          </div>
        </label>
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
                active ? "border-[#0F4C81]" : "border-[#e5e5e5]"
              }`}
            >
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F4C81]">
                  {point.region} · {point.district}
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
                  className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0b0b0c] transition-colors hover:text-[#0F4C81]"
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
          No BSS points for this selection yet.
        </p>
      )}
    </div>
  );
}