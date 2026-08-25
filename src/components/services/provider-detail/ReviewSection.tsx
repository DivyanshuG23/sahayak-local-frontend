"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, CheckCircle2, UserCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ReviewSectionProps {
  providerName: string;
  rating: number;
  reviewCount: number;
}

const MOCK_REVIEWS = [
  {
    id: "r1",
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2 days ago",
    service: "Fan & Switchboard Repair",
    comment: "Very professional and arrived on time. The electrical issue in our main trip switchboard was diagnosed and fixed quickly with no extra hidden charges.",
    verified: true,
  },
  {
    id: "r2",
    name: "Vikramaditya S.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "1 week ago",
    service: "Inverter Setup & Wiring",
    comment: "Rajesh ji explained the load division before starting work. Excellent safety protocols and neat wire dressing. Highly recommended for Indirapuram residents!",
    verified: true,
  },
  {
    id: "r3",
    name: "Ananya Mehta",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    date: "2 weeks ago",
    service: "AC Installation",
    comment: "Prompt service. Arrived within 30 minutes of booking slot. Good work quality and clean cleanup after finishing.",
    verified: true,
  },
];

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  providerName,
  rating,
  reviewCount,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 3);

  const distribution = [
    { stars: 5, pct: 85 },
    { stars: 4, pct: 10 },
    { stars: 3, pct: 2 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Customer Reviews & Ratings
        </h2>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
          100% Verified Bookings
        </span>
      </div>

      {/* Summary Box & Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 rounded-2xl p-5 border border-slate-200/70 items-center">
        
        {/* Rating Score Summary (4 Spans) */}
        <div className="md:col-span-4 text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-200/80 pb-4 md:pb-0 md:pr-4">
          <div className="text-4xl sm:text-5xl font-black text-slate-900">
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400" />
            ))}
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Based on {reviewCount} customer reviews
          </div>
        </div>

        {/* Rating Distribution Bars (8 Spans) */}
        <div className="md:col-span-8 space-y-1.5 text-xs font-semibold">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="w-8 text-slate-600 flex items-center gap-1">
                {d.stars} <Star size={12} className="text-amber-500 fill-amber-500" />
              </span>
              <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-slate-500 font-bold">{d.pct}%</span>
            </div>
          ))}
        </div>

      </div>

      {/* Customer Review Cards List */}
      <div className="space-y-4 pt-2">
        {displayedReviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
            
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-2xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Verified Customer
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Booked: <span className="font-semibold text-slate-800">{rev.service}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-normal italic">
              "{rev.comment}"
            </p>

          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      <div className="text-center pt-2">
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 text-xs font-bold text-slate-800 border-slate-300 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          {showAll ? "Show Less Reviews" : `View All Reviews (${reviewCount})`}
        </Button>
      </div>

    </div>
  );
};
