export type FavoriteType = "provider" | "service";

export interface SavedItem {
  id: string;
  type: FavoriteType;
  providerId: string;
  providerName: string;
  ownerName: string;
  providerImage: string;
  avatarUrl: string;
  providerVerified: boolean;
  serviceTitle: string;
  category: string;
  rating: number;
  reviewsCount: number;
  location: string;
  locality: string;
  distanceKm: number;
  startingPrice: number;
  priceUnit: string;
  availableToday: boolean;
  nextAvailableSlot?: string;
  experienceYears: number;
  about: string;
  highlights: string[];
  savedAt: string;
}

export const INITIAL_SAVED_ITEMS: SavedItem[] = [
  {
    id: "fav-1",
    type: "provider",
    providerId: "sp-1",
    providerName: "Sharma Electricals & AC Care",
    ownerName: "Rajesh Sharma",
    providerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    providerVerified: true,
    serviceTitle: "Split AC Jet Cleaning & Gas Refill",
    category: "AC Service",
    rating: 4.8,
    reviewsCount: 124,
    location: "Indirapuram, Ghaziabad",
    locality: "Indirapuram",
    distanceKm: 1.2,
    startingPrice: 499,
    priceUnit: "service",
    availableToday: true,
    experienceYears: 8,
    about: "Certified HVAC master technician specializing in eco-friendly foam jet AC cleaning and copper pipe leak diagnosis.",
    highlights: ["High-pressure foam jet", "30-day warranty", "Background verified"],
    savedAt: "Saved yesterday"
  },
  {
    id: "fav-2",
    type: "service",
    providerId: "sp-2",
    providerName: "Verma Plumbing Solutions",
    ownerName: "Amit Verma",
    providerImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    providerVerified: true,
    serviceTitle: "Full House Plumbing & Drainage Inspection",
    category: "Plumbing",
    rating: 4.8,
    reviewsCount: 98,
    location: "Vaishali, Ghaziabad",
    locality: "Vaishali",
    distanceKm: 2.5,
    startingPrice: 349,
    priceUnit: "visit",
    availableToday: true,
    experienceYears: 10,
    about: "Specialists in hidden pipe leakage detection, bathroom tap wash replacement, and high-pressure drain unclogging.",
    highlights: ["Same-day emergency visit", "Genuine spares", "Fixed pricing"],
    savedAt: "Saved 3 days ago"
  },
  {
    id: "fav-3",
    type: "provider",
    providerId: "sp-3",
    providerName: "CleanBee Home Hygiene Services",
    ownerName: "Pooja Singh",
    providerImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    providerVerified: true,
    serviceTitle: "Deep Home & Upholstery Sanitization",
    category: "Cleaning",
    rating: 4.9,
    reviewsCount: 210,
    location: "Vasundhara, Ghaziabad",
    locality: "Vasundhara",
    distanceKm: 1.8,
    startingPrice: 1499,
    priceUnit: "house",
    availableToday: false,
    nextAvailableSlot: "Tomorrow, 09:00 AM",
    experienceYears: 6,
    about: "Premium home deep cleaning utilizing industrial vacuum extraction, non-toxic eco-friendly chemicals, and germ protection.",
    highlights: ["Eco-friendly non-toxic", "Industrial equipment", "Certified team"],
    savedAt: "Saved last week"
  },
  {
    id: "fav-4",
    type: "service",
    providerId: "sp-4",
    providerName: "ColorCraft Painters & Decorators",
    ownerName: "Vikas Painter",
    providerImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    providerVerified: true,
    serviceTitle: "Waterproof Wall Moisture Patchwork & Painting",
    category: "Home Repair",
    rating: 4.7,
    reviewsCount: 76,
    location: "Indirapuram, Ghaziabad",
    locality: "Indirapuram",
    distanceKm: 0.9,
    startingPrice: 899,
    priceUnit: "wall",
    availableToday: true,
    experienceYears: 12,
    about: "Master painter offering dust-free mechanical sanding, moisture meter wall inspection, and Asian Paints Royal emulsion finish.",
    highlights: ["Dust-free sanding", "Asian Paints certified", "Furniture masking"],
    savedAt: "Saved 2 weeks ago"
  }
];
