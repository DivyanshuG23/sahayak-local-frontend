"use client";

import React, { useState, useMemo, Suspense } from "react";
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
  INITIAL_NOTIFICATIONS,
  NotificationItemData,
  NotificationCategory
} from "@/data/mockNotifications";
import { CheckCircle2 } from "@/components/icons/Icons";

function NotificationsContent() {
  const router = useRouter();

  // Platform state
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItemData[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");

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
    const unreadBookings = notifications.filter((n) => n.category === "bookings" && !n.isRead).length;
    const unreadUpdates = notifications.filter((n) => n.category === "updates" && !n.isRead).length;

    return {
      all,
      bookings,
      updates,
      unreadAll,
      unreadBookings,
      unreadUpdates,
    };
  }, [notifications]);

  // Filter notifications by active tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === "bookings") {
      return notifications.filter((n) => n.category === "bookings");
    }
    if (activeTab === "updates") {
      return notifications.filter((n) => n.category === "updates");
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
        isLoggedIn={true}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        {/* Page Hero Header */}
        <NotificationHeader
          unreadCount={counts.unreadAll}
          totalCount={counts.all}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* Filter Tabs */}
        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        {/* Notifications List or Empty State */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onToggleRead={handleToggleRead}
                onDelete={handleDeleteNotification}
              />
            ))}
          </div>
        ) : (
          <EmptyNotifications
            activeTab={activeTab}
            onResetFilters={() => setActiveTab("all")}
          />
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

export default function NotificationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading Notifications...</span>
          </div>
        </div>
      }
    >
      <NotificationsContent />
    </Suspense>
  );
}
