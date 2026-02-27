"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Ride } from "@/lib/rides";

// Fix Leaflet default icon paths broken by webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const goldIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

interface Props {
  ride: Ride;
  selectedPoint: string | null;
  onSelectPoint: (id: string) => void;
}

export default function RideMap({ ride, selectedPoint, onSelectPoint }: Props) {
  const centre = ride.route[0];

  return (
    <MapContainer center={centre} zoom={9} style={{ height: 420, width: "100%" }} key={ride.id}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={ride.route} color="#cc0000" weight={3} opacity={0.85} dashArray="8,4" />
      {ride.meetPoints.map((pt, i) => (
        <Marker
          key={pt.id}
          position={[pt.lat, pt.lng]}
          icon={i === 0 ? redIcon : goldIcon}
          eventHandlers={{ click: () => onSelectPoint(pt.id) }}
        >
          <Popup>
            <div style={{ fontFamily: "sans-serif", minWidth: 180 }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#cc0000", marginBottom: 4 }}>
                Point {pt.id} — {pt.time}
              </div>
              <div style={{ fontSize: "0.875rem", color: "#222" }}>{pt.label}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
