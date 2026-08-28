"use client";

import React, { useState } from "react";
import {
  Lock,
  Key,
  Laptop,
  Smartphone,
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Clock
} from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoginActivity } from "@/data/mockProfile";

interface SecuritySectionProps {
  loginActivities: LoginActivity[];
  twoFactorEnabled: boolean;
  onToggle2FA: () => void;
  onChangePassword: (curr: string, newP: string) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  loginActivities,
  twoFactorEnabled,
  onToggle2FA,
  onChangePassword,
}) => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurr, setShowCurr] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    if (newPassword.length < 6) {
      setFeedbackMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedbackMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    onChangePassword(currPassword, newPassword);
    setFeedbackMsg({ type: "success", text: "Password updated successfully!" });
    setCurrPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Key size={20} className="text-blue-600" />
            <span>Change Password</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ensure your account is using a strong password to protect your bookings and saved details.
          </p>
        </div>

        {feedbackMsg && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 border ${
              feedbackMsg.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            {feedbackMsg.type === "success" ? (
              <Check size={16} className="text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose-500 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Current Password</label>
            <div className="relative">
              <input
                type={showCurr ? "text" : "password"}
                required
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurr(!showCurr)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurr ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs">
            Update Password
          </Button>
        </form>
      </div>

      {/* Two-Factor Authentication Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>Two-Factor Authentication (2FA)</span>
          </h3>
          <p className="text-xs text-slate-500 max-w-md">
            Add an extra layer of protection requiring an SMS OTP whenever you log in from an unknown device.
          </p>
        </div>

        <Button
          onClick={onToggle2FA}
          variant={twoFactorEnabled ? "secondary" : "default"}
          size="sm"
          className={`font-semibold text-xs rounded-xl ${
            twoFactorEnabled ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {twoFactorEnabled ? "2FA Enabled (Active)" : "Enable Two-Factor Auth"}
        </Button>
      </div>

      {/* Login Activity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Clock size={20} className="text-blue-600" />
            <span>Login Activity & Devices</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Devices that are currently logged into your Sahayak-Local account.
          </p>
        </div>

        <div className="space-y-3">
          {loginActivities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
                  {act.device.includes("iPhone") || act.device.includes("Mobile") ? (
                    <Smartphone size={20} />
                  ) : (
                    <Laptop size={20} />
                  )}
                </div>

                <div>
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span>{act.device}</span>
                    <span className="text-slate-400 font-normal">({act.browser})</span>
                    {act.isCurrentDevice && (
                      <Badge variant="emerald" className="text-[9px] py-0 px-1.5">
                        Current Device
                      </Badge>
                    )}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    📍 {act.location} • IP: {act.ip}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-slate-500 font-medium block">{act.lastActive}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
