"use client";

import React from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Heart, Star, ArrowRight } from "@/components/icons/Icons";

interface AccountStatsProps {
  stats: {
    totalBookings: number;
    completedServices: number;
    savedProviders: number;
    reviewsGiven: number;
  };
}

export const AccountStats: React.FC<AccountStatsProps> = ({ stats }) => {
  const statCards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      subtext: "Service requests created",
      icon: Calendar,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
      accentColor: "text-blue-700",
      href: "/my-bookings",
      actionText: "View Bookings",
    },
    {
      label: "Completed Services",
      value: stats.completedServices,
      subtext: "Successfully finished",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
      accentColor: "text-emerald-700",
      href: "/my-bookings",
      actionText: "History",
    },
    {
      label: "Saved Providers",
      value: stats.savedProviders,
      subtext: "Favorite professionals",
      icon: Heart,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200/60",
      accentColor: "text-rose-700",
      href: "/favorites",
      actionText: "Saved List",
    },
    {
      label: "Reviews Given",
      value: stats.reviewsGiven,
      subtext: "Helpful feedback submitted",
      icon: Star,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
      accentColor: "text-amber-700",
      href: "#",
      actionText: "My Reviews",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">Account Activity Overview</h2>
        <span className="text-xs font-semibold text-slate-500">Real-time stats</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                    {card.label}
                  </span>
                  <span className={`text-3xl font-black ${card.accentColor}`}>
                    {card.value}
                  </span>
                </div>
                <div className={`p-2.5 rounded-2xl border ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{card.subtext}</span>
                {card.href !== "#" ? (
                  <Link
                    href={card.href}
                    className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight size={12} />
                  </Link>
                ) : (
                  <span className="font-semibold text-slate-400">{card.actionText}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
