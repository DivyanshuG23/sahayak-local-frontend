"use client";

import React, { useState } from "react";
import { Key, AlertCircle, ShieldCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";
import { useResetPasswordMutation } from "@/services/auth.service";
import { sanitizePassword } from "@/lib/sanitizer";
import { validatePassword, evaluatePasswordStrength } from "@/lib/validation";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface ResetPasswordFormProps {
  token?: string;
  onSuccessReset: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token = "",
  onSuccessReset,
}) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const strength = evaluatePasswordStrength(newPassword);

  const validate = (): boolean => {
    const cleanPass = sanitizePassword(newPassword);
    const cleanConfirm = sanitizePassword(confirmPassword);

    const newErr: { newPassword?: string; confirmPassword?: string } = {};

    const passErr = validatePassword(cleanPass, 6);
    if (passErr) newErr.newPassword = passErr;

    if (!cleanConfirm) {
      newErr.confirmPassword = "Please confirm your new password";
    } else if (cleanPass !== cleanConfirm) {
      newErr.confirmPassword = "Passwords do not match";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setErrors({});
    const cleanPass = sanitizePassword(newPassword);

    try {
      if (token) {
        await resetPassword({ token, password: cleanPass }).unwrap();
      }
      onSuccessReset();
    } catch (apiErr: any) {
      setErrors({
        general: getApiErrorMessage(
          apiErr,
          "Failed to reset password. The reset link may have expired."
        ),
      });
    }
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
          Please set your new secure password below.
        </p>
      </div>

      {/* General Error Banner */}
      {errors.general && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 max-w-sm mx-auto animate-in fade-in duration-200">
          <AlertCircle size={16} className="text-rose-500 shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto" noValidate>
        {/* New Password */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              New Password
            </label>
            {strength && (
              <span
                className={`text-[11px] font-bold ${strength.color} flex items-center gap-1`}
              >
                <ShieldCheck size={12} />
                <span>{strength.label}</span>
              </span>
            )}
          </div>
          <PasswordInput
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) {
                setErrors((prev) => ({ ...prev, newPassword: undefined }));
              }
            }}
            error={!!errors.newPassword}
            placeholder="At least 6 characters"
          />

          {newPassword && strength && (
            <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.barColor} ${strength.width}`}
              />
            </div>
          )}

          {errors.newPassword && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in">
              <AlertCircle size={12} />
              <span>{errors.newPassword}</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-700">
            Confirm Password
          </label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }
            }}
            error={!!errors.confirmPassword}
            placeholder="Re-enter new password"
          />
          {errors.confirmPassword && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in">
              <AlertCircle size={12} />
              <span>{errors.confirmPassword}</span>
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
              <span>Updating Password...</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </Button>
      </form>
    </div>
  );
};
