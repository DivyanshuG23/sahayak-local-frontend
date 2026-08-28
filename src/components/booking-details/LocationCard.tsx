import React, { useState } from "react";
import { BookingItem } from "@/data/mockBookings";
import { MapPin, Navigation, Check, Phone, UserCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  booking: BookingItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ booking }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${booking.location}, Landmark: ${booking.landmark || ""}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirections = () => {
    const encoded = encodeURIComponent(booking.location);
    window.open(`https://maps.google.com/?q=${encoded}`, "_blank");
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Service Location & Address
        </h3>
        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
          Home Address
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Address Info */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <MapPin size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                  {booking.location}
                </h4>
                {booking.landmark && (
                  <p className="text-xs text-slate-500 font-medium">
                    Landmark: <span className="text-slate-700 font-semibold">{booking.landmark}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-xs text-slate-600 space-y-1 mt-2">
              <span className="font-bold text-slate-900 block">Contact Resident:</span>
              <p><span className="text-slate-400">Name:</span> <strong>{booking.customerName}</strong></p>
              <p><span className="text-slate-400">Phone:</span> <strong>{booking.customerPhone}</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAddress}
              className="flex-1 rounded-xl text-xs font-bold text-slate-700 border-slate-200 hover:text-blue-600"
            >
              {copied ? <Check size={14} className="mr-1 text-emerald-600" /> : <MapPin size={14} className="mr-1" />}
              <span>{copied ? "Copied!" : "Copy Address"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDirections}
              className="flex-1 rounded-xl text-xs font-bold text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Navigation size={14} className="mr-1" />
              <span>Directions</span>
            </Button>
          </div>
        </div>

        {/* Custom Interactive Styled Map Placeholder */}
        <div className="relative h-44 md:h-full min-h-[160px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center group shadow-inner">
          {/* Map Grid Pattern background */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
              backgroundSize: "16px 16px"
            }}
          />

          {/* Route path lines illustration */}
          <svg className="absolute inset-0 w-full h-full stroke-blue-500/30" fill="none">
            <path d="M 20 120 Q 80 40 160 90 T 300 60" strokeWidth="3" strokeDasharray="6 6" />
          </svg>

          {/* Location Pin center */}
          <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 border-2 border-white">
              <MapPin size={20} />
            </div>
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border border-slate-700 shadow-md">
              Indirapuram, Ghaziabad
            </span>
          </div>

          <button
            onClick={handleDirections}
            className="absolute bottom-2 right-2 z-20 px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-900 rounded-lg text-[10px] font-bold shadow-md hover:bg-white transition-all cursor-pointer"
          >
            Open in Maps ↗
          </button>
        </div>
      </div>
    </div>
  );
};
