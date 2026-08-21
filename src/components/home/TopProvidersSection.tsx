"use client";

import React from "react";
import { TOP_PROVIDERS, TopProvider } from "../../data/mockData";
import { Star, ShieldCheck, MapPin, Award, CheckCircle2, Phone } from "../icons/Icons";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface TopProvidersSectionProps {
  onContactProvider: (providerName: string) => void;
}

export const TopProvidersSection: React.FC<TopProvidersSectionProps> = ({ onContactProvider }) => {
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

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TOP_PROVIDERS.map((tp) => (
            <Card
              key={tp.id}
              className="p-0 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group rounded-2xl"
            >
              {/* Profile Card Header */}
              <div>
                <div className={`h-24 ${tp.bannerBg} relative p-4 flex justify-between items-start`}>
                  <Badge variant="outline" className="bg-white/20 backdrop-blur-md text-white border-white/20 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5">
                    {tp.experience} Exp
                  </Badge>
                  {tp.verified && (
                    <span className="bg-white text-emerald-600 p-1.5 rounded-full shadow-xs">
                      <ShieldCheck size={16} />
                    </span>
                  )}
                </div>

                {/* Avatar & Title Overlap */}
                <div className="px-6 relative -mt-12 text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mx-auto shadow-md bg-slate-100 group-hover:scale-105 transition-transform">
                    <img
                      src={tp.avatarUrl}
                      alt={tp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors">
                    {tp.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border-none px-2.5 py-0.5 mt-1">
                    {tp.profession}
                  </Badge>

                  {/* Rating & Jobs count */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-medium text-slate-600">
                    <Badge variant="outline" className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 border-amber-200/60 px-2 py-0.5">
                      <Star size={13} className="fill-amber-500" />
                      <span>{tp.rating}</span>
                    </Badge>
                    <span>•</span>
                    <span className="text-slate-500">({tp.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mt-2">
                    <MapPin size={13} className="text-slate-400" />
                    <span className="truncate">{tp.location}</span>
                  </div>

                  {/* Specialities tags */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap justify-center gap-1.5">
                    {tp.specialities.map((spec, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium px-2 py-0.5"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <CardFooter className="p-5 pt-4">
                <Button
                  onClick={() => onContactProvider(tp.name)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors gap-2"
                >
                  <Phone size={14} />
                  <span>View Profile & Contact</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

