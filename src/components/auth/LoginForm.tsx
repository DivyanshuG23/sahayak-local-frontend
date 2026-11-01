"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Key,
  X,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";
import { SocialLogin } from "./SocialLogin";
import { useLoginMutation, useForgotPasswordMutation } from "@/services/auth.service";
import { useAppSelector } from "@/store/hooks";
import { sanitizeText, sanitizePassword, sanitizeEmail } from "@/lib/sanitizer";
import { validateLoginIdentifier, validatePassword } from "@/lib/validation";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface LoginFormProps {
  onSuccessLogin?: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccessLogin }) => {
  const router = useRouter();

  // Redux Auth State
  const auth = useAppSelector((state) => state.auth);

  // RTK Query Mutations
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();

  // Form Fields State
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Validation & Error States
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
    general?: string;
  }>({});

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSentMsg, setForgotSentMsg] = useState<string | null>(null);
  const [forgotErrorMsg, setForgotErrorMsg] = useState<string | null>(null);

  // Validation function with sanitization
  const validateForm = (): boolean => {
    const sanitizedId = sanitizeText(identifier);
    const sanitizedPass = sanitizePassword(password);

    const idError = validateLoginIdentifier(sanitizedId);
    const passError = validatePassword(sanitizedPass, 4);

    const newErrors: { identifier?: string; password?: string } = {};
    if (idError) newErrors.identifier = idError;
    if (passError) newErrors.password = passError;

    setErrors(newErrors);
    return !idError && !passError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrors({});

    // Sanitize before submitting to API & Redux
    const cleanIdentifier = sanitizeText(identifier);
    const cleanPassword = sanitizePassword(password);

    try {
      const response = await login({
        identifier: cleanIdentifier,
        password: cleanPassword,
      }).unwrap();

      const user = response?.data?.user;
      const userRole = user?.role;
      const displayName = user?.fullName || user?.name || cleanIdentifier;

      if (onSuccessLogin) {
        onSuccessLogin(displayName);
      } else {
        if (userRole === "provider") {
          router.push("/provider/dashboard");
        } else {
          router.push("/profile");
        }
      }
    } catch (err: any) {
      setErrors({
        general: getApiErrorMessage(
          err,
          "Invalid email/phone or password. Please try again."
        ),
      });
    }
  };

  const handleGoogleLogin = () => {
    setErrors({
      general: "Google login is currently disabled for security. Please use email/phone and password.",
    });
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSentMsg(null);
    setForgotErrorMsg(null);

    const cleanEmail = sanitizeEmail(forgotEmail);
    if (!cleanEmail.includes("@")) {
      setForgotErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      const res = await forgotPassword({ email: cleanEmail }).unwrap();
      setForgotSentMsg(
        res?.message || `Password reset instructions have been sent to ${cleanEmail}`
      );
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotSentMsg(null);
        setForgotEmail("");
      }, 3500);
    } catch (err: any) {
      setForgotErrorMsg(
        getApiErrorMessage(
          err,
          "Failed to send reset link. Please check your email."
        )
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg space-y-6 w-full max-w-md mx-auto">
      {/* Form Heading */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Sign in to Sahayak-Local
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Access your bookings, favorites and profile.
        </p>
      </div>

      {/* General Error Banner */}
      {errors.general && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle size={16} className="text-rose-500 shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email or Phone Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Email Address or Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Mail size={16} />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) {
                  setErrors((prev) => ({ ...prev, identifier: undefined }));
                }
              }}
              onBlur={() => {
                const err = validateLoginIdentifier(sanitizeText(identifier));
                if (err) setErrors((prev) => ({ ...prev, identifier: err }));
              }}
              placeholder="e.g. manoj.prajapati@example.com or 9876543210"
              autoComplete="username"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                errors.identifier
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:ring-blue-500 focus:bg-white"
              }`}
            />
          </div>
          {errors.identifier && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in">
              <AlertCircle size={12} />
              <span>{errors.identifier}</span>
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            error={!!errors.password}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in">
              <AlertCircle size={12} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span>Remember me on this device</span>
          </label>
        </div>

        {/* Submit Sign In Button */}
        <Button
          type="submit"
          disabled={isLoginLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2 transition-all mt-2 cursor-pointer"
        >
          {isLoginLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <UserCheck size={16} />
              <span>Sign In</span>
            </>
          )}
        </Button>
      </form>

      {/* Social Login Divider & Google Button */}
      <SocialLogin onGoogleLogin={handleGoogleLogin} />

      {/* Footer Navigation Links */}
      <div className="pt-4 border-t border-slate-100 space-y-3 text-center text-xs">
        <div className="text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create Account
          </Link>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-semibold text-slate-400 hover:text-slate-700 transition-colors"
          >
            <span>Continue as Guest</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal Overlay */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Key size={16} className="text-blue-600" />
                <span>Reset Password</span>
              </h3>
              <button
                onClick={() => {
                  setIsForgotModalOpen(false);
                  setForgotSentMsg(null);
                  setForgotErrorMsg(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 text-left">
              Enter your registered email address below and we'll send you a password reset link.
            </p>

            {forgotSentMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                {forgotSentMsg}
              </div>
            )}

            {forgotErrorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                {forgotErrorMsg}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-3" noValidate>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="manoj.prajapati@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button
                type="submit"
                disabled={isForgotLoading}
                size="sm"
                className="w-full bg-blue-600 text-white font-bold text-xs cursor-pointer"
              >
                {isForgotLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
