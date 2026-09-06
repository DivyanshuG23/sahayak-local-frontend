"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  RotateCcw,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProvider } from "@/components/provider/layout/ProviderShell";

export default function ProviderSettingsPage() {
  const { provider, updateProviderProfile, resetToDefaultProfile, showToast } = useProvider();

  const [instantNotifications, setInstantNotifications] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [autoAcceptEmergency, setAutoAcceptEmergency] = useState(
    provider.emergencyAvailability ?? false
  );

  const handleToggleEmergency = () => {
    const nextVal = !autoAcceptEmergency;
    setAutoAcceptEmergency(nextVal);
    updateProviderProfile({ emergencyAvailability: nextVal });
    showToast(
      nextVal
        ? "Emergency request auto-accept enabled."
        : "Emergency request auto-accept disabled."
    );
  };

  const handleRadiusChange = (newRadius: number) => {
    updateProviderProfile({ serviceRadiusKm: newRadius });
    showToast(`Service coverage radius updated to ${newRadius} km.`);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/provider/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Provider Settings & Preferences
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Control notification preferences, dispatch alerts, and service radius for {provider.businessName}.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefaultProfile}
          className="text-xs text-slate-500 hover:text-slate-800 gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset Demo Data</span>
        </Button>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs">
        {/* Push Notifications */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-900">Push Notifications for New Bookings</h4>
            <p className="text-slate-500">
              Receive instant sound & popup alerts when a customer books in {provider.locality || provider.city}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setInstantNotifications(!instantNotifications)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              instantNotifications ? "bg-blue-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                instantNotifications ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* WhatsApp Alerts */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-900">WhatsApp Lead Dispatch</h4>
            <p className="text-slate-500">
              Send customer booking address and phone number to your registered WhatsApp (
              <strong className="text-slate-700">{provider.phone}</strong>).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWhatsappAlerts(!whatsappAlerts)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              whatsappAlerts ? "bg-emerald-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                whatsappAlerts ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Emergency Auto-Accept */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900">Emergency 24x7 Job Requests</h4>
              <Badge variant="rose" className="text-[9px] px-1.5 py-0 font-bold">
                Urgent
              </Badge>
            </div>
            <p className="text-slate-500">
              Directly accept urgent emergency requests within your service area during operating hours.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleEmergency}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              autoAcceptEmergency ? "bg-rose-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                autoAcceptEmergency ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Service Coverage Radius */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-900">Service Coverage Radius</h4>
              <p className="text-slate-500">
                Currently set to {provider.serviceRadiusKm} km around{" "}
                <strong className="text-slate-700">
                  {provider.locality || provider.address || provider.city}
                </strong>
                .
              </p>
            </div>
            <Badge variant="blue" className="text-xs font-bold px-2.5 py-1">
              {provider.serviceRadiusKm} KM RADIUS
            </Badge>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-[11px] text-slate-400 font-semibold">Quick Presets:</span>
            {[5, 10, 15, 20, 25, 35, 50].map((radius) => (
              <button
                key={radius}
                type="button"
                onClick={() => handleRadiusChange(radius)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  provider.serviceRadiusKm === radius
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {radius} km
              </button>
            ))}
          </div>
        </div>

        {/* Account Details Snapshot */}
        <div className="p-4 sm:p-5 space-y-2">
          <h4 className="font-bold text-slate-900">Account Registered Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Owner & Contact</span>
              <div className="font-bold text-slate-800">{provider.ownerName}</div>
              <div className="text-slate-500 text-[11px]">{provider.phone}</div>
              <div className="text-slate-500 text-[11px]">{provider.email}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Base Workshop / Store</span>
              <div className="font-bold text-slate-800">{provider.businessName}</div>
              <div className="text-slate-500 text-[11px]">
                {provider.address || provider.locality}, {provider.city}
                {provider.pincode ? ` (${provider.pincode})` : ""}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
