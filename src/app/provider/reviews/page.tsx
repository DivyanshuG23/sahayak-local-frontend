"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowLeft, ShieldCheck, CheckCircle2 } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProvider } from "@/components/provider/layout/ProviderShell";

export default function ProviderReviewsPage() {
  const { provider } = useProvider();
  const reviews = [
    {
      id: "rev-1",
      customer: "Anand Verma",
      locality: "Raja Park",
      rating: 5,
      date: "Yesterday",
      service: "Modular Switchboard Upgrade",
      comment: "Very punctual and solved tripping issue quickly. Transparent pricing without any hidden charges.",
    },
    {
      id: "rev-2",
      customer: "Pooja Deshmukh",
      locality: "Sector 3, Vaishali Nagar",
      rating: 5,
      date: "3 days ago",
      service: "MCB Tripping Audit",
      comment: "Mr. Rajesh is knowledgeable and verified the entire flat safety in under an hour. Highly recommended!",
    },
    {
      id: "rev-3",
      customer: "Vikram Malhotra",
      locality: "Civil Lines",
      rating: 4.8,
      date: "1 week ago",
      service: "Inverter Battery Wiring",
      comment: "Neat wiring job for our inverter setup. Arrived exactly on time.",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
            Ratings & Customer Feedback
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Overall rating: {provider.rating} ★ based on {provider.reviewCount} verified customer reviews.
          </p>
        </div>

        <Card className="bg-amber-50/80 border-amber-200 shadow-2xs py-0 rounded-xl sm:rounded-2xl self-start sm:self-auto shrink-0">
          <CardContent className="p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
            <span className="text-xl sm:text-2xl font-black text-amber-700">{provider.rating}</span>
            <div className="text-xs">
              <div className="flex text-amber-500 font-bold tracking-wider">★★★★★</div>
              <div className="text-slate-600 text-[10px] sm:text-[11px] font-medium">
                {provider.reviewCount} verified reviews
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {reviews.map((rev) => (
          <Card key={rev.id} className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl">
            <CardContent className="p-3.5 sm:p-5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{rev.customer}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                    {rev.locality} • {rev.service}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Badge variant="emerald" className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5">
                    ★ {rev.rating}
                  </Badge>
                  <span className="text-[10px] sm:text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">
                "{rev.comment}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
