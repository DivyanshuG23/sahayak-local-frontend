"use client";

import React from "react";
import Link from "next/link";
import { ServiceProvider } from "@/data/mockData";
import { Star, MapPin, ShieldCheck, Heart, Clock, ArrowRight, CheckCircle2 } from "../icons/Icons";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ServiceCardProps {
  provider: ServiceProvider;
  onSelectProvider?: (provider: ServiceProvider) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  provider,
  onSelectProvider,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <Card className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        
        {/* Top Image Container */}
        <Link href={`/services/${provider.id}`} className="relative h-48 w-full overflow-hidden bg-slate-100 block">
          <img
            src={provider.imageUrl}
            alt={provider.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

          {/* Top-Right Favorite Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(provider.id);
            }}
            aria-label={isFavorite ? "Remove from saved favorites" : "Save to favorites"}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md z-10 ${
              isFavorite
                ? "bg-rose-500 text-white border-rose-400 scale-105"
                : "bg-white/80 hover:bg-white text-slate-700 border border-white/50 hover:text-rose-500"
            }`}
          >
            <Heart
              size={18}
              className={isFavorite ? "fill-white" : ""}
            />
          </button>

          {/* Top-Left Trust Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {provider.verified && (
              <Badge variant="emerald" className="px-2.5 py-0.5 text-[11px] font-extrabold shadow-sm gap-1 bg-emerald-600 text-white">
                <ShieldCheck size={12} className="text-white" />
                <span>Verified</span>
              </Badge>
            )}
            {provider.badgeText && (
              <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-bold bg-white/90 backdrop-blur-md text-slate-800 border-none shadow-xs">
                {provider.badgeText}
              </Badge>
            )}
          </div>

          {/* Bottom Overlay Info (Category & Locality) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <span className="bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide">
              {provider.category}
            </span>
            <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px]">
              <MapPin size={12} className="text-emerald-400 shrink-0" />
              <span className="truncate max-w-[120px]">{provider.locality}</span>
            </div>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 space-y-3.5">
          
          {/* Header Row: Business Name & Avatar */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/services/${provider.id}`}>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                  {provider.name}
                </h3>
              </Link>
              <p className="text-xs text-slate-500 font-medium">
                By {provider.ownerName} • {provider.experienceYears} yrs exp.
              </p>
            </div>
            <img
              src={provider.avatarUrl}
              alt={provider.ownerName}
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover shrink-0"
            />
          </div>

          {/* Rating & Review Count Row */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-lg">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="font-extrabold text-slate-900">{provider.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-medium">({provider.reviewCount} reviews)</span>
            </div>

            {/* Distance Info */}
            <div className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-100/80 px-2.5 py-1 rounded-lg">
              <MapPin size={13} className="text-blue-600" />
              <span>{provider.distanceKm} km away</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
            "{provider.about}"
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {provider.highlights.slice(0, 2).map((hl, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
              >
                <CheckCircle2 size={10} className="text-emerald-500" />
                <span className="truncate max-w-[150px]">{hl}</span>
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* Card Footer: Price & Primary CTA */}
      <div className="p-5 pt-0 mt-2">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Price & Availability */}
          <div className="space-y-0.5">
            <div className="text-xs text-slate-500 font-medium">Starting from</div>
            <div className="text-base sm:text-lg font-black text-slate-900">
              ₹{provider.startingPrice}{" "}
              <span className="text-xs font-semibold text-slate-500">/ {provider.priceUnit}</span>
            </div>
            {provider.availableToday ? (
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available Today</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock size={11} />
                <span>Next Slot Tomorrow</span>
              </div>
            )}
          </div>

          {/* Primary CTA Link Button */}
          <Link href={`/services/${provider.id}`}>
            <Button
              size="sm"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 gap-1.5 group-hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight size={14} />
            </Button>
          </Link>

        </div>
      </div>
    </Card>
  );
};
