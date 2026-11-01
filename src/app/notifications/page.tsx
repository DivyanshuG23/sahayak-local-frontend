"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationTabs } from "@/components/notifications/NotificationTabs";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { EmptyNotifications } from "@/components/notifications/EmptyNotifications";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import {
  NotificationItemData,
  NotificationCategory,
} from "@/data/mockNotifications";
import { CheckCircle2 } from "@/components/icons/Icons";
import { useAppSelector } from "@/store/hooks";
import { useGetMyBookingsQuery } from "@/services/booking.service";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function NotificationsContent() {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  // Platform state
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Live Bookings Query for dynamic booking notifications
  const { data: myBookingsData } = useGetMyBookingsQuery(undefined, {
    skip: !auth.isAuthenticated,
  });

  // Dynamic booking notifications derived from live backend
  const liveNotifications: NotificationItemData[] = useMemo(() => {
    const rawBookings =
      myBookingsData?.data?.bookings || myBookingsData?.data || [];

    if (Array.isArray(rawBookings) && rawBookings.length > 0) {
      const generated: NotificationItemData[] = rawBookings.map(
        (b: any, idx: number) => {
          const bookingCode = b.bookingId || b._id;
          const serviceName =
            b.serviceSnapshot?.name || b.serviceId?.name || "Doorstep Service";
          const status = (b.status || "PENDING").toUpperCase();

          if (status === "COMPLETED") {
            return {
              id: `live-notif-${b._id || idx}`,
              type: "service_completed",
              category: "bookings",
              title: "Service Completed",
              message: `Your ${serviceName} booking (${bookingCode}) was completed. Please rate your experience!`,
              timestamp: b.updatedAt
                ? new Date(b.updatedAt).toLocaleDateString()
                : "Recently",
              dateStr: b.updatedAt || new Date().toISOString(),
              isRead: false,
              actionLabel: "Leave a Review",
              actionUrl: `/my-bookings/${b._id || bookingCode}`,
              badgeVariant: "emerald",
            };
          }

          if (status === "CONFIRMED" || status === "ON_THE_WAY") {
            return {
              id: `live-notif-${b._id || idx}`,
              type: "booking_confirmed",
              category: "bookings",
              title: "Booking Confirmed & Scheduled",
              message: `Technician assigned for ${serviceName}. Job completion OTP: ${b.completionOtp || "Available on arrival"}.`,
              timestamp: b.bookingDate
                ? new Date(b.bookingDate).toLocaleDateString()
                : "Upcoming",
              dateStr: b.createdAt || new Date().toISOString(),
              isRead: false,
              actionLabel: "View Live Status",
              actionUrl: `/my-bookings/${b._id || bookingCode}`,
              badgeVariant: "blue",
            };
          }

          return {
            id: `live-notif-${b._id || idx}`,
            type: "booking_reminder",
            category: "bookings",
            title: "Booking Request Received",
            message: `Booking #${bookingCode} for ${serviceName} is awaiting technician confirmation.`,
            timestamp: b.createdAt
              ? new Date(b.createdAt).toLocaleDateString()
              : "Just now",
            dateStr: b.createdAt || new Date().toISOString(),
            isRead: false,
            actionLabel: "Track Booking",
            actionUrl: `/my-bookings/${b._id || bookingCode}`,
            badgeVariant: "secondary",
          };
        }
      );

      return generated;
    }

    return [];
  }, [myBookingsData]);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItemData[]>([]);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");

  // Keep state synced when live notifications load
  useEffect(() => {
    setNotifications(liveNotifications);
  }, [liveNotifications]);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Mark all as read handler
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    showToast("All notifications marked as read.");
  };

  // Toggle single notification read state
  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextRead = !item.isRead;
          if (nextRead) {
            showToast(`Marked "${item.title}" as read.`);
          }
          return { ...item, isRead: nextRead };
        }
        return item;
      })
    );
  };

  // Delete notification handler
  const handleDeleteNotification = (id: string) => {
    const itemToRemove = notifications.find((n) => n.id === id);
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`Dismissed notification: "${itemToRemove.title}".`);
    }
  };

  // Calculate dynamic tab and unread counts
  const counts = useMemo(() => {
    const all = notifications.length;
    const bookings = notifications.filter((n) => n.category === "bookings").length;
    const updates = notifications.filter((n) => n.category === "updates").length;

    const unreadAll = notifications.filter((n) => !n.isRead).length;
    const unreadBookings = notifications.filter(
      (n) => n.category === "bookings" && !n.isRead
    ).length;
    const unreadUpdates = notifications.filter(
      (n) => n.category === "updates" && !n.isRead
    ).length;

    return {
      all,
      bookings,
      updates,
      unreadAll,
      unreadBookings,
      unreadUpdates,
    };
  }, [notifications]);

  // Filter items by active category
  const filteredNotifications = useMemo(() => {
    if (activeTab === "bookings") {
      return notifications.filter((item) => item.category === "bookings");
    }
    if (activeTab === "updates") {
      return notifications.filter((item) => item.category === "updates");
    }
    return notifications;
  }, [notifications, activeTab]);

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
        activePage="notifications"
        isLoggedIn={auth.isAuthenticated}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        {/* Header Hero Banner */}
        <NotificationHeader
          unreadCount={counts.unreadAll}
          totalCount={counts.all}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* Categories Tab Navigation */}
        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        {/* Notifications List or Empty State */}
        {filteredNotifications.length === 0 ? (
          <EmptyNotifications activeTab={activeTab} />
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <NotificationItem
                key={item.id}
                notification={item}
                onToggleRead={handleToggleRead}
                onDelete={handleDeleteNotification}
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

export default function NotificationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500 text-sm font-bold">
          Loading Notifications...
        </div>
      }
    >
      <ProtectedRoute>
        <NotificationsContent />
      </ProtectedRoute>
    </Suspense>
  );
}
