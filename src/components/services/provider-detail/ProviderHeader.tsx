"use client";

import React from "react";
import { ServiceProvider } from "@/data/mockData";
import { Star, MapPin, ShieldCheck, Heart, Phone, Share2, Calendar, CheckCircle2 } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProviderHeaderProps {
  provider: ServiceProvider;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBookClick: () => void;
  onContactClick: () => void;
  onShareClick: () => void;
}

export const ProviderHeader: React.FC<ProviderHeaderProps> = ({
  provider,
  isFavorite,
  onToggleFavorite,
  onBookClick,
  onContactClick,
  onShareClick,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Avatar + Title & Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar Image */}
          <div className="relative shrink-0">
            <img
              src={provider.avatarUrl}
              alt={provider.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
            />
            {provider.verified && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md" title="Verified Provider">
                <ShieldCheck size={16} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {provider.verified && (
                <Badge variant="emerald" className="px-3 py-0.5 text-xs font-extrabold gap-1 bg-emerald-600 text-white">
                  <ShieldCheck size={12} />
                  <span>Verified Provider</span>
                </Badge>
              )}
              <Badge variant="secondary" className="px-3 py-0.5 text-xs font-bold text-blue-700 bg-blue-50 border-none">
                {provider.category}
              </Badge>
              {provider.badgeText && (
                <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-semibold text-slate-700 border-slate-200">
                  {provider.badgeText}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {provider.name}
            </h1>

            <p className="text-sm text-slate-600 font-medium">
              Owned & Operated by <span className="font-bold text-slate-900">{provider.ownerName}</span> • {provider.experienceYears}+ years in service
            </p>

            {/* Rating, Reviews, Location & Distance */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 px-3 py-1 rounded-xl">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="font-black text-slate-900">{provider.rating.toFixed(1)}</span>
                <span className="text-slate-500 font-medium">({provider.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
                <MapPin size={15} className="text-blue-600" />
                <span>{provider.locality}, {provider.location}</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600 font-bold">{provider.distanceKm} km away</span>
              </div>

              {provider.availableToday && (
                <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-xl font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available Today</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
          
          <Button
            size="lg"
            onClick={onBookClick}
            className="flex-1 sm:flex-none px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 gap-2 cursor-pointer"
          >
            <Calendar size={18} />
            <span>Book Now</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onContactClick}
            className="flex-1 sm:flex-none px-5 py-3.5 border-slate-300 text-slate-800 font-bold text-sm rounded-xl hover:bg-slate-50 gap-2 cursor-pointer"
          >
            <Phone size={17} className="text-emerald-600" />
            <span>Contact</span>
          </Button>

          <button
            type="button"
            onClick={() => onToggleFavorite(provider.id)}
            aria-label={isFavorite ? "Remove from saved favorites" : "Save to favorites"}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer shadow-2xs ${
              isFavorite
                ? "bg-rose-50 text-rose-600 border-rose-200 scale-105"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300"
            }`}
          >
            <Heart size={20} className={isFavorite ? "fill-rose-500 text-rose-500" : ""} />
          </button>

          <button
            type="button"
            onClick={onShareClick}
            aria-label="Share provider profile"
            className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          >
            <Share2 size={19} />
          </button>

        </div>

      </div>

    </div>
  );
};
