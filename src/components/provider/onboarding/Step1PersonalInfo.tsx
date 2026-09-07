"use client";

import React, { useState } from "react";
import { User, Phone, Mail, ArrowRight, ShieldCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { OnboardingFormData } from "@/features/provider/onboardingTypes";

interface Step1Props {
  data: OnboardingFormData;
  updateData: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
}

export const Step1PersonalInfo: React.FC<Step1Props> = ({
  data,
  updateData,
  onNext,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!data.fullName.trim()) {
      errs.fullName = "Full name is required";
    } else if (data.fullName.trim().length < 3) {
      errs.fullName = "Name must be at least 3 characters";
    }

    const cleanPhone = data.phone.replace(/[^0-9]/g, "");
    if (!data.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (cleanPhone.length < 10) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = "Enter a valid email address (e.g. name@example.com)";
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
          Personal Information
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Provide your legal identity and contact details for business verification and lead notifications.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name (Owner / Partner) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User size={16} />
            </div>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => {
                updateData({ fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: "" });
              }}
              placeholder="e.g. Rajesh Kumar Sharma"
              className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            WhatsApp Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone size={16} />
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => {
                updateData({ phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              placeholder="+91 98765 43210"
              className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.phone ? (
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              {errors.phone}
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-1">
              Instant customer booking alerts and verification OTPs will be sent here.
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail size={16} />
            </div>
            <input
              type="email"
              value={data.email}
              onChange={(e) => {
                updateData({ email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              placeholder="e.g. rajesh.sharma@example.com"
              className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.email ? (
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              {errors.email}
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-1">
              Monthly payout summaries and business receipts will be delivered here.
            </p>
          )}
        </div>
      </div>

      {/* Trust Notice */}
      <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center gap-2.5 text-xs text-blue-900">
        <ShieldCheck size={18} className="text-blue-600 shrink-0" />
        <span>
          Your data is encrypted & secured under Sahayak-Local Partner Privacy Guarantee.
        </span>
      </div>

      {/* Next Navigation */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="px-6 font-bold text-xs sm:text-sm gap-2 shadow-sm cursor-pointer"
        >
          <span>Continue to Business Details</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
};
