"use client";

import React from "react";
import { CATEGORIES, Category } from "../../data/mockData";
import {
  Zap,
  Droplets,
  Wind,
  Sparkles,
  Hammer,
  Scissors,
  GraduationCap,
  Wrench,
  ArrowRight,
  ChevronRight
} from "../icons/Icons";

interface CategoriesSectionProps {
  onSelectCategory: (slug: string) => void;
  activeCategory: string | null;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Zap":
      return <Zap size={24} />;
    case "Droplets":
      return <Droplets size={24} />;
    case "Wind":
      return <Wind size={24} />;
    case "Sparkles":
      return <Sparkles size={24} />;
    case "Hammer":
      return <Hammer size={24} />;
    case "Scissors":
      return <Scissors size={24} />;
    case "GraduationCap":
      return <GraduationCap size={24} />;
    case "Wrench":
      return <Wrench size={24} />;
    default:
      return <Zap size={24} />;
  }
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full w-fit">
              Browse Categories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Services
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Find the right professional for your everyday needs from certified local providers.
            </p>
          </div>

          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer w-fit"
          >
            <span>View All Services</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 border-blue-600 -translate-y-1"
                    : "bg-slate-50/70 hover:bg-white text-slate-900 border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Badge if available */}
                {cat.badge && !isSelected && (
                  <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                )}

                {/* Card Icon Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : `bg-white shadow-sm border border-slate-200/60 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white`
                    }`}
                  >
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-600"
                    }`}
                  >
                    {cat.providerCount} Providers
                  </span>
                </div>

                {/* Category Title & Description */}
                <h3 className={`text-lg font-bold mb-1.5 ${isSelected ? "text-white" : "text-slate-900 group-hover:text-blue-600 transition-colors"}`}>
                  {cat.name}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                  {cat.description}
                </p>

                {/* Popular Services Pills */}
                <div className="pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {cat.popularServices.slice(0, 2).map((srv, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                        isSelected ? "bg-white/10 text-white" : "bg-white text-slate-600 border border-slate-200/60"
                      }`}
                    >
                      {srv}
                    </span>
                  ))}
                </div>

                {/* Action Link Footer */}
                <div className="mt-4 flex items-center justify-between text-xs font-semibold pt-2">
                  <span className={isSelected ? "text-white" : "text-blue-600 group-hover:underline"}>
                    Explore Services
                  </span>
                  <ChevronRight size={16} className={`transition-transform ${isSelected ? "text-white" : "text-blue-600 group-hover:translate-x-1"}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
