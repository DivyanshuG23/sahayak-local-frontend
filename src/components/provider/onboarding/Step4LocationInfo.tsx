"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ArrowRight, ArrowLeft } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CITIES } from "@/data/mockData";
import { OnboardingFormData } from "@/features/provider/onboardingTypes";

interface Step4Props {
  data: OnboardingFormData;
  updateData: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const RADIUS_OPTIONS = [5, 10, 15, 25, 40, 50];

export const Step4LocationInfo: React.FC<Step4Props> = ({
  data,
  updateData,
  onNext,
  onPrev,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!data.address.trim()) {
      errs.address = "Workshop / Street address is required";
    } else if (data.address.trim().length < 5) {
      errs.address = "Address must be at least 5 characters";
    }

    if (!data.city) {
      errs.city = "Please select your city";
    }

    const cleanPin = data.pincode.replace(/[^0-9]/g, "");
    if (!data.pincode.trim()) {
      errs.pincode = "Postal Pincode is required";
    } else if (cleanPin.length !== 6) {
      errs.pincode = "Enter a valid 6-digit Indian pincode";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          Location & Service Coverage Area
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Define your operating base and maximum travel radius for doorstep dispatch.
        </p>
      </div>

      <div className="space-y-4">
        {/* Street Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Office / Workshop / Home Base Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin size={16} />
            </div>
            <input
              type="text"
              value={data.address}
              onChange={(e) => {
                updateData({ address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: "" });
              }}
              placeholder="e.g. Shop 12, Main Market, Vaishali Nagar"
              className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.address
                  ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              {errors.address}
            </p>
          )}
        </div>

        {/* City & Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Operating City <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.city}
              onChange={(e) => {
                updateData({ city: e.target.value });
                if (errors.city) setErrors({ ...errors, city: "" });
              }}
              className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              6-Digit Pincode <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={data.pincode}
              onChange={(e) => {
                updateData({ pincode: e.target.value });
                if (errors.pincode) setErrors({ ...errors, pincode: "" });
              }}
              placeholder="e.g. 302021"
              className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl py-3 px-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.pincode
                  ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500"
              }`}
            />
            {errors.pincode && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                {errors.pincode}
              </p>
            )}
          </div>
        </div>

        {/* Service Radius Selector */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Travel / Service Dispatch Radius
            </label>
            <Badge variant="blue" className="text-xs font-bold px-2 py-0.5">
              {data.serviceRadiusKm} km around base
            </Badge>
          </div>

          <p className="text-[11px] text-slate-500 mb-3">
            Customers within this radial perimeter will see your profile in search results.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => updateData({ serviceRadiusKm: r })}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                  data.serviceRadiusKm === r
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onPrev}
          className="gap-2 font-semibold text-xs sm:text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </Button>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="px-6 font-bold text-xs sm:text-sm gap-2 shadow-sm cursor-pointer"
        >
          <span>Continue to Review & KYC</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
};
