"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Building2, ShieldCheck, CheckCircle2, UserCheck, AlertCircle } from "../icons/Icons";
import { CITIES } from "../../data/mockData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useRegisterProviderMutation } from "@/services/auth.service";
import { useGetCategoriesQuery } from "@/services/category.service";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface ProviderRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (name: string) => void;
}

export const ProviderRegistrationModal: React.FC<ProviderRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("Jaipur, Rajasthan");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [registerProviderApi, { isLoading }] = useRegisterProviderMutation();
  const { data: categoriesData } = useGetCategoriesQuery(undefined);

  const categories = categoriesData?.data?.categories || categoriesData?.data || [];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    const effectiveCategory =
      category || (categories[0]?.name ? categories[0].name : "Electrician");
    const generatedEmail =
      email.trim() || `partner.${cleanPhone}@sahayaklocal.in`;
    const generatedPassword = password.trim() || `Sahayak@${cleanPhone.slice(-4)}`;

    try {
      await registerProviderApi({
        businessName: businessName.trim(),
        ownerName: ownerName.trim(),
        fullName: ownerName.trim(),
        category: effectiveCategory,
        city: city.trim(),
        phone: cleanPhone,
        email: generatedEmail,
        password: generatedPassword,
        experienceYears: 2,
      }).unwrap();

      setSubmitted(true);
      setTimeout(() => {
        onSuccess?.(businessName);
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      setErrorMessage(getApiErrorMessage(err, "Failed to register provider account."));
    }
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
                <Badge variant="emerald" className="text-[10px] px-1.5 py-0">
                  Free Partner
                </Badge>
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

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-center gap-2 text-xs">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {submitted ? (
          <div className="bg-emerald-500 text-white p-6 rounded-2xl text-center space-y-2 animate-in zoom-in-95 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl font-extrabold">Application Registered!</h3>
            <p className="text-xs text-emerald-100">
              Welcome to Sahayak-Local! Your provider dashboard is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Business / Shop Name *
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
                  Owner / Contact Name *
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
                  Primary Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((c: any) => (
                    <option key={c._id || c.id || c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  City Location *
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
                  WhatsApp Mobile No. *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@example.com"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Password (Optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
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
              disabled={isLoading}
              className="w-full h-11 font-bold rounded-xl shadow-md gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserCheck size={16} />
                  <span>Register Provider Account</span>
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/provider/onboarding"
                onClick={onClose}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Prefer step-by-step onboarding? Complete KYC & Setup →
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
