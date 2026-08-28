"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SavedItem } from "@/data/mockFavorites";
import {
  Star,
  MapPin,
  ShieldCheck,
  Heart,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar
} from "@/components/icons/Icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FavoriteCardProps {
  item: SavedItem;
  onRemoveFavorite: (id: string) => void;
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({
  item,
  onRemoveFavorite
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleToggleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveFavorite(item.id);
    }, 250);
  };

  return (
    <Card
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        isRemoving ? "opacity-0 scale-95 duration-250" : "opacity-100 scale-100"
      }`}
    >
      <div>
        {/* Top Image Banner */}
        <Link href={`/services/${item.providerId}`} className="relative h-48 w-full overflow-hidden bg-slate-100 block">
          <img
            src={item.providerImage}
            alt={item.providerName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

          {/* Top-Right Animated Heart Button */}
          <button
            type="button"
            onClick={handleToggleHeart}
            aria-label="Remove from saved favorites"
            title="Remove from favorites"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md z-10 active:scale-125"
          >
            <Heart size={18} className="fill-white text-white animate-pulse" />
          </button>

          {/* Top-Left Trust & Type Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {item.providerVerified && (
              <Badge variant="emerald" className="px-2.5 py-0.5 text-[11px] font-extrabold shadow-sm gap-1 bg-emerald-600 text-white">
                <ShieldCheck size={12} className="text-white" />
                <span>Verified</span>
              </Badge>
            )}
            <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-extrabold bg-slate-900/80 backdrop-blur-md text-white border-none shadow-xs uppercase tracking-wider">
              {item.type === "provider" ? "Provider" : "Service"}
            </Badge>
          </div>

          {/* Bottom Banner Row: Category & Locality */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <span className="bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide">
              {item.category}
            </span>
            <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px]">
              <MapPin size={12} className="text-emerald-400 shrink-0" />
              <span className="truncate max-w-[120px]">{item.locality}</span>
            </div>
          </div>
        </Link>

        {/* Card Main Body */}
        <div className="p-5 space-y-3.5">
          {/* Business Header & Owner Avatar */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/services/${item.providerId}`}>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                  {item.providerName}
                </h3>
              </Link>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {item.serviceTitle}
              </p>
            </div>
            <img
              src={item.avatarUrl}
              alt={item.ownerName}
              className="w-10 h-10 rounded-full border-2 border-white shadow-xs object-cover shrink-0"
            />
          </div>

          {/* Rating & Distance Meta Info */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-xl">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              <span className="font-extrabold text-slate-900">{item.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-medium">({item.reviewsCount})</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-100/80 px-2.5 py-1 rounded-xl">
              <MapPin size={12} className="text-blue-600" />
              <span>{item.distanceKm} km away</span>
            </div>
          </div>

          {/* About / Description Snippet */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
            &ldquo;{item.about}&rdquo;
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {item.highlights.slice(0, 2).map((hl, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
              >
                <CheckCircle2 size={10} className="text-emerald-500" />
                <span className="truncate max-w-[140px]">{hl}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Pricing, Availability & Action Buttons */}
      <div className="p-5 pt-0 mt-2 space-y-3">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Starting from</div>
            <div className="text-base sm:text-lg font-black text-slate-900">
              ₹{item.startingPrice}{" "}
              <span className="text-xs font-semibold text-slate-500">/ {item.priceUnit}</span>
            </div>
          </div>

          {/* Availability Status Badge */}
          {item.availableToday ? (
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available Today</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              <Clock size={11} className="text-slate-400" />
              <span>{item.nextAvailableSlot || "Tomorrow"}</span>
            </div>
          )}
        </div>

        {/* Double Button CTA Row: View Details & Book Now */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link href={`/services/${item.providerId}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-xs font-bold text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-blue-600"
            >
              <span>View Details</span>
            </Button>
          </Link>

          <Link
            href={`/booking?providerId=${item.providerId}&serviceTitle=${encodeURIComponent(item.serviceTitle)}`}
            className="w-full"
          >
            <Button
              size="sm"
              className="w-full rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 gap-1"
            >
              <Calendar size={13} />
              <span>Book Now</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
