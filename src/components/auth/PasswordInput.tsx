"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "@/components/icons/Icons";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <Lock size={16} />
      </div>

      <input
        type={showPassword ? "text" : "password"}
        className={`w-full bg-slate-50 border rounded-xl pl-10 pr-11 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
          error
            ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30"
            : "border-slate-200 focus:ring-blue-500 focus:bg-white"
        } ${className}`}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
        title={showPassword ? "Hide password" : "Show password"}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};
