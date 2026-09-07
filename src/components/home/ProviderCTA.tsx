"use client";

import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, UserCheck, ArrowRight, CheckCircle2 } from "../icons/Icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface ProviderCTAProps {
  onOpenProviderModal: () => void;
}

export const ProviderCTA: React.FC<ProviderCTAProps> = ({ onOpenProviderModal }) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & CTA Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border-white/20 text-blue-100 gap-2 font-bold uppercase tracking-wider text-xs">
              <Building2 size={16} className="text-emerald-400" />
              <span>For Service Professionals & Local Stores</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Grow Your Local Business with <span className="text-blue-300">Sahayak-Local</span>
            </h2>

            <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-xl">
              Reach more customers in your city, showcase your services, build a digital reputation, and manage bookings from one single platform.
            </p>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Zero Commission on First 50 Bookings</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Direct Customer Calls & WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Verified Business Badge on Profile</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Instant Daily Payout Option</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link href="/provider/onboarding">
                <Button
                  variant="emerald"
                  size="lg"
                  className="px-7 py-3.5 text-slate-950 font-extrabold text-sm rounded-xl gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer w-full sm:w-auto"
                >
                  <UserCheck size={18} />
                  <span>Join as a Provider</span>
                </Button>
              </Link>

              <Button
                render={<a href="#how-it-works" />}
                variant="outline"
                size="lg"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl backdrop-blur-md border-white/20 gap-2"
              >
                <span>Learn More</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Right Provider Card Graphic */}
          <div className="lg:col-span-5">
            <Card className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border-white/20 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-xl">
                    S
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Partner Dashboard Preview</h3>
                    <p className="text-xs text-blue-200">Real-time Lead Notifications</p>
                  </div>
                </div>
                <Badge variant="emerald" className="text-[10px] uppercase font-bold px-2.5 py-1">
                  Live System
                </Badge>
              </div>

              {/* Sample Incoming Request Notification */}
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>New Customer Booking Request</span>
                  <span className="text-blue-400 font-semibold">Just Now</span>
                </div>
                <div className="text-sm font-bold text-white">AC Service & Gas Leakage Repair</div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>📍 Sector 5, Vaishali Nagar</span>
                  <span className="text-emerald-400 font-bold">₹1,299 Est.</span>
                </div>
              </div>

              {/* Stats row inside graphic */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-black text-white">3.5x</div>
                  <div className="text-[10px] text-blue-200 font-medium">Avg Revenue Growth</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-black text-white">24/7</div>
                  <div className="text-[10px] text-blue-200 font-medium">Partner Support</div>
                </div>
              </div>

            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

