import { Category, ServiceProvider } from "@/data/mockData";
import { BookingItem, BookingStatus } from "@/data/mockBookings";

/**
 * Maps Backend Category to Frontend Category Interface
 */
export function mapBackendCategoryToUi(cat: any): Category {
  return {
    id: cat._id || cat.id || cat.slug,
    name: cat.name,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
    icon: cat.icon || "Sparkles",
    description: cat.description || `Verified local ${cat.name} services`,
    providerCount: cat.providerCount || cat.serviceCount || 12,
    popularServices: cat.popularServices || [cat.name],
    gradient: cat.gradient || "from-blue-500 to-indigo-600",
    badge: cat.badge || undefined,
  };
}

/**
 * Maps Backend Service Model to Frontend ServiceProvider / Service Card Interface
 */
export function mapBackendServiceToProvider(
  service: any,
  fallbackProvider?: any
): ServiceProvider {
  const categoryName =
    typeof service.categoryId === "object"
      ? service.categoryId?.name
      : service.category || "Home Services";

  const startingPrice =
    typeof service.discountedPrice === "number" && service.discountedPrice > 0
      ? service.discountedPrice
      : typeof service.price === "number"
      ? service.price
      : 399;

  return {
    id: service._id || service.id,
    name: service.name || "Professional Local Service",
    ownerName:
      fallbackProvider?.ownerName ||
      service.providerId?.ownerName ||
      "Sahayak Verified Specialist",
    category: categoryName,
    categoryId:
      typeof service.categoryId === "object"
        ? service.categoryId?._id
        : service.categoryId || "general",
    rating: service.rating || 4.8,
    reviewCount: service.reviewCount || 42,
    location: service.city || fallbackProvider?.city || "Ghaziabad, UP",
    locality: service.locality || fallbackProvider?.locality || "Indirapuram",
    distanceKm: 2.5,
    startingPrice,
    priceUnit: service.priceUnit || "visit",
    availableToday: true,
    verified: true,
    badgeText: service.badge || (service.discountedPrice ? "Special Offer" : "Popular"),
    imageUrl:
      service.thumbnail ||
      (Array.isArray(service.images) && service.images[0]) ||
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    avatarUrl:
      fallbackProvider?.avatarUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    experienceYears: service.duration ? Math.round(service.duration / 60) || 5 : 6,
    completedJobs: 150,
    phone: fallbackProvider?.phone || "+91 98765 43210",
    responseTime: "< 30 mins",
    about: service.description || service.shortDescription || "High quality verified service with 30-day warranty.",
    highlights: Array.isArray(service.tags) && service.tags.length > 0
      ? service.tags
      : ["Verified Technician", "30-Day Sahayak Warranty", "Direct UPI / Cash Accepted"],
    pricingItems: [
      {
        title: service.name,
        price: startingPrice,
        unit: service.priceUnit || "visit",
      },
    ],
  };
}

/**
 * Maps Backend Booking Model to UI BookingItem Interface
 */
export function mapBackendBookingToUi(b: any): BookingItem {
  // Normalize Status
  let status: BookingStatus = "Pending";
  const rawStatus = (b.status || "").toUpperCase();

  switch (rawStatus) {
    case "PENDING":
    case "REQUESTED":
      status = "Pending";
      break;
    case "CONFIRMED":
    case "ACCEPTED":
    case "ON_THE_WAY":
      status = "Confirmed";
      break;
    case "IN_PROGRESS":
      status = "Confirmed";
      break;
    case "COMPLETED":
      status = "Completed";
      break;
    case "CANCELLED":
    case "REJECTED":
      status = "Cancelled";
      break;
    default:
      status = "Pending";
  }

  const serviceName =
    b.serviceSnapshot?.name ||
    b.serviceId?.name ||
    "Local Home Service";

  const providerBusiness =
    b.providerId?.businessName ||
    b.providerId?.ownerName ||
    "Assigned Service Partner";

  const addressText = b.addressSnapshot
    ? `${b.addressSnapshot.houseFlatNo || ""}, ${b.addressSnapshot.streetAddress || ""}, ${b.addressSnapshot.city || ""}`
        .replace(/^,\s*/, "")
        .replace(/,\s*,/g, ",")
    : "Address on file";

  const formattedDate = b.bookingDate
    ? new Date(b.bookingDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Scheduled";

  const rawPaymentStatus = (b.paymentStatus || "").toUpperCase();
  const paymentStatus: "Paid" | "Pending" | "Refunded" =
    rawPaymentStatus === "PAID"
      ? "Paid"
      : rawPaymentStatus === "REFUNDED"
      ? "Refunded"
      : "Pending";

  const totalAmount = b.totalAmount || b.pricing?.finalAmount || 499;

  return {
    id: b.bookingId || b._id,
    serviceTitle: serviceName,
    category: b.serviceSnapshot?.category || "Home Services",
    description: b.serviceSnapshot?.description || "Professional doorstep service.",
    duration: b.serviceSnapshot?.duration ? `${b.serviceSnapshot.duration} min` : "60 min",
    providerName: providerBusiness,
    providerImage:
      b.providerId?.avatar ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    providerPhone: b.providerId?.phone || "+91 98765 43210",
    providerVerified: true,
    rating: b.providerId?.rating || 4.8,
    reviewsCount: b.providerId?.reviewsCount || 42,
    date: formattedDate,
    timeSlot: b.timeSlot || "10:00 AM - 12:00 PM",
    location: addressText,
    landmark: b.addressSnapshot?.landmark || "",
    customerName: b.addressSnapshot?.contactPersonName || "Customer",
    customerPhone: b.addressSnapshot?.contactPhone || "",
    servicePrice: totalAmount > 20 ? totalAmount - 20 : totalAmount,
    platformFee: 20,
    discount: 0,
    totalAmount,
    status,
    createdAt: b.createdAt || new Date().toISOString(),
    paymentMethod: (b.paymentMode || "Cash on Delivery").toUpperCase(),
    paymentStatus,
    cancellationReason: b.cancellationReason || undefined,
    userRating: b.review?.rating || undefined,
    userReview: b.review?.comment || undefined,
    notes: b.notes || undefined,
  };
}
