"use client";

import { useMemo, useState } from "react";

type Dealer = {
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  mapsQuery: string;
};

const DEALERS: Dealer[] = [
  {
    name: "Lencar Colombo",
    region: "Western",
    address: "29, Grenier Road, Colombo – 08",
    phone: "+94 713 391 391",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "29 Grenier Road Colombo 08 Sri Lanka",
  },
  {
    name: "Lencar Negombo",
    region: "Western",
    address: "Colombo Road, Negombo",
    phone: "+94 31 222 4501",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapsQuery: "Colombo Road Negombo Sri Lanka",
  },
  {
    name: "Lencar Kandy",
    region: "Central",
    address: "William Gopallawa Mawatha, Kandy",
    phone: "+94 81 222 3390",
    hours: "Mon–Sat, 9:00 AM – 5:30 PM",
    mapsQuery: "William Gopallawa Mawatha Kandy Sri Lanka",
  },
  {
    name: "Lencar Kurunegala",
    region: "North Western",
    address: "Kandy Road, Kurunegala",
    phone: "+94 37 222 6710",
    hours: "Mon–Sat, 9:00 AM – 5:30 PM",
    mapsQuery: "Kandy Road Kurunegala Sri Lanka",
  },
  {
    name: "Lencar Galle",
    region: "Southern",
    address: "Matara Road, Galle",
    phone: "+94 91 222 8815",
    hours: "Mon–Sat, 9:00 AM – 5:30 PM",
    mapsQuery: "Matara Road Galle Sri Lanka",
  },
  {
    name: "Lencar Matara",
    region: "Southern",
    address: "Anagarika Dharmapala Mawatha, Matara",
    phone: "+94 41 222 4470",
    hours: "Mon–Sat, 9:00 AM – 5:30 PM",
    mapsQuery: "Anagarika Dharmapala Mawatha Matara Sri Lanka",
  },
  {
    name: "Lencar Anuradhapura",
    region: "North Central",
    address: "Maithripala Senanayake Mawatha, Anuradhapura",
    phone: "+94 25 222 6640",
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    mapsQuery: "Maithripala Senanayake Mawatha Anuradhapura Sri Lanka",
  },
  {
    name: "Lencar Batticaloa",
    region: "Eastern",
    address: "Trinco Road, Batticaloa",
    phone: "+94 65 222 3380",
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    mapsQuery: "Trinco Road Batticaloa Sri Lanka",
  },
  {
    name: "Lencar Jaffna",
    region: "Northern",
    address: "Hospital Road, Jaffna",
    phone: "+94 21 222 5510",
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    mapsQuery: "Hospital Road Jaffna Sri Lanka",
  },
];

const REGIONS = ["All", ...Array.from(new Set(DEALERS.map((d) => d.region)))];

export default function DealerNetwork() {
  const [activeRegion, setActiveRegion] = useState("All");

  const filteredDealers = useMemo(() => {
    if (activeRegion === "All") return DEALERS;
    return DEALERS.filter((dealer) => dealer.region === activeRegion);
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

      {/* Dealer grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDealers.map((dealer) => (
          <div
            key={dealer.name}
            className="flex flex-col justify-between border border-[#e5e5e5] p-6 transition-shadow hover:shadow-lg"
          >
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e30613]">
                {dealer.region}
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
                className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0b0b0c] transition-colors hover:text-[#e30613]"
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
          No dealers found in this region yet.
        </p>
      )}
    </div>
  );
}