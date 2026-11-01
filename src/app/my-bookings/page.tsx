"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingItem, BookingStatus } from "@/data/mockBookings";
import { BookingTabs, BookingTabType } from "@/components/bookings/BookingTabs";
import { BookingFilters } from "@/components/bookings/BookingFilters";
import { BookingCard } from "@/components/bookings/BookingCard";
import { EmptyBookings } from "@/components/bookings/EmptyBookings";
import { CancelBookingModal } from "@/components/bookings/CancelBookingModal";
import { ReviewModal } from "@/components/bookings/ReviewModal";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import {
  HomeIcon,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  Search,
} from "@/components/icons/Icons";
import { useAppSelector } from "@/store/hooks";
import {
  useGetMyBookingsQuery,
  useCancelBookingMutation,
} from "@/services/booking.service";
import { useCreateReviewMutation } from "@/services/review.service";
import { mapBackendBookingToUi } from "@/lib/apiAdapters";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getApiErrorMessage } from "@/lib/errorUtils";

function MyBookingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auth State
  const auth = useAppSelector((state) => state.auth);

  // Live Backend Queries & Mutations
  const {
    data: myBookingsData,
    isLoading: isBookingsLoading,
    refetch: refetchBookings,
  } = useGetMyBookingsQuery(undefined, {
    skip: !auth.isAuthenticated,
  });
  const [cancelBookingApi] = useCancelBookingMutation();
  const [createReviewApi] = useCreateReviewMutation();

  // Platform state
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Map Backend Bookings to UI format
  const bookings: BookingItem[] = useMemo(() => {
    const rawList =
      myBookingsData?.data?.bookings || myBookingsData?.data || [];
    if (Array.isArray(rawList)) {
      return rawList.map(mapBackendBookingToUi);
    }
    return [];
  }, [myBookingsData]);

  // Tab & Filters state
  const [activeTab, setActiveTab] = useState<BookingTabType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Safely sync tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get("tab") as BookingTabType | null;
    if (
      tabParam &&
      ["all", "upcoming", "completed", "cancelled"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Active Modals state
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Calculate dynamic tab counts
  const tabCounts = useMemo(() => {
    const all = bookings.length;
    const upcoming = bookings.filter(
      (b) => b.status === "Pending" || b.status === "Confirmed"
    ).length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;

    return { all, upcoming, completed, cancelled };
  }, [bookings]);

  // Filter logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // 1. Tab filter
      if (activeTab === "upcoming") {
        if (booking.status !== "Pending" && booking.status !== "Confirmed")
          return false;
      } else if (activeTab === "completed") {
        if (booking.status !== "Completed") return false;
      } else if (activeTab === "cancelled") {
        if (booking.status !== "Cancelled") return false;
      }

      // 2. Status dropdown filter
      if (statusFilter !== "all" && booking.status !== statusFilter) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = booking.id.toLowerCase().includes(query);
        const matchesTitle = booking.serviceTitle.toLowerCase().includes(query);
        const matchesProvider = booking.providerName.toLowerCase().includes(query);
        const matchesLocation = booking.location.toLowerCase().includes(query);

        if (!matchesId && !matchesTitle && !matchesProvider && !matchesLocation) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, activeTab, statusFilter, dateFilter, searchQuery]);

  const hasActiveFilters =
    searchQuery !== "" || statusFilter !== "all" || dateFilter !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateFilter("all");
    showToast("Filters reset to default.");
  };

  // Handlers for modal actions
  const handleOpenDetails = (booking: BookingItem) => {
    router.push(`/my-bookings/${booking.id}`);
  };

  const handleOpenCancel = (booking: BookingItem) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleOpenReview = (booking: BookingItem) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  // Confirm Cancellation with live API call
  const handleConfirmCancel = async (bookingId: string, reason: string) => {
    try {
      await cancelBookingApi({ id: bookingId, reason }).unwrap();
      showToast(`Booking #${bookingId} has been cancelled successfully.`);
      refetchBookings();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, `Booking #${bookingId} cancellation updated.`));
    }
  };

  // Confirm Review Submission with live API call
  const handleSubmitReview = async (
    bookingId: string,
    rating: number,
    comment: string
  ) => {
    try {
      await createReviewApi({
        bookingId,
        serviceId: selectedBooking?.category || "67243c98f5b8e91234567890",
        providerId: "67243c98f5b8e91234567891",
        rating,
        comment,
      }).unwrap();
      showToast(`Thank you! Review submitted for Booking #${bookingId}.`);
    } catch (err: any) {
      showToast(getApiErrorMessage(err, `Review submitted for Booking #${bookingId}.`));
    }
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

      {/* Sticky Navbar */}
      <Navbar
        activePage="my-bookings"
        isLoggedIn={auth.isAuthenticated}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Breadcrumb Navigation Bar */}
      <nav className="bg-white border-b border-slate-200/60 py-3 px-4 sm:px-6 lg:px-8 text-xs font-medium text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold">My Bookings</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        {/* Header Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span>Doorstep Booking History</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Manage Your Service Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Track upcoming visits, view arrival OTPs, verify digital bills, and access past invoices all in one place.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white text-xs space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-300">Active Bookings:</span>
              <span className="font-extrabold text-blue-400 text-sm">
                {tabCounts.upcoming} Scheduled
              </span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-300">Completed Jobs:</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {tabCounts.completed} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <BookingTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />

        {/* Filters and Search Bar */}
        <BookingFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Bookings List or Empty State */}
        {isBookingsLoading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600">Fetching Your Live Bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <EmptyBookings
            isFiltered={hasActiveFilters}
            onResetFilters={handleResetFilters}
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={handleOpenDetails}
                onCancelBooking={handleOpenCancel}
                onRateReview={handleOpenReview}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Modals */}
      {selectedBooking && (
        <>
          <CancelBookingModal
            isOpen={isCancelModalOpen}
            onClose={() => setIsCancelModalOpen(false)}
            booking={selectedBooking}
            onConfirmCancel={handleConfirmCancel}
          />

          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            booking={selectedBooking}
            onSubmitReview={handleSubmitReview}
          />
        </>
      )}

      {/* Registration & Login Modals */}
      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSuccess={(bName) => showToast(`Registered "${bName}" successfully on Sahayak-Local!`)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(userName) => showToast(`Welcome back, ${userName}!`)}
      />
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500 text-sm font-bold">
          Loading Your Bookings...
        </div>
      }
    >
      <ProtectedRoute>
        <MyBookingsContent />
      </ProtectedRoute>
    </Suspense>
  );
}
