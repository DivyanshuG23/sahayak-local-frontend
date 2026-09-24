"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, MapPin } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PROVIDER_RECENT_BOOKINGS } from "@/data/mockProvider";

export default function ProviderCustomersPage() {
  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
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
          Customers Directory
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Repeat clients and recent households serviced across your locality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
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
              className="bg-white border-slate-200/80 shadow-2xs hover:border-blue-300/80 transition-colors py-0 rounded-xl sm:rounded-2xl"
            >
              <CardContent className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4">
                <Avatar className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ring-1 ring-slate-200 shrink-0">
                  <AvatarImage
                    src={booking.customerAvatar}
                    alt={booking.customerName}
                    className="rounded-xl sm:rounded-2xl"
                  />
                  <AvatarFallback className="rounded-xl sm:rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs">
                    {customerInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {booking.customerName}
                    </h3>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                      Local Client
                    </Badge>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Phone size={12} className="text-slate-400 shrink-0" />
                    <span className="truncate">{booking.customerPhone}</span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin size={12} className="text-slate-400 shrink-0" />
                    <span className="truncate">{booking.customerLocality}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-0.5">
                    <span className="truncate max-w-[170px] sm:max-w-[200px]">
                      Job: {booking.serviceTitle}
                    </span>
                    <span className="font-bold text-slate-900 shrink-0">₹{booking.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
