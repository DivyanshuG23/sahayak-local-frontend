"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, Clock, MapPin, Phone, ShieldCheck, HomeIcon, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    bookingId: string;
    providerName: string;
    serviceTitle: string;
    date: string;
    timeSlot: string;
    address: string;
    totalAmount: number;
    customerPhone: string;
  };
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-center p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
        
        {/* Animated Success Badge */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-100 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 size={44} strokeWidth={2.5} />
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <span className="text-xs font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Booking Confirmed!
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight pt-2">
            Your Doorstep Service is Scheduled
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Booking Reference ID: <span className="font-extrabold text-blue-600 font-mono">{bookingDetails.bookingId}</span>
          </p>
        </div>

        {/* Booking Card Details */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-3 text-xs">
          
          <div className="flex justify-between items-start border-b border-slate-200/60 pb-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Provider</span>
              <span className="font-extrabold text-slate-900 text-sm">{bookingDetails.providerName}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Service</span>
              <span className="font-bold text-blue-600 text-sm">{bookingDetails.serviceTitle}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Date</span>
                <span className="font-bold text-slate-800">{bookingDetails.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={15} className="text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Time Slot</span>
                <span className="font-bold text-slate-800">{bookingDetails.timeSlot}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
            <MapPin size={15} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Service Location</span>
              <span className="font-medium text-slate-800 line-clamp-2">{bookingDetails.address}</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200/60 font-black">
            <span className="text-slate-600">Total Price Payable (After Service)</span>
            <span className="text-lg text-emerald-600">₹{bookingDetails.totalAmount}</span>
          </div>

        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 text-blue-800 text-xs font-semibold p-3.5 rounded-xl border border-blue-100 flex items-center justify-center gap-2">
          <Phone size={15} className="text-blue-600 shrink-0" />
          <span>Technician will call {bookingDetails.customerPhone} 30 mins before arrival.</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/booking/success?bookingId=${bookingDetails.bookingId}&service=${encodeURIComponent(bookingDetails.serviceTitle)}&provider=${encodeURIComponent(bookingDetails.providerName)}&date=${encodeURIComponent(bookingDetails.date)}&time=${encodeURIComponent(bookingDetails.timeSlot)}&location=${encodeURIComponent(bookingDetails.address)}&total=${bookingDetails.totalAmount}`}
            className="flex-1"
          >
            <Button
              size="lg"
              className="w-full py-3 text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md gap-2 cursor-pointer"
            >
              <span>View Full Confirmation</span>
              <ArrowRight size={16} />
            </Button>
          </Link>

          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full py-3 text-xs font-extrabold text-slate-700 rounded-xl border-slate-200 hover:bg-slate-50 gap-2 cursor-pointer"
            >
              <HomeIcon size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
};
