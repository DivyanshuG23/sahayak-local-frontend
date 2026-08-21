"use client";

import React, { useState } from "react";
import { ServiceProvider } from "../../data/mockData";
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  UserCheck
} from "../icons/Icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ServiceDetailModalProps {
  provider: ServiceProvider | null;
  onClose: () => void;
  onBookSuccess: (providerName: string, date: string, time: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  provider,
  onClose,
  onBookSuccess
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM - 12:00 PM");
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  if (!provider) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      onBookSuccess(provider.name, selectedDate, selectedTime);
      setBookingConfirmed(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={provider.imageUrl}
            alt={provider.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full border-none"
          >
            <X size={18} />
          </Button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 border-none">
                {provider.category}
              </Badge>
              {provider.verified && (
                <Badge variant="emerald" className="text-[10px] uppercase font-bold px-2 py-0.5 gap-1">
                  <ShieldCheck size={12} /> Verified
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-extrabold">{provider.name}</h2>
            <p className="text-xs text-slate-300">
              Owned by {provider.ownerName} • {provider.experienceYears} Years Experience
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-base">
                <Star size={16} className="fill-amber-500" />
                <span>{provider.rating}</span>
              </div>
              <div className="text-[11px] text-slate-500">{provider.reviewCount} Reviews</div>
            </div>

            <div className="border-x border-slate-200">
              <div className="text-base font-extrabold text-slate-900">{provider.distanceKm} km</div>
              <div className="text-[11px] text-slate-500">{provider.locality}</div>
            </div>

            <div>
              <div className="text-base font-extrabold text-emerald-600">₹{provider.startingPrice}</div>
              <div className="text-[11px] text-slate-500">Starting Price</div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">About Business</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{provider.about}</p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Highlights & Guarantees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {provider.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Card / Pricing Items Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Rate Card & Pricing</h3>
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-200/60">
              {provider.pricingItems.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">₹{item.price}</span>
                    <span className="text-[10px] text-slate-500 block">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar size={18} className="text-blue-600" />
                <span>Book Service Appointment</span>
              </h3>
              <Badge variant="emerald" className="text-[11px] font-semibold px-2 py-0.5">
                No Payment Required Now
              </Badge>
            </div>

            {bookingConfirmed ? (
              <div className="bg-emerald-500 text-white p-4 rounded-xl text-center space-y-1 animate-in zoom-in-95 shadow-md">
                <div className="text-lg font-bold">Booking Confirmed! 🎉</div>
                <p className="text-xs">
                  {provider.name} will contact you shortly to confirm doorstep arrival.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2.5"
                    >
                      <option value="Today">Today (Preferred)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="In 2 Days">In 2 Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Time Slot</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2.5"
                    >
                      <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2.5"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl shadow-md gap-2"
                >
                  <UserCheck size={16} />
                  <span>Confirm Slot & Book Now</span>
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

