"use client";

import { bssPoints } from "@/lib/constants/bssPoints";
import { useEffect, useMemo, useState } from "react";

const REGIONS = Array.from(new Set(bssPoints.map((p) => p.region)));
const ALL_DISTRICTS = "All";

// Fixed marker colors per province, reused as the filter legend dot and the
// card index dot — the same map-legend motif as the dealer network list.
const REGION_PALETTE = ["#0F4C81", "#C77A26", "#3F7D5C", "#8A4F9E", "#B0483A"];
const REGION_COLOR: Record<string, string> = Object.fromEntries(
  REGIONS.map((region, i) => [region, REGION_PALETTE[i % REGION_PALETTE.length]])
);

function regionColor(region: string) {
  return REGION_COLOR[region] ?? "#4A4A4D";
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Great-circle distance between two coordinates, in kilometers.
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

type LocationStatus = "idle" | "requesting" | "granted" | "denied" | "error" | "unsupported";

export default function BSSPointsList({
  selectedId,
  onSelect,
}: {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0]);
  const [activeDistrict, setActiveDistrict] = useState(ALL_DISTRICTS);

  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [nearestId, setNearestId] = useState<string | null>(null);
  const [nearestKm, setNearestKm] = useState<number | null>(null);

  // Districts available depend on the selected province — recompute whenever
  // the region changes, and always keep "All" as the first option.
  const availableDistricts = useMemo(() => {
    const pool = bssPoints.filter((p) => p.region === activeRegion);
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
      const matchesRegion = point.region === activeRegion;
      const matchesDistrict =
        activeDistrict === ALL_DISTRICTS || point.district === activeDistrict;
      return matchesRegion && matchesDistrict;
    });
  }, [activeRegion, activeDistrict]);

  function findNearest() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        let closest = bssPoints[0];
        let closestKm = haversineKm(latitude, longitude, closest.lat, closest.lng);

        for (const point of bssPoints) {
          const km = haversineKm(latitude, longitude, point.lat, point.lng);
          if (km < closestKm) {
            closest = point;
            closestKm = km;
          }
        }

        setNearestId(closest.id);
        setNearestKm(closestKm);
        setLocationStatus("granted");

        // Bring the nearest point into view and select it.
        setActiveRegion(closest.region);
        setActiveDistrict(closest.district);
        onSelect?.(closest.id);
      },
      (error) => {
        setLocationStatus(error.code === error.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div>
      {/* Result readout */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#0b0b0c] pb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[34px] font-black italic leading-none tabular-nums text-[#0b0b0c]">
            {pad(filteredPoints.length)}
          </span>
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6b6b70]">
            {filteredPoints.length === 1 ? "Point" : "Points"}
            {" · "}{activeRegion}
            {activeDistrict !== ALL_DISTRICTS && <> · {activeDistrict}</>}
          </span>
        </div>

        {/* Locate control */}
        <div className="flex items-center gap-3">
          {locationStatus === "granted" && nearestKm !== null && (
            <span className="font-body text-[11px] uppercase tracking-[0.1em] text-[#0F4C81]">
              Nearest is {nearestKm < 1 ? `${Math.round(nearestKm * 1000)} m` : `${nearestKm.toFixed(1)} km`} away
            </span>
          )}
          {locationStatus === "denied" && (
            <span className="font-body text-[11px] uppercase tracking-[0.1em] text-[#B0483A]">
              Location access denied
            </span>
          )}
          {locationStatus === "error" && (
            <span className="font-body text-[11px] uppercase tracking-[0.1em] text-[#B0483A]">
              Couldn't get your location
            </span>
          )}
          {locationStatus === "unsupported" && (
            <span className="font-body text-[11px] uppercase tracking-[0.1em] text-[#B0483A]">
              Location isn't supported on this device
            </span>
          )}
          <button
            type="button"
            onClick={findNearest}
            disabled={locationStatus === "requesting"}
            className="font-body inline-flex items-center gap-2 border border-[#0b0b0c] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:bg-[#0b0b0c] hover:text-white disabled:cursor-wait disabled:opacity-50"
          >
            <span aria-hidden="true">⌖</span>
            {locationStatus === "requesting" ? "Locating…" : "Find nearest to me"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Province filter — underline tabs with a legend dot per region */}
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {REGIONS.map((region) => {
            const isActive = region === activeRegion;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`font-body group flex items-center gap-2 border-b-2 pb-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "border-[#0b0b0c] text-[#0b0b0c]"
                    : "border-transparent text-[#8a8a8f] hover:border-[#d8d5cd] hover:text-[#4a4a4d]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rounded-full transition-opacity"
                  style={{
                    backgroundColor: regionColor(region),
                    opacity: isActive ? 1 : 0.35,
                  }}
                />
                {region}
              </button>
            );
          })}
        </div>

        {/* District selector, scoped to the selected province */}
        <label className="flex items-center gap-3 font-body text-[12px] uppercase tracking-[0.1em] text-[#6b6b70]">
          District
          <span className="text-[#d8d5cd]">/</span>
          <div className="relative">
            <select
              value={activeDistrict}
              onChange={(e) => setActiveDistrict(e.target.value)}
              className="font-body min-w-[170px] appearance-none border-0 border-b border-[#d8d5cd] bg-transparent py-1 pl-0 pr-7 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#0b0b0c] focus:border-[#0F4C81] focus:outline-none"
            >
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district === ALL_DISTRICTS ? "All districts" : district}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#6b6b70]"
            >
              ▾
            </span>
          </div>
        </label>
      </div>

      {/* BSS point grid */}
      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {filteredPoints.map((point, i) => {
          const active = point.id === selectedId;
          const isNearest = point.id === nearestId && locationStatus === "granted";
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelect?.(point.id)}
              aria-pressed={active}
              className={`group relative flex flex-col justify-between p-6 pt-10 text-left transition-colors ${
                active ? "bg-[#0F4C81]/[0.04]" : "bg-white hover:bg-[#fafaf9]"
              }`}
            >
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] bg-[#0F4C81]"
                />
              )}

              <span
                aria-hidden="true"
                className={`font-display pointer-events-none absolute left-5 top-2 select-none text-[46px] font-black italic leading-none transition-colors ${
                  active ? "text-[#0F4C81]/[0.12]" : "text-[#0b0b0c]/[0.05] group-hover:text-[#0b0b0c]/[0.08]"
                }`}
              >
                {pad(i + 1)}
              </span>

              {isNearest && (
                <span className="font-body absolute right-5 top-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0F4C81]">
                  Nearest to you
                </span>
              )}

              <div className="relative">
                <p className="font-body flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b6b70]">
                  <span
                    aria-hidden="true"
                    className="h-[6px] w-[6px] rounded-full"
                    style={{ backgroundColor: regionColor(point.region) }}
                  />
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
                {isNearest && nearestKm !== null && (
                  <p className="font-body mt-1 text-[13px] font-semibold text-[#0F4C81]">
                    {nearestKm < 1 ? `${Math.round(nearestKm * 1000)} m away` : `${nearestKm.toFixed(1)} km away`}
                  </p>
                )}
              </div>

              <div className="relative mt-6 flex items-center gap-5 border-t border-[#e5e5e5] pt-5">
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
        <div className="mt-10 border border-dashed border-[#d8d5cd] px-6 py-10 text-center">
          <p className="font-body text-[14px] text-[#6b6b70]">
            No BSS points for this selection yet.
          </p>
          <button
            type="button"
            onClick={() => setActiveDistrict(ALL_DISTRICTS)}
            className="font-body mt-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0F4C81] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}