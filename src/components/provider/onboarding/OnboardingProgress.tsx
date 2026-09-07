"use client";

import React from "react";
import { Check, CheckCircle2, User, Building2, Wrench, MapPin, ShieldCheck } from "@/components/icons/Icons";
import { OnboardingStep } from "@/features/provider/onboardingTypes";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: OnboardingStep;
  onStepClick?: (step: OnboardingStep) => void;
}

const STEPS = [
  { step: 1 as OnboardingStep, label: "Personal Info", icon: User },
  { step: 2 as OnboardingStep, label: "Business Info", icon: Building2 },
  { step: 3 as OnboardingStep, label: "Services & Rates", icon: Wrench },
  { step: 4 as OnboardingStep, label: "Location & Radius", icon: MapPin },
  { step: 5 as OnboardingStep, label: "Review & Submit", icon: ShieldCheck },
];

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  onStepClick,
}) => {
  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Percentage Progress Bar */}
      <div className="relative w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {STEPS.map((item) => {
          const isCompleted = item.step < currentStep;
          const isCurrent = item.step === currentStep;
          const isClickable = isCompleted && onStepClick;
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              onClick={() => isClickable && onStepClick(item.step)}
              className={cn(
                "flex-1 flex flex-col items-center text-center transition-all",
                isClickable && "cursor-pointer group"
              )}
            >
              {/* Step Circle Indicator */}
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all shadow-2xs",
                  isCompleted
                    ? "bg-emerald-600 text-white shadow-emerald-500/20"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-blue-500/20"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                )}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : (
                  <Icon size={16} />
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 hidden sm:block">
                <span
                  className={cn(
                    "text-[10px] uppercase font-bold tracking-wider block",
                    isCurrent ? "text-blue-600" : isCompleted ? "text-emerald-700" : "text-slate-400"
                  )}
                >
                  Step {item.step}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold block truncate max-w-[110px]",
                    isCurrent ? "text-slate-900 font-bold" : isCompleted ? "text-slate-700" : "text-slate-400"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Step Counter Text */}
      <div className="sm:hidden flex items-center justify-between text-xs pt-1 px-1">
        <span className="font-bold text-slate-800">
          Step {currentStep} of 5: {STEPS[currentStep - 1].label}
        </span>
        <span className="text-slate-400 font-medium">
          {Math.round(progressPercentage)}% completed
        </span>
      </div>
    </div>
  );
};
