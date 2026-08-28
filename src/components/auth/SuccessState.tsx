"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, UserCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

export const SuccessState: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
      {/* Animated Green Success Circle */}
      <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200/60 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50/50 animate-in zoom-in-90 duration-300">
        <CheckCircle2 size={44} strokeWidth={2.2} />
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Password Reset Successfully
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
          Your password has been updated. You can now sign in with your new credentials.
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-2 max-w-xs mx-auto">
        <Link href="/login">
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2">
            <UserCheck size={18} />
            <span>Go to Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
