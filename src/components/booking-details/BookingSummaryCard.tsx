import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { CreditCard, CheckCircle2, ShieldCheck, Tag } from "@/components/icons/Icons";

interface BookingSummaryCardProps {
  booking: BookingItem;
}

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({ booking }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Payment Breakdown
        </h3>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 size={12} /> {booking.paymentStatus}
        </span>
      </div>

      {/* Breakdown Items */}
      <div className="space-y-2.5 text-xs font-medium text-slate-600">
        <div className="flex items-center justify-between">
          <span>Service Fee ({booking.serviceTitle.split(" ")[0]})</span>
          <span className="text-slate-900 font-bold">₹{booking.servicePrice}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Platform & Safety Fee</span>
          <span className="text-slate-900 font-bold">₹{booking.platformFee}</span>
        </div>

        {booking.discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-semibold">
            <span className="flex items-center gap-1">
              <Tag size={12} /> Local Special Offer
            </span>
            <span>-₹{booking.discount}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-base font-extrabold text-slate-900">
          <span>Total Amount</span>
          <span className="text-xl text-blue-600">₹{booking.totalAmount}</span>
        </div>
      </div>

      {/* Payment Method Details */}
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-xs flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
          <CreditCard size={16} />
        </div>
        <div>
          <span className="block text-slate-400 text-[10px] font-bold uppercase">Payment Method</span>
          <span className="font-extrabold text-slate-900">{booking.paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};
