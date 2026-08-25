"use client";

import React from "react";
import { ShieldCheck, Star, MapPin, CheckCircle2 } from "../icons/Icons";

export const TrustStrip: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 text-white py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2 text-slate-200">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <span>Verified Local Providers</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <Star size={18} className="text-amber-400 fill-amber-400 shrink-0" />
          <span>Genuine Customer Reviews</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <MapPin size={18} className="text-blue-400 shrink-0" />
          <span>Hyperlocal Neighborhood Matching</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>Transparent Price & Zero Advance</span>
        </div>
      </div>
    </div>
  );
};
