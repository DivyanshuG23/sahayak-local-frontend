"use client";

import React from "react";
import { Search, MapPin, SlidersHorizontal } from "../icons/Icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ServiceSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  locationTerm: string;
  setLocationTerm: (location: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onQuickCategoryClick: (categorySlug: string) => void;
  selectedCategory: string;
}

const POPULAR_TAGS = [
  { name: "Electrician", slug: "electrician" },
  { name: "Plumber", slug: "plumber" },
  { name: "AC Repair", slug: "ac-repair" },
  { name: "Cleaning", slug: "cleaning" },
  { name: "Carpenter", slug: "carpenter" },
  { name: "Mechanic", slug: "mechanic" },
  { name: "Tutor & Classes", slug: "tutor" },
];

export const ServiceSearch: React.FC<ServiceSearchProps> = ({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
  onSearchSubmit,
  onQuickCategoryClick,
  selectedCategory,
}) => {
  return (
    <div className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white py-12 lg:py-16 px-4 relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 text-center relative z-10">
        
        {/* Header Title */}
        <div className="space-y-2">
          <Badge variant="outline" className="bg-white/10 text-blue-200 border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            Verified Local Marketplace
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Find the Right Local Service
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Discover trusted professionals near your location with verified reviews and upfront pricing.
          </p>
        </div>

        {/* Search Bar Form */}
        <form
          onSubmit={onSearchSubmit}
          className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl mx-auto"
        >
          {/* Input 1: Service Name / Keywords */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Search size={20} className="text-blue-600 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What service are you looking for? (e.g. Electrician)"
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-xs text-slate-400 hover:text-slate-600 px-1 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Divider line for desktop */}
          <div className="hidden md:block w-px h-8 bg-slate-200" />

          {/* Input 2: Location */}
          <div className="md:w-64 flex items-center gap-3 px-3.5 py-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <MapPin size={20} className="text-emerald-600 shrink-0" />
            <input
              type="text"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              placeholder="Location (e.g. Ghaziabad)"
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
            />
          </div>

          {/* Submit Search Button */}
          <Button
            type="submit"
            size="lg"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/30 gap-2 shrink-0"
          >
            <Search size={18} />
            <span>Search</span>
          </Button>
        </form>

        {/* Popular Category Tags Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-400 font-semibold mr-1">Popular:</span>
          {POPULAR_TAGS.map((tag) => {
            const isActive = selectedCategory === tag.slug;
            return (
              <button
                key={tag.slug}
                type="button"
                onClick={() => onQuickCategoryClick(tag.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                    : "bg-white/10 hover:bg-white/20 text-slate-200 border-white/10 hover:border-white/30"
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
