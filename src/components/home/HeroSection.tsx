"use client";

import React, { useState } from "react";
import { Search, MapPin, ShieldCheck, CheckCircle2, Star, Users, Award, ChevronRight } from "../icons/Icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onQuickCategoryClick: (categorySlug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  onSearchSubmit,
  onQuickCategoryClick,
}) => {
  const [activeTab, setActiveTab] = useState<"services" | "businesses">("services");

  const popularTags = [
    { label: "Electrician", slug: "electrician" },
    { label: "Plumber", slug: "plumber" },
    { label: "AC Repair", slug: "ac-repair" },
    { label: "Cleaning", slug: "cleaning" },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-30 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Search Interface */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Pill Badge */}
            <Badge variant="secondary" className="bg-blue-50 border border-blue-200/80 text-blue-700 font-semibold tracking-wide uppercase px-3.5 py-1.5 rounded-full gap-2 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>India's Preferred Local Discovery Hub</span>
            </Badge>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Find Trusted <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Local Services</span> Near You
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                Discover reliable professionals and local businesses for your everyday needs. Verified ratings, upfront pricing & instant doorstep help.
              </p>
            </div>

            {/* Dual Search Box Card */}
            <Card className="p-3 sm:p-4 shadow-xl shadow-slate-900/5 border-slate-200/90 rounded-2xl">
              
              {/* Type Switcher Tabs */}
              <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2.5 px-1">
                <Button
                  type="button"
                  variant={activeTab === "services" ? "default" : "ghost"}
                  size="xs"
                  onClick={() => setActiveTab("services")}
                  className={`font-bold rounded-lg cursor-pointer ${
                    activeTab === "services"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Search Services
                </Button>
                <Button
                  type="button"
                  variant={activeTab === "businesses" ? "default" : "ghost"}
                  size="xs"
                  onClick={() => setActiveTab("businesses")}
                  className={`font-bold rounded-lg cursor-pointer ${
                    activeTab === "businesses"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Explore Businesses
                </Button>
              </div>

              {/* Form Input Container */}
              <form onSubmit={onSearchSubmit} className="flex flex-col md:flex-row gap-3">
                
                {/* Field 1: Service Input */}
                <div className="relative flex-1 flex items-center bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all px-3 py-2.5">
                  <Search size={20} className="text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      activeTab === "services"
                        ? "What service do you need? (e.g. Electrician)"
                        : "Search business name (e.g. Sharma Electricals)"
                    }
                    className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                  />
                </div>

                {/* Field 2: Location Input */}
                <div className="relative md:w-56 flex items-center bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all px-3 py-2.5">
                  <MapPin size={20} className="text-blue-600 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-600/20 gap-2 shrink-0"
                >
                  <Search size={18} />
                  <span>Search</span>
                </Button>
              </form>

              {/* Popular Tags */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-500">Popular:</span>
                {popularTags.map((tag) => (
                  <Badge
                    key={tag.slug}
                    variant="secondary"
                    onClick={() => onQuickCategoryClick(tag.slug)}
                    className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-md font-medium cursor-pointer transition-colors px-2.5 py-1"
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Trust Indicators Bar */}
            <div className="pt-2 grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-none">500+</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Verified Providers</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-none">10K+</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Services Done</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Star size={20} />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-none">4.8/5</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Average Rating</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Illustration & Floating Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
                  alt="Verified Local Service Provider"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                {/* Overlaid Image Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="emerald" className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                      Available Near You
                    </Badge>
                    <span className="text-xs text-slate-300 font-medium">• Jaipur & 7 Cities</span>
                  </div>
                  <h3 className="text-xl font-bold">Sharma Electricals & Solar Solutions</h3>
                  <p className="text-xs text-slate-300">Licensed local technician • 4.8 Rating (142 reviews)</p>
                </div>
              </div>

              {/* Floating Badge 1: Verification */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Background Checked</div>
                  <div className="text-[11px] text-slate-500">Government ID Verified</div>
                </div>
              </div>

              {/* Floating Badge 2: Quick Booking Pill */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold">Transparent Rates</div>
                  <div className="text-[11px] text-slate-400">Zero Hidden Booking Fees</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

