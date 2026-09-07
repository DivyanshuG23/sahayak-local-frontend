"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Building2, ShieldCheck, CheckCircle2, UserCheck } from "../icons/Icons";
import { CATEGORIES, CITIES } from "../../data/mockData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ProviderRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (name: string) => void;
}

export const ProviderRegistrationModal: React.FC<ProviderRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [category, setCategory] = useState("Electrician");
  const [city, setCity] = useState("Jaipur, Rajasthan");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess?.(businessName);
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Building2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">Join as a Local Provider</h2>
                <Badge variant="emerald" className="text-[10px] px-1.5 py-0">Free Partner</Badge>
              </div>
              <p className="text-xs text-slate-500">Register your business & start receiving leads</p>
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

        {submitted ? (
          <div className="bg-emerald-500 text-white p-6 rounded-2xl text-center space-y-2 animate-in zoom-in-95 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl font-extrabold">Application Submitted!</h3>
            <p className="text-xs text-emerald-100">
              Our partner verification team will contact you on <strong>{phone}</strong> within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Business / Shop Name
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Verma AC Care & Services"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Owner / Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Amit Verma"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Primary Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  City Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WhatsApp Mobile No.
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
              <span>Includes free listing & verification badge on Sahayak-Local.</span>
            </div>

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              className="w-full h-11 font-bold rounded-xl shadow-md gap-2"
            >
              <UserCheck size={16} />
              <span>Submit Quick Application</span>
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/provider/onboarding"
                onClick={onClose}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Prefer full registration? Complete 5-Step Onboarding →
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

