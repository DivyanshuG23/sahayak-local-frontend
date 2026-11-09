"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowLeft, ShieldCheck, CheckCircle2, MessageSquare } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import { useGetProviderReviewsQuery } from "@/services/review.service";

export default function ProviderReviewsPage() {
  const { provider } = useProvider();

  const { data: reviewsData, isLoading } = useGetProviderReviewsQuery(provider.id, {
    skip: !provider.id,
  });

  const rawList = reviewsData?.data?.reviews || reviewsData?.data || [];
  const reviews = Array.isArray(rawList) ? rawList : [];

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
            Ratings & Customer Feedback
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Overall rating: {provider.rating || 4.9} ★ based on {reviews.length || provider.reviewCount || 0} customer reviews.
          </p>
        </div>

        <Card className="bg-amber-50/80 border-amber-200 shadow-2xs py-0 rounded-xl sm:rounded-2xl self-start sm:self-auto shrink-0">
          <CardContent className="p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
            <span className="text-xl sm:text-2xl font-black text-amber-700">
              {provider.rating || 4.9}
            </span>
            <div className="text-xs">
              <div className="flex text-amber-500 font-bold tracking-wider">★★★★★</div>
              <div className="text-slate-600 text-[10px] sm:text-[11px] font-medium">
                {reviews.length || provider.reviewCount || 0} verified reviews
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && reviews.length === 0 && (
        <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-2xl">
          <CardContent className="p-12 text-center text-xs text-slate-400 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <MessageSquare size={20} />
            </div>
            <p className="font-semibold text-slate-600">No customer reviews yet.</p>
            <p className="text-slate-400">
              Once you complete jobs and customers leave ratings, they will be listed here.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {reviews.map((rev: any, idx: number) => {
            const customerName = rev.userId?.fullName || rev.customer || "Customer";
            const serviceName = rev.serviceId?.name || rev.service || "Doorstep Service";
            const dateStr = rev.createdAt
              ? new Date(rev.createdAt).toLocaleDateString()
              : rev.date || "Recently";

            return (
              <Card
                key={rev._id || rev.id || idx}
                className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl"
              >
                <CardContent className="p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {customerName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {rev.locality || provider.city} • {dateStr}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-bold gap-1 shrink-0 px-2 py-0.5"
                    >
                      <Star size={11} className="fill-amber-500 text-amber-500" />
                      <span>{rev.rating}</span>
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {rev.comment}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">{serviceName}</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold shrink-0">
                      <CheckCircle2 size={12} />
                      <span>Verified Job</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
