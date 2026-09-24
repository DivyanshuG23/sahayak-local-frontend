"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_BOOKINGS, BookingItem, BookingStatus } from "@/data/mockBookings";
import { BookingTabs, BookingTabType } from "@/components/bookings/BookingTabs";
import { BookingFilters } from "@/components/bookings/BookingFilters";
import { BookingCard } from "@/components/bookings/BookingCard";
import { EmptyBookings } from "@/components/bookings/EmptyBookings";
import { BookingDetailModal } from "@/components/bookings/BookingDetailModal";
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
  Search
} from "@/components/icons/Icons";

function MyBookingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Platform state
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Bookings data state
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);

  // Tab & Filters state
  const [activeTab, setActiveTab] = useState<BookingTabType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Safely sync tab from URL query params after client hydration to prevent SSR mismatch
  useEffect(() => {
    const tabParam = searchParams.get("tab") as BookingTabType | null;
    if (tabParam && ["all", "upcoming", "completed", "cancelled"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Active Modals state
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
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
    const upcoming = bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;

    return { all, upcoming, completed, cancelled };
  }, [bookings]);

  // Filter logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // 1. Tab filter
      if (activeTab === "upcoming") {
        if (booking.status !== "Pending" && booking.status !== "Confirmed") return false;
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

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || dateFilter !== "all";

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

  // Confirm Cancellation
  const handleConfirmCancel = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: "Cancelled", cancellationReason: reason }
          : b
      )
    );
    showToast(`Booking #${bookingId} has been cancelled.`);
  };

  // Confirm Review Submission
  const handleSubmitReview = (bookingId: string, rating: number, comment: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, userRating: rating, userReview: comment }
          : b
      )
    );
    showToast(`Thank you! Review submitted for Booking #${bookingId}.`);
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
        isLoggedIn={true}
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        
        {/* Page Hero Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200/60">
              <Sparkles size={14} className="text-blue-600" />
              <span>Customer Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Manage and track all your service bookings. View schedules, rate completed services, or request adjustments.
            </p>
          </div>

          {/* Quick Stats Summary Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto relative z-10 shrink-0">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-center space-y-0.5">
              <span className="text-xs text-slate-500 font-semibold block">Total</span>
              <span className="text-xl font-extrabold text-slate-900">{tabCounts.all}</span>
            </div>
            <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200/60 text-center space-y-0.5">
              <span className="text-xs text-blue-700 font-semibold block">Upcoming</span>
              <span className="text-xl font-extrabold text-blue-700">{tabCounts.upcoming}</span>
            </div>
            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/60 text-center space-y-0.5 col-span-2 sm:col-span-1">
              <span className="text-xs text-emerald-700 font-semibold block">Completed</span>
              <span className="text-xl font-extrabold text-emerald-700">{tabCounts.completed}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <BookingTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />

        {/* Search & Filters Controls */}
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

        {/* Bookings Card List Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          <EmptyBookings
            isFiltered={hasActiveFilters || activeTab !== "all"}
            onResetFilters={handleResetFilters}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Interactive Action Modals */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onCancelBooking={handleOpenCancel}
        onRateReview={handleOpenReview}
      />

      <CancelBookingModal
        booking={selectedBooking}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />

      <ReviewModal
        booking={selectedBooking}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Platform Modals */}
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading My Bookings...</span>
          </div>
        </div>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}
