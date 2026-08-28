"use client";

import React from "react";
import { Tag, ShieldCheck } from "@/components/icons/Icons";

interface PriceBreakdownProps {
  basePrice: number;
  platformFee?: number;
  discountAmount?: number;
  appliedCoupon?: string | null;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  basePrice,
  platformFee = 20,
  discountAmount = 0,
  appliedCoupon = null,
}) => {
  const totalAmount = Math.max(0, basePrice + platformFee - discountAmount);

  return (
    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs font-medium">
      
      <div className="flex justify-between items-center text-slate-600">
        <span>Base Service Charge</span>
        <span className="font-bold text-slate-900">₹{basePrice}</span>
      </div>

      <div className="flex justify-between items-center text-slate-600">
        <span className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-emerald-500" />
          <span>Inspection & Safety Fee</span>
        </span>
        <span className="font-bold text-emerald-600 uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
          FREE
        </span>
      </div>

      <div className="flex justify-between items-center text-slate-600">
        <span>Platform & Convenience Fee</span>
        <span className="font-bold text-slate-900">₹{platformFee}</span>
      </div>

      {appliedCoupon && discountAmount > 0 && (
        <div className="flex justify-between items-center text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/70">
          <span className="flex items-center gap-1 font-bold">
            <Tag size={13} className="text-emerald-600" />
            <span>Coupon ({appliedCoupon})</span>
          </span>
          <span className="font-black text-emerald-700">-₹{discountAmount}</span>
        </div>
      )}

      <hr className="border-slate-200/80 my-1" />

      <div className="flex justify-between items-center pt-1 text-sm">
        <div>
          <span className="font-black text-slate-900 block">Total Amount</span>
          <span className="text-[10px] text-slate-500 font-semibold">Includes all local taxes</span>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-blue-600">₹{totalAmount}</span>
        </div>
      </div>

    </div>
  );
};
