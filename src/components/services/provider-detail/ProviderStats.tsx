"use client";

import React from "react";
import { Star, Award, Briefcase, Clock, ShieldCheck } from "@/components/icons/Icons";

interface ProviderStatsProps {
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedJobs: number;
  responseTime: string;
}

export const ProviderStats: React.FC<ProviderStatsProps> = ({
  rating,
  reviewCount,
  experienceYears,
  completedJobs,
  responseTime,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-800">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
        
        {/* Stat 1: Rating */}
        <div className="p-2 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-black text-xl sm:text-2xl">
            <Star size={20} className="fill-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {reviewCount} Verified Reviews
          </div>
        </div>

        {/* Stat 2: Experience */}
        <div className="p-2 space-y-1 pt-4 md:pt-2">
          <div className="flex items-center justify-center gap-1.5 text-blue-400 font-black text-xl sm:text-2xl">
            <Award size={20} />
            <span>{experienceYears}+ Yrs</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Field Experience
          </div>
        </div>

        {/* Stat 3: Completed Jobs */}
        <div className="p-2 space-y-1 pt-4 md:pt-2">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-black text-xl sm:text-2xl">
            <Briefcase size={20} />
            <span>{completedJobs}+</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Services Completed
          </div>
        </div>

        {/* Stat 4: Response Time */}
        <div className="p-2 space-y-1 pt-4 md:pt-2">
          <div className="flex items-center justify-center gap-1.5 text-indigo-400 font-black text-xl sm:text-2xl">
            <Clock size={20} />
            <span>{responseTime.replace("Within ", "")}</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Avg. Response Time
          </div>
        </div>

      </div>
    </div>
  );
};
