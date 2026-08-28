"use client";

import React from "react";
import { Bell, Mail, Phone, ShieldCheck, Tag, Check } from "@/components/icons/Icons";
import { NotificationPreferences } from "@/data/mockProfile";

interface NotificationsSectionProps {
  preferences: NotificationPreferences;
  onTogglePreference: (key: keyof NotificationPreferences) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  preferences,
  onTogglePreference,
}) => {
  const items: Array<{
    key: keyof NotificationPreferences;
    title: string;
    description: string;
    icon: any;
    color: string;
  }> = [
    {
      key: "emailBookingUpdates",
      title: "Email Booking Confirmation & Invoices",
      description: "Receive instant receipt PDFs, booking progress, and service completion reports via email.",
      icon: Mail,
      color: "text-blue-600 bg-blue-50 border-blue-200/60",
    },
    {
      key: "smsAlerts",
      title: "SMS & WhatsApp Arrival Alerts",
      description: "Get real-time SMS notifications when your provider is on the way or near your doorstep.",
      icon: Phone,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
    },
    {
      key: "securityAlerts",
      title: "Security & Login Alerts",
      description: "Receive immediate notifications about password changes or logins from new devices.",
      icon: ShieldCheck,
      color: "text-amber-600 bg-amber-50 border-amber-200/60",
    },
    {
      key: "promotionalOffers",
      title: "Exclusive Local Deals & Seasonal Offers",
      description: "Be the first to hear about localized discount vouchers and special festive service packages.",
      icon: Tag,
      color: "text-rose-600 bg-rose-50 border-rose-200/60",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />
          <span>Notification Preferences</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Customize how and when Sahayak-Local reaches out to you.
        </p>
      </div>

      {/* Preferences List */}
      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isChecked = preferences[item.key];

          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all gap-4"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-2xl border ${item.color} shrink-0`}>
                  <Icon size={20} />
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => onTogglePreference(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isChecked ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isChecked ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
