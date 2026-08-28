"use client";

import React, { useState } from "react";
import { Key, AlertCircle, CheckCircle2, Lock } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";

interface ResetPasswordFormProps {
  onSuccessReset: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccessReset,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Simple strength score
  const getPasswordStrength = () => {
    if (!newPassword) return null;
    if (newPassword.length < 6) return { label: "Weak", color: "bg-rose-500 text-rose-600", width: "w-1/3" };
    if (newPassword.length < 10 || !/\d/.test(newPassword))
      return { label: "Fair", color: "bg-amber-500 text-amber-600", width: "w-2/3" };
    return { label: "Strong", color: "bg-emerald-500 text-emerald-600", width: "w-full" };
  };

  const strength = getPasswordStrength();

  const validate = (): boolean => {
    const newErr: { newPassword?: string; confirmPassword?: string } = {};

    if (!newPassword) {
      newErr.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErr.newPassword = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErr.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErr.confirmPassword = "Passwords do not match";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccessReset();
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Key Icon */}
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center mx-auto shadow-inner">
        <Key size={30} />
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Create New Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Your identity has been verified. Please set your new secure password below.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        {/* New Password */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-700">New Password</label>
          <PasswordInput
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }));
            }}
            error={!!errors.newPassword}
            placeholder="At least 6 characters"
          />

          {/* Strength Bar */}
          {strength && (
            <div className="pt-1.5 space-y-1">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color.split(" ")[0]} ${strength.width} transition-all duration-300`} />
              </div>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block text-right ${strength.color.split(" ")[1]}`}>
                Strength: {strength.label}
              </span>
            </div>
          )}

          {errors.newPassword && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.newPassword}</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-700">Confirm New Password</label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            error={!!errors.confirmPassword}
            placeholder="Re-enter new password"
          />
          {errors.confirmPassword && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Submit Reset Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2 transition-all mt-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Resetting Password...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Reset Password</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
