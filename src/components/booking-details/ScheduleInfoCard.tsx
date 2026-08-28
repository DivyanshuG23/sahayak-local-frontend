import React from "react";
import { BookingItem } from "@/data/mockBookings";
import { Calendar, Clock, Bell, CheckCircle2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ScheduleInfoCardProps {
  booking: BookingItem;
}

export const ScheduleInfoCard: React.FC<ScheduleInfoCardProps> = ({ booking }) => {
  const handleAddToCalendar = () => {
    alert(`Reminder for ${booking.serviceTitle} on ${booking.date} (${booking.timeSlot}) added to your calendar!`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Appointment Schedule
        </h3>
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <CheckCircle2 size={13} className="text-emerald-500" /> Slot Confirmed
        </span>
      </div>

      <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
            <Calendar size={22} />
          </div>
          <div>
            <span className="block text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Date & Time Slot
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
              {booking.date}
            </h4>
            <p className="text-xs font-bold text-slate-600 flex items-center gap-1 mt-0.5">
              <Clock size={13} className="text-blue-600" />
              <span>{booking.timeSlot}</span>
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleAddToCalendar}
          className="w-full sm:w-auto rounded-xl text-xs font-bold text-slate-700 bg-white hover:text-blue-600 border-blue-200"
        >
          <Bell size={14} className="mr-1.5 text-blue-600" />
          <span>Add Reminder</span>
        </Button>
      </div>

      {booking.notes && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 font-medium">
          <strong className="text-slate-900 block font-bold mb-0.5">Customer Instructions:</strong>
          <p className="italic text-slate-500">&ldquo;{booking.notes}&rdquo;</p>
        </div>
      )}
    </div>
  );
};
