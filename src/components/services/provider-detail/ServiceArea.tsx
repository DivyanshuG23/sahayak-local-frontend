"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ServiceAreaProps {
  locality: string;
  location: string;
}

const LOCALITIES_SERVED = [
  "Indirapuram",
  "Vaishali",
  "Vasundhara",
  "Kaushambi",
  "Raj Nagar Extension",
  "Noida Sector 62",
];

export const ServiceArea: React.FC<ServiceAreaProps> = ({ locality, location }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-blue-600" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Service Area
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMap(!showMap)}
          className="text-xs font-bold text-blue-600 border-blue-200 rounded-xl"
        >
          {showMap ? "Hide Map" : "View on Map"}
        </Button>
      </div>

      <p className="text-xs text-slate-600 font-medium">
        Primary hub located in <strong className="text-slate-900">{locality}, {location}</strong>. Doorstep coverage available across nearby neighborhood sectors:
      </p>

      {/* Localities Badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {LOCALITIES_SERVED.map((loc) => (
          <div
            key={loc}
            className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800"
          >
            <MapPin size={13} className="text-emerald-600 shrink-0" />
            <span>{loc}</span>
          </div>
        ))}
      </div>

      {/* Interactive Visual Map Placeholder */}
      {showMap && (
        <div className="mt-4 h-56 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center text-center p-4 space-y-3 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Interactive Map Layer</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Coverage radius: 5.0 km centered around {locality}, {location}. Ready for future Google Maps / OpenStreetMap integration.
            </p>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            GPS Coordinates: 28.6415° N, 77.3712° E
          </span>
        </div>
      )}
    </div>
  );
};
