"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { bssPoints } from "@/app/data/bssPoints";
import { useEffect, useState } from "react";

const bssIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function BSSMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-black/10" />;

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-black/10">
      <MapContainer
        center={[7.2, 80.0]}
        zoom={9}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bssPoints.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={bssIcon}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{point.name}</p>
                {point.address && (
                  <p className="text-xs text-gray-500">{point.address}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}