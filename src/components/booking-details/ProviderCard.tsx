import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { ShieldCheck, Star, MapPin, Phone, MessageSquare } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ProviderCardProps {
  booking: BookingItem;
  onContactProvider: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  booking,
  onContactProvider
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Assigned Service Partner
        </h3>
        {booking.providerVerified && (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60">
            <ShieldCheck size={13} className="text-blue-600 shrink-0" />
            <span>Verified Partner</span>
          </span>
        )}
      </div>

      <div className="flex items-start gap-4">
        <img
          src={booking.providerImage}
          alt={booking.providerName}
          className="w-16 h-16 rounded-2xl object-cover border border-slate-200/80 shadow-xs shrink-0"
        />

        <div className="space-y-1 min-w-0 flex-1">
          <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug truncate">
            {booking.providerName}
          </h4>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1 text-amber-500 font-extrabold">
              <Star size={14} fill="currentColor" />
              <span>{booking.rating}</span>
            </div>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">({booking.reviewsCount} reviews)</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{booking.category} Specialist • Indirapuram</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1">
        <Button
          onClick={onContactProvider}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
        >
          <Phone size={16} />
          <span>Contact Provider ({booking.providerPhone})</span>
        </Button>
      </div>
    </div>
  );
};
