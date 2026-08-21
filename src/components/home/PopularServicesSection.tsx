"use client";

import React, { useState } from "react";
import { ServiceProvider, CATEGORIES } from "../../data/mockData";
import {
  Star,
  MapPin,
  ShieldCheck,
  Heart,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2
} from "../icons/Icons";

interface PopularServicesSectionProps {
  services: ServiceProvider[];
  selectedCategory: string | null;
  onSelectCategoryFilter: (categorySlug: string | null) => void;
  onSelectProvider: (provider: ServiceProvider) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const PopularServicesSection: React.FC<PopularServicesSectionProps> = ({
  services,
  selectedCategory,
  onSelectCategoryFilter,
  onSelectProvider,
  favorites,
  onToggleFavorite
}) => {
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean>(false);

  const filteredServices = services.filter((item) => {
    const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
    const matchesAvailability = availabilityFilter ? item.availableToday === true : true;
    return matchesCategory && matchesAvailability;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full w-fit">
              Featured Local Businesses
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Services Near You
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Highly rated professionals trusted by local neighborhood customers.
            </p>
          </div>

          {/* Quick Toggle for Available Today */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAvailabilityFilter(!availabilityFilter)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                availabilityFilter
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500"
              }`}
            >
              <Clock size={15} />
              <span>Available Today Only</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategoryFilter(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === null
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            All Services ({services.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategoryFilter(isSelected ? null : cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Filter size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Services Found</h3>
            <p className="text-xs text-slate-500">
              Try clearing your category filter or availability search toggle to explore all local providers.
            </p>
            <button
              onClick={() => {
                onSelectCategoryFilter(null);
                setAvailabilityFilter(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((provider) => {
            const isFav = favorites.includes(provider.id);
            return (
              <div
                key={provider.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Top Badges overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
                    {provider.verified && (
                      <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                        <ShieldCheck size={12} />
                        Verified
                      </span>
                    )}
                    {provider.badgeText && (
                      <span className="bg-slate-900/90 backdrop-blur-md text-blue-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {provider.badgeText}
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(provider.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 ${
                      isFav
                        ? "bg-rose-500 text-white shadow-md scale-110"
                        : "bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500"
                    }`}
                    aria-label="Add to favorites"
                  >
                    <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                  </button>

                  {/* Category Pill on Image */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="bg-white/95 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                      {provider.category}
                    </span>
                  </div>

                  {/* Distance Pill */}
                  <div className="absolute bottom-3 right-3 z-10 text-white text-xs font-medium flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-xs">
                    <MapPin size={12} className="text-blue-400" />
                    <span>{provider.distanceKm} km away</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header Name & Rating */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 shrink-0">
                        <Star size={13} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-900">{provider.rating}</span>
                        <span className="text-[11px] text-slate-500">({provider.reviewCount})</span>
                      </div>
                    </div>

                    {/* Owner & Locality info */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>By {provider.ownerName}</span>
                      <span>•</span>
                      <span className="truncate">{provider.locality}, {provider.location}</span>
                    </div>

                    {/* Highlights bullet pills */}
                    <div className="mt-3 space-y-1">
                      {provider.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Starting Price
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-slate-900">₹{provider.startingPrice}</span>
                        <span className="text-xs text-slate-500 font-medium">/{provider.priceUnit}</span>
                      </div>
                    </div>

                    {/* View Details Modal Trigger */}
                    <button
                      onClick={() => onSelectProvider(provider)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Footer Availability Banner */}
                <div
                  className={`px-5 py-2 text-[11px] font-semibold flex items-center justify-between border-t ${
                    provider.availableToday
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-50 text-slate-500 border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        provider.availableToday ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                    <span>{provider.availableToday ? "Available Today" : "Book Next Slot"}</span>
                  </div>
                  <span className="text-slate-500 font-normal">Responds {provider.responseTime}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
