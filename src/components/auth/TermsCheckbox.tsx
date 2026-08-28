"use client";

import React from "react";
import { AlertCircle } from "@/components/icons/Icons";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-1">
      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-relaxed">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 shrink-0"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="font-extrabold text-blue-600 hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="font-extrabold text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
          <AlertCircle size={12} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
