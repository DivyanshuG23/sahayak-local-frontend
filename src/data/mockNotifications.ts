export type NotificationCategory = "all" | "bookings" | "updates";

export type NotificationType =
  | "booking_confirmed"
  | "service_completed"
  | "booking_reminder"
  | "provider_update"
  | "offer"
  | "security";

export interface NotificationItemData {
  id: string;
  type: NotificationType;
  category: "bookings" | "updates";
  title: string;
  message: string;
  timestamp: string;
  dateStr: string; // Used for sorting or grouping
  isRead: boolean;
  actionLabel?: string;
  actionUrl?: string;
  badgeVariant?: "blue" | "emerald" | "secondary" | "destructive" | "rose";
}

export const INITIAL_NOTIFICATIONS: NotificationItemData[] = [
  {
    id: "notif-1",
    type: "booking_confirmed",
    category: "bookings",
    title: "Booking Confirmed",
    message: "Your AC Installation booking with Sharma Electricals has been confirmed.",
    timestamp: "Today · 10:30 AM",
    dateStr: "2026-08-28T10:30:00",
    isRead: false,
    actionLabel: "View Booking Details",
    actionUrl: "/my-bookings",
    badgeVariant: "blue",
  },
  {
    id: "notif-2",
    type: "booking_reminder",
    category: "bookings",
    title: "Booking Reminder",
    message: "Your service is scheduled for tomorrow at 11:00 AM. Please make sure someone is home.",
    timestamp: "Today · 8:15 AM",
    dateStr: "2026-08-28T08:15:00",
    isRead: false,
    actionLabel: "Track Schedule",
    actionUrl: "/my-bookings",
    badgeVariant: "blue",
  },
  {
    id: "notif-3",
    type: "service_completed",
    category: "bookings",
    title: "Service Completed",
    message: "Your service has been marked as completed by Manoj Electrical Services. Rate your experience now!",
    timestamp: "Yesterday · 5:20 PM",
    dateStr: "2026-08-27T17:20:00",
    isRead: true,
    actionLabel: "Leave a Review",
    actionUrl: "/my-bookings",
    badgeVariant: "emerald",
  },
  {
    id: "notif-4",
    type: "provider_update",
    category: "bookings",
    title: "Provider En Route",
    message: "Rajesh Kumar (Plumbing Expert) is on his way to your address at ATS Advantage, Indirapuram.",
    timestamp: "Yesterday · 2:15 PM",
    dateStr: "2026-08-27T14:15:00",
    isRead: true,
    actionLabel: "Track Live Location",
    actionUrl: "/my-bookings",
    badgeVariant: "blue",
  },
  {
    id: "notif-5",
    type: "offer",
    category: "updates",
    title: "Exclusive Local Discount",
    message: "Enjoy 20% off on Home Deep Cleaning & Pest Control services this weekend! Use code: CLEAN20 at checkout.",
    timestamp: "2 days ago · 11:00 AM",
    dateStr: "2026-08-26T11:00:00",
    isRead: true,
    actionLabel: "Explore Services",
    actionUrl: "/services",
    badgeVariant: "rose",
  },
  {
    id: "notif-6",
    type: "security",
    category: "updates",
    title: "New Login Detected",
    message: "Your Sahayak-Local account was logged into from Chrome on Windows PC in Ghaziabad, UP.",
    timestamp: "3 days ago · 9:40 PM",
    dateStr: "2026-08-25T21:40:00",
    isRead: true,
    actionLabel: "Review Security Settings",
    actionUrl: "/profile",
    badgeVariant: "secondary",
  },
];
