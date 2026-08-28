"use client";

import React from "react";
import { NotificationCategory } from "@/data/mockNotifications";
import { Badge } from "@/components/ui/badge";

interface NotificationTabsProps {
  activeTab: NotificationCategory;
  onTabChange: (tab: NotificationCategory) => void;
  counts: {
    all: number;
    bookings: number;
    updates: number;
    unreadAll: number;
    unreadBookings: number;
    unreadUpdates: number;
  };
}

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: Array<{ id: NotificationCategory; label: string; count: number; unread: number }> = [
    { id: "all", label: "All Notifications", count: counts.all, unread: counts.unreadAll },
    { id: "bookings", label: "Bookings", count: counts.bookings, unread: counts.unreadBookings },
    { id: "updates", label: "Updates & Offers", count: counts.updates, unread: counts.unreadUpdates },
  ];

  return (
    <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-2xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              isActive
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span>{tab.label}</span>
            <Badge
              variant={isActive ? "secondary" : "outline"}
              className={`text-[10px] py-0 px-2 rounded-full ${
                isActive ? "bg-white/20 text-white border-transparent" : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {tab.count}
            </Badge>

            {tab.unread > 0 && !isActive && (
              <span className="w-2 h-2 rounded-full bg-blue-600" title={`${tab.unread} unread`} />
            )}
          </button>
        );
      })}
    </div>
  );
};
