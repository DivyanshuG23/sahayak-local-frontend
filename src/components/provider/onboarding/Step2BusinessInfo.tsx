"use client";

import React, { useState } from "react";
import { Building2, Award, FileText, ArrowRight, ArrowLeft } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/mockData";
import { OnboardingFormData } from "@/features/provider/onboardingTypes";

interface Step2Props {
  data: OnboardingFormData;
  updateData: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2BusinessInfo: React.FC<Step2Props> = ({
  data,
  updateData,
  onNext,
  onPrev,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!data.businessName.trim()) {
      errs.businessName = "Business / Storefront name is required";
    } else if (data.businessName.trim().length < 3) {
      errs.businessName = "Business name must be at least 3 characters";
    }

    if (!data.category) {
      errs.category = "Please select your primary service category";
    }

    if (!data.description.trim()) {
      errs.description = "Brief business description is required";
    } else if (data.description.trim().length < 15) {
      errs.description = "Please describe your services in at least 15 characters";
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
          Business Information
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Tell customers about your registered business brand, industry category, and expertise.
        </p>
      </div>

      <div className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business / Shop / Brand Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Building2 size={16} />
            </div>
            <input
              type="text"
              value={data.businessName}
              onChange={(e) => {
                updateData({ businessName: e.target.value });
                if (errors.businessName) setErrors({ ...errors, businessName: "" });
              }}
              placeholder="e.g. Sharma Electricals & Home Automation"
              className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.businessName
                  ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.businessName && (
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              {errors.businessName}
            </p>
          )}
        </div>

        {/* Category & Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Primary Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.category}
              onChange={(e) => {
                updateData({ category: e.target.value });
                if (errors.category) setErrors({ ...errors, category: "" });
              }}
              className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                {errors.category}
              </p>
            )}
          </div>

          {/* Experience Years */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Years of Experience <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Award size={16} />
              </div>
              <select
                value={data.experienceYears}
                onChange={(e) => updateData({ experienceYears: Number(e.target.value) })}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value={1}>1 year experience</option>
                <option value={2}>2 years experience</option>
                <option value={3}>3 to 5 years experience</option>
                <option value={6}>6 to 10 years experience</option>
                <option value={11}>10+ years master experience</option>
              </select>
            </div>
          </div>
        </div>

        {/* Business Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business Description & Highlights <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => {
              updateData({ description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: "" });
            }}
            placeholder="Tell customers about your qualifications, tools used, quality standards, and specializations..."
            className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.description
                ? "border-rose-300 focus:ring-rose-400 bg-rose-50/30"
                : "border-slate-200 focus:ring-blue-500"
            }`}
          />
          {errors.description && (
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              {errors.description}
            </p>
          )}
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
          <span>Continue to Services</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
};
