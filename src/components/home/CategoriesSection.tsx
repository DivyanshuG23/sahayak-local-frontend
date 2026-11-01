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
  ChevronRight,
} from "../icons/Icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface CategoriesSectionProps {
  onSelectCategory: (slug: string) => void;
  activeCategory: string | null;
  categories?: Category[];
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Zap":
      return <Zap size={22} />;
    case "Droplets":
      return <Droplets size={22} />;
    case "Wind":
      return <Wind size={22} />;
    case "Sparkles":
      return <Sparkles size={22} />;
    case "Hammer":
      return <Hammer size={22} />;
    case "Scissors":
      return <Scissors size={22} />;
    case "GraduationCap":
      return <GraduationCap size={22} />;
    case "Wrench":
      return <Wrench size={22} />;
    default:
      return <Zap size={22} />;
  }
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  activeCategory,
  categories,
}) => {
  const displayCategories =
    categories && categories.length > 0 ? categories : CATEGORIES;

  return (
    <section id="categories" className="py-14 lg:py-18 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-600 font-bold uppercase tracking-wider text-xs px-2.5 py-0.5"
            >
              Browse Categories
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Services
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Find the right professional for your everyday needs from certified local providers.
            </p>
          </div>

          <a
            href="#services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer w-fit"
          >
            <span>View All Services</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayCategories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <Card
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group relative rounded-2xl transition-all duration-300 cursor-pointer border flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-blue-600 -translate-y-0.5"
                    : "bg-slate-50/70 hover:bg-white text-slate-900 border-slate-200/80 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <CardHeader className="px-5 pt-5 pb-2.5 flex flex-row items-center justify-between space-y-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white shadow-sm border border-slate-200/60 text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      {getCategoryIcon(cat.icon)}
                    </div>

                    <CardAction className="flex items-center gap-1.5 self-start">
                      {cat.badge && !isSelected && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border-none"
                        >
                          {cat.badge}
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold px-2.5 py-0.5 border-none ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/60 text-slate-600"
                        }`}
                      >
                        {cat.providerCount} Providers
                      </Badge>
                    </CardAction>
                  </CardHeader>

                  {/* Card Content */}
                  <CardContent className="px-5 py-0">
                    <CardTitle
                      className={`text-base font-bold mb-1.5 ${
                        isSelected
                          ? "text-white"
                          : "text-slate-900 group-hover:text-blue-600 transition-colors"
                      }`}
                    >
                      {cat.name}
                    </CardTitle>
                    <CardDescription
                      className={`text-xs leading-relaxed mb-3.5 ${
                        isSelected ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {cat.description}
                    </CardDescription>

                    {/* Popular Services Pills */}
                    <div className="pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                      {cat.popularServices.slice(0, 2).map((srv, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className={`text-[11px] px-2 py-0.5 font-medium border-none ${
                            isSelected
                              ? "bg-white/10 text-white"
                              : "bg-white text-slate-600 border border-slate-200/60"
                          }`}
                        >
                          {srv}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>

                {/* Card Footer */}
                <CardFooter
                  className={`px-5 py-3 mt-3.5 border-t text-xs font-bold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-blue-700/40 border-blue-500/40 text-white"
                      : "bg-slate-100/70 border-slate-200/80 text-blue-600 group-hover:bg-blue-50/60"
                  }`}
                >
                  <span
                    className={
                      isSelected
                        ? "text-white"
                        : "text-blue-600 group-hover:underline"
                    }
                  >
                    View Specialists
                  </span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform group-hover:translate-x-1 ${
                      isSelected ? "text-white" : "text-blue-600"
                    }`}
                  />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
