"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, UserCheck, Navigation, Info, CheckCircle2 } from "@/components/icons/Icons";
import { CITIES } from "@/data/mockData";

export interface AddressFormData {
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  pincode: string;
  addressType: "Home" | "Work" | "Other";
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  instructions: string;
  agreeTerms: boolean;
}

interface AddressFormProps {
  formData: AddressFormData;
  onChange: (updatedData: Partial<AddressFormData>) => void;
  errors: Record<string, string>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const [detectingLocation, setDetectingLocation] = useState<boolean>(false);
  const [locationSuccess, setLocationSuccess] = useState<boolean>(false);

  const handleUseCurrentLocation = () => {
    setDetectingLocation(true);
    setLocationSuccess(false);

    setTimeout(() => {
      onChange({
        houseNo: "Flat 402, Royal Residency",
        street: "Ahinsa Khand 2, Indirapuram",
        landmark: "Near Habitat Centre",
        city: "Ghaziabad, UP",
        pincode: "201014",
      });
      setDetectingLocation(false);
      setLocationSuccess(true);

      setTimeout(() => setLocationSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <MapPin size={18} className="text-rose-500" />
            <span>Service Address & Contact</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Where should the service technician report for doorstep service?
          </p>
        </div>

        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={detectingLocation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200/80 transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Navigation size={14} className={`text-blue-600 ${detectingLocation ? "animate-spin" : ""}`} />
          <span>{detectingLocation ? "Locating..." : locationSuccess ? "Location Auto-filled!" : "Use Current Location"}</span>
        </button>
      </div>

      {locationSuccess && (
        <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 rounded-xl border border-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>Successfully retrieved GPS location coordinates for Indirapuram, Ghaziabad!</span>
        </div>
      )}

      {/* Address Type Pills */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Address Tag
        </label>
        <div className="flex gap-2">
          {(["Home", "Work", "Other"] as const).map((type) => {
            const isSelected = formData.addressType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ addressType: type })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Address Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* House / Flat No */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>House / Flat / Building No. *</span>
            {errors.houseNo && <span className="text-rose-500 text-[10px]">{errors.houseNo}</span>}
          </label>
          <input
            type="text"
            value={formData.houseNo}
            onChange={(e) => onChange({ houseNo: e.target.value })}
            placeholder="e.g. Flat 304, Tower B"
            className={`w-full text-xs font-medium text-slate-900 bg-slate-50/70 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.houseNo ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Street / Locality */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Street / Sector / Locality *</span>
            {errors.street && <span className="text-rose-500 text-[10px]">{errors.street}</span>}
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => onChange({ street: e.target.value })}
            placeholder="e.g. Vaishali Nagar, Block C"
            className={`w-full text-xs font-medium text-slate-900 bg-slate-50/70 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.street ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Landmark */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800">
            Landmark (Optional)
          </label>
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => onChange({ landmark: e.target.value })}
            placeholder="e.g. Near Community Park"
            className="w-full text-xs font-medium text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* City & Pincode Grid */}
        <div className="grid grid-cols-2 gap-2">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">City</label>
            <select
              value={formData.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full text-xs font-medium text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Pincode *</span>
              {errors.pincode && <span className="text-rose-500 text-[10px]">{errors.pincode}</span>}
            </label>
            <input
              type="text"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => onChange({ pincode: e.target.value })}
              placeholder="302021"
              className={`w-full text-xs font-medium text-slate-900 bg-slate-50/70 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                errors.pincode ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>

        </div>

      </div>

      <hr className="border-slate-100" />

      {/* Contact Details Header */}
      <div className="space-y-1">
        <h4 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
          <UserCheck size={16} className="text-blue-600" />
          <span>Customer Contact Details</span>
        </h4>
        <p className="text-[11px] text-slate-500">
          Booking updates & OTP will be sent to these contact channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Full Name *</span>
            {errors.customerName && <span className="text-rose-500 text-[10px]">{errors.customerName}</span>}
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => onChange({ customerName: e.target.value })}
            placeholder="Rajesh Kumar"
            className={`w-full text-xs font-medium text-slate-900 bg-slate-50/70 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.customerName ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Mobile Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Mobile Phone *</span>
            {errors.customerPhone && <span className="text-rose-500 text-[10px]">{errors.customerPhone}</span>}
          </label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => onChange({ customerPhone: e.target.value })}
              placeholder="+91 98765 43210"
              className={`w-full text-xs font-medium text-slate-900 bg-slate-50/70 border rounded-xl p-3 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                errors.customerPhone ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Email Address</span>
            {errors.customerEmail && <span className="text-rose-500 text-[10px]">{errors.customerEmail}</span>}
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => onChange({ customerEmail: e.target.value })}
              placeholder="name@example.com"
              className="w-full text-xs font-medium text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl p-3 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

      </div>

      {/* Additional Instructions */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Info size={14} className="text-blue-600" />
          <span>Instructions for Technician (Optional)</span>
        </label>
        <textarea
          rows={2}
          value={formData.instructions}
          onChange={(e) => onChange({ instructions: e.target.value })}
          placeholder="e.g. Ring the doorbell twice, ladder is available on 2nd floor, call 10 mins before reaching..."
          className="w-full text-xs font-medium text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
        />
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="pt-2">
        <label className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
          errors.agreeTerms ? "bg-rose-50/50 border-rose-300" : "bg-slate-50/50 border-slate-200/80"
        }`}>
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => onChange({ agreeTerms: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
          />
          <div className="text-xs text-slate-600 font-medium leading-relaxed">
            I agree to Sahayak-Local's{" "}
            <span className="font-extrabold text-blue-600 underline">Terms of Service</span>,{" "}
            <span className="font-extrabold text-blue-600 underline">Cancellation Policy</span>, and certify that the provided service address details are accurate.
            {errors.agreeTerms && (
              <span className="block font-bold text-rose-600 text-[11px] mt-1">
                {errors.agreeTerms}
              </span>
            )}
          </div>
        </label>
      </div>

    </div>
  );
};
