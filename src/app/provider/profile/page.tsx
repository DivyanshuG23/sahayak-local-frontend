"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Award,
  RotateCcw,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import { CURRENT_PROVIDER } from "@/data/mockProvider";

export default function ProviderProfilePage() {
  const { provider, resetToDefaultProfile } = useProvider();

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/provider/dashboard"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Business Profile & Verification
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage your public storefront details, business credentials, and service areas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge
            variant={provider.kycStatus === "verified" ? "emerald" : "blue"}
            className="px-3 py-1 text-xs gap-1.5 font-bold"
          >
            <ShieldCheck size={14} className={provider.kycStatus === "verified" ? "text-emerald-500" : "text-blue-500"} />
            <span>{provider.badgeText || "Verified Partner"}</span>
          </Badge>

          <Button
            variant="ghost"
            size="xs"
            onClick={resetToDefaultProfile}
            title="Reset to default showcase provider profile"
            className="text-slate-400 hover:text-slate-600 text-[11px] gap-1"
          >
            <RotateCcw size={12} />
            <span>Reset Demo</span>
          </Button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <Card className="bg-white border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Cover Banner */}
        <div className="h-32 sm:h-44 w-full relative overflow-hidden bg-slate-100">
          <img
            src={provider.bannerUrl || CURRENT_PROVIDER.bannerUrl}
            alt={provider.businessName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>

        {/* Profile Details Header */}
        <CardContent className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={provider.avatarUrl || CURRENT_PROVIDER.avatarUrl}
                alt={provider.ownerName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white shrink-0"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {provider.businessName}
                  </h3>
                  <Badge variant="blue" className="text-[10px] px-1.5 py-0 font-bold">
                    {provider.category}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {provider.ownerName} • {provider.experienceYears}+ years experience
                </p>
              </div>
            </div>

            <Link href="/services/sp-1" target="_blank">
              <Button variant="outline" size="sm" className="font-semibold text-xs gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600" />
                <span>View Public Page</span>
              </Button>
            </Link>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            {/* Primary Contact */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Primary Contact Information
              </span>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <span>{provider.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <span>{provider.email}</span>
              </div>
            </div>

            {/* Operating Location */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Operating Location & Coverage
              </span>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span>
                  {provider.address || provider.locality}, {provider.city}
                  {provider.pincode ? ` (${provider.pincode})` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                <Clock size={14} className="text-slate-400 shrink-0" />
                <span>Service Radius: {provider.serviceRadiusKm} km around base</span>
              </div>
            </div>
          </div>

          {/* Working Hours & Starting Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Working Schedule
              </span>
              <div className="font-semibold text-slate-800">
                {provider.workingHours}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                Status: {provider.availability === "available" ? "Accepting Doorstep Bookings" : "Paused / Offline"}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Base Service Rate
              </span>
              <div className="text-sm font-black text-slate-900">
                ₹{provider.startingPrice || 399}{" "}
                <span className="text-xs font-normal text-slate-500">
                  ({provider.priceUnit || "per visit"})
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Active service packages: {provider.servicesOffered?.length || provider.activeServicesCount}
              </div>
            </div>
          </div>

          {/* About Statement */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs">
            <span className="font-bold text-slate-700">About the Business:</span>
            <p className="text-slate-600 leading-relaxed">
              {provider.about}
            </p>
          </div>

          {/* Services Offered Badges */}
          {provider.servicesOffered && provider.servicesOffered.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Services Offered & Packages:</span>
                <Link
                  href="/provider/services"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Manage Packages ({provider.servicesOffered.length}) →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {provider.servicesOffered.map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-200/60"
                  >
                    <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                    <span>{service}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
