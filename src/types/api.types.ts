/**
 * Industry-Standard Production API Types for Sahayak-Local
 */

export interface ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  errors?: any[];
  stack?: string;
}

export type UserRole = "customer" | "provider" | "admin";

export interface User {
  _id: string;
  fullName: string;
  name?: string; // Fallback
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProviderProfile {
  _id: string;
  userId: string;
  businessName: string;
  ownerName: string;
  category: string;
  city: string;
  address?: string;
  experienceYears?: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  status: "pending" | "approved" | "suspended" | "rejected";
  offeredServices?: Array<{
    serviceId: string;
    customRate?: number;
    experienceYears?: number;
  }>;
  availability?: {
    isOnline: boolean;
    workingDays: string[];
    timeSlots: string[];
  };
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
  isActive: boolean;
  serviceCount?: number;
}

export interface Service {
  _id: string;
  categoryId: string | Category;
  title: string;
  slug: string;
  description: string;
  basePrice: number;
  discountPrice?: number;
  durationMinutes: number;
  images?: string[];
  inclusions?: string[];
  exclusions?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  rating?: number;
  reviewCount?: number;
  isActive: boolean;
}

export interface Address {
  _id: string;
  userId: string;
  title: "Home" | "Office" | "Other" | string;
  recipientName?: string;
  phone?: string;
  houseFlatNo: string;
  streetArea: string;
  landmark?: string;
  city: string;
  pincode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isDefault: boolean;
}

export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "ON_THE_WAY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentMethod = "CASH" | "DIRECT_UPI";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED";

export interface Booking {
  _id: string;
  bookingNumber: string;
  customerId: string | User;
  providerId?: string | User;
  serviceId: string | Service;
  addressId: string | Address;
  scheduledDate: string;
  scheduledTimeSlot: string;
  status: BookingStatus;
  statusHistory?: Array<{
    status: BookingStatus;
    timestamp: string;
    note?: string;
  }>;
  completionOtp?: string;
  pricing: {
    basePrice: number;
    additionalCharges?: Array<{ title: string; amount: number }>;
    discount?: number;
    totalAmount: number;
  };
  paymentInfo: {
    method: PaymentMethod;
    status: PaymentStatus;
    upiRefNumber?: string;
    paidAt?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  token?: string; // Legacy fallback
}

export interface AuthResponseData extends AuthTokens {
  user: User;
  providerProfile?: ProviderProfile | null;
}

