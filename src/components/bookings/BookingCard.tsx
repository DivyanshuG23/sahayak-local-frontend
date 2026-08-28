import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookingItem } from "@/data/mockBookings";
import { BookingStatusBadge } from "./BookingStatusBadge";
import {
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  FileText,
  X,
  RotateCcw
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  booking: BookingItem;
  onViewDetails: (booking: BookingItem) => void;
  onCancelBooking?: (booking: BookingItem) => void;
  onRateReview?: (booking: BookingItem) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onViewDetails,
  onCancelBooking,
  onRateReview
}) => {
  const isUpcoming = booking.status === "Pending" || booking.status === "Confirmed";
  const isCompleted = booking.status === "Completed";
  const isCancelled = booking.status === "Cancelled";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      {/* Top Header: Provider Info & Status */}
      <div className="p-5 sm:p-6 border-b border-slate-100 space-y-4">
        <div className="flex items-start justify-between gap-3">
          {/* Provider Avatar & Info */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/70 shadow-xs">
              <img
                src={booking.providerImage}
                alt={booking.providerName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {booking.providerName}
                </h4>
                {booking.providerVerified && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full border border-blue-200/60">
                    <ShieldCheck size={11} className="text-blue-600 shrink-0" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={13} fill="currentColor" />
                  <span>{booking.rating}</span>
                </div>
                <span>•</span>
                <span className="text-slate-500 font-medium">{booking.category}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="shrink-0">
            <BookingStatusBadge status={booking.status} size="sm" />
          </div>
        </div>

        {/* Service Title & Booking ID */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Booking ID: #{booking.id}</span>
            <span className="text-slate-400 text-[11px]">Booked on {booking.createdAt}</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            {booking.serviceTitle}
          </h3>
        </div>
      </div>

      {/* Middle Details: Schedule, Location & Price */}
      <div className="p-5 sm:p-6 bg-slate-50/50 space-y-3 text-xs sm:text-sm text-slate-600 font-medium border-b border-slate-100 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Date & Time Slot */}
          <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60">
            <Calendar size={16} className="text-blue-600 shrink-0" />
            <div className="truncate">
              <span className="block font-bold text-slate-900 text-xs">{booking.date}</span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock size={10} className="inline shrink-0" />
                {booking.timeSlot}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60">
            <MapPin size={16} className="text-blue-600 shrink-0" />
            <div className="truncate">
              <span className="block font-bold text-slate-900 text-xs">Location</span>
              <span className="text-[11px] text-slate-500 truncate block" title={booking.location}>
                {booking.location}
              </span>
            </div>
          </div>
        </div>

        {/* Total Amount Payable */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-slate-500">Total Payable</span>
          <span className="text-lg font-extrabold text-slate-900">₹{booking.totalAmount}</span>
        </div>

        {/* User Review Display if already reviewed */}
        {booking.userRating && (
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1 font-bold text-amber-800">
              <Star size={12} className="text-amber-500" fill="currentColor" />
              <span>Your Rating: {booking.userRating} / 5</span>
            </div>
            {booking.userReview && <p className="text-[11px] italic text-amber-900/90">&ldquo;{booking.userReview}&rdquo;</p>}
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-2.5 bg-white">
        {/* View Details Button */}
        <Link href={`/my-bookings/${booking.id}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-300 border-slate-200"
          >
            <FileText size={14} className="mr-1.5 text-slate-400" />
            <span>View Details</span>
          </Button>
        </Link>

        {/* Action button based on booking status */}
        {isUpcoming && onCancelBooking && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancelBooking(booking)}
            className="rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <X size={14} className="mr-1" />
            <span>Cancel</span>
          </Button>
        )}

        {isCompleted && onRateReview && !booking.userRating && (
          <Button
            size="sm"
            onClick={() => onRateReview(booking)}
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
          >
            <Star size={13} fill="currentColor" />
            <span>Rate & Review</span>
          </Button>
        )}

        {(isCompleted || isCancelled) && (
          <Link href="/services">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 border-blue-200"
            >
              <RotateCcw size={13} className="mr-1" />
              <span>Book Again</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
