import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { BookingStatusBadge } from "./BookingStatusBadge";
import {
  X,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  Printer,
  Download,
  Star,
  Building2,
  CheckCircle2,
  FileText
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface BookingDetailModalProps {
  booking: BookingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking?: (booking: BookingItem) => void;
  onRateReview?: (booking: BookingItem) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  isOpen,
  onClose,
  onCancelBooking,
  onRateReview
}) => {
  if (!isOpen || !booking) return null;

  const isUpcoming = booking.status === "Pending" || booking.status === "Confirmed";
  const isCompleted = booking.status === "Completed";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-start justify-between relative">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Booking Details
              </span>
              <BookingStatusBadge status={booking.status} size="sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              #{booking.id}
            </h2>
            <p className="text-xs text-slate-400">Booked on {booking.createdAt}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Provider Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={booking.providerImage}
                alt={booking.providerName}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{booking.providerName}</h4>
                  {booking.providerVerified && (
                    <ShieldCheck size={14} className="text-blue-600 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={12} fill="currentColor" /> {booking.rating}
                  </span>
                  <span>•</span>
                  <span>{booking.category}</span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${booking.providerPhone}`}
              className="px-3 py-2 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Phone size={14} />
              <span className="hidden sm:inline">Call Provider</span>
            </a>
          </div>

          {/* Service & Appointment Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Service Information
            </h3>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <h4 className="text-base font-extrabold text-slate-900">{booking.serviceTitle}</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Calendar size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400 font-medium">Scheduled Date & Time</span>
                    <span className="font-bold text-slate-900">{booking.date} ({booking.timeSlot})</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400 font-medium">Service Address</span>
                    <span className="font-bold text-slate-900">{booking.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Payment Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Customer Info
              </h4>
              <div className="text-xs text-slate-700 space-y-1 font-medium">
                <p><span className="text-slate-400">Name:</span> <strong className="text-slate-900">{booking.customerName}</strong></p>
                <p><span className="text-slate-400">Contact:</span> <strong className="text-slate-900">{booking.customerPhone}</strong></p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Payment Info
              </h4>
              <div className="text-xs text-slate-700 space-y-1 font-medium">
                <p><span className="text-slate-400">Method:</span> <strong className="text-slate-900">{booking.paymentMethod}</strong></p>
                <p><span className="text-slate-400">Status:</span> <strong className="text-emerald-600 font-bold">Confirmed / Payable</strong></p>
              </div>
            </div>
          </div>

          {/* Notes or Cancellation Reason */}
          {booking.notes && (
            <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200/60 text-xs text-blue-900 space-y-1">
              <span className="font-bold text-blue-950 block">Customer Instructions:</span>
              <p>{booking.notes}</p>
            </div>
          )}

          {booking.cancellationReason && (
            <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <span className="font-bold text-rose-950 block">Cancellation Reason:</span>
              <p>{booking.cancellationReason}</p>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Service Fee</span>
              <span>₹{booking.totalAmount - 20}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Safety & Convenience Fee</span>
              <span>₹20</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Local Special Discount</span>
              <span>-₹50</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount</span>
              <span className="text-blue-600">₹{booking.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="rounded-xl text-xs font-semibold text-slate-700 border-slate-300"
          >
            <Printer size={14} className="mr-1.5" />
            <span>Print Receipt</span>
          </Button>

          <div className="flex items-center gap-2">
            {isUpcoming && onCancelBooking && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClose();
                  onCancelBooking(booking);
                }}
                className="text-xs font-bold text-rose-600 hover:bg-rose-50"
              >
                Cancel Booking
              </Button>
            )}

            {isCompleted && onRateReview && !booking.userRating && (
              <Button
                size="sm"
                onClick={() => {
                  onClose();
                  onRateReview(booking);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl"
              >
                Rate & Review
              </Button>
            )}

            <Button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 rounded-xl"
            >
              Close Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
