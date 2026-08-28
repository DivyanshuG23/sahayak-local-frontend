import React, { useState } from "react";
import { BookingItem } from "@/data/mockBookings";
import { X, Check } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface CancelBookingModalProps {
  booking: BookingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (bookingId: string, reason: string) => void;
}

const CANCEL_REASONS = [
  "Change of plans / Schedule conflict",
  "Found alternative local provider",
  "Booked by mistake / duplicate booking",
  "Provider requested cancellation",
  "Need to reschedule to a later date",
  "Other reason"
];

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  booking,
  isOpen,
  onClose,
  onConfirmCancel
}) => {
  const [selectedReason, setSelectedReason] = useState(CANCEL_REASONS[0]);
  const [customReason, setCustomReason] = useState("");

  if (!isOpen || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = selectedReason === "Other reason" && customReason.trim()
      ? customReason
      : selectedReason;
    onConfirmCancel(booking.id, finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900">Cancel Booking</h3>
            <p className="text-xs text-slate-500">Booking ID: #{booking.id}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Info card */}
        <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4 text-xs text-rose-900 space-y-1">
          <p className="font-bold">Are you sure you want to cancel?</p>
          <p className="text-rose-700">
            Cancelling this booking will notify <strong>{booking.providerName}</strong>. You can re-book anytime from the services catalog.
          </p>
        </div>

        {/* Reason Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Reason for Cancellation
            </label>

            <div className="space-y-2">
              {CANCEL_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    selectedReason === reason
                      ? "bg-blue-50/80 border-blue-600 text-blue-900 font-bold"
                      : "border-slate-200/80 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "Other reason" && (
            <textarea
              rows={3}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Please elaborate on your reason..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs font-bold text-slate-700"
            >
              Keep Booking
            </Button>

            <Button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold px-5"
            >
              Confirm Cancellation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
