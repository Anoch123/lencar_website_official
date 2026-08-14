"use client";

import { useEffect, useMemo, useState } from "react";

type Dealer = {
  name: string;
  region: string;
  district: string;
  address: string;
  phone: string;
  hours: string;
  mapsQuery: string;
  dealer_name: string;
};

const DEALERS: Dealer[] = [
  {
    name: "Agalawatta",
    region: "Western",
    district: "Kalutara",
    address: "226/01, Yatiyana, Agalawatta",
    phone: "+94 757 979 938",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "226/01, Yatiyana, Agalawatta, Sri Lanka",
    dealer_name: "Vithana Motors"
  },
  {
    name: "Soysapura",
    region: "Western",
    district: "Colombo",
    address: "164, Soysapura, Moratuwa",
    phone: "+94 727 201 201",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "164, Soysapura, Moratuwa, Sri Lanka",
    dealer_name: "Siyath Motors"
  },
  {
    name: "Miriswatta",
    region: "Western",
    district: "Gampaha",
    address: "84/C, Miriwatta, Mudungoda, Gampaha",
    phone: "+94 777 774 521",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "84/C, Miriwatta, Mudungoda, Gampaha, Sri Lanka",
    dealer_name: "Pasan Motors"
  },
  {
    name: "Dharga Town",
    region: "Western",
    district: "Kalutara",
    address: "87/02, Main Street, Dharga Town",
    phone: "+94 788 111 198",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "87/02, Main Street, Dharga Town, Sri Lanka",
    dealer_name: "Shaffey Auto Mart"
  },
  {
    name: "Padukka",
    region: "Western",
    district: "Colombo",
    address: "77/7/1, Polgahahota, Wewalketiya, Bope, Padukka",
    phone: "+94 776 877 267",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "77/7/1, Polgahahota, Wewalketiya, Bope, Padukka, Sri Lanka",
    dealer_name: "Rathnayake Motors"
  },
  {
    name: "Panadura",
    region: "Western",
    district: "Kalutara",
    address: "43A, Janapriya Mawatha, Awariyawatta, Alubomulla, Panadura",
    phone: "+94 712 567 289",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "43A, Janapriya Mawatha, Awariyawatta, Alubomulla, Panadura, Sri Lanka",
    dealer_name : "Ceylon Motors House"
  },
  {
    name: "Kuliyapitiya",
    region: "North Western",
    district: "Kurunegala",
    address: "190, Uthurawala, Welipannagahamulla, Kuliyapitiya",
    phone: "+94 741 577 271",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "190, Uthurawala, Welipannagahamulla, Kuliyapitiya, Sri Lanka",
    dealer_name: "R R Auto Trading"
  },
  {
    name: "Kiribathgoda",
    region: "Western",
    district: "Gampaha",
    address: "89/16, Jinadasa Nandasena Mawatha, Kiribathgoda",
    phone: "+94 702 393 993",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "89/16, Jinadasa Nandasena Mawatha, Kiribathgoda, Sri Lanka",
    dealer_name: "HA Trading"
  },
  {
    name: "Kurunegala",
    region: "North Western",
    district: "Kurunegala",
    address: "Negombo Road, Kurunegala",
    phone: "+94 777 189 529",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "Negombo Road, Kurunegala, Sri Lanka",
    dealer_name: "Sharadi Mortors"
  },
];

const REGIONS = Array.from(new Set(DEALERS.map((d) => d.region)));
const ALL_DISTRICTS = "All";

// Each province gets a fixed marker color, used consistently across the
// filter legend and the card index dot — a small map-legend motif.
const REGION_COLOR: Record<string, string> = {
  Western: "#0F4C81",
  "North Western": "#C77A26",
};

function regionColor(region: string) {
  return REGION_COLOR[region] ?? "#4A4A4D";
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function DealerNetwork() {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0]);
  const [activeDistrict, setActiveDistrict] = useState(ALL_DISTRICTS);

  const availableDistricts = useMemo(() => {
    const pool = DEALERS.filter((d) => d.region === activeRegion);
    return [ALL_DISTRICTS, ...Array.from(new Set(pool.map((d) => d.district))).sort()];
  }, [activeRegion]);

  useEffect(() => {
    if (!availableDistricts.includes(activeDistrict)) {
      setActiveDistrict(ALL_DISTRICTS);
    }
  }, [availableDistricts, activeDistrict]);

  const filteredDealers = useMemo(() => {
    return DEALERS.filter((dealer) => {
      const matchesRegion = dealer.region === activeRegion;
      const matchesDistrict =
        activeDistrict === ALL_DISTRICTS || dealer.district === activeDistrict;
      return matchesRegion && matchesDistrict;
    });
  }, [activeRegion, activeDistrict]);

  return (
    <div>
      {/* Result readout */}
      <div className="flex items-baseline justify-between border-b border-[#0b0b0c] pb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[34px] font-black italic leading-none tabular-nums text-[#0b0b0c]">
            {pad(filteredDealers.length)}
          </span>
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6b6b70]">
            {filteredDealers.length === 1 ? "Location" : "Locations"}
            {" · "}{activeRegion}
            {activeDistrict !== ALL_DISTRICTS && <> · {activeDistrict}</>}
          </span>
        </div>
        <span className="font-body hidden text-[11px] uppercase tracking-[0.14em] text-[#a3a3a8] sm:block">
          Dealer Network
        </span>
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

      {/* Dealer grid */}
      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {filteredDealers.map((dealer, i) => (
          <div
            key={dealer.name}
            className="group relative flex flex-col justify-between bg-white p-6 pt-10 transition-colors hover:bg-[#fafaf9]"
          >
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute left-5 top-2 select-none text-[46px] font-black italic leading-none text-[#0b0b0c]/[0.05] transition-colors group-hover:text-[#0b0b0c]/[0.08]"
            >
              {pad(i + 1)}
            </span>

            <div className="relative">
              <p className="font-body flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b6b70]">
                <span
                  aria-hidden="true"
                  className="h-[6px] w-[6px] rounded-full"
                  style={{ backgroundColor: regionColor(dealer.region) }}
                />
                {/* {dealer.region} · {dealer.district} */}
                {dealer.name}
              </p>
              <h3 className="font-display mt-2 text-[19px] font-black uppercase italic tracking-tight text-[#0b0b0c]">
                {dealer.dealer_name}
              </h3>
              <p className="font-body mt-3 text-[14px] leading-relaxed text-[#4a4a4d]">
                {dealer.address}
              </p>
              <p className="font-body mt-1 text-[14px] tabular-nums text-[#4a4a4d]">
                {dealer.phone}
              </p>
              <p className="font-body mt-1 text-[13px] text-[#6b6b70]">
                {dealer.hours}
              </p>
            </div>

            <div className="relative mt-6 flex items-center gap-5 border-t border-[#e5e5e5] pt-5">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  dealer.mapsQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0b0b0c] transition-colors hover:text-[#0F4C81]"
              >
                Get directions
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={`tel:${dealer.phone.replace(/\s+/g, "")}`}
                className="font-body text-[13px] font-semibold uppercase tracking-[0.04em] text-[#6b6b70] transition-colors hover:text-[#0b0b0c]"
              >
                Call
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredDealers.length === 0 && (
        <div className="mt-10 border border-dashed border-[#d8d5cd] px-6 py-10 text-center">
          <p className="font-body text-[14px] text-[#6b6b70]">
            No dealers found for this selection yet.
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