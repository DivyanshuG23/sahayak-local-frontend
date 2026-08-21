"use client";

import React from "react";
import { WHY_CHOOSE_US } from "../../data/mockData";
import { ShieldCheck, MapPin, Star, CheckCircle2 } from "../icons/Icons";

const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "ShieldCheck":
      return <ShieldCheck size={28} />;
    case "MapPin":
      return <MapPin size={28} />;
    case "Star":
      return <Star size={28} />;
    case "CheckCircle2":
      return <CheckCircle2 size={28} />;
    default:
      return <ShieldCheck size={28} />;
  }
};

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/60">
            Why Choose Sahayak-Local
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Neighborhood Trust & Transparency
          </h2>
          <p className="text-slate-600 text-base">
            Empowering customers with authentic local service discovery while supporting verified local micro-entrepreneurs.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {getFeatureIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-blue-600">
                <span>Verified Quality</span>
                <span className="text-emerald-600">✓ Guaranteed</span>
              </div>
            </div>
          ))}
        </div>

        {/* B.Tech Project Showcase Callout Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-blue-400/30">
              Local Hyperlocal Platform Architecture
            </span>
            <h3 className="text-xl font-bold">Solving Local Services Discovery in Tier 2 & Tier 3 Cities</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Sahayak-Local bridges the gap between skilled unorganized technicians and urban households through real-time geolocation matching and transparent peer reviews.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-center">
              <div className="text-lg font-black text-blue-400">100%</div>
              <div className="text-[10px] text-slate-300 font-medium">Free Access</div>
            </div>
            <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-center">
              <div className="text-lg font-black text-emerald-400">Direct</div>
              <div className="text-[10px] text-slate-300 font-medium">Provider Contact</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
