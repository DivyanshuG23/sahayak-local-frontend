import React from "react";
import { BookingStatus } from "@/data/mockBookings";
import { Check, Clock, Calendar, ShieldCheck, CheckCircle2, X } from "@/components/icons/Icons";

interface BookingTimelineProps {
  status: BookingStatus;
  date: string;
  timeSlot: string;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({
  status,
  date,
  timeSlot
}) => {
  const getStepState = (stepIndex: number) => {
    if (status === "Cancelled") {
      if (stepIndex === 0) return "completed";
      return "cancelled";
    }

    if (status === "Pending") {
      if (stepIndex === 0) return "completed";
      if (stepIndex === 1) return "active";
      return "upcoming";
    }

    if (status === "Confirmed") {
      if (stepIndex === 0 || stepIndex === 1) return "completed";
      if (stepIndex === 2) return "active";
      return "upcoming";
    }

    if (status === "Completed") {
      return "completed";
    }

    return "upcoming";
  };

  const steps = [
    {
      title: "Booking Placed",
      desc: "Order confirmed by customer",
      time: "Step 1"
    },
    {
      title: "Provider Confirmed",
      desc: "Technician assigned & verified",
      time: "Step 2"
    },
    {
      title: "Service Scheduled",
      desc: `${date} (${timeSlot})`,
      time: "Step 3"
    },
    {
      title: "Service Completed",
      desc: "Quality verified & invoice closed",
      time: "Step 4"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Booking Status Timeline
          </h3>
          <p className="text-xs text-slate-500">Live progress tracking for your booking</p>
        </div>

        {status === "Cancelled" ? (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Booking Cancelled
          </span>
        ) : (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Current Status: {status}
          </span>
        )}
      </div>

      {/* Responsive Horizontal/Vertical Steps Indicator */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const state = getStepState(idx);
          const isCompleted = state === "completed";
          const isActive = state === "active";
          const isCancelled = state === "cancelled";

          return (
            <div key={step.title} className="relative flex flex-row sm:flex-col items-start gap-3 sm:gap-2 group">
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div
                  className={`hidden sm:block absolute top-4 left-1/2 right-0 h-0.5 z-0 ${
                    getStepState(idx + 1) === "completed" || getStepState(idx + 1) === "active"
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                  style={{ width: "100%" }}
                />
              )}

              {/* Icon Circle Badge */}
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-300 ${
                  isCompleted
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : isActive
                    ? "bg-amber-500 text-white ring-4 ring-amber-100 shadow-md animate-pulse"
                    : isCancelled
                    ? "bg-slate-100 text-slate-400 border border-slate-200"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : isActive ? (
                  <Clock size={18} strokeWidth={2.5} />
                ) : isCancelled ? (
                  <X size={16} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Text Information */}
              <div className="space-y-0.5">
                <h4
                  className={`text-xs sm:text-sm font-extrabold leading-tight ${
                    isCompleted || isActive ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-snug">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
