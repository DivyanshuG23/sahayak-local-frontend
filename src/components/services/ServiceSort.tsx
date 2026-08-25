"use client";

import React from "react";
import { SlidersHorizontal, ChevronDown } from "../icons/Icons";
import { SortOption } from "@/features/services/types";
import { Button } from "../ui/button";

interface ServiceSortProps {
  categoryTitle: string;
  locationName: string;
  totalResults: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export const ServiceSort: React.FC<ServiceSortProps> = ({
  categoryTitle,
  locationName,
  totalResults,
  currentSort,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount,
}) => {
  return (
    <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Results Count Header */}
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {categoryTitle} Near {locationName || "You"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            <span className="font-bold text-slate-900">{totalResults}</span> {totalResults === 1 ? "service" : "services"} found near your location
          </p>
        </div>

        {/* Right Controls: Mobile Filter Button & Desktop Sort Select */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Filter Sheet Trigger Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-2 font-bold text-slate-800 border-slate-300 relative"
          >
            <SlidersHorizontal size={16} className="text-blue-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline whitespace-nowrap">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                <option value="recommended">Recommended</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="distance-asc">Nearest Distance</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
