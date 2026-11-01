"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingItem } from "@/data/mockBookings";
import { Button } from "@/components/ui/button";

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

import { CheckCircle2, RotateCcw } from "@/components/icons/Icons";
import { useAppSelector } from "@/store/hooks";
import {
  useGetBookingByIdQuery,
  useCancelBookingMutation,
} from "@/services/booking.service";
import {
  useGetBookingBillQuery,
  useSubmitUpiPaymentMutation,
} from "@/services/payment.service";
import { useCreateReviewMutation } from "@/services/review.service";
import { mapBackendBookingToUi } from "@/lib/apiAdapters";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getApiErrorMessage } from "@/lib/errorUtils";

function BookingDetailsContent() {
  const router = useRouter();
  const params = useParams();

  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const bookingId = rawId || "";

  // Auth State
  const auth = useAppSelector((state) => state.auth);

  // Live Backend Queries & Mutations
  const {
    data: liveBookingData,
    isLoading: isBookingLoading,
    refetch: refetchBooking,
  } = useGetBookingByIdQuery(bookingId, {
    skip: !bookingId,
  });

  const { data: billData } = useGetBookingBillQuery(bookingId, {
    skip: !bookingId,
  });

  const [cancelBookingApi] = useCancelBookingMutation();
  const [createReviewApi] = useCreateReviewMutation();
  const [submitUpiPaymentApi] = useSubmitUpiPaymentMutation();

  // State management
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");

  // Map Live Booking Data strictly from Backend
  const booking: BookingItem | null = useMemo(() => {
    if (liveBookingData?.data) {
      return mapBackendBookingToUi(liveBookingData.data);
    }
    return null;
  }, [liveBookingData]);

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

  // Live Modal Handlers
  const handleConfirmCancel = async (id: string, reason: string) => {
    try {
      await cancelBookingApi({ id, reason }).unwrap();
      showToast(`Booking #${id} has been cancelled successfully.`);
      refetchBooking();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, `Booking #${id} cancellation recorded.`));
    }
  };

  const handleSubmitReview = async (
    id: string,
    rating: number,
    comment: string
  ) => {
    try {
      await createReviewApi({
        bookingId: id,
        serviceId: booking?.category || "67243c98f5b8e91234567890",
        providerId: "67243c98f5b8e91234567891",
        rating,
        comment,
      }).unwrap();
      showToast(`Thank you! Review submitted for Booking #${id}.`);
      refetchBooking();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, `Review submitted for Booking #${id}.`));
    }
  };

  const handleSubmitIssue = (issueType: string, description: string) => {
    showToast(`Support ticket created for issue: "${issueType}".`);
  };

  if (isBookingLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-800">Fetching Booking #{bookingId}...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <RotateCcw size={24} />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Booking Not Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Could not find any booking with reference ID #{bookingId}.
            </p>
          </div>
          <Button
            onClick={() => router.push("/my-bookings")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
          >
            Back to My Bookings
          </Button>
        </div>
      </div>
    );
  }

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
        isLoggedIn={auth.isAuthenticated}
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
      <ProtectedRoute>
        <BookingDetailsContent />
      </ProtectedRoute>
    </Suspense>
  );
}
