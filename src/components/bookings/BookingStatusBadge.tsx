import React from "react";
import { BookingStatus } from "@/data/mockBookings";
import { Clock, CheckCircle2, ShieldCheck, X } from "@/components/icons/Icons";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  status,
  className = "",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] gap-1 font-semibold",
    md: "px-2.5 py-1 text-xs gap-1.5 font-bold",
    lg: "px-3.5 py-1.5 text-sm gap-2 font-bold"
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  switch (status) {
    case "Pending":
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs ${sizeClasses[size]} ${className}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <Clock size={iconSizes[size]} className="text-amber-600 shrink-0" />
          <span>Pending</span>
        </span>
      );

    case "Confirmed":
      return (
        <span
          className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs ${sizeClasses[size]} ${className}`}
        >
          <ShieldCheck size={iconSizes[size]} className="text-blue-600 shrink-0" />
          <span>Confirmed</span>
        </span>
      );

    case "Completed":
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs ${sizeClasses[size]} ${className}`}
        >
          <CheckCircle2 size={iconSizes[size]} className="text-emerald-600 shrink-0" />
          <span>Completed</span>
        </span>
      );

    case "Cancelled":
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 shadow-xs ${sizeClasses[size]} ${className}`}
        >
          <X size={iconSizes[size]} className="text-rose-600 shrink-0" />
          <span>Cancelled</span>
        </span>
      );

    default:
      return null;
  }
};
