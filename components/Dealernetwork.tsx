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
      name: "Lencar BSS Miriswaththa",
      region: "Western",
      address: "84/C, Miriswatta, Muduugoda, Gampaha",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "84/C, Miriswatta, Muduugoda, Gampaha, Sri Lanka",
    },
    {
      name: "Lencar BSS Seeduwa",
      region: "Western",
      address: "73, Liyanagemulla, Seeduwa",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "73, Liyanagemulla, Seeduwa, Sri Lanka",
    },
    {
      name: "Lencar BSS Katunayake",
      region: "Western",
      address: "128, 18th Mile Post, Katunayake",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "128, 18th Mile Post, Katunayake, Sri Lanka",
    },
    {
      name: "Lencar BSS Udugampola",
      region: "Western",
      address: "140 Dobawala, Udugampola",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "140 Dobawala, Udugampola, Sri Lanka",
    },
    {
      name: "Lencar BSS Kadawatha",
      region: "Western",
      address: "Subodha Mawatha, Kadawatha",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "Subodha Mawatha, Kadawatha, Sri Lanka",
    },
    {
      name: "Lencar BSS Kiribathgoda",
      region: "Western",
      address: "89/16, Jinadasa Nandasena Mawatha, Kiribathgoda",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "89/16, Jinadasa Nandasena Mawatha, Kiribathgoda, Sri Lanka",
    },
    {
      name: "Lencar BSS Kochchikade",
      region: "Western",
      address: "Thopputhota Filling Station, Chilaw-Colombo Main Rd, 61110",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "Thopputhota Filling Station, Chilaw-Colombo Main Rd, 61110, Sri Lanka",
    },
    {
      name: "Lencar BSS Paliyagoda",
      region: "Western",
      address: "3 Negombo Rd, Wattala 11300",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "3 Negombo Rd, Wattala 11300, Sri Lanka",
    },
    {
      name: "Lencar BSS Minuwangoda",
      region: "Western",
      address: "304, Negombo Road, Kurunegala",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "304, Negombo Road, Kurunegala, Sri Lanka",
    },
    {
      name: "Lencar BSS Thalawathugoda",
      region: "Western",
      address: "263/1, Hokandara Rd, Ruhunupura",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "263/1, Hokandara Rd, Ruhunupura, Sri Lanka",
    },
    {
      name: "Lencar BSS Rawatawatta",
      region: "Western",
      address: "Rawatawatta Junction, Galle Road, Moratuwa",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "Rawatawatta Junction, Galle Road, Moratuwa, Sri Lanka",
    },
    {
      name: "Lencar BSS Soysapura",
      region: "Western",
      address: "164, Soysapura, Moratuwa",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "164, Soysapura, Moratuwa, Sri Lanka",
    },
    {
      name: "Lencar BSS Kolonnawa",
      region: "Western",
      address: "595, Kolonnawa Road, Wellampitiya",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "595, Kolonnawa Road, Wellampitiya, Sri Lanka",
    },
    {
      name: "Lencar BSS Borella",
      region: "Western",
      address: "Thilakarathnaramaya Temple, Ward Place, Colombo 08",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "Thilakarathnaramaya Temple, Ward Place, Colombo 08, Sri Lanka",
    },
    {
      name: "Lencar BSS Padukka",
      region: "Western",
      address: "77/7/1, Polgahahota, Wewelktiya Bope, Padukka",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "77/7/1, Polgahahota, Wewelktiya Bope, Padukka, Sri Lanka",
    },
    {
      name: "Lencar BSS Beruwala",
      region: "Western",
      address: "Galle Rd, Beruwala",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "Galle Rd, Beruwala, Sri Lanka",
    },
    {
      name: "Lencar BSS Bandaragama",
      region: "Western",
      address: "17A, Horana Rd, Bandaragama",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "17A, Horana Rd, Bandaragama, Sri Lanka",
    },
    {
      name: "Lencar BSS Maggona",
      region: "Western",
      address: "150/A, Galle Road, Diyalagoda, Maggona",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "150/A, Galle Road, Diyalagoda, Maggona, Sri Lanka",
    },
    {
      name: "Lencar BSS Panadura",
      region: "Western",
      address: "43A, Janapriya Mawatha, Awariyawatta, Alubomulla, Panadura",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "43A, Janapriya Mawatha, Awariyawatta, Alubomulla, Panadura, Sri Lanka",
    },
    {
      name: "Lencar BSS Agalawaththa",
      region: "Western",
      address: "226/01, Yatiyana, Agalawatta",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "226/01, Yatiyana, Agalawatta, Sri Lanka",
    },
    {
      name: "Lencar BSS Kalutara",
      region: "Western",
      address: "3B, St. Philipneres Church Road, Katukurunda",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "3B, St. Philipneres Church Road, Katukurunda, Sri Lanka",
    },
    {
      name: "Lencar BSS Dharga Town",
      region: "Western",
      address: "87/02, Main Street, Darga Town",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "87/02, Main Street, Darga Town, Sri Lanka",
    },
    {
      name: "Lencar BSS Kurunagala",
      region: "North Western",
      address: "44, Narammala-Madampe Road, Kurunagala",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "44, Narammala-Madampe Road, Kurunagala, Sri Lanka",
    },
    {
      name: "Lencar BSS Kuliyapitiya",
      region: "North Western",
      address: "190, Uthurawala, Welipannagahamulla, Kuliyapitiya",
      phone: "",
      hours: "Open 24 hours",
      mapsQuery: "190, Uthurawala, Welipannagahamulla, Kuliyapitiya, Sri Lanka",
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
              className={`font-body px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors ${isActive
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