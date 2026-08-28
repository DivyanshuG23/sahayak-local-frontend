import React from "react";
import Link from "next/link";
import { SearchX, ArrowRight, RotateCcw } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface EmptyBookingsProps {
  isFiltered?: boolean;
  onResetFilters?: () => void;
}

export const EmptyBookings: React.FC<EmptyBookingsProps> = ({
  isFiltered = false,
  onResetFilters
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto my-8 flex flex-col items-center space-y-5 animate-in fade-in duration-300">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner border border-blue-100/80 relative">
        <SearchX size={40} strokeWidth={1.5} />
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-900 shadow-xs">
          !
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {isFiltered ? "No matching bookings" : "No bookings found"}
        </h3>
        <p className="text-sm text-slate-500 font-normal leading-relaxed">
          {isFiltered
            ? "We couldn't find any bookings matching your current search or filter criteria."
            : "Your service bookings will appear here once you make your first booking on Sahayak-Local."}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {isFiltered && onResetFilters ? (
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="rounded-xl px-5 font-semibold text-slate-700 hover:text-blue-600 border-slate-300"
          >
            <RotateCcw size={16} className="mr-1.5" />
            <span>Reset Filters</span>
          </Button>
        ) : null}

        <Link href="/services">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-md shadow-blue-600/20 group">
            <span>Explore Services</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
