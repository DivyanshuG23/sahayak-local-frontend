"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock, MapPin, Phone, ShieldCheck, CheckCircle2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PROVIDER_RECENT_BOOKINGS } from "@/data/mockProvider";
import { ProviderRecentBooking, ProviderBookingStatus } from "@/features/provider/types";

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
        return <Badge variant="rose" className="text-xs font-bold px-2 py-0.5">Pending Acceptance</Badge>;
      case "confirmed":
        return <Badge variant="blue" className="text-xs font-bold px-2 py-0.5">Confirmed Visit</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-bold px-2 py-0.5">In Progress</Badge>;
      case "completed":
        return <Badge variant="emerald" className="text-xs font-bold px-2 py-0.5">Completed</Badge>;
      default:
        return <Badge variant="outline" className="text-xs font-bold px-2 py-0.5">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-200">
      {/* Header */}
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
            Bookings & Lead Management
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Review customer job requests, manage confirmed visits, and update service progress.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start sm:self-auto">
          {(
            [
              { id: "all", label: "All Bookings" },
              { id: "requested", label: "New Requests (1)" },
              { id: "active", label: "Active Jobs (2)" },
              { id: "completed", label: "Completed" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80 text-xs text-slate-400">
            No bookings found in this category.
          </div>
        ) : (
          filtered.map((booking) => (
            <Card key={booking.id} className="bg-white border-slate-200/80 shadow-2xs">
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <img
                    src={booking.customerAvatar}
                    alt={booking.customerName}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">{booking.customerName}</span>
                      {getStatusBadge(booking.status)}
                      <span className="text-[10px] text-slate-400 font-mono">Ref: {booking.bookingRef}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 truncate">{booking.serviceTitle}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        <span>{booking.scheduledDate}, {booking.scheduledTime}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{booking.customerLocality}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 gap-2 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-base font-black text-slate-900">₹{booking.price}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{booking.paymentMode}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {booking.status === "requested" ? (
                      <>
                        <Button size="sm" variant="emerald" className="text-xs font-bold px-3">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs font-semibold px-2.5 text-slate-600">
                          Decline
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs font-bold px-3">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
