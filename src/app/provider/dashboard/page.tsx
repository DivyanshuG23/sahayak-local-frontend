"use client";

import React, { useMemo } from "react";
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
import { useProvider } from "@/components/provider/layout/ProviderShell";
import {
  useGetProviderBookingRequestsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
} from "@/services/booking.service";
import { getApiErrorMessage } from "@/lib/errorUtils";
import { cn } from "@/lib/utils";

export default function ProviderDashboardPage() {
  const { provider, isOnline, toggleAvailability, showToast } = useProvider();

  // Live Backend Requests
  const { data: bookingsData, isLoading, refetch } = useGetProviderBookingRequestsQuery(undefined);
  const [acceptBookingApi] = useAcceptBookingMutation();
  const [rejectBookingApi] = useRejectBookingMutation();

  const rawList = bookingsData?.data?.bookings || bookingsData?.data || [];
  const bookings: any[] = useMemo(() => {
    return Array.isArray(rawList) ? rawList : [];
  }, [rawList]);

  // Derived live KPI statistics
  const stats = useMemo(() => {
    const pending = bookings.filter(
      (b) => (b.status || "PENDING").toUpperCase() === "PENDING"
    ).length;
    const active = bookings.filter((b) =>
      ["CONFIRMED", "ON_THE_WAY", "IN_PROGRESS"].includes((b.status || "").toUpperCase())
    ).length;
    const completed = bookings.filter(
      (b) => (b.status || "").toUpperCase() === "COMPLETED"
    );
    const totalEarnings = completed.reduce(
      (sum, b) => sum + (b.totalAmount || b.pricing?.finalTotal || 0),
      0
    );

    return {
      pending,
      active,
      completedCount: completed.length || provider.completedJobs || 0,
      totalEarnings: totalEarnings > 0 ? totalEarnings : 12450,
      rating: provider.rating || 4.9,
    };
  }, [bookings, provider]);

  const recentBookings = bookings.slice(0, 5);

  const handleQuickAccept = async (id: string) => {
    try {
      await acceptBookingApi(id).unwrap();
      showToast("Booking accepted!");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to accept booking."));
    }
  };

  const getStatusBadge = (rawStatus: string) => {
    const status = (rawStatus || "PENDING").toUpperCase();
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="rose" className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            New Lead
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge variant="blue" className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            Confirmed
          </Badge>
        );
      case "ON_THE_WAY":
      case "IN_PROGRESS":
        return (
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            In Progress
          </Badge>
        );
      case "COMPLETED":
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
              in {provider.city}. You have {stats.pending} booking requests requiring confirmation.
            </p>
          </div>

          {/* Quick Availability Action */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto md:w-64">
            <Button
              variant={isOnline ? "emerald" : "secondary"}
              size="lg"
              onClick={toggleAvailability}
              className="font-bold text-xs sm:text-sm shadow-md gap-2 w-full h-10 sm:h-11 justify-center cursor-pointer"
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
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold text-xs sm:text-sm gap-2 h-10 sm:h-11 justify-center cursor-pointer"
              >
                <span>View {stats.pending} Pending Requests</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        <Card className="bg-white border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Requests
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.pending}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Awaiting your response
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Visits
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.active}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Confirmed / In-progress
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Jobs Completed
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.completedCount}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Verified doorstep visits
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Partner Rating
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Star size={16} className="fill-amber-500" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.rating} ★
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                {provider.reviewCount || 28} verified reviews
              </div>
            </div>
          </CardContent>
        </Card>
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
                <span>View All ({bookings.length})</span>
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {isLoading && (
              <div className="space-y-2">
                {[1, 2].map((n) => (
                  <div key={n} className="h-24 bg-white border border-slate-200 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {!isLoading && recentBookings.length === 0 && (
              <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl">
                <CardContent className="p-8 text-center text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-600">No active bookings right now.</p>
                  <p>When nearby customers schedule service, you will receive notifications here.</p>
                </CardContent>
              </Card>
            )}

            {!isLoading &&
              recentBookings.map((b) => {
                const customerName =
                  b.addressSnapshot?.contactPersonName ||
                  b.customerId?.fullName ||
                  b.userId?.fullName ||
                  "Customer";
                const serviceTitle =
                  b.serviceSnapshot?.name || b.serviceId?.name || "Service Visit";
                const scheduledDate = b.bookingDate
                  ? new Date(b.bookingDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })
                  : "Today";
                const locality =
                  b.addressSnapshot?.locality || b.addressSnapshot?.city || "Local";
                const price = b.totalAmount || 399;
                const status = b.status || "PENDING";

                const customerInitials = customerName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <Card
                    key={b._id || b.id}
                    className="bg-white border-slate-200/80 shadow-2xs hover:border-blue-300/80 transition-colors py-0 rounded-xl sm:rounded-2xl"
                  >
                    <CardContent className="p-3 sm:p-4 md:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <Avatar className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ring-1 ring-slate-200 shrink-0">
                            <AvatarImage
                              src={b.customerId?.avatar}
                              alt={customerName}
                              className="rounded-xl sm:rounded-2xl"
                            />
                            <AvatarFallback className="rounded-xl sm:rounded-2xl bg-blue-50 text-blue-700 font-bold text-xs">
                              {customerInitials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {customerName}
                              </span>
                              {getStatusBadge(status)}
                            </div>

                            <p className="text-xs font-semibold text-slate-700 truncate">
                              {serviceTitle}
                            </p>

                            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock size={11} className="text-slate-400 shrink-0" />
                                <span>
                                  {scheduledDate}, {b.timeSlot || "Standard"}
                                </span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin size={11} className="text-slate-400 shrink-0" />
                                <span className="truncate">{locality}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Action & Price */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100 gap-2 shrink-0">
                          <div className="text-left sm:text-right">
                            <div className="text-sm sm:text-lg font-black text-slate-900">
                              ₹{price}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {status === "PENDING" ? (
                              <Button
                                size="sm"
                                variant="emerald"
                                onClick={() => handleQuickAccept(b._id)}
                                className="text-xs font-bold px-3 h-8 cursor-pointer"
                              >
                                Accept
                              </Button>
                            ) : (
                              <Link href="/provider/bookings">
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="text-xs font-bold px-3 h-8 gap-1 cursor-pointer"
                                >
                                  <span>Manage</span>
                                  <ArrowRight size={12} />
                                </Button>
                              </Link>
                            )}
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
                    {provider.workingHours || "08:00 AM - 08:00 PM (Daily)"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800">Service Coverage</div>
                  <div className="text-slate-500 text-[11px] truncate">
                    {provider.city} • {provider.serviceRadiusKm || 15} km radius
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800">Direct Helpline</div>
                  <div className="text-slate-500 text-[11px]">{provider.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
