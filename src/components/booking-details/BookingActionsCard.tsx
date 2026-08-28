import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { Phone, X, Star, RotateCcw } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface BookingActionsCardProps {
  booking: BookingItem;
  onContactProvider: () => void;
  onCancelBooking: () => void;
  onRateReview: () => void;
  onBookAgain: () => void;
}

export const BookingActionsCard: React.FC<BookingActionsCardProps> = ({
  booking,
  onContactProvider,
  onCancelBooking,
  onRateReview,
  onBookAgain
}) => {
  const isUpcoming = booking.status === "Pending" || booking.status === "Confirmed";
  const isCompleted = booking.status === "Completed";
  const isCancelled = booking.status === "Cancelled";

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
        Manage Booking
      </h3>

      {/* Primary Action Button */}
      {isUpcoming && (
        <>
          <Button
            onClick={onContactProvider}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            <Phone size={16} />
            <span>Contact Provider</span>
          </Button>

          <Button
            variant="outline"
            onClick={onCancelBooking}
            className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-1.5"
          >
            <X size={15} />
            <span>Cancel Booking</span>
          </Button>
        </>
      )}

      {isCompleted && (
        <>
          {!booking.userRating ? (
            <Button
              onClick={onRateReview}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs h-11 rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Star size={16} fill="currentColor" />
              <span>Rate & Review Service</span>
            </Button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 font-semibold text-center">
              ✓ Reviewed ({booking.userRating} / 5 Stars)
            </div>
          )}

          <Button
            variant="outline"
            onClick={onBookAgain}
            className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-1.5"
          >
            <RotateCcw size={15} />
            <span>Book Again</span>
          </Button>
        </>
      )}

      {isCancelled && (
        <Button
          onClick={onBookAgain}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          <span>Re-book Service</span>
        </Button>
      )}
    </div>
  );
};
