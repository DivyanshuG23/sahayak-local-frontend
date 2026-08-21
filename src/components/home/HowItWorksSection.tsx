"use client";

import React from "react";
import { HOW_IT_WORKS_STEPS } from "../../data/mockData";
import { Search, SlidersHorizontal, Calendar, UserCheck, ChevronRight } from "../icons/Icons";

const getStepIcon = (iconName: string) => {
  switch (iconName) {
    case "Search":
      return <Search size={28} />;
    case "SlidersHorizontal":
      return <SlidersHorizontal size={28} />;
    case "Calendar":
      return <Calendar size={28} />;
    case "UserCheck":
      return <UserCheck size={28} />;
    default:
      return <Search size={28} />;
  }
};

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3.5 py-1 rounded-full">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Sahayak-Local Works
          </h2>
          <p className="text-slate-600 text-base">
            Booking trusted neighborhood professionals takes less than 2 minutes.
          </p>
        </div>

        {/* 4 Steps Grid Container with Connecting Line */}
        <div className="relative">
          
          {/* Desktop Connecting Line behind cards */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:bg-white hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Header Row: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-blue-600 group-hover:text-white text-blue-600 shadow-sm border border-slate-200/80 flex items-center justify-center transition-all duration-300">
                      {getStepIcon(item.icon)}
                    </div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md w-fit mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Arrow indicator for step flow */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 hidden lg:flex items-center text-xs font-semibold text-slate-400 group-hover:text-blue-600">
                    <span>Next Step</span>
                    <ChevronRight size={16} className="ml-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Guarantee Banner below steps */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">No Advance Payment Required</h4>
            <p className="text-xs text-slate-400">
              Pay directly to the local service provider after job completion and 100% satisfaction.
            </p>
          </div>
          <a
            href="#services"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md cursor-pointer transition-all"
          >
            Explore Services Now →
          </a>
        </div>

      </div>
    </section>
  );
};
