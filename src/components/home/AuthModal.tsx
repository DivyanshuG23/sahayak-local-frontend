"use client";

import React, { useState } from "react";
import { X, UserCheck, CheckCircle2, Building2, ShieldCheck, Sparkles } from "../icons/Icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      onLoginSuccess(name || "Resident User");
      setLoggedIn(false);
      setOtpSent(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Building2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {isSignUp ? "Create Account" : "User & Provider Login"}
                </h2>
                <Badge variant="emerald" className="text-[10px] px-1.5 py-0">Secure</Badge>
              </div>
              <p className="text-xs text-slate-500">Access bookings & local directory</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X size={18} />
          </Button>
        </div>

        {loggedIn ? (
          <div className="bg-blue-600 text-white p-6 rounded-2xl text-center space-y-3 animate-in zoom-in-95 shadow-lg shadow-blue-500/20">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl font-bold">Welcome back!</h3>
            <p className="text-xs text-blue-100">Logging into your Sahayak-Local account...</p>
          </div>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl shadow-md gap-2"
            >
              <UserCheck size={16} />
              <span>Get OTP Verification Code</span>
            </Button>

            <div className="text-center text-xs text-slate-500 pt-2 flex items-center justify-center gap-1">
              <span>{isSignUp ? "Already have an account?" : "New to Sahayak-Local?"}</span>
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="p-0 h-auto text-xs font-bold text-blue-600 underline"
              >
                {isSignUp ? "Login here" : "Create an Account"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-slate-700 flex items-start gap-2">
              <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                OTP code sent to <strong>{mobile}</strong>. (Use <strong>1234</strong> for demo)
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enter 4-Digit OTP</label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                className="w-full text-center text-lg tracking-widest font-extrabold bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl shadow-md gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Verify OTP & Sign In</span>
            </Button>
          </form>
        )}

      </div>
    </div>
  );
};

