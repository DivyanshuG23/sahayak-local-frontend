"use client";

import React, { useState } from "react";
import { Wrench, CreditCard, Clock, Check, Plus, X, ArrowRight, ArrowLeft } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OnboardingFormData } from "@/features/provider/onboardingTypes";
import { CATEGORIES } from "@/data/mockData";

interface Step3Props {
  data: OnboardingFormData;
  updateData: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3ServiceInfo: React.FC<Step3Props> = ({
  data,
  updateData,
  onNext,
  onPrev,
}) => {
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Suggested services based on category
  const selectedCategoryObj = CATEGORIES.find(
    (c) => c.name.toLowerCase() === data.category.toLowerCase()
  );
  const suggestedServices = selectedCategoryObj?.popularServices || [
    "General Doorstep Inspection",
    "Basic Repair & Maintenance",
    "Emergency Tripping Check",
    "Installation & Setup",
  ];

  const toggleService = (serviceName: string) => {
    if (data.servicesOffered.includes(serviceName)) {
      if (data.servicesOffered.length === 1) {
        setError("At least one service must be selected");
        return;
      }
      updateData({
        servicesOffered: data.servicesOffered.filter((s) => s !== serviceName),
      });
      setError(null);
    } else {
      updateData({
        servicesOffered: [...data.servicesOffered, serviceName],
      });
      setError(null);
    }
  };

  const handleAddCustomService = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customServiceInput.trim();
    if (!trimmed) return;
    if (!data.servicesOffered.includes(trimmed)) {
      updateData({
        servicesOffered: [...data.servicesOffered, trimmed],
      });
    }
    setCustomServiceInput("");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.servicesOffered.length === 0) {
      setError("Please select or add at least one service offered");
      return;
    }
    if (!data.startingPrice || data.startingPrice <= 0) {
      setError("Please enter a valid starting price greater than 0");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          Services Offered & Pricing
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Select the services you provide in your city and configure your base visiting or labor rates.
        </p>
      </div>

      <div className="space-y-5">
        {/* Services Offered Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Services Offered in {data.category} <span className="text-rose-500">*</span>
          </label>

          <p className="text-[11px] text-slate-500 mb-2">
            Click to toggle popular packages or add your specialized offerings:
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedServices.map((serviceName) => {
              const isSelected = data.servicesOffered.includes(serviceName);
              return (
                <button
                  key={serviceName}
                  type="button"
                  onClick={() => toggleService(serviceName)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 border-blue-300 shadow-2xs font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {isSelected ? <Check size={14} className="text-blue-600" /> : <Plus size={14} />}
                  <span>{serviceName}</span>
                </button>
              );
            })}
          </div>

          {/* Add custom service input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customServiceInput}
              onChange={(e) => setCustomServiceInput(e.target.value)}
              placeholder="Add another custom service..."
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCustomService}
              className="text-xs font-semibold cursor-pointer"
            >
              Add
            </Button>
          </div>

          {/* Currently Selected Badges */}
          <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Selected Services ({data.servicesOffered.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.servicesOffered.map((s) => (
                <Badge
                  key={s}
                  variant="blue"
                  className="py-1 px-2.5 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>{s}</span>
                  <X
                    size={12}
                    className="cursor-pointer hover:text-rose-500"
                    onClick={() => toggleService(s)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Units */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Starting Visiting / Service Charge (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold">
                ₹
              </span>
              <input
                type="number"
                min={50}
                value={data.startingPrice || ""}
                onChange={(e) => updateData({ startingPrice: Number(e.target.value) })}
                placeholder="e.g. 399"
                className="w-full text-xs sm:text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Minimum inspection / visit fee displayed on your storefront.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Pricing Unit
            </label>
            <select
              value={data.priceUnit}
              onChange={(e) => updateData({ priceUnit: e.target.value })}
              className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="per visit">per visit / inspection</option>
              <option value="per service">per standard service</option>
              <option value="per hour">per labor hour</option>
              <option value="fixed estimate">fixed quote on inspection</option>
            </select>
          </div>
        </div>

        {/* Availability Schedule */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Weekly Working Hours
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Clock size={16} />
              </div>
              <input
                type="text"
                value={data.workingHours}
                onChange={(e) => updateData({ workingHours: e.target.value })}
                placeholder="e.g. 08:30 AM - 08:30 PM (Mon - Sat)"
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Emergency Service Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">
                Offer Urgent / Emergency Service
              </span>
              <p className="text-[11px] text-slate-500">
                Customers can request fast response bookings with urgent surcharge.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateData({ emergencyAvailability: !data.emergencyAvailability })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                data.emergencyAvailability ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  data.emergencyAvailability ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
            {error}
          </p>
        )}
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
          <span>Continue to Location</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
};
