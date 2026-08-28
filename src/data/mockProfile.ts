export interface SavedAddress {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  name: string;
  phone: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface AccountStatItem {
  id: string;
  label: string;
  value: number | string;
  subtext: string;
  iconName: string;
  color: string;
}

export interface LoginActivity {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrentDevice: boolean;
}

export interface NotificationPreferences {
  emailBookingUpdates: boolean;
  smsAlerts: boolean;
  promotionalOffers: boolean;
  securityAlerts: boolean;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  dateOfBirth?: string;
  gender?: string;
  joinedDate: string;
  verifiedStatus: boolean;
  memberTier: string;
  bio?: string;
  addresses: SavedAddress[];
  stats: {
    totalBookings: number;
    completedServices: number;
    savedProviders: number;
    reviewsGiven: number;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginActivities: LoginActivity[];
  };
  notifications: NotificationPreferences;
}

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: "Manoj Prajapati",
  email: "manoj.prajapati@example.com",
  phone: "+91 98765 43210",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  dateOfBirth: "1997-08-15",
  gender: "Male",
  joinedDate: "January 2024",
  verifiedStatus: true,
  memberTier: "Gold Member",
  bio: "Passionate homeowner looking for trusted local service professionals in Ghaziabad & NCR.",
  addresses: [
    {
      id: "addr-1",
      type: "home",
      label: "Home",
      name: "Manoj Prajapati",
      phone: "+91 98765 43210",
      addressLine: "Flat 402, Block B, ATS Advantage, Ahinsa Khand 1",
      landmark: "Near Habitat Centre",
      city: "Indirapuram, Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201014",
      isDefault: true,
    },
    {
      id: "addr-2",
      type: "work",
      label: "Work",
      name: "Manoj Prajapati",
      phone: "+91 98765 43210",
      addressLine: "Tower B, 6th Floor, Stellar IT Park, Sector 62",
      landmark: "Opposite Fortis Hospital",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201309",
      isDefault: false,
    },
  ],
  stats: {
    totalBookings: 12,
    completedServices: 10,
    savedProviders: 5,
    reviewsGiven: 8,
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "3 months ago",
    loginActivities: [
      {
        id: "log-1",
        device: "Windows PC",
        browser: "Chrome 122.0",
        location: "Indirapuram, Ghaziabad, IN",
        ip: "103.240.194.21",
        lastActive: "Active Now",
        isCurrentDevice: true,
      },
      {
        id: "log-2",
        device: "iPhone 15 Pro",
        browser: "Sahayak Mobile App",
        location: "Noida Sector 62, IN",
        ip: "49.36.120.88",
        lastActive: "Yesterday at 6:45 PM",
        isCurrentDevice: false,
      },
    ],
  },
  notifications: {
    emailBookingUpdates: true,
    smsAlerts: true,
    promotionalOffers: false,
    securityAlerts: true,
  },
};
