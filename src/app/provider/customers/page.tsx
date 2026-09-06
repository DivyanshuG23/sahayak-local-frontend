"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowLeft, Phone, MapPin, Calendar, Star } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROVIDER_RECENT_BOOKINGS } from "@/data/mockProvider";

export default function ProviderCustomersPage() {
  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-200">
      <div>
        <Link
          href="/provider/dashboard"
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Back to Dashboard</span>
        </Link>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
          Customers Directory
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Repeat clients and recent households serviced across your locality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROVIDER_RECENT_BOOKINGS.map((booking) => (
          <Card key={booking.id} className="bg-white border-slate-200/80 shadow-2xs">
            <CardContent className="p-4 sm:p-5 flex items-start gap-4">
              <img
                src={booking.customerAvatar}
                alt={booking.customerName}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {booking.customerName}
                  </h3>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    Local Customer
                  </Badge>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-400" />
                  <span>{booking.customerPhone}</span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin size={12} className="text-slate-400" />
                  <span>{booking.customerLocality}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Last Job: {booking.serviceTitle.slice(0, 24)}...</span>
                  <span className="font-bold text-slate-800">₹{booking.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
