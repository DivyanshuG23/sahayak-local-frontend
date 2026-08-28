"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowLeft, Key } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ForgotPasswordFormProps {
  onSuccessSubmit: (identifier: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccessSubmit,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    if (!identifier.trim()) {
      setError("Please enter your email address or phone number");
      return false;
    }

    const isEmail = identifier.includes("@");
    const isPhone = /^[0-9+\s-]{8,15}$/.test(identifier);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email address or phone number");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccessSubmit(identifier);
    }, 700);
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
          Enter your registered email or phone number and we'll help you reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-700">Email Address or Phone Number</label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Mail size={16} />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. manoj.prajapati@example.com or +91 9876543210"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                error
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500 focus:bg-white"
              }`}
            />
          </div>
          {error && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2 transition-all mt-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending Reset Link...</span>
            </>
          ) : (
            <>
              <Key size={16} />
              <span>Send Reset Link</span>
            </>
          )}
        </Button>
      </form>

      {/* Back to Login Link */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
};
