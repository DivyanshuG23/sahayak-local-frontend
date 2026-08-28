"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, AlertCircle, Sparkles, UserPlus } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";
import { TermsCheckbox } from "./TermsCheckbox";
import { SocialLogin } from "./SocialLogin";

interface RegisterFormProps {
  onSuccessRegister?: (name: string, email: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccessRegister }) => {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Errors & Loading State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Form Validation Logic
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g. +91 9876543210)";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must agree to the Terms & Conditions and Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onSuccessRegister) {
        onSuccessRegister(fullName, email);
      } else {
        router.push("/profile");
      }
    }, 800);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccessRegister) {
        onSuccessRegister("Manoj Prajapati", "manoj.prajapati@gmail.com");
      } else {
        router.push("/profile");
      }
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg space-y-6 w-full max-w-md mx-auto">
      {/* Form Heading */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Get started with Sahayak-Local.
        </p>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Full Name</label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <User size={16} />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              placeholder="e.g. Manoj Prajapati"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                errors.fullName
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500 focus:bg-white"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
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
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="manoj.prajapati@example.com"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                errors.email
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500 focus:bg-white"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Phone Number</label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Phone size={16} />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              placeholder="+91 98765 43210"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                errors.phone
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500 focus:bg-white"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Password</label>
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            }}
            error={!!errors.password}
            placeholder="At least 6 characters"
          />
          {errors.password && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Confirm Password</label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
            error={!!errors.confirmPassword}
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <TermsCheckbox
          checked={acceptedTerms}
          onChange={(val) => {
            setAcceptedTerms(val);
            if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
          }}
          error={errors.terms}
        />

        {/* Create Account Primary Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2 transition-all mt-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus size={16} />
              <span>Create Account</span>
            </>
          )}
        </Button>
      </form>

      {/* Social Login Divider & Google Button */}
      <SocialLogin onGoogleLogin={handleGoogleRegister} />

      {/* Already Have Account Link */}
      <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
