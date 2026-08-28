"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceProvider } from "@/data/mockData";
import { Star, ShieldCheck, MapPin, CheckCircle2, ChevronRight } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";

interface SelectedServiceProps {
  provider: ServiceProvider;
  selectedServiceTitle: string;
  selectedServicePrice: number;
  selectedServiceUnit: string;
}

export const SelectedService: React.FC<SelectedServiceProps> = ({
  provider,
  selectedServiceTitle,
  selectedServicePrice,
  selectedServiceUnit,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-5">
      
      {/* Header Label */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2">
          <Badge variant="blue" className="px-2.5 py-0.5 text-[10px] uppercase font-extrabold tracking-wider">
            Verified Partner
          </Badge>
          <span className="text-xs text-slate-500 font-semibold">• Direct Doorstep Booking</span>
        </div>
        <Link
          href={`/services/${provider.id}`}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-colors"
        >
          <span>View Profile</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Provider Details Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white ring-2 ring-slate-100 shrink-0">
            <Image
              src={provider.avatarUrl || provider.imageUrl}
              alt={provider.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                {provider.name}
              </h2>
              {provider.verified && (
                <ShieldCheck size={18} className="text-blue-600 shrink-0" title="Verified Provider" />
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={14} className="fill-amber-400" />
                <span className="text-slate-900">{provider.rating}</span>
                <span className="text-slate-400">({provider.reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span className="font-medium text-slate-600">{provider.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-slate-500 font-medium">
                <MapPin size={13} className="text-rose-500 shrink-0" />
                <span>{provider.locality}, {provider.location} ({provider.distanceKm} km away)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Response badge */}
        <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200/60 flex items-center gap-1.5 shrink-0">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span>Arrival: {provider.responseTime}</span>
        </div>

      </div>

      {/* Selected Item Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
            Selected Service Package
          </span>
          <h3 className="text-base font-extrabold text-slate-900">
            {selectedServiceTitle}
          </h3>
          <p className="text-xs text-slate-500">
            Includes professional setup, safety inspection, and 30-day Sahayak Service Guarantee.
          </p>
        </div>

        <div className="text-right sm:text-right shrink-0">
          <div className="text-2xl font-black text-blue-600">
            ₹{selectedServicePrice}
          </div>
          <div className="text-[11px] font-semibold text-slate-500">
            / {selectedServiceUnit}
          </div>
        </div>
      </div>

    </div>
  );
};
