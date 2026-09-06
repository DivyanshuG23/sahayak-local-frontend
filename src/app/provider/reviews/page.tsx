"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowLeft, ShieldCheck, CheckCircle2 } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/provider/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Ratings & Customer Feedback
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Overall rating: {provider.rating} ★ based on {provider.reviewCount} verified customer reviews.
          </p>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 self-start sm:self-auto">
          <span className="text-2xl font-black text-amber-700">{provider.rating}</span>
          <div className="text-xs">
            <div className="flex text-amber-500 font-bold">★★★★★</div>
            <div className="text-slate-500 text-[11px] font-medium">{provider.reviewCount} verified reviews</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((rev) => (
          <Card key={rev.id} className="bg-white border-slate-200/80 shadow-2xs">
            <CardContent className="p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.customer}</h4>
                  <p className="text-xs text-slate-500 font-medium">{rev.locality} • {rev.service}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" className="text-xs font-bold px-2 py-0.5">
                    ★ {rev.rating}
                  </Badge>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                "{rev.comment}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
