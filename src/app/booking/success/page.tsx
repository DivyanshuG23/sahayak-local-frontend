"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingSuccessDetails, BookingSuccessData } from "@/components/booking/BookingSuccessDetails";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import { HomeIcon, ChevronRight, CheckCircle2 } from "@/components/icons/Icons";
import { useGetBookingByIdQuery } from "@/services/booking.service";
import { useAppSelector } from "@/store/hooks";

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAppSelector((state) => state.auth);

  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const rawBookingId = searchParams.get("bookingId") || "";

  // Live Query from backend
  const { data: liveBookingData } = useGetBookingByIdQuery(rawBookingId, {
    skip: !rawBookingId,
  });

  const b = liveBookingData?.data;

  // Extract live booking details or query params passed from booking flow
  const bookingData: BookingSuccessData = useMemo(() => {
    if (b) {
      return {
        bookingId: b.bookingId || b._id || rawBookingId,
        providerName:
          b.providerId?.businessName ||
          b.providerId?.ownerName ||
          searchParams.get("provider") ||
          "Assigned Technician",
        providerVerified: true,
        serviceTitle:
          b.serviceSnapshot?.name ||
          searchParams.get("service") ||
          "Doorstep Service",
        date: b.bookingDate
          ? new Date(b.bookingDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : searchParams.get("date") || "Scheduled Date",
        timeSlot: b.timeSlot || searchParams.get("time") || "Scheduled Slot",
        location: b.addressSnapshot
          ? `${b.addressSnapshot.houseFlatNo || ""}, ${b.addressSnapshot.city || ""}`.replace(/^,\s*/, "")
          : searchParams.get("location") || "Customer Address",
        totalAmount:
          b.totalAmount ||
          (searchParams.get("total") ? Number(searchParams.get("total")) : 0),
        status: b.status || searchParams.get("status") || "Confirmed",
        customerName:
          b.addressSnapshot?.contactPersonName ||
          searchParams.get("name") ||
          auth.user?.fullName ||
          "",
        customerPhone:
          b.addressSnapshot?.contactPhone ||
          searchParams.get("phone") ||
          auth.user?.phone ||
          "",
      };
    }

    return {
      bookingId: rawBookingId,
      providerName: searchParams.get("provider") || "Assigned Technician",
      providerVerified: true,
      serviceTitle: searchParams.get("service") || "Doorstep Service",
      date: searchParams.get("date") || "Scheduled Date",
      timeSlot: searchParams.get("time") || "Scheduled Slot",
      location: searchParams.get("location") || "Customer Address",
      totalAmount: searchParams.get("total") ? Number(searchParams.get("total")) : 0,
      status: searchParams.get("status") || "Confirmed",
      customerName: searchParams.get("name") || auth.user?.fullName || "",
      customerPhone: searchParams.get("phone") || auth.user?.phone || "",
    };
  }, [b, rawBookingId, searchParams, auth.user]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activePage="services"
        isLoggedIn={auth.isAuthenticated}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Breadcrumb Bar */}
      <nav className="bg-white border-b border-slate-200/60 py-3 px-4 sm:px-6 lg:px-8 text-xs font-medium text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <Link href="/services" className="hover:text-blue-600 transition-colors">
            <span>Services</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <Link href="/booking" className="hover:text-blue-600 transition-colors">
            <span>Booking</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Confirmation</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Booking Success Main Section */}
        <BookingSuccessDetails data={bookingData} />
      </main>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Shared Modals */}
      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSuccess={() => {}}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {}}
      />
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500 text-sm font-bold">
          Loading Booking Confirmation...
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
