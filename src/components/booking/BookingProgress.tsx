"use client";

import React from "react";
import { Check } from "@/components/icons/Icons";

export interface StepItem {
  id: number;
  label: string;
  sublabel: string;
}

interface BookingProgressProps {
  currentStep?: number;
}

const STEPS: StepItem[] = [
  { id: 1, label: "Service", sublabel: "Select Option" },
  { id: 2, label: "Schedule", sublabel: "Date & Time" },
  { id: 3, label: "Location", sublabel: "Address & Info" },
  { id: 4, label: "Review", sublabel: "Confirm Booking" },
];

export const BookingProgress: React.FC<BookingProgressProps> = ({ currentStep = 3 }) => {
  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-100 -z-0 rounded-full" />

          {/* Active Progress Fill Line */}
          <div
            className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 rounded-full -z-0"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 88}%`,
            }}
          />

          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 shadow-md ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-emerald-500/20"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-blue-600/30 scale-105"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check size={18} strokeWidth={3} /> : step.id}
                </div>
                
                <div className="text-center mt-2.5">
                  <span
                    className={`block text-xs font-bold transition-colors ${
                      isCurrent
                        ? "text-blue-600 font-black"
                        : isCompleted
                        ? "text-slate-900 font-extrabold"
                        : "text-slate-400 font-medium"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="hidden sm:block text-[10px] text-slate-400 font-medium mt-0.5">
                    {step.sublabel}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};
