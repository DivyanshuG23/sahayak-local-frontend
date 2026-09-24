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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
          <Badge variant="rose" className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            New Lead
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="blue" className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            Confirmed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="emerald" className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            Completed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Welcome Hero Card */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 border-blue-600/30 text-white shadow-xl py-0 rounded-2xl sm:rounded-3xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <CardContent className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 sm:space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="emerald" className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs gap-1 sm:gap-1.5 font-bold">
                <ShieldCheck size={12} className="text-emerald-300" />
                <span>Verified Partner</span>
              </Badge>
              <span className="text-[11px] sm:text-xs text-blue-200 font-medium">
                ID: {provider.id}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
              Welcome back, {provider.ownerName}! 👋
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-blue-100/90 leading-relaxed font-normal">
              Your business is currently{" "}
              <strong className={isOnline ? "text-emerald-300" : "text-amber-300"}>
                {isOnline ? "Online & receiving job requests" : "Offline / leads paused"}
              </strong>{" "}
              in {provider.city}. You have 3 bookings requiring confirmation.
            </p>
          </div>

          {/* Quick Availability Action */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto md:w-64">
            <Button
              variant={isOnline ? "emerald" : "secondary"}
              size="lg"
              onClick={toggleAvailability}
              className="font-bold text-xs sm:text-sm shadow-md gap-2 w-full h-10 sm:h-11 justify-center"
            >
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full shrink-0",
                  isOnline ? "bg-white animate-pulse" : "bg-slate-500"
                )}
              />
              <span>{isOnline ? "Go Offline / Pause" : "Go Online & Accept Jobs"}</span>
            </Button>

            <Link href="/provider/bookings" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold text-xs sm:text-sm gap-2 h-10 sm:h-11 justify-center"
              >
                <span>View 3 Pending Requests</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* KPI Stats Grid (Optimized 2-col on mobile, 4-col on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        {PROVIDER_METRICS.map((metric) => {
          return (
            <Card
              key={metric.id}
              className="bg-white border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow py-0 rounded-xl sm:rounded-2xl"
            >
              <CardContent className="p-3.5 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                    {metric.title}
                  </span>
                  <div
                    className={cn(
                      "w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0",
                      metric.colorTheme === "emerald" && "bg-emerald-50 text-emerald-600",
                      metric.colorTheme === "blue" && "bg-blue-50 text-blue-600",
                      metric.colorTheme === "purple" && "bg-purple-50 text-purple-600",
                      metric.colorTheme === "amber" && "bg-amber-50 text-amber-600"
                    )}
                  >
                    {metric.iconName === "CreditCard" && <CreditCard size={15} className="sm:size-4.5" />}
                    {metric.iconName === "Calendar" && <Calendar size={15} className="sm:size-4.5" />}
                    {metric.iconName === "Award" && <Award size={15} className="sm:size-4.5" />}
                    {metric.iconName === "Star" && <Star size={15} className="sm:size-4.5" />}
                  </div>
                </div>

                <div className="mt-2 sm:mt-3">
                  <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-1.5 text-[10px] sm:text-xs flex-wrap">
                    {metric.changeType === "increase" && (
                      <Badge variant="emerald" className="px-1 py-0 h-4 text-[9px] sm:text-[10px] font-extrabold shrink-0">
                        +{metric.changePercent}%
                      </Badge>
                    )}
                    <span className="text-slate-400 font-medium truncate">
                      {metric.changeLabel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Shortcut Cards (2-col on mobile, 4-col on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
        <Link href="/provider/services" className="group">
          <Card className="h-full bg-white border-slate-200/80 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer py-0 rounded-xl sm:rounded-2xl active:scale-[0.98]">
            <CardContent className="p-3 sm:p-4 flex flex-col gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <Wrench size={18} className="sm:size-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-blue-600 leading-snug">
                  Manage Services
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate mt-0.5">
                  {provider.servicesOffered?.length || provider.activeServicesCount} packages
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/provider/bookings" className="group">
          <Card className="h-full bg-white border-slate-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer py-0 rounded-xl sm:rounded-2xl active:scale-[0.98]">
            <CardContent className="p-3 sm:p-4 flex flex-col gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <Calendar size={18} className="sm:size-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-emerald-600 leading-snug">
                  Booking Schedule
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate mt-0.5">
                  4 active jobs
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/provider/earnings" className="group">
          <Card className="h-full bg-white border-slate-200/80 shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer py-0 rounded-xl sm:rounded-2xl active:scale-[0.98]">
            <CardContent className="p-3 sm:p-4 flex flex-col gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <CreditCard size={18} className="sm:size-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-purple-600 leading-snug">
                  Payouts & Wallet
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate mt-0.5">
                  In 2 days
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/provider/profile" className="group">
          <Card className="h-full bg-white border-slate-200/80 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer py-0 rounded-xl sm:rounded-2xl active:scale-[0.98]">
            <CardContent className="p-3 sm:p-4 flex flex-col gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <Building2 size={18} className="sm:size-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-amber-600 leading-snug">
                  Business Profile
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate mt-0.5">
                  100% complete
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Section: Recent Bookings & Business Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
        {/* Left 8 Cols: Recent Bookings Feed */}
        <div className="lg:col-span-8 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900">
                Recent Customer Bookings
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                Incoming requests & scheduled visits
              </p>
            </div>

            <Link href="/provider/bookings" className="shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50/60 gap-1 h-8 px-2 sm:px-3"
              >
                <span>View All ({PROVIDER_RECENT_BOOKINGS.length})</span>
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {PROVIDER_RECENT_BOOKINGS.map((booking) => {
              const customerInitials = booking.customerName
                ? booking.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "CU";

              return (
                <Card
                  key={booking.id}
                  className="bg-white border-slate-200/80 hover:border-blue-300/80 transition-colors shadow-2xs overflow-hidden py-0 rounded-xl sm:rounded-2xl"
                >
                  <CardContent className="p-3.5 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      {/* Left Customer Info */}
                      <div className="flex items-start gap-3 min-w-0">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ring-1 ring-slate-200 shrink-0">
                          <AvatarImage
                            src={booking.customerAvatar}
                            alt={booking.customerName}
                            className="rounded-xl sm:rounded-2xl"
                          />
                          <AvatarFallback className="rounded-xl sm:rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm">
                            {customerInitials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 space-y-1 flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {booking.customerName}
                            </h4>
                            {getStatusBadge(booking.status)}
                            {booking.urgent && (
                              <Badge variant="rose" className="text-[9px] sm:text-[10px] px-1.5 py-0 font-extrabold">
                                Urgent
                              </Badge>
                            )}
                          </div>

                          <p className="text-xs font-semibold text-slate-700 truncate">
                            {booking.serviceTitle}
                          </p>

                          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock size={11} className="text-slate-400 shrink-0" />
                              <span>
                                {booking.scheduledDate}, {booking.scheduledTime}
                              </span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin size={11} className="text-slate-400 shrink-0" />
                              <span className="truncate">{booking.customerLocality}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action & Price */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100 gap-2 shrink-0">
                        <div className="text-left sm:text-right">
                          <div className="text-sm sm:text-lg font-black text-slate-900">
                            ₹{booking.price}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {booking.paymentMode}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link href="/provider/bookings">
                            <Button size="sm" variant="default" className="text-xs font-bold px-3 h-8 gap-1">
                              <span>Manage</span>
                              <ArrowRight size={12} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Business Profile Snapshot */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5">
          <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl">
            <CardHeader className="p-3.5 sm:p-4 pb-2.5 sm:pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-bold text-slate-900">
                  Business Information
                </CardTitle>
                <Link href="/provider/profile">
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 h-6 px-1.5"
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-3.5 sm:p-4 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Building2 size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 truncate">
                    {provider.businessName}
                  </div>
                  <div className="text-slate-500 text-[11px] truncate">
                    Category: {provider.category}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800">Working Hours</div>
                  <div className="text-slate-500 text-[11px] truncate">
                    {provider.workingHours}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800">Service Coverage</div>
                  <div className="text-slate-500 text-[11px]">
                    {provider.serviceRadiusKm} km around {provider.locality || provider.address || provider.city}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800">Direct Contact</div>
                  <div className="text-slate-500 text-[11px] truncate">
                    {provider.phone}
                  </div>
                </div>
              </div>

              <Separator className="my-1.5" />

              <div>
                <Link href="/services/sp-1" target="_blank" className="block w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center gap-1.5 text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 h-9"
                  >
                    <span>Preview Customer View</span>
                    <ArrowRight size={12} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Help Card */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 shadow-xl py-0 rounded-xl sm:rounded-2xl">
            <CardContent className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                <Sparkles size={16} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold">Sahayak Partner Helpline</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Need assistance with an active booking, customer dispute, or bank payouts?
                Our priority support desk is available 24/7.
              </p>
              <div className="pt-0.5">
                <a href="tel:+911800123456" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-xs font-bold text-blue-400 hover:text-blue-300 border-slate-700 bg-slate-800/60 hover:bg-slate-800 h-9"
                  >
                    <span>Call 1800-123-SAHAYAK</span>
                    <ArrowRight size={12} />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
