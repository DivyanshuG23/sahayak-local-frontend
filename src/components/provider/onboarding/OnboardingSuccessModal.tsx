"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SuccessModalProps {
  businessName: string;
  ownerName: string;
  category: string;
  city: string;
}

export const OnboardingSuccessModal: React.FC<SuccessModalProps> = ({
  businessName,
  ownerName,
  category,
  city,
}) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(3);
  const [refId] = useState<string>(() => `SHK-PRV-${Math.floor(1000 + Math.random() * 9000)}`);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/provider/dashboard");
    }
  }, [countdown, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Animated Celebration Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-500/20">
          <CheckCircle2 size={44} className="animate-in zoom-in duration-300" />
          <div className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white p-1 rounded-full shadow-xs">
            <Sparkles size={14} />
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="emerald" className="px-3 py-1 text-xs gap-1.5 font-bold">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Application Received & Verified</span>
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome to Sahayak-Local! 🎉
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Congratulations <strong>{ownerName}</strong>! Your business <strong>"{businessName}"</strong> has been successfully registered under <strong>{category}</strong> in {city}.
          </p>
        </div>

        {/* Reference Number Box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
          <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
            Provider Application Reference
          </div>
          <div className="text-base font-black text-slate-900 font-mono tracking-wider">
            {refId}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            ✓ Initial profile initialized with 50 commission-free lead credits!
          </p>
        </div>

        {/* Action Button & Auto Redirect Timer */}
        <div className="space-y-3 pt-2">
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push("/provider/dashboard")}
            className="w-full h-12 font-black text-sm rounded-xl gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <span>Go to Provider Dashboard Now</span>
            <ArrowRight size={16} />
          </Button>

          <p className="text-[11px] text-slate-400 font-medium">
            Redirecting automatically to your dashboard in <strong className="text-blue-600 font-bold">{countdown}</strong> seconds...
          </p>
        </div>

      </div>
    </div>
  );
};
