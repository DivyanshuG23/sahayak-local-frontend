"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ServiceProvider } from "@/data/mockData";
import { Calendar, Clock, MapPin, Tag, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Gift } from "@/components/icons/Icons";
import { PriceBreakdown } from "./PriceBreakdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookingSummaryProps {
  provider: ServiceProvider;
  selectedServiceTitle: string;
  selectedServicePrice: number;
  selectedDate: string;
  selectedTimeSlot: string;
  addressSummary: string;
  onConfirmBooking: () => void;
  isSubmitting?: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  provider,
  selectedServiceTitle,
  selectedServicePrice,
  selectedDate,
  selectedTimeSlot,
  addressSummary,
  onConfirmBooking,
  isSubmitting = false,
}) => {
  const [couponInput, setCouponInput] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("SAHAYAK50");
  const [discountAmount, setDiscountAmount] = useState<number>(50);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<"Pay After Service" | "UPI / Online">("Pay After Service");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    if (code === "SAHAYAK50" || code === "WELCOME50" || code === "FIRST100") {
      setAppliedCoupon(code);
      setDiscountAmount(code === "FIRST100" ? 100 : 50);
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code. Try 'SAHAYAK50' for ₹50 off!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const finalTotal = Math.max(0, selectedServicePrice + 20 - discountAmount);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 space-y-6 sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <Badge variant="blue" className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-black mb-1">
            Order Summary
          </Badge>
          <h3 className="text-xl font-black text-slate-900">Booking Overview</h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total</span>
          <span className="text-2xl font-black text-blue-600">₹{finalTotal}</span>
        </div>
      </div>

      {/* Provider Details Mini Box */}
      <div className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
          <Image
            src={provider.avatarUrl || provider.imageUrl}
            alt={provider.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-extrabold text-slate-900 truncate">
            {provider.name}
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            {provider.category} • {provider.locality}
          </p>
        </div>
      </div>

      {/* Key Schedule & Service Details */}
      <div className="space-y-3 text-xs">
        
        {/* Selected Service */}
        <div className="flex items-start gap-2.5 bg-blue-50/60 p-3 rounded-2xl border border-blue-100">
          <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-[10px] uppercase font-bold text-blue-700 block">Service</span>
            <span className="font-extrabold text-slate-900 text-xs block">{selectedServiceTitle}</span>
          </div>
          <span className="font-black text-slate-900">₹{selectedServicePrice}</span>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <Calendar size={15} className="text-blue-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Date</span>
              <span className="font-bold text-slate-900 truncate block">{selectedDate || "Today"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <Clock size={15} className="text-blue-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Slot</span>
              <span className="font-bold text-slate-900 truncate block">{selectedTimeSlot}</span>
            </div>
          </div>
        </div>

        {/* Location Summary */}
        <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
          <MapPin size={15} className="text-rose-500 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Service Address</span>
            <span className="font-semibold text-slate-800 text-xs line-clamp-2">
              {addressSummary || "Indirapuram, Ghaziabad, UP"}
            </span>
          </div>
        </div>

      </div>

      {/* Coupon Code Entry */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag size={14} className="text-emerald-600" />
            <span>Apply Offer / Coupon</span>
          </span>
          <span className="text-[10px] text-slate-400">Try 'SAHAYAK50'</span>
        </label>

        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 text-xs">
            <div className="flex items-center gap-2">
              <Gift size={15} className="text-emerald-600" />
              <span className="font-extrabold">{appliedCoupon} applied (-₹{discountAmount})</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter Promo Code"
              className="flex-1 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-500 uppercase"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 rounded-xl cursor-pointer"
            >
              Apply
            </Button>
          </form>
        )}

        {couponError && (
          <p className="text-[11px] font-bold text-rose-600">{couponError}</p>
        )}
      </div>

      {/* Payment Method Selector */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Payment Preference
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["Pay After Service", "UPI / Online"] as const).map((mode) => {
            const isSelected = paymentMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setPaymentMode(mode)}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex flex-col items-center gap-1 ${
                  isSelected
                    ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-1">
                  {mode === "Pay After Service" ? <CheckCircle2 size={13} /> : <CreditCard size={13} />}
                  <span>{mode}</span>
                </div>
                <span className="text-[9px] font-normal text-slate-500">
                  {mode === "Pay After Service" ? "Pay Cash/UPI after work" : "Instant UPI / Cards"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Breakdown Component */}
      <PriceBreakdown
        basePrice={selectedServicePrice}
        platformFee={20}
        discountAmount={discountAmount}
        appliedCoupon={appliedCoupon}
      />

      {/* Primary Confirm CTA Button */}
      <Button
        type="button"
        onClick={onConfirmBooking}
        disabled={isSubmitting}
        size="lg"
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-600/30 gap-2 cursor-pointer transition-all hover:scale-[1.01]"
      >
        <span>{isSubmitting ? "Processing Booking..." : "Confirm Booking"}</span>
        {!isSubmitting && <ArrowRight size={18} />}
      </Button>

      {/* Protection Badges */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold text-center">
        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
        <span>30-Day Service Guarantee & Zero Cancel Fee</span>
      </div>

    </div>
  );
};
