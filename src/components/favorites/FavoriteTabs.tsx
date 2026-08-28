"use client";

import React from "react";
import { UserCheck, Sparkles, Heart } from "@/components/icons/Icons";

export type FavoriteTabType = "all" | "providers" | "services";

interface FavoriteTabsProps {
  activeTab: FavoriteTabType;
  onTabChange: (tab: FavoriteTabType) => void;
  counts: {
    all: number;
    providers: number;
    services: number;
  };
}

export const FavoriteTabs: React.FC<FavoriteTabsProps> = ({
  activeTab,
  onTabChange,
  counts
}) => {
  const tabs: { id: FavoriteTabType; label: string; count: number; icon?: React.ReactNode }[] = [
    { id: "all", label: "All Saved", count: counts.all, icon: <Heart size={14} /> },
    { id: "providers", label: "Saved Providers", count: counts.providers, icon: <UserCheck size={14} /> },
    { id: "services", label: "Saved Services", count: counts.services, icon: <Sparkles size={14} /> }
  ];

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200/80 shadow-2xs overflow-x-auto no-scrollbar">
      <nav className="flex gap-1.5 sm:gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              {tab.icon && <span className={isActive ? "text-white" : "text-slate-400"}>{tab.icon}</span>}
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
