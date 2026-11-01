"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowLeft, Key, CheckCircle2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/services/auth.service";
import { sanitizeEmail } from "@/lib/sanitizer";
import { validateEmail } from "@/lib/validation";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface ForgotPasswordFormProps {
  onSuccessSubmit: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccessSubmit,
}) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanEmail = sanitizeEmail(email);
    const err = validateEmail(cleanEmail);
    if (err) {
      setError(err);
      return;
    }

    try {
      const res = await forgotPassword({ email: cleanEmail }).unwrap();
      const msg = res?.message || `Password reset link sent to ${cleanEmail}`;
      setSuccessMessage(msg);
      onSuccessSubmit(cleanEmail);
    } catch (apiErr: any) {
      setError(getApiErrorMessage(apiErr, "Failed to send reset link. Please try again."));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Lock Icon */}
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center mx-auto shadow-inner">
        <Lock size={30} />
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Forgot Your Password?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Enter your registered email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 max-w-sm mx-auto animate-in fade-in duration-200">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto" noValidate>
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-700">Email Address</label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Mail size={16} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="manoj.prajapati@example.com"
              autoComplete="email"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                error
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500 focus:bg-white"
              }`}
            />
          </div>
          {error && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in">
              <AlertCircle size={12} />
              <span>{error}</span>
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending Link...</span>
            </>
          ) : (
            <>
              <Key size={15} />
              <span>Send Reset Instructions</span>
            </>
          )}
        </Button>
      </form>

      {/* Return to Login */}
      <div className="text-center pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
};
