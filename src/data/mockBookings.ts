export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface BookingItem {
  id: string;
  serviceTitle: string;
  category: string;
  description?: string;
  duration?: string;
  providerName: string;
  providerImage: string;
  providerPhone: string;
  providerVerified: boolean;
  rating: number;
  reviewsCount: number;
  date: string;
  timeSlot: string;
  location: string;
  landmark?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  servicePrice: number;
  platformFee: number;
  discount: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  cancellationReason?: string;
  userRating?: number;
  userReview?: string;
  notes?: string;
  highlights?: string[];
}

export const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: "SL-2026-00124",
    serviceTitle: "Split AC Deep Jet Cleaning & Service",
    category: "AC Service",
    description: "Complete pressure jet cleaning of indoor cooling coils, outdoor condenser unit inspection, drain pipe flushing, and refrigerant gas pressure check by certified technician.",
    duration: "60 min",
    providerName: "Sharma Electricals & AC Care",
    providerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80",
    providerPhone: "+91 98765 43210",
    providerVerified: true,
    rating: 4.8,
    reviewsCount: 124,
    date: "30 Aug 2026",
    timeSlot: "10:00 AM - 11:30 AM",
    location: "Flat 402, Royal Palms, Indirapuram, Ghaziabad",
    landmark: "Near Habitat Center",
    customerName: "Manoj Prajapati",
    customerPhone: "+91 98123 45678",
    customerEmail: "manoj.prajapati@example.com",
    servicePrice: 499,
    platformFee: 20,
    discount: 0,
    totalAmount: 519,
    status: "Confirmed",
    createdAt: "28 Aug 2026, 04:30 PM",
    paymentMethod: "Pay after Service (Cash / UPI)",
    paymentStatus: "Pending",
    notes: "Please call 10 mins before arrival. Outdoor unit located on the balcony.",
    highlights: [
      "High-pressure foam jet coil cleaning",
      "Free 30-day service warranty",
      "Technician safety background verified",
      "Gas leak check included"
    ]
  },
  {
    id: "SL-2026-00118",
    serviceTitle: "Full House Deep Plumbing & Leak Repair",
    category: "Plumbing",
    description: "Inspection and repair of leaking kitchen drainage pipes, bathroom tap washer replacements, and main water valve pressure alignment.",
    duration: "90 min",
    providerName: "Verma Plumbing Solutions",
    providerImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&auto=format&fit=crop&q=80",
    providerPhone: "+91 98765 12345",
    providerVerified: true,
    rating: 4.8,
    reviewsCount: 98,
    date: "02 Sep 2026",
    timeSlot: "02:00 PM - 03:30 PM",
    location: "Flat 402, Royal Palms, Indirapuram, Ghaziabad",
    landmark: "Near Habitat Center",
    customerName: "Manoj Prajapati",
    customerPhone: "+91 98123 45678",
    customerEmail: "manoj.prajapati@example.com",
    servicePrice: 450,
    platformFee: 20,
    discount: 20,
    totalAmount: 450,
    status: "Pending",
    createdAt: "27 Aug 2026, 11:15 AM",
    paymentMethod: "UPI Online Payment",
    paymentStatus: "Paid",
    notes: "Kitchen sink drain pipe leaking slowly into cabinet.",
    highlights: ["Genuine spare replacement", "Leakage warranty included"]
  },
  {
    id: "SL-2026-00095",
    serviceTitle: "Full House Painting Consultation & Patchwork",
    category: "Home Repair",
    description: "Professional wall moisture test, crack filling, touch-up painting, and shade selection consultation by experienced master painters.",
    duration: "120 min",
    providerName: "ColorCraft Painters & Decorators",
    providerImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&auto=format&fit=crop&q=80",
    providerPhone: "+91 97112 33445",
    providerVerified: true,
    rating: 4.7,
    reviewsCount: 76,
    date: "20 Aug 2026",
    timeSlot: "11:00 AM - 01:00 PM",
    location: "Flat 402, Royal Palms, Indirapuram, Ghaziabad",
    landmark: "Opposite Windsor Park",
    customerName: "Manoj Prajapati",
    customerPhone: "+91 98123 45678",
    customerEmail: "manoj.prajapati@example.com",
    servicePrice: 1200,
    platformFee: 20,
    discount: 20,
    totalAmount: 1200,
    status: "Completed",
    createdAt: "18 Aug 2026, 09:00 AM",
    paymentMethod: "Paid via UPI",
    paymentStatus: "Paid",
    userRating: 5,
    userReview: "Excellent service! The painters were very polite and cleaned up after work.",
    highlights: ["Asian Paints royal finish", "Clean floor protection masking"]
  },
  {
    id: "SL-2026-00088",
    serviceTitle: "Washing Machine Motor Inspection & Repair",
    category: "Appliance Repair",
    description: "Front load washing machine drum noise diagnosis, belt tension adjustment, and motor carbon brush check.",
    duration: "45 min",
    providerName: "QuickFix Appliances Care",
    providerImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&auto=format&fit=crop&q=80",
    providerPhone: "+91 99900 11223",
    providerVerified: true,
    rating: 4.9,
    reviewsCount: 215,
    date: "14 Aug 2026",
    timeSlot: "04:00 PM - 05:30 PM",
    location: "Flat 402, Royal Palms, Indirapuram, Ghaziabad",
    landmark: "Near Habitat Center",
    customerName: "Manoj Prajapati",
    customerPhone: "+91 98123 45678",
    customerEmail: "manoj.prajapati@example.com",
    servicePrice: 350,
    platformFee: 20,
    discount: 20,
    totalAmount: 350,
    status: "Completed",
    createdAt: "12 Aug 2026, 02:20 PM",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    highlights: ["Diagnostic checkup", "Spare parts guarantee"]
  },
  {
    id: "SL-2026-00072",
    serviceTitle: "Sofa & Upholstery Vacuum Cleaning (3 Seater)",
    category: "Cleaning",
    description: "Deep fabric sofa sanitization, dust mite extraction, and shampoo wash treatment.",
    duration: "75 min",
    providerName: "CleanBee Home Hygiene Services",
    providerImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&auto=format&fit=crop&q=80",
    providerPhone: "+91 98111 22334",
    providerVerified: false,
    rating: 4.6,
    reviewsCount: 54,
    date: "05 Aug 2026",
    timeSlot: "09:00 AM - 11:00 AM",
    location: "Flat 402, Royal Palms, Indirapuram, Ghaziabad",
    landmark: "Near Habitat Center",
    customerName: "Manoj Prajapati",
    customerPhone: "+91 98123 45678",
    customerEmail: "manoj.prajapati@example.com",
    servicePrice: 799,
    platformFee: 20,
    discount: 20,
    totalAmount: 799,
    status: "Cancelled",
    createdAt: "04 Aug 2026, 10:00 AM",
    paymentMethod: "UPI Online Payment",
    paymentStatus: "Refunded",
    cancellationReason: "Change of schedule - had to travel out of city unexpectedly.",
    highlights: ["Eco-friendly shampoo", "Fast drying process"]
  }
];

export const getBookingById = (id: string): BookingItem => {
  const found = INITIAL_BOOKINGS.find((b) => b.id.toLowerCase() === id.toLowerCase());
  if (found) return found;

  // Fallback default booking if ID not found
  return INITIAL_BOOKINGS[0];
};
