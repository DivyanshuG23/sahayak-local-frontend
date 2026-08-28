"use client";

import React from "react";
import Link from "next/link";
import { Heart, Search, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface EmptyFavoritesProps {
  activeTab: "all" | "providers" | "services";
}

export const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({ activeTab }) => {
  const getTabLabel = () => {
    if (activeTab === "providers") return "saved providers";
    if (activeTab === "services") return "saved services";
    return "saved services or providers";
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center max-w-xl mx-auto space-y-5 my-8">
      {/* Icon Circle */}
      <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-500 shadow-inner">
        <Heart size={36} className="fill-rose-500 text-rose-500 animate-bounce" />
      </div>

      {/* Heading & Description */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          No saved services yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
          You don&apos;t have any {getTabLabel()} in your favorites list. Save your favorite providers and services to find them quickly later.
        </p>
      </div>

      {/* Action Button */}
      <Link href="/services">
        <Button
          size="lg"
          className="rounded-2xl px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/25 gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <Search size={16} />
          <span>Explore Services</span>
          <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
};
