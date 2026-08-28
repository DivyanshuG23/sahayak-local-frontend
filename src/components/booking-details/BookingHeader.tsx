import React from "react";
import Link from "next/link";
import { BookingItem } from "@/data/mockBookings";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { HomeIcon, ChevronRight, Share2, Printer, Sparkles } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface BookingHeaderProps {
  booking: BookingItem;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({ booking }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation Bar */}
      <nav className="text-xs font-medium text-slate-500 print:hidden">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <Link href="/my-bookings" className="hover:text-blue-600 transition-colors">
            <span>My Bookings</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Booking #{booking.id}</span>
        </div>
      </nav>

      {/* Main Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-blue-50 text-blue-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200/60 uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} />
              <span>Service Reference</span>
            </span>
            <BookingStatusBadge status={booking.status} size="sm" />
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Booking Details
            </h1>
            <span className="text-slate-500 font-mono text-sm sm:text-base font-bold">
              #{booking.id}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Placed on <span className="text-slate-700 font-semibold">{booking.createdAt}</span>
          </p>
        </div>

        {/* Print / Share Quick Actions */}
        <div className="flex items-center gap-2 print:hidden shrink-0 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial rounded-xl text-xs font-bold text-slate-700 border-slate-200 hover:text-blue-600"
          >
            <Printer size={15} className="mr-1.5" />
            <span>Print Invoice</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
