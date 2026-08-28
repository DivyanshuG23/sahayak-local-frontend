"use client";

import React from "react";
import Link from "next/link";
import { HomeIcon, ChevronRight, Bell, CheckCircle2, Sparkles, Check } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface NotificationHeaderProps {
  unreadCount: number;
  totalCount: number;
  onMarkAllAsRead: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  totalCount,
  onMarkAllAsRead,
}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation Bar */}
      <nav className="bg-white border border-slate-200/80 rounded-2xl py-3 px-4 sm:px-6 text-xs font-medium text-slate-500 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold flex items-center gap-1">
            <Bell size={13} className="text-blue-600" />
            Notifications
          </span>
        </div>
      </nav>

      {/* Page Hero Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200/60">
            <Bell size={14} className="text-blue-600" />
            <span>Updates Center</span>
            {unreadCount > 0 && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-600">{unreadCount} New</span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Stay updated with your bookings and services.
          </p>
        </div>

        {/* Action Button: Mark all as read */}
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
          <div className="text-left md:text-right hidden sm:block">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Total Messages</span>
            <span className="text-xl font-black text-slate-900">{totalCount} items</span>
          </div>

          <Button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border-slate-200 gap-2 shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={15} className={unreadCount > 0 ? "text-blue-600" : "text-slate-400"} />
            <span>Mark all as read</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
