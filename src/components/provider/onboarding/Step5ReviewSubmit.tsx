"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  User,
  Building2,
  Wrench,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Lock,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingFormData, OnboardingStep } from "@/features/provider/onboardingTypes";

interface Step5Props {
  data: OnboardingFormData;
  updateData: (fields: Partial<OnboardingFormData>) => void;
  onEditStep: (step: OnboardingStep) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Step5ReviewSubmit: React.FC<Step5Props> = ({
  data,
  updateData,
  onEditStep,
  onPrev,
  onSubmit,
  isSubmitting,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.termsAccepted) {
      setError("Please accept the Sahayak-Local Partner Terms & Code of Conduct");
      return;
    }
    setError(null);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          Review Application & Verification
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Double-check all entered information before submitting your provider application for verification.
        </p>
      </div>

      {/* Summary Review Cards */}
      <div className="space-y-3 text-xs">
        {/* Card 1: Personal & Contact */}
        <Card className="bg-white border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <User size={15} className="text-blue-600" />
                <span>Personal Information</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Owner Name</span>
                <span className="font-semibold text-slate-800">{data.fullName || "—"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile Phone</span>
                <span className="font-semibold text-slate-800">{data.phone || "—"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                <span className="font-semibold text-slate-800">{data.email || "—"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Business Info */}
        <Card className="bg-white border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Building2 size={15} className="text-blue-600" />
                <span>Business & Brand Details</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Business Name</span>
                <span className="font-semibold text-slate-800">{data.businessName || "—"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
                <Badge variant="blue" className="text-[10px] px-1.5 py-0 mt-0.5">{data.category}</Badge>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
                <span className="font-semibold text-slate-800">{data.experienceYears}+ years</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Services & Rates */}
        <Card className="bg-white border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Wrench size={15} className="text-blue-600" />
                <span>Services & Base Pricing</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Starting Visit Rate:</span>
                <span className="text-sm font-black text-slate-900">
                  ₹{data.startingPrice} <span className="text-xs font-normal text-slate-500">({data.priceUnit})</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Active Services ({data.servicesOffered.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {data.servicesOffered.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Location */}
        <Card className="bg-white border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin size={15} className="text-blue-600" />
                <span>Operating Location & Radius</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Base Address</span>
                <span className="font-semibold text-slate-800">{data.address || "—"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">City & Pin</span>
                <span className="font-semibold text-slate-800">{data.city} ({data.pincode || "—"})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Service Radius</span>
                <Badge variant="emerald" className="text-[10px] px-1.5 py-0 mt-0.5">{data.serviceRadiusKm} km</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Verification Placeholder */}
      <div className="p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <h4 className="font-bold text-emerald-950 text-sm">
            Fast-Track Digital KYC Verification
          </h4>
        </div>

        <p className="text-emerald-900 leading-relaxed text-xs">
          To receive the <strong>Verified Partner Badge</strong> and customer payout settlements, select your identification document:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[10px] font-bold uppercase text-emerald-900 mb-1">
              Document Type
            </label>
            <select
              value={data.kycDocumentType}
              onChange={(e) =>
                updateData({
                  kycDocumentType: e.target.value as OnboardingFormData["kycDocumentType"],
                })
              }
              className="w-full text-xs font-semibold bg-white border border-emerald-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="Aadhaar Card">Aadhaar Card (UIDAI)</option>
              <option value="PAN Card">PAN Card (Income Tax Dept)</option>
              <option value="GST / Trade License">GST / Municipal Trade License</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-emerald-900 mb-1">
              Document ID Number (Optional for Trial)
            </label>
            <input
              type="text"
              value={data.kycDocumentNumber}
              onChange={(e) => updateData({ kycDocumentNumber: e.target.value })}
              placeholder="e.g. 12-digit Aadhaar / 10-digit PAN"
              className="w-full text-xs font-semibold bg-white border border-emerald-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
          <Lock size={12} className="shrink-0" />
          <span>Documents are strictly encrypted and processed under Sahayak-Local Partner Safeguard.</span>
        </div>
      </div>

      {/* Terms & Code of Conduct Checkbox */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.termsAccepted}
            onChange={(e) => {
              updateData({ termsAccepted: e.target.checked });
              if (error) setError(null);
            }}
            className="w-4 h-4 rounded mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="text-xs text-slate-700 leading-snug">
            <span className="font-bold text-slate-900">
              I agree to the Sahayak-Local Partner Terms & Code of Conduct.
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              I certify that the information provided is accurate and I am committed to punctual, fair-priced doorstep service quality.
            </p>
          </div>
        </label>

        {error && (
          <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-xl border border-rose-200">
            {error}
          </p>
        )}
      </div>

      {/* Navigation & Submit Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={isSubmitting}
          className="gap-2 font-semibold text-xs sm:text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </Button>

        <Button
          type="submit"
          variant="emerald"
          size="lg"
          disabled={isSubmitting}
          className="px-8 font-black text-xs sm:text-sm gap-2 shadow-md cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Submit Provider Application</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
