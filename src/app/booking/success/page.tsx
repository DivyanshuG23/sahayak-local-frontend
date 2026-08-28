"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingSuccessDetails, BookingSuccessData } from "@/components/booking/BookingSuccessDetails";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import { HomeIcon, ChevronRight, CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Extract query parameters with realistic fallback values
  const bookingData: BookingSuccessData = {
    bookingId: searchParams.get("bookingId") || "SL-2026-00124",
    providerName: searchParams.get("provider") || "Sharma Electricals",
    providerVerified: true,
    serviceTitle: searchParams.get("service") || "AC Installation",
    date: searchParams.get("date") || "26 August 2026",
    timeSlot: searchParams.get("time") || "11:00 AM",
    location: searchParams.get("location") || "Indirapuram, Ghaziabad",
    totalAmount: searchParams.get("total") ? Number(searchParams.get("total")) : 519,
    status: searchParams.get("status") || "Confirmed",
    customerName: searchParams.get("name") || "Manoj Prajapati",
    customerPhone: searchParams.get("phone") || "+91 98765 43210",
  };

  const handleViewBooking = () => {
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activePage="services"
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
        <BookingSuccessDetails
          data={bookingData}
          onViewBookingDetails={handleViewBooking}
        />

      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer
          onOpenProviderModal={() => setIsProviderModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />
      </div>

      {/* View Booking Details Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Booking Summary
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    ID: {bookingData.bookingId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-semibold">Customer Name</span>
                  <span className="font-extrabold text-slate-900">{bookingData.customerName}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-semibold">Phone Contact</span>
                  <span className="font-bold text-slate-900">{bookingData.customerPhone}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-semibold">Provider</span>
                  <span className="font-bold text-blue-600">{bookingData.providerName}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-semibold">Service Package</span>
                  <span className="font-bold text-slate-900">{bookingData.serviceTitle}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-semibold">Date & Time</span>
                  <span className="font-bold text-slate-900">{bookingData.date} at {bookingData.timeSlot}</span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-slate-500 font-semibold">Address</span>
                  <span className="font-medium text-slate-800 text-right max-w-[220px]">{bookingData.location}</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200/80 flex items-center justify-between font-black">
                <span className="text-emerald-800">Total Payable Amount</span>
                <span className="text-lg text-emerald-700">₹{bookingData.totalAmount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={() => setShowDetailModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 rounded-xl"
              >
                Close Summary
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading Confirmation...</span>
          </div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
