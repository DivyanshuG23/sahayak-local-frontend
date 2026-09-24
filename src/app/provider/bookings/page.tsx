"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, CheckCircle2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PROVIDER_RECENT_BOOKINGS } from "@/data/mockProvider";
import { ProviderRecentBooking, ProviderBookingStatus } from "@/features/provider/types";
import { cn } from "@/lib/utils";

export default function ProviderBookingsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "requested" | "active" | "completed">("all");
  const [bookings, setBookings] = useState<ProviderRecentBooking[]>(PROVIDER_RECENT_BOOKINGS);

  const filterBookings = () => {
    if (activeTab === "requested") return bookings.filter((b) => b.status === "requested");
    if (activeTab === "active") return bookings.filter((b) => ["confirmed", "in_progress"].includes(b.status));
    if (activeTab === "completed") return bookings.filter((b) => b.status === "completed");
    return bookings;
  };

  const filtered = filterBookings();

  const getStatusBadge = (status: ProviderBookingStatus) => {
    switch (status) {
      case "requested":
        return <Badge variant="rose" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">Pending Acceptance</Badge>;
      case "confirmed":
        return <Badge variant="blue" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">Confirmed Visit</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] sm:text-xs font-bold px-2 py-0.5">In Progress</Badge>;
      case "completed":
        return <Badge variant="emerald" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">Completed</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      {/* Header */}
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
            Bookings & Lead Management
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Review customer job requests, manage confirmed visits, and update progress.
          </p>
        </div>

        {/* Tab Switcher (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-x-auto max-w-full shrink-0">
          {(
            [
              { id: "all", label: "All" },
              { id: "requested", label: "New (1)" },
              { id: "active", label: "Active (2)" },
              { id: "completed", label: "Done" },
            ] as const
          ).map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "h-7 px-2.5 sm:px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100/80"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-2.5 sm:space-y-3">
        {filtered.length === 0 ? (
          <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl">
            <CardContent className="p-8 text-center text-xs text-slate-400">
              No bookings found in this category.
            </CardContent>
          </Card>
        ) : (
          filtered.map((booking) => {
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
                className="bg-white border-slate-200/80 shadow-2xs hover:border-blue-300/80 transition-colors py-0 rounded-xl sm:rounded-2xl"
              >
                <CardContent className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
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

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {booking.customerName}
                        </span>
                        {getStatusBadge(booking.status)}
                        <span className="text-[10px] text-slate-400 font-mono hidden xs:inline">
                          Ref: {booking.bookingRef}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-700 truncate">
                        {booking.serviceTitle}
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-slate-400 shrink-0" />
                          <span>{booking.scheduledDate}, {booking.scheduledTime}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-slate-400 shrink-0" />
                          <span className="truncate">{booking.customerLocality}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100 gap-2 shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="text-sm sm:text-base font-black text-slate-900">
                        ₹{booking.price}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {booking.paymentMode}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {booking.status === "requested" ? (
                        <>
                          <Button size="sm" variant="emerald" className="text-xs font-bold px-3 h-8">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs font-semibold px-2.5 text-slate-600 h-8">
                            Decline
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs font-bold px-3 h-8">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
