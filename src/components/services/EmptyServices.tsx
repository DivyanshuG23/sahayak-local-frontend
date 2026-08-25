"use client";

import React from "react";
import { SearchX, RotateCcw, Search } from "../icons/Icons";
import { Button } from "../ui/button";

interface EmptyServicesProps {
  onResetFilters: () => void;
  onResetSearch: () => void;
}

export const EmptyServices: React.FC<EmptyServicesProps> = ({
  onResetFilters,
  onResetSearch,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-10 sm:p-14 text-center space-y-6 max-w-xl mx-auto my-8">
      {/* Icon Graphic Container */}
      <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
        <SearchX size={40} />
      </div>

      {/* Heading & Details */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          No Local Services Found
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          We couldn't find any service providers matching your current search criteria or active filter settings.
        </p>
      </div>

      {/* Helpful Tips Box */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-xs text-slate-600 text-left space-y-1.5 font-medium">
        <div className="font-bold text-slate-900 mb-1">Tips to find more providers:</div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold">•</span>
          <span>Expand the distance radius in filters (e.g. up to 10 km).</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold">•</span>
          <span>Clear price range or minimum rating constraints.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold">•</span>
          <span>Check for typos in your search keyword or city name.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          onClick={onResetFilters}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md gap-2 cursor-pointer"
        >
          <RotateCcw size={15} />
          <span>Clear All Filters</span>
        </Button>

        <Button
          variant="outline"
          onClick={onResetSearch}
          className="w-full sm:w-auto px-6 py-2.5 border-slate-300 text-slate-700 text-xs font-bold rounded-xl gap-2 cursor-pointer"
        >
          <Search size={15} />
          <span>Reset Search</span>
        </Button>
      </div>
    </div>
  );
};
