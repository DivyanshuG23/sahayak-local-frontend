"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  OnboardingStep,
  OnboardingFormData,
  INITIAL_ONBOARDING_DATA,
} from "@/features/provider/onboardingTypes";
import { OnboardingProgress } from "@/components/provider/onboarding/OnboardingProgress";
import { Step1PersonalInfo } from "@/components/provider/onboarding/Step1PersonalInfo";
import { Step2BusinessInfo } from "@/components/provider/onboarding/Step2BusinessInfo";
import { Step3ServiceInfo } from "@/components/provider/onboarding/Step3ServiceInfo";
import { Step4LocationInfo } from "@/components/provider/onboarding/Step4LocationInfo";
import { Step5ReviewSubmit } from "@/components/provider/onboarding/Step5ReviewSubmit";
import { OnboardingSuccessModal } from "@/components/provider/onboarding/OnboardingSuccessModal";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Phone, ChevronLeft, Sparkles, Building2 } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { useProvider } from "@/components/provider/layout/ProviderShell";

export default function ProviderOnboardingPage() {
  const { saveOnboardingData } = useProvider();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_ONBOARDING_DATA);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const updateData = (fields: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5) as OnboardingStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as OnboardingStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jumpToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitApplication = () => {
    setIsSubmitting(true);

    // Save entered onboarding data to localStorage & Provider context
    saveOnboardingData(formData);

    // Simulate mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Breadcrumb Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors self-start"
        >
          <ChevronLeft size={16} />
          <span>Exit to Sahayak-Local Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" className="text-xs px-2.5 py-1 font-bold gap-1">
            <Sparkles size={12} className="text-emerald-400" />
            <span>50 Free Leads Included</span>
          </Badge>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Zero Onboarding Fee
          </span>
        </div>
      </div>

      {/* Hero Welcome Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Join as a Verified Partner
                </h1>
                <Badge variant="blue" className="text-[10px] px-1.5 py-0 font-extrabold uppercase">
                  Fast Track
                </Badge>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Complete your 5-step business registration to start receiving customer bookings in your city.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 self-start md:self-auto">
            <Phone size={14} className="text-blue-600" />
            <span>Need Help? Call <strong>1800-123-SAHAYAK</strong></span>
          </div>
        </div>

        {/* 5-Step Progress Bar */}
        <OnboardingProgress currentStep={currentStep} onStepClick={jumpToStep} />

        {/* Active Step Form Card */}
        <div className="pt-2">
          {currentStep === 1 && (
            <Step1PersonalInfo
              data={formData}
              updateData={updateData}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <Step2BusinessInfo
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3ServiceInfo
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 4 && (
            <Step4LocationInfo
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 5 && (
            <Step5ReviewSubmit
              data={formData}
              updateData={updateData}
              onEditStep={jumpToStep}
              onPrev={prevStep}
              onSubmit={handleSubmitApplication}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>

      {/* Success Modal / State */}
      {isSuccess && (
        <OnboardingSuccessModal
          businessName={formData.businessName}
          ownerName={formData.fullName}
          category={formData.category}
          city={formData.city}
        />
      )}
    </div>
  );
}
