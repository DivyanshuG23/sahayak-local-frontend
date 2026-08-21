"use client";

import React from "react";
import { REVIEWS } from "../../data/mockData";
import { Star, ShieldCheck, Quote } from "../icons/Icons";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200/60 font-bold uppercase tracking-wider text-xs px-3.5 py-1">
            Real Customer Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 text-base">
            Verified feedback from neighborhood residents who found trusted technicians on Sahayak-Local.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <Card
              key={rev.id}
              className="p-7 rounded-2xl border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-500" />
                    ))}
                  </div>

                  {rev.verifiedBooking && (
                    <Badge variant="emerald" className="text-[10px] gap-1 px-2.5 py-0.5 font-bold">
                      <ShieldCheck size={12} />
                      Verified Booking
                    </Badge>
                  )}
                </div>

                {/* Review Comment Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Service booked pill */}
                <div className="inline-block bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md">
                  Booked: <span className="font-semibold text-slate-800">{rev.serviceBooked}</span> ({rev.providerName})
                </div>
              </div>

              {/* Customer Profile Row */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.customerAvatar}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.customerName}</h4>
                  <p className="text-xs text-slate-500 font-medium">Resident, {rev.location}</p>
                </div>
                <span className="ml-auto text-[11px] text-slate-400">{rev.date}</span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

