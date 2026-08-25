"use client";

import React from "react";
import { SlidersHorizontal, RotateCcw, Star, CheckCircle2, ShieldCheck } from "../icons/Icons";
import { ServiceFilterState } from "@/features/services/types";
import { CATEGORIES } from "@/data/mockData";
import { Button } from "../ui/button";

interface ServiceFiltersProps {
  filters: ServiceFilterState;
  onFilterChange: (updated: Partial<ServiceFilterState>) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-6 sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-blue-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Filter Section 1: Category */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Category
        </label>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1 text-xs font-medium text-slate-700 scrollbar-thin">
          <button
            type="button"
            onClick={() => onFilterChange({ category: "all" })}
            className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
              filters.category === "all"
                ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/60"
                : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            <span>All Services</span>
            {filters.category === "all" && <CheckCircle2 size={14} className="text-blue-600" />}
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onFilterChange({ category: cat.slug })}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/60"
                    : "hover:bg-slate-50 text-slate-600"
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <CheckCircle2 size={14} className="text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Section 2: Distance */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Distance Radius
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
          {[
            { label: "Within 1 km", val: 1 },
            { label: "Within 3 km", val: 3 },
            { label: "Within 5 km", val: 5 },
            { label: "Within 10 km", val: 10 },
            { label: "Any Distance", val: 50 },
          ].map((dist) => {
            const isSelected = filters.distanceMax === dist.val;
            return (
              <button
                key={dist.val}
                type="button"
                onClick={() => onFilterChange({ distanceMax: dist.val })}
                className={`px-2.5 py-2 rounded-xl text-center transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold border-blue-600 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                }`}
              >
                {dist.label}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Section 3: Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label className="font-extrabold text-slate-900 uppercase tracking-wider block">
            Max Price
          </label>
          <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
            Up to ₹{filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="3000"
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({
              priceRange: [filters.priceRange[0], parseInt(e.target.value, 10)],
            })
          }
          className="w-full accent-blue-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
          <span>₹200</span>
          <span>₹1,500</span>
          <span>₹3,000+</span>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Section 4: Rating */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Minimum Rating
        </label>
        <div className="space-y-1 text-xs">
          {[
            { label: "4.5+ Rating", val: 4.5, stars: 5 },
            { label: "4.0+ Rating", val: 4.0, stars: 4 },
            { label: "3.0+ Rating", val: 3.0, stars: 3 },
            { label: "All Ratings", val: 0, stars: 0 },
          ].map((r) => {
            const isSelected = filters.ratingMin === r.val;
            return (
              <button
                key={r.val}
                type="button"
                onClick={() => onFilterChange({ ratingMin: r.val })}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/60"
                    : "hover:bg-slate-50 text-slate-600 font-medium"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span>{r.label}</span>
                </div>
                {isSelected && <CheckCircle2 size={14} className="text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Section 5: Availability */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Availability
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.availableToday}
              onChange={(e) => onFilterChange({ availableToday: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <span>Available Today</span>
          </label>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Section 6: Provider Type */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
          Provider Type
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onFilterChange({ verifiedOnly: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <div className="flex items-center gap-1 text-slate-800">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Verified Providers</span>
            </div>
          </label>
        </div>
      </div>

      {/* Clear All Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onResetFilters}
        className="w-full justify-center gap-2 font-bold text-slate-700 border-slate-300 hover:bg-slate-100 text-xs py-2.5"
      >
        <RotateCcw size={14} />
        <span>Clear All Filters</span>
      </Button>

    </div>
  );
};
