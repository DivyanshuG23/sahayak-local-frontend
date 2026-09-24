"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBookingById, INITIAL_BOOKINGS, BookingItem } from "@/data/mockBookings";

import { BookingHeader } from "@/components/booking-details/BookingHeader";
import { BookingTimeline } from "@/components/booking-details/BookingTimeline";
import { ProviderCard } from "@/components/booking-details/ProviderCard";
import { ServiceInfoCard } from "@/components/booking-details/ServiceInfoCard";
import { ScheduleInfoCard } from "@/components/booking-details/ScheduleInfoCard";
import { LocationCard } from "@/components/booking-details/LocationCard";
import { BookingSummaryCard } from "@/components/booking-details/BookingSummaryCard";
import { BookingActionsCard } from "@/components/booking-details/BookingActionsCard";
import { HelpSupportCard } from "@/components/booking-details/HelpSupportCard";

import { CancelBookingModal } from "@/components/bookings/CancelBookingModal";
import { ReviewModal } from "@/components/bookings/ReviewModal";
import { ContactProviderModal } from "@/components/booking-details/ContactProviderModal";
import { ReportIssueModal } from "@/components/booking-details/ReportIssueModal";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";

import { CheckCircle2 } from "@/components/icons/Icons";

function BookingDetailsContent() {
  const router = useRouter();
  const params = useParams();

  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const bookingId = rawId || "SL-2026-00124";

  // State management
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [booking, setBooking] = useState<BookingItem>(() => {
    return getBookingById ? getBookingById(bookingId) : INITIAL_BOOKINGS[0];
  });

  useEffect(() => {
    if (bookingId && getBookingById) {
      setBooking(getBookingById(bookingId));
    }
  }, [bookingId]);

  // Platform modals
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Detail action modals
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Modal Handlers
  const handleConfirmCancel = (id: string, reason: string) => {
    setBooking((prev) => ({
      ...prev,
      status: "Cancelled",
      cancellationReason: reason
    }));
    showToast(`Booking #${id} has been cancelled successfully.`);
  };

  const handleSubmitReview = (id: string, rating: number, comment: string) => {
    setBooking((prev) => ({
      ...prev,
      userRating: rating,
      userReview: comment
    }));
    showToast(`Thank you! Review submitted for Booking #${id}.`);
  };

  const handleSubmitIssue = (issueType: string, description: string) => {
    showToast(`Support ticket created for issue: "${issueType}".`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activePage="my-bookings"
        isLoggedIn={true}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        {/* Header & Breadcrumbs */}
        <BookingHeader booking={booking} />

        {/* 4-Step Status Timeline */}
        <BookingTimeline
          status={booking.status}
          date={booking.date}
          timeSlot={booking.timeSlot}
        />

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column (2 Cols wide on Desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Card */}
            <ProviderCard
              booking={booking}
              onContactProvider={() => setIsContactModalOpen(true)}
            />

            {/* Service Information */}
            <ServiceInfoCard booking={booking} />

            {/* Appointment Schedule */}
            <ScheduleInfoCard booking={booking} />

            {/* Service Location & Map */}
            <LocationCard booking={booking} />
          </div>

          {/* Right Column (1 Col wide on Desktop) */}
          <div className="space-y-6 sticky top-24">
            {/* Booking Summary */}
            <BookingSummaryCard booking={booking} />

            {/* Action Buttons */}
            <BookingActionsCard
              booking={booking}
              onContactProvider={() => setIsContactModalOpen(true)}
              onCancelBooking={() => setIsCancelModalOpen(true)}
              onRateReview={() => setIsReviewModalOpen(true)}
              onBookAgain={() => router.push("/services")}
            />

            {/* Need Help? */}
            <HelpSupportCard
              onContactSupport={() => setIsContactModalOpen(true)}
              onReportIssue={() => setIsReportModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Action Modals */}
      <CancelBookingModal
        booking={booking}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />

      <ReviewModal
        booking={booking}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      <ContactProviderModal
        booking={booking}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ReportIssueModal
        booking={booking}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitIssue={handleSubmitIssue}
      />

      {/* Platform Modals */}
      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSuccess={(bName) => showToast(`Registered "${bName}" successfully!`)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(userName) => showToast(`Welcome back, ${userName}!`)}
      />
    </div>
  );
}

export default function BookingDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading Booking Details...</span>
          </div>
        </div>
      }
    >
      <BookingDetailsContent />
    </Suspense>
  );
}
