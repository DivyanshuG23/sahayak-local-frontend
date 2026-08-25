"use client";

import React, { useState } from "react";
import { ServiceItemData } from "./ServiceList";
import { Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from "@/components/icons/Icons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookingCardProps {
  selectedService: ServiceItemData;
  providerName: string;
  onContinueBooking: (date: string, time: string, address: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  selectedService,
  providerName,
  onContinueBooking,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:00 AM - 1:00 PM");
  const [address, setAddress] = useState<string>("Indirapuram, Ghaziabad");

  const dates = [
    { label: "Today", sub: "Aug 25" },
    { label: "Tomorrow", sub: "Aug 26" },
    { label: "Thu", sub: "Aug 27" },
  ];

  const slots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinueBooking(selectedDate, selectedSlot, address);
  };

  return (
    <Card className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 space-y-6 sticky top-24">
      
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <Badge variant="emerald" className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-extrabold mb-1">
            Instant Confirmation
          </Badge>
          <h3 className="text-xl font-black text-slate-900">Book This Service</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 font-medium">Est. Price</div>
          <div className="text-2xl font-black text-blue-600">₹{selectedService.price}</div>
        </div>
      </div>

      {/* Selected Service Box */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs text-blue-700 font-bold">Selected Item</div>
          <div className="text-sm font-extrabold text-slate-900">{selectedService.title}</div>
        </div>
        <div className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-blue-100">
          ₹{selectedService.price}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
            <Calendar size={14} className="text-blue-600" />
            <span>Select Date</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {dates.map((d) => {
              const isSelected = selectedDate === d.label;
              return (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setSelectedDate(d.label)}
                  className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-blue-600 text-white font-bold border-blue-600 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                  }`}
                >
                  <div className="text-xs font-bold">{d.label}</div>
                  <div className={`text-[10px] ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    {d.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
            <Clock size={14} className="text-blue-600" />
            <span>Select Preferred Time Slot</span>
          </label>
          <div className="space-y-1.5">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full py-2.5 px-3 rounded-xl text-left transition-all text-xs flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-bold border-blue-300"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 font-medium"
                  }`}
                >
                  <span>{slot}</span>
                  {isSelected && <CheckCircle2 size={15} className="text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Address Location */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
            <MapPin size={14} className="text-emerald-600" />
            <span>Service Address</span>
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House/Flat No., Locality, City"
            className="w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Price Summary Breakdown */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Base Service Charge</span>
            <span className="font-semibold text-slate-900">₹{selectedService.price}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Inspection & Safety Fee</span>
            <span className="font-bold text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Advance Payment Required</span>
            <span className="font-bold text-slate-900">₹0 (Pay After Work)</span>
          </div>
          <hr className="border-slate-200 my-1" />
          <div className="flex justify-between text-sm font-black text-slate-900 pt-1">
            <span>Estimated Total</span>
            <span className="text-blue-600">₹{selectedService.price}</span>
          </div>
        </div>

        {/* Submit Primary CTA */}
        <Button
          type="submit"
          size="lg"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-600/30 gap-2 cursor-pointer"
        >
          <span>Continue to Booking</span>
          <ArrowRight size={18} />
        </Button>

        {/* Guarantees Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium text-center">
          <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
          <span>Free cancellation before provider arrival</span>
        </div>

      </form>

    </Card>
  );
};
