export type ProviderKycStatus = "verified" | "pending" | "action_required";

export type ProviderAvailabilityStatus = "available" | "busy" | "offline";

export interface ProviderBusinessProfile {
  id: string;
  businessName: string;
  ownerName: string;
  avatarUrl: string;
  bannerUrl?: string;
  phone: string;
  email: string;
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedJobs: number;
  locality: string;
  city: string;
  serviceRadiusKm: number;
  workingHours: string;
  kycStatus: ProviderKycStatus;
  availability: ProviderAvailabilityStatus;
  badgeText: string;
  about: string;
  activeServicesCount: number;
  address?: string;
  pincode?: string;
  startingPrice?: number;
  priceUnit?: string;
  servicesOffered?: string[];
  emergencyAvailability?: boolean;
}

export type ProviderNavId =
  | "dashboard"
  | "profile"
  | "services"
  | "bookings"
  | "customers"
  | "reviews"
  | "earnings"
  | "settings";

export interface ProviderNavItem {
  id: ProviderNavId;
  title: string;
  href: string;
  iconName: string;
  badgeCount?: number;
  badgeVariant?: "emerald" | "secondary" | "rose" | "blue";
  section: "main" | "account";
}

export interface ProviderStatMetric {
  id: string;
  title: string;
  value: string;
  changePercent?: number;
  changeType?: "increase" | "decrease" | "neutral";
  changeLabel?: string;
  iconName: string;
  colorTheme?: "blue" | "emerald" | "amber" | "purple";
}

export type ProviderBookingStatus =
  | "requested"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ProviderRecentBooking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerAvatar: string;
  customerPhone: string;
  customerLocality: string;
  serviceTitle: string;
  scheduledDate: string;
  scheduledTime: string;
  price: number;
  status: ProviderBookingStatus;
  paymentMode: "Cash on Service" | "UPI / Online" | "Sahayak Escrow";
  urgent?: boolean;
}

export interface ProviderNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  type: "booking" | "payment" | "review" | "system";
  actionHref?: string;
}
