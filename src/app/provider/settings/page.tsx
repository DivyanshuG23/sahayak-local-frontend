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
import { Separator } from "@/components/ui/separator";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import { cn } from "@/lib/utils";

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
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
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
          className="text-xs text-slate-600 hover:text-slate-900 gap-1.5 self-start sm:self-auto cursor-pointer h-8"
        >
          <RotateCcw size={13} />
          <span>Reset Demo Data</span>
        </Button>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs py-0 rounded-xl sm:rounded-2xl">
        {/* Push Notifications */}
        <div className="p-3.5 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Push Notifications for New Bookings
            </h4>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              Receive instant sound & popup alerts when a customer books in {provider.locality || provider.city}.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={instantNotifications}
            onClick={() => setInstantNotifications(!instantNotifications)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 shadow-inner",
              instantNotifications ? "bg-blue-600" : "bg-slate-200"
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
                instantNotifications ? "left-6" : "left-1"
              )}
            />
          </button>
        </div>

        {/* WhatsApp Alerts */}
        <div className="p-3.5 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              WhatsApp Lead Dispatch
            </h4>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              Send customer booking details to your WhatsApp (
              <strong className="text-slate-700">{provider.phone}</strong>).
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={whatsappAlerts}
            onClick={() => setWhatsappAlerts(!whatsappAlerts)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 shadow-inner",
              whatsappAlerts ? "bg-emerald-600" : "bg-slate-200"
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
                whatsappAlerts ? "left-6" : "left-1"
              )}
            />
          </button>
        </div>

        {/* Emergency Auto-Accept */}
        <div className="p-3.5 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Emergency 24x7 Job Requests
              </h4>
              <Badge variant="rose" className="text-[9px] px-1.5 py-0 font-bold shrink-0">
                Urgent
              </Badge>
            </div>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              Directly accept urgent emergency requests within your service area during operating hours.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={autoAcceptEmergency}
            onClick={handleToggleEmergency}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 shadow-inner",
              autoAcceptEmergency ? "bg-rose-600" : "bg-slate-200"
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
                autoAcceptEmergency ? "left-6" : "left-1"
              )}
            />
          </button>
        </div>

        {/* Service Coverage Radius */}
        <div className="p-3.5 sm:p-5 space-y-3">
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Service Coverage Radius
              </h4>
              <p className="text-slate-500 text-[11px] sm:text-xs">
                Currently set to {provider.serviceRadiusKm} km around{" "}
                <strong className="text-slate-700">
                  {provider.locality || provider.address || provider.city}
                </strong>
                .
              </p>
            </div>
            <Badge variant="blue" className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 shrink-0">
              {provider.serviceRadiusKm} KM
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">Presets:</span>
            {[5, 10, 15, 20, 25, 35, 50].map((radius) => (
              <Button
                key={radius}
                type="button"
                variant={provider.serviceRadiusKm === radius ? "default" : "secondary"}
                size="xs"
                onClick={() => handleRadiusChange(radius)}
                className={cn(
                  "h-7 px-2.5 text-xs font-bold rounded-lg cursor-pointer",
                  provider.serviceRadiusKm === radius
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {radius} km
              </Button>
            ))}
          </div>
        </div>

        {/* Account Details Snapshot */}
        <div className="p-3.5 sm:p-5 space-y-2">
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
            Account Registered Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Owner & Contact</span>
              <div className="font-bold text-slate-800">{provider.ownerName}</div>
              <div className="text-slate-500 text-[11px]">{provider.phone}</div>
              <div className="text-slate-500 text-[11px] truncate">{provider.email}</div>
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
