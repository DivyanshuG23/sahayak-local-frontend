import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { X, Phone, MessageSquare, ShieldCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ContactProviderModalProps {
  booking: BookingItem;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactProviderModal: React.FC<ContactProviderModalProps> = ({
  booking,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900">Contact Partner</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Partner Card info */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3.5">
          <img
            src={booking.providerImage}
            alt={booking.providerName}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-slate-900 text-sm">{booking.providerName}</h4>
              <ShieldCheck size={14} className="text-blue-600 shrink-0" />
            </div>
            <p className="text-xs text-slate-500">{booking.providerPhone}</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`tel:${booking.providerPhone}`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-12 rounded-2xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2.5 transition-colors"
          >
            <Phone size={18} />
            <span>Call Partner Directly ({booking.providerPhone})</span>
          </a>

          <a
            href={`https://wa.me/${booking.providerPhone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-12 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-colors"
          >
            <MessageSquare size={18} />
            <span>Chat via WhatsApp</span>
          </a>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
