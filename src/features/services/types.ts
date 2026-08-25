import { ServiceProvider } from "@/data/mockData";

export type SortOption =
  | "recommended"
  | "rating-desc"
  | "price-asc"
  | "price-desc"
  | "distance-asc";

export interface ServiceFilterState {
  category: string; // 'all' or specific category slug e.g. 'electrician'
  distanceMax: number; // in km e.g. 1, 3, 5, 10, 20
  priceRange: [number, number]; // [min, max]
  ratingMin: number; // 0, 3.0, 4.0, 4.5
  availableToday: boolean;
  availableNow: boolean;
  verifiedOnly: boolean;
  topRatedOnly: boolean;
}

export interface ServiceSearchQuery {
  term: string;
  location: string;
}
