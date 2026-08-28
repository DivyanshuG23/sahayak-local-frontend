import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { Clock, ShieldCheck, Wrench, Sparkles, CheckCircle2 } from "@/components/icons/Icons";

interface ServiceInfoCardProps {
  booking: BookingItem;
}

export const ServiceInfoCard: React.FC<ServiceInfoCardProps> = ({ booking }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Booked Service Information
        </h3>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
          {booking.category}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
          {booking.serviceTitle}
        </h3>

        {booking.description && (
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {booking.description}
          </p>
        )}
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
            <Clock size={18} />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase">Estimated Duration</span>
            <span className="text-xs font-extrabold text-slate-900">{booking.duration || "60 min"}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
            <ShieldCheck size={18} />
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase">Service Warranty</span>
            <span className="text-xs font-extrabold text-emerald-700">30 Days Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Highlights List */}
      {booking.highlights && booking.highlights.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 block">Service Includes:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
            {booking.highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
