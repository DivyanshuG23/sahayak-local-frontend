"use client";

import React from "react";
import { ShieldCheck, Star, UserCheck, CheckCircle2, Clock } from "@/components/icons/Icons";

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: "Verified Provider",
      desc: "Background checked and government licensed technician.",
    },
    {
      icon: CheckCircle2,
      title: "Transparent Upfront Pricing",
      desc: "No hidden charges. Fixed service rates before booking.",
    },
    {
      icon: UserCheck,
      title: "Experienced Professional",
      desc: "Over 5+ years of hands-on doorstep service expertise.",
    },
    {
      icon: Star,
      title: "Genuine Customer Reviews",
      desc: "100% authentic ratings left by neighborhood customers.",
    },
    {
      icon: Clock,
      title: "Zero Advance Payment",
      desc: "Pay directly after work completion and full satisfaction.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
      <div className="space-y-1">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
          Safety & Guarantee
        </span>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          Why Book With This Provider?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trustPoints.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 hover:bg-white/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center">
                <IconComponent size={20} />
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
