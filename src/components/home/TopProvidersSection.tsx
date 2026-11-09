"use client";

import React from "react";
import { Star, ShieldCheck, MapPin, Phone } from "../icons/Icons";
import { Card, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useGetProvidersQuery } from "@/services/serviceCatalog.service";

interface TopProvidersSectionProps {
  onContactProvider: (providerName: string) => void;
}

export const TopProvidersSection: React.FC<TopProvidersSectionProps> = ({ onContactProvider }) => {
  const { data: providersData, isLoading } = useGetProvidersQuery({ limit: 4 });

  const rawList = providersData?.data?.providers || providersData?.data || [];
  const providers = Array.isArray(rawList) ? rawList : [];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-bold uppercase tracking-wider text-xs px-3 py-1">
              Master Craftsmen & Technicians
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Top Rated Local Professionals
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Meet our highest-rated local service experts with proven track records and verified credentials.
            </p>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && providers.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm font-semibold text-slate-600">Verified local providers will appear here soon.</p>
          </div>
        )}

        {/* Providers Grid */}
        {!isLoading && providers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {providers.map((tp: any, idx: number) => {
              const name = tp.businessName || tp.ownerName || "Local Technician";
              const profession = tp.category || "Service Specialist";
              const rating = tp.rating || 4.9;
              const reviewCount = tp.reviewsCount || tp.reviewCount || 24;
              const location = tp.city || tp.address || "Local Area";
              const experience = tp.experienceYears ? `${tp.experienceYears}+ Yrs` : "Verified";
              const avatar =
                tp.avatar ||
                tp.userId?.avatar ||
                `https://images.unsplash.com/photo-${1534528741775 + idx}?q=80&w=300&auto=format&fit=crop`;
              const bannerBg =
                idx % 4 === 0
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700"
                  : idx % 4 === 1
                  ? "bg-gradient-to-r from-emerald-600 to-teal-700"
                  : idx % 4 === 2
                  ? "bg-gradient-to-r from-amber-500 to-orange-600"
                  : "bg-gradient-to-r from-purple-600 to-pink-600";

              return (
                <Card
                  key={tp._id || tp.id || idx}
                  className="p-0 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group rounded-2xl"
                >
                  {/* Profile Card Header */}
                  <div>
                    <div className={`h-24 ${bannerBg} relative p-4 flex justify-between items-start`}>
                      <Badge
                        variant="outline"
                        className="bg-white/20 backdrop-blur-md text-white border-white/20 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5"
                      >
                        {experience} Exp
                      </Badge>
                      <span className="bg-white text-emerald-600 p-1.5 rounded-full shadow-xs">
                        <ShieldCheck size={16} />
                      </span>
                    </div>

                    {/* Avatar & Title Overlap */}
                    <div className="px-6 relative -mt-12 text-center">
                      <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mx-auto shadow-md bg-slate-100 group-hover:scale-105 transition-transform">
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors">
                        {name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border-none px-2.5 py-0.5 mt-1"
                      >
                        {profession}
                      </Badge>

                      {/* Rating & Jobs count */}
                      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-medium text-slate-600">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 border-amber-200/60 px-2 py-0.5"
                        >
                          <Star size={13} className="fill-amber-500" />
                          <span>{rating}</span>
                        </Badge>
                        <span>•</span>
                        <span className="text-slate-500">({reviewCount} reviews)</span>
                      </div>

                      <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mt-2">
                        <MapPin size={13} className="text-slate-400" />
                        <span className="truncate">{location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <CardFooter className="p-5 pt-4">
                    <Button
                      onClick={() => onContactProvider(name)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors gap-2 cursor-pointer"
                    >
                      <Phone size={14} />
                      <span>Contact Provider</span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
