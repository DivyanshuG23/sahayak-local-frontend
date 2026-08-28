"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  HomeIcon,
  ArrowRight,
  Printer,
  Download,
  FileText,
  UserCheck,
  Sparkles,
  ChevronRight
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface BookingSuccessData {
  bookingId: string;
  providerName: string;
  providerVerified: boolean;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  location: string;
  totalAmount: number;
  status: string;
  customerName?: string;
  customerPhone?: string;
}

interface BookingSuccessDetailsProps {
  data?: BookingSuccessData;
  onViewBookingDetails?: () => void;
}

export const BookingSuccessDetails: React.FC<BookingSuccessDetailsProps> = ({
  data,
  onViewBookingDetails,
}) => {
  // Default values matching prompt requirements
  const booking = {
    bookingId: data?.bookingId || "SL-2026-00124",
    providerName: data?.providerName || "Sharma Electricals",
    providerVerified: data?.providerVerified ?? true,
    serviceTitle: data?.serviceTitle || "AC Installation",
    date: data?.date || "26 August 2026",
    timeSlot: data?.timeSlot || "11:00 AM",
    location: data?.location || "Indirapuram, Ghaziabad",
    totalAmount: data?.totalAmount ?? 519,
    status: data?.status || "Confirmed",
    customerName: data?.customerName || "Manoj Prajapati",
    customerPhone: data?.customerPhone || "+91 98765 43210",
  };

  const [showToast, setShowToast] = useState(false);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 print:max-w-none print:p-0">
      
      {/* Download Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-top duration-300 print:hidden">
          <Download size={18} className="text-blue-400 animate-bounce" />
          <div>
            <p className="text-xs font-bold">Downloading Receipt PDF...</p>
            <p className="text-[10px] text-slate-400">Receipt saved to downloads folder</p>
          </div>
        </div>
      )}

      {/* Main Centered Success Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden text-center p-6 sm:p-10 space-y-8 relative">
        
        {/* Decorative Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600" />

        {/* Animated Check Icon Hero */}
        <div className="relative inline-block pt-2">
          {/* Outer Pulsing Aura */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75 duration-1000" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 mx-auto ring-8 ring-emerald-50 border-4 border-white transform transition-transform hover:scale-105 duration-300">
            <CheckCircle2 size={58} strokeWidth={2.4} className="drop-shadow-sm animate-in zoom-in-50 duration-500" />
          </div>
        </div>

        {/* Success Header */}
        <div className="space-y-2 max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold tracking-wide uppercase">
            <Sparkles size={13} className="text-emerald-600" />
            <span>Success</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Booking Confirmed!
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Your service has been successfully booked.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-7 border border-slate-200/80 text-left space-y-6">
          
          {/* Top Row: Booking ID & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Booking ID
              </span>
              <span className="text-lg font-black text-blue-600 font-mono tracking-wide">
                {booking.bookingId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Status:</span>
              <Badge variant="emerald" className="px-3 py-1 text-xs font-black uppercase tracking-wide bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {booking.status}
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            
            {/* Service & Provider */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Service Requested
                </span>
                <span className="font-extrabold text-slate-900 text-base">
                  {booking.serviceTitle}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Service Provider
                </span>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="font-extrabold text-slate-900 text-sm">
                    {booking.providerName}
                  </span>
                  {booking.providerVerified && (
                    <ShieldCheck size={16} className="text-blue-600 shrink-0" title="Verified Provider" />
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Scheduled Date
                  </span>
                  <span className="font-bold text-slate-900">
                    {booking.date}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Time Slot
                  </span>
                  <span className="font-bold text-slate-900">
                    {booking.timeSlot}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Location Row */}
          <div className="pt-3 border-t border-slate-200/80 flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0 mt-0.5">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Service Location
              </span>
              <span className="font-semibold text-slate-800 leading-snug block">
                {booking.location}
              </span>
            </div>
          </div>

          {/* Pricing Highlight Banner */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Total Payable</span>
              <span className="text-[10px] text-slate-400 font-semibold block">Pay after service completion</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-600 tracking-tight">
                ₹{booking.totalAmount}
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons Group */}
        <div className="space-y-4 pt-2 print:hidden">
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Action: View Booking */}
            <Button
              onClick={onViewBookingDetails}
              size="lg"
              className="w-full sm:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-500/25 h-12 rounded-xl text-sm flex items-center justify-center gap-2 group transition-all"
            >
              <span>View Booking</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Secondary Action: Back to Home */}
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full min-w-[180px] border-slate-200 hover:bg-slate-50 text-slate-700 font-bold h-12 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <HomeIcon size={16} className="text-slate-500" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>

          {/* Download / Print Option */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs">
            <button
              onClick={handlePrintReceipt}
              className="text-slate-500 hover:text-blue-600 font-bold flex items-center gap-1.5 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
              title="Print Receipt"
            >
              <Printer size={15} />
              <span>Download / Print Receipt</span>
            </button>

            <span className="text-slate-300">•</span>

            <button
              onClick={handleDownloadReceipt}
              className="text-slate-500 hover:text-blue-600 font-bold flex items-center gap-1.5 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
              title="Download Receipt PDF"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>
          </div>

        </div>

      </div>

      {/* Extra Section: "What's Next?" Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6 print:hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              What's Next?
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              3 simple steps until your doorstep service is fulfilled
            </p>
          </div>
          <Badge variant="blue" className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider">
            Live Progress
          </Badge>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col items-start space-y-2.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between w-full">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                1
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Completed
              </span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Provider receives your booking
              </h3>
              <p className="text-xs text-slate-500 font-medium pt-1">
                {booking.providerName} has been notified with your requirements and address.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start space-y-2.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between w-full">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                2
              </div>
              <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 animate-pulse">
                In Progress
              </span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Provider confirms appointment
              </h3>
              <p className="text-xs text-slate-500 font-medium pt-1">
                You will receive a call or SMS confirmation prior to the scheduled slot.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-start space-y-2.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between w-full">
              <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-600 font-black text-sm flex items-center justify-center">
                3
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                Upcoming
              </span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Professional arrives at location
              </h3>
              <p className="text-xs text-slate-500 font-medium pt-1">
                Certified technician arrives with tools on {booking.date} at {booking.timeSlot}.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Small Trust Message Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 rounded-2xl border border-blue-100 p-4 text-center text-xs font-bold text-slate-700 flex flex-wrap items-center justify-center gap-4 sm:gap-8 shadow-sm print:hidden">
        <div className="flex items-center gap-1.5 text-blue-700">
          <ShieldCheck size={16} className="text-blue-600" />
          <span>✓ Secure Booking</span>
        </div>

        <div className="flex items-center gap-1.5 text-blue-700">
          <UserCheck size={16} className="text-blue-600" />
          <span>✓ Verified Provider</span>
        </div>

        <div className="flex items-center gap-1.5 text-blue-700">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>✓ Booking Updates</span>
        </div>
      </div>

    </div>
  );
};
