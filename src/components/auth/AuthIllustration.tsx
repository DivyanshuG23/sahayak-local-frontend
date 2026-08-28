"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Droplets,
  Wind,
  Sparkles,
  Wrench,
  Star
} from "@/components/icons/Icons";

interface AuthIllustrationProps {
  title?: string;
  subtitle?: string;
  trustPoint3?: string;
}

export const AuthIllustration: React.FC<AuthIllustrationProps> = ({
  title = "Welcome Back!",
  subtitle = "Find trusted local services and manage your bookings easily.",
  trustPoint3 = "Local Services",
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden h-full min-h-[580px] rounded-3xl lg:rounded-r-none shadow-xl">
      {/* Background Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Logo */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md ring-2 ring-blue-400/30 group-hover:scale-105 transition-transform">
            <Building2 size={22} strokeWidth={2.2} />
          </div>
          <div className="text-xl font-black tracking-tight">
            Sahayak<span className="text-blue-400">-Local</span>
          </div>
        </Link>
      </div>

      {/* Center Welcome Hero & Illustration Graphic */}
      <div className="relative z-10 my-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
            <Sparkles size={13} className="text-blue-400" />
            <span>Trusted Local Services Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            {title}
          </h1>

          <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Local Services Illustration Card Grid */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-5 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-300">Popular Nearby Services</span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star size={13} />
              <span>4.9 / 5 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "AC Repair & Service", icon: Wind, color: "text-blue-400 bg-blue-500/20" },
              { label: "Electrician & Wiring", icon: Zap, color: "text-amber-400 bg-amber-500/20" },
              { label: "Plumbing Services", icon: Droplets, color: "text-cyan-400 bg-cyan-500/20" },
              { label: "Appliance Repair", icon: Wrench, color: "text-emerald-400 bg-emerald-500/20" },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className={`p-2 rounded-xl ${srv.color} shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate">{srv.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Trust Points */}
      <div className="relative z-10 border-t border-white/10 pt-6">
        <div className="flex items-center justify-between flex-wrap gap-3 text-xs font-bold text-slate-200">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span>Verified Providers</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span>Easy Booking</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span>{trustPoint3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
