"use client";

import React from "react";
import Link from "next/link";
import { Bell, Sparkles, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface EmptyNotificationsProps {
  activeTab?: string;
  onResetFilters?: () => void;
}

export const EmptyNotifications: React.FC<EmptyNotificationsProps> = ({
  activeTab = "all",
  onResetFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 shadow-xs text-center space-y-5 max-w-xl mx-auto my-8">
      {/* Icon Circle */}
      <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto ring-8 ring-blue-50/50 shadow-inner">
        <Bell size={36} strokeWidth={1.8} />
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          You're all caught up!
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          No new notifications at the moment. We'll update you here when there are new booking statuses or service offers.
        </p>
      </div>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
        {activeTab !== "all" && onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="text-xs font-semibold"
          >
            Show All Categories
          </Button>
        )}

        <Link href="/services">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-2 px-5">
            <Sparkles size={14} />
            <span>Explore Services</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
