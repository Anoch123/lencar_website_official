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
};

const DEALERS: Dealer[] = [
  {
    name: "Lencar Agalawatta",
    region: "Western",
    district: "Kalutara",
    address: "226/01, Yatiyana, Agalawatta",
    phone: "+94 757 979 938",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "226/01, Yatiyana, Agalawatta, Sri Lanka",
  },
  {
    name: "Lencar Soysapura",
    region: "Western",
    district: "Colombo",
    address: "164, Soysapura, Moratuwa",
    phone: "+94 727 201 201",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "164, Soysapura, Moratuwa, Sri Lanka",
  },
  {
    name: "Lencar Miriswatta",
    region: "Western",
    district: "Gampaha",
    address: "84/C, Miriwatta, Mudungoda, Gampaha",
    phone: "+94 777 774 521",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "84/C, Miriwatta, Mudungoda, Gampaha, Sri Lanka",
  },
  {
    name: "Lencar Dharga Town",
    region: "Western",
    district: "Kalutara",
    address: "87/02, Main Street, Dharga Town",
    phone: "+94 788 111 198",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "87/02, Main Street, Dharga Town, Sri Lanka",
  },
  {
    name: "Lencar Padukka",
    region: "Western",
    district: "Colombo",
    address: "77/7/1, Polgahahota, Wewalketiya, Bope, Padukka",
    phone: "+94 776 877 267",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "77/7/1, Polgahahota, Wewalketiya, Bope, Padukka, Sri Lanka",
  },
  {
    name: "Lencar Panadura",
    region: "Western",
    district: "Kalutara",
    address: "43A, Janapriya Mawatha, Awariyawatta, Alubomulla, Panadura",
    phone: "+94 712 567 289",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "43A, Janapriya Mawatha, Awariyawatta, Alubomulla, Panadura, Sri Lanka",
  },
  {
    name: "Lencar Kuliyapitiya",
    region: "North Western",
    district: "Kurunegala",
    address: "190, Uthurawala, Welipannagahamulla, Kuliyapitiya",
    phone: "+94 741 577 271",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "190, Uthurawala, Welipannagahamulla, Kuliyapitiya, Sri Lanka",
  },
  {
    name: "Lencar Kiribathgoda",
    region: "Western",
    district: "Gampaha",
    address: "89/16, Jinadasa Nandasena Mawatha, Kiribathgoda",
    phone: "+94 702 393 993",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "89/16, Jinadasa Nandasena Mawatha, Kiribathgoda, Sri Lanka",
  },
  {
    name: "Lencar Kurunegala",
    region: "North Western",
    district: "Kurunegala",
    address: "Negombo Road, Kurunegala",
    phone: "+94 777 189 529",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "Negombo Road, Kurunegala, Sri Lanka",
  },
];

const REGIONS = ["All", ...Array.from(new Set(DEALERS.map((d) => d.region)))];
const ALL_DISTRICTS = "All";

export default function DealerNetwork() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeDistrict, setActiveDistrict] = useState(ALL_DISTRICTS);

  // Districts available depend on the selected province — recompute whenever
  // the region changes, and always keep "All" as the first option.
  const availableDistricts = useMemo(() => {
    const pool =
      activeRegion === "All"
        ? DEALERS
        : DEALERS.filter((d) => d.region === activeRegion);
    return [ALL_DISTRICTS, ...Array.from(new Set(pool.map((d) => d.district))).sort()];
  }, [activeRegion]);

  // If the current district isn't valid for the newly selected province
  // (e.g. switching from Western -> North Western), reset it to "All".
  useEffect(() => {
    if (!availableDistricts.includes(activeDistrict)) {
      setActiveDistrict(ALL_DISTRICTS);
    }
  }, [availableDistricts, activeDistrict]);

  const filteredDealers = useMemo(() => {
    return DEALERS.filter((dealer) => {
      const matchesRegion = activeRegion === "All" || dealer.region === activeRegion;
      const matchesDistrict =
        activeDistrict === ALL_DISTRICTS || dealer.district === activeDistrict;
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

      {/* Dealer grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDealers.map((dealer) => (
          <div
            key={dealer.name}
            className="flex flex-col justify-between border border-[#e5e5e5] p-6 transition-shadow hover:shadow-lg"
          >
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F4C81]">
                {dealer.region} · {dealer.district}
              </p>
              <h3 className="font-display mt-2 text-[19px] font-black uppercase italic tracking-tight text-[#0b0b0c]">
                {dealer.name}
              </h3>
              <p className="font-body mt-3 text-[14px] leading-relaxed text-[#4a4a4d]">
                {dealer.address}
              </p>
              <p className="font-body mt-1 text-[14px] text-[#4a4a4d]">
                {dealer.phone}
              </p>
              <p className="font-body mt-1 text-[13px] text-[#6b6b70]">
                {dealer.hours}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-5 border-t border-[#e5e5e5] pt-5">
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
        <p className="font-body mt-10 text-[14px] text-[#6b6b70]">
          No dealers found for this selection yet.
        </p>
      )}
    </div>
  );
}