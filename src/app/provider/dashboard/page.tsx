"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  Star,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Wrench,
  SlidersHorizontal,
  Award,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  CURRENT_PROVIDER,
  PROVIDER_METRICS,
  PROVIDER_RECENT_BOOKINGS,
} from "@/data/mockProvider";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import { cn } from "@/lib/utils";

export default function ProviderDashboardPage() {
  const { provider, isOnline, toggleAvailability } = useProvider();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return (
          <Badge variant="rose" className="px-2 py-0.5 text-xs font-bold">
            New Lead
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="blue" className="px-2 py-0.5 text-xs font-bold">
            Confirmed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 px-2 py-0.5 text-xs font-bold">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="emerald" className="px-2 py-0.5 text-xs font-bold">
            Completed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-2 py-0.5 text-xs font-bold">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-blue-600/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <Badge variant="emerald" className="px-2.5 py-1 text-xs gap-1.5 font-bold">
                <ShieldCheck size={13} className="text-emerald-300" />
                <span>Verified Master Partner</span>
              </Badge>
              <span className="text-xs text-blue-200 font-medium">
                ID: {provider.id}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {provider.ownerName}! 👋
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              Your business is currently{" "}
              <strong className={isOnline ? "text-emerald-300" : "text-amber-300"}>
                {isOnline ? "Online & receiving job requests" : "Offline / leads paused"}
              </strong>{" "}
              in {provider.city}. You have 3 bookings requiring confirmation.
            </p>
          </div>

          {/* Quick Availability Action */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Button
              variant={isOnline ? "emerald" : "secondary"}
              size="lg"
              onClick={toggleAvailability}
              className="font-bold text-xs sm:text-sm shadow-md"
            >
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full shrink-0",
                  isOnline ? "bg-white animate-pulse" : "bg-slate-500"
                )}
              />
              <span>{isOnline ? "Go Offline / Pause Leads" : "Go Online & Accept Jobs"}</span>
            </Button>

            <Link href="/provider/bookings">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold text-xs sm:text-sm"
              >
                <span>View 3 Pending Requests</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {PROVIDER_METRICS.map((metric) => {
          return (
            <Card
              key={metric.id}
              className="bg-white border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {metric.title}
                  </span>
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      metric.colorTheme === "emerald" && "bg-emerald-50 text-emerald-600",
                      metric.colorTheme === "blue" && "bg-blue-50 text-blue-600",
                      metric.colorTheme === "purple" && "bg-purple-50 text-purple-600",
                      metric.colorTheme === "amber" && "bg-amber-50 text-amber-600"
                    )}
                  >
                    {metric.iconName === "CreditCard" && <CreditCard size={18} />}
                    {metric.iconName === "Calendar" && <Calendar size={18} />}
                    {metric.iconName === "Award" && <Award size={18} />}
                    {metric.iconName === "Star" && <Star size={18} />}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    {metric.changeType === "increase" && (
                      <span className="text-emerald-600 font-bold">
                        +{metric.changePercent}%
                      </span>
                    )}
                    <span className="text-slate-400 font-medium">
                      {metric.changeLabel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Link
          href="/provider/services"
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all group flex flex-col gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Wrench size={20} />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-blue-600">
              Manage Services
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {provider.servicesOffered?.length || provider.activeServicesCount} packages listed
            </span>
          </div>
        </Link>

        <Link
          href="/provider/bookings"
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all group flex flex-col gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Calendar size={20} />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-emerald-600">
              Booking Schedule
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              4 ongoing jobs
            </span>
          </div>
        </Link>

        <Link
          href="/provider/earnings"
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all group flex flex-col gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CreditCard size={20} />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-purple-600">
              Payouts & Wallet
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Next transfer in 2 days
            </span>
          </div>
        </Link>

        <Link
          href="/provider/profile"
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all group flex flex-col gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Building2 size={20} />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-amber-600">
              Business Profile
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              100% profile completed
            </span>
          </div>
        </Link>
      </div>

      {/* Main Section: Recent Bookings & Business Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left 8 Cols: Recent Bookings Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Recent Customer Bookings
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Incoming requests and scheduled service visits in your coverage area
              </p>
            </div>

            <Link
              href="/provider/bookings"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All ({PROVIDER_RECENT_BOOKINGS.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {PROVIDER_RECENT_BOOKINGS.map((booking) => (
              <Card
                key={booking.id}
                className="bg-white border-slate-200/80 hover:border-blue-300/80 transition-colors shadow-2xs overflow-hidden"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left Customer Info */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <img
                        src={booking.customerAvatar}
                        alt={booking.customerName}
                        className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {booking.customerName}
                          </h4>
                          {getStatusBadge(booking.status)}
                          {booking.urgent && (
                            <Badge variant="rose" className="text-[10px] px-1.5 py-0 font-extrabold">
                              Urgent
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-slate-700 truncate">
                          {booking.serviceTitle}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-slate-400" />
                            <span>
                              {booking.scheduledDate}, {booking.scheduledTime}
                            </span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400" />
                            <span>{booking.customerLocality}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action & Price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 gap-2 shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="text-base sm:text-lg font-black text-slate-900">
                          ₹{booking.price}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {booking.paymentMode}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/provider/bookings`}>
                          <Button size="sm" variant="default" className="text-xs font-bold px-3">
                            <span>Manage</span>
                            <ArrowRight size={12} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Business Profile Snapshot */}
        <div className="lg:col-span-4 space-y-5">
          <Card className="bg-white border-slate-200/80 shadow-2xs">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900">
                  Business Information
                </CardTitle>
                <Link
                  href="/provider/profile"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Building2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">
                    {provider.businessName}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Category: {provider.category}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Working Hours</div>
                  <div className="text-slate-500 text-[11px]">
                    {provider.workingHours}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Service Coverage</div>
                  <div className="text-slate-500 text-[11px]">
                    {provider.serviceRadiusKm} km around {provider.locality || provider.address || provider.city}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Direct Contact</div>
                  <div className="text-slate-500 text-[11px]">
                    {provider.phone}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/services/sp-1"
                  target="_blank"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-colors text-xs"
                >
                  <span>Preview Customer View</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Help Card */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 shadow-xl">
            <CardContent className="p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Sparkles size={18} />
              </div>
              <h4 className="text-sm font-bold">Sahayak Partner Helpline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Need assistance with an active booking, customer dispute, or bank payouts?
                Our priority support desk is available 24/7.
              </p>
              <div className="pt-1">
                <a
                  href="tel:+911800123456"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>Call 1800-123-SAHAYAK</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
