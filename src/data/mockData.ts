export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  providerCount: number;
  popularServices: string[];
  gradient: string;
  badge?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  ownerName: string;
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  location: string;
  locality: string;
  distanceKm: number;
  startingPrice: number;
  priceUnit: string;
  availableToday: boolean;
  verified: boolean;
  badgeText?: string;
  imageUrl: string;
  avatarUrl: string;
  experienceYears: number;
  completedJobs: number;
  phone: string;
  responseTime: string;
  about: string;
  highlights: string[];
  pricingItems: { title: string; price: number; unit: string }[];
}

export interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  location: string;
  rating: number;
  date: string;
  serviceBooked: string;
  providerName: string;
  comment: string;
  verifiedBooking: boolean;
}

export interface TopProvider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviewsCount: number;
  location: string;
  experience: string;
  completedJobs: number;
  verified: boolean;
  avatarUrl: string;
  bannerBg: string;
  specialities: string[];
}

export const CITIES = [
  "Jaipur, Rajasthan",
  "Noida, UP",
  "Delhi NCR",
  "Bengaluru, KA",
  "Mumbai, MH",
  "Pune, MH",
  "Lucknow, UP",
  "Ahmedabad, GJ"
];

export const CATEGORIES: Category[] = [
  {
    id: "electrician",
    name: "Electrician",
    slug: "electrician",
    icon: "Zap",
    description: "Wiring, switchboard repair, fan installation & safety audits.",
    providerCount: 142,
    popularServices: ["Switchboard Repair", "Ceiling Fan Fitting", "House Rewiring", "MCB Replacement"],
    gradient: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-200/60"
  },
  {
    id: "plumber",
    name: "Plumber",
    slug: "plumber",
    icon: "Droplets",
    description: "Leak repair, pipe fitting, tap replacement & bathroom fittings.",
    providerCount: 118,
    popularServices: ["Pipe Leakage Repair", "Tap & Mixer Fitting", "Water Tank Cleaning", "Geyser Installation"],
    gradient: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-200/60"
  },
  {
    id: "ac-repair",
    name: "AC Repair",
    slug: "ac-repair",
    icon: "Wind",
    description: "AC servicing, gas refilling, installation & uninstallation.",
    providerCount: 96,
    popularServices: ["Foam Jet Servicing", "Gas Leakage & Top-up", "Split AC Installation", "PCB Board Repair"],
    gradient: "from-cyan-500/10 to-cyan-500/5 text-cyan-600 border-cyan-200/60",
    badge: "Trending"
  },
  {
    id: "cleaning",
    name: "Cleaning",
    slug: "cleaning",
    icon: "Sparkles",
    description: "Deep house cleaning, sofa shampooing & bathroom sanitization.",
    providerCount: 88,
    popularServices: ["Full Home Deep Clean", "Sofa & Carpet Cleaning", "Kitchen Deep Clean", "Bathroom Sanitization"],
    gradient: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-200/60"
  },
  {
    id: "carpenter",
    name: "Carpenter",
    slug: "carpenter",
    icon: "Hammer",
    description: "Custom furniture repair, door lock installation & wood work.",
    providerCount: 75,
    popularServices: ["Door Lock Installation", "Wardrobe Repair", "Modular Kitchen Fitting", "Bed Assembly"],
    gradient: "from-orange-500/10 to-orange-500/5 text-orange-600 border-orange-200/60"
  },
  {
    id: "salon",
    name: "Salon & Beauty",
    slug: "salon",
    icon: "Scissors",
    description: "At-home haircut, facial, waxing, grooming & massage services.",
    providerCount: 130,
    popularServices: ["Men's Grooming Package", "At-Home Facial & Clean-up", "Haircare & Styling", "Waxing & Threading"],
    gradient: "from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-200/60"
  },
  {
    id: "tutor",
    name: "Tutor & Classes",
    slug: "tutor",
    icon: "GraduationCap",
    description: "Home tutors for Mathematics, Science, CBSE/ICSE & languages.",
    providerCount: 110,
    popularServices: ["Class 9-12 Maths & Science", "Competitive Exam Coaching", "Spoken English Classes", "Coding for Kids"],
    gradient: "from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-200/60"
  },
  {
    id: "mechanic",
    name: "Mechanic & Auto",
    slug: "mechanic",
    icon: "Wrench",
    description: "Doorstep bike servicing, car breakdown help & battery check.",
    providerCount: 64,
    popularServices: ["Doorstep Bike Service", "Car Battery Jumpstart", "Brake & Engine Tuneup", "Tyre Change Service"],
    gradient: "from-slate-500/10 to-slate-500/5 text-slate-700 border-slate-200/60"
  }
];

export const POPULAR_SERVICES: ServiceProvider[] = [
  {
    id: "sp-1",
    name: "Sharma Electricals & Solar",
    ownerName: "Rajesh Sharma",
    category: "Electrician",
    categoryId: "electrician",
    rating: 4.8,
    reviewCount: 142,
    location: "Jaipur",
    locality: "Vaishali Nagar",
    distanceKm: 2.4,
    startingPrice: 299,
    priceUnit: "visit",
    availableToday: true,
    verified: true,
    badgeText: "Top Rated",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80",
    experienceYears: 9,
    completedJobs: 480,
    phone: "+91 98290 12345",
    responseTime: "Within 30 mins",
    about: "Sharma Electricals provides reliable residential and commercial electrical maintenance with certified technicians. Specializes in safety inspections, invertor setup, and LED lighting design.",
    highlights: [
      "Government Licensed Electrician",
      "100% Safety Protocol Compliant",
      "30-Day Service Guarantee",
      "Transparent Fixed Rates"
    ],
    pricingItems: [
      { title: "Standard Visit & Inspection", price: 299, unit: "per visit" },
      { title: "Switchboard Fitting / Repair", price: 199, unit: "per point" },
      { title: "Ceiling Fan Assembly & Install", price: 349, unit: "per unit" },
      { title: "Full House Safety Audit", price: 899, unit: "package" }
    ]
  },
  {
    id: "sp-2",
    name: "Apex Plumbing Solutions",
    ownerName: "Manoj Kumar",
    category: "Plumber",
    categoryId: "plumber",
    rating: 4.9,
    reviewCount: 98,
    location: "Jaipur",
    locality: "Malviya Nagar",
    distanceKm: 3.1,
    startingPrice: 349,
    priceUnit: "visit",
    availableToday: true,
    verified: true,
    badgeText: "Fast Response",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    experienceYears: 12,
    completedJobs: 620,
    phone: "+91 94140 67890",
    responseTime: "Within 20 mins",
    about: "Apex Plumbing Solutions is known for emergency leak repairs, pressure pump installations, and sanitary pipe laying. Uses modern camera inspection tools to detect hidden leaks.",
    highlights: [
      "Emergency 24x7 Availability",
      "Advanced Underground Leak Detection",
      "No Mess Cleaning Guarantee",
      "Original Spare Parts Used"
    ],
    pricingItems: [
      { title: "General Plumbing Consultation", price: 349, unit: "per visit" },
      { title: "Tap Leakage Fix & Washer Change", price: 149, unit: "per tap" },
      { title: "Geyser Inlet Outlet Pipe Repair", price: 449, unit: "per appliance" },
      { title: "Overhead Water Tank Deep Clean", price: 999, unit: "per 1000L" }
    ]
  },
  {
    id: "sp-3",
    name: "Verma AC Care & Services",
    ownerName: "Amit Verma",
    category: "AC Repair",
    categoryId: "ac-repair",
    rating: 4.7,
    reviewCount: 215,
    location: "Jaipur",
    locality: "C-Scheme",
    distanceKm: 1.8,
    startingPrice: 499,
    priceUnit: "service",
    availableToday: true,
    verified: true,
    badgeText: "Best Value",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    experienceYears: 7,
    completedJobs: 890,
    phone: "+91 97850 43210",
    responseTime: "Within 45 mins",
    about: "Specialists in Split and Inverter AC jet servicing, R32/R410 gas pressure charging, and PCB circuit fixes. Equipped with high-pressure power washers for thorough cleaning.",
    highlights: [
      "High-Pressure Foam Jet Washing",
      "Standardized Gas Charging Rates",
      "Certified Brand Engineers (Daikin/Voltas)",
      "90-Day Compressor Warranty"
    ],
    pricingItems: [
      { title: "Power Foam Jet AC Service", price: 499, unit: "per AC" },
      { title: "Gas Top-Up (R32 / R410a)", price: 1299, unit: "full refill" },
      { title: "Split AC Dismantling & Shifting", price: 899, unit: "per unit" }
    ]
  },
  {
    id: "sp-4",
    name: "Green Clean Home Care",
    ownerName: "Sunita Devi",
    category: "Cleaning",
    categoryId: "cleaning",
    rating: 4.9,
    reviewCount: 176,
    location: "Jaipur",
    locality: "Raja Park",
    distanceKm: 4.0,
    startingPrice: 999,
    priceUnit: "package",
    availableToday: false,
    verified: true,
    badgeText: "Eco-Friendly",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    experienceYears: 6,
    completedJobs: 510,
    phone: "+91 96100 88990",
    responseTime: "Within 1 hour",
    about: "Non-toxic, bio-degradable deep cleaning company catering to 2BHK/3BHK flats, office spaces, and villa post-construction cleanup.",
    highlights: [
      "German Hydro-Vacuum Cleaners",
      "Pet-Safe & Kid-Safe Chemicals",
      "Background Checked Staff",
      "Complete Bathroom Scrubbing"
    ],
    pricingItems: [
      { title: "2BHK Full Home Deep Clean", price: 2499, unit: "package" },
      { title: "Modular Kitchen Deep Scrub", price: 1199, unit: "package" },
      { title: "5-Seater Sofa Upholstery Shampoo", price: 799, unit: "package" }
    ]
  },
  {
    id: "sp-5",
    name: "WoodCraft Custom Carpentry",
    ownerName: "Harpreet Singh",
    category: "Carpenter",
    categoryId: "carpenter",
    rating: 4.8,
    reviewCount: 84,
    location: "Jaipur",
    locality: "Mansarovar",
    distanceKm: 5.2,
    startingPrice: 399,
    priceUnit: "visit",
    availableToday: true,
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    experienceYears: 15,
    completedJobs: 410,
    phone: "+91 93510 55443",
    responseTime: "Within 30 mins",
    about: "Expert craftsman handling teak wood repairs, modular wardrobe fittings, concealed door hinges, and custom study tables.",
    highlights: [
      "Precision Laser Alignment Tools",
      "Custom Furniture Design",
      "Quick Lock Replacement",
      "Termite Wood Treatment"
    ],
    pricingItems: [
      { title: "Carpenter Inspection & Small Fix", price: 399, unit: "per visit" },
      { title: "Smart Lock Installation", price: 699, unit: "per lock" },
      { title: "Hinges & Hydraulic Repair", price: 299, unit: "per door" }
    ]
  },
  {
    id: "sp-6",
    name: "Glow & Grace Home Salon",
    ownerName: "Pooja Sharma",
    category: "Salon & Beauty",
    categoryId: "salon",
    rating: 4.9,
    reviewCount: 230,
    location: "Jaipur",
    locality: "Shyam Nagar",
    distanceKm: 1.5,
    startingPrice: 499,
    priceUnit: "package",
    availableToday: true,
    verified: true,
    badgeText: "Hygienic Mono-Packs",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    experienceYears: 8,
    completedJobs: 950,
    phone: "+91 91160 22334",
    responseTime: "Within 15 mins",
    about: "Premium salon-at-home services using single-use disposable kits and top brands (O3+, L'Oreal, Cheryl's). Total privacy and hygiene.",
    highlights: [
      "100% Single-Use Hygienic Kits",
      "O3+ Facial Specialists",
      "Mess-free Home Service",
      "Experienced Female Estheticians"
    ],
    pricingItems: [
      { title: "Glow Clean-Up & Threading", price: 499, unit: "package" },
      { title: "O3+ Brightening Facial", price: 1499, unit: "package" },
      { title: "Rica Honey Waxing (Full Arms & Legs)", price: 899, unit: "package" }
    ]
  },
  {
    id: "sp-7",
    name: "Apex Scholars Home Academy",
    ownerName: "Er. Deepak Gupta",
    category: "Tutor & Classes",
    categoryId: "tutor",
    rating: 4.9,
    reviewCount: 67,
    location: "Jaipur",
    locality: "Tonk Road",
    distanceKm: 3.8,
    startingPrice: 500,
    priceUnit: "hour",
    availableToday: true,
    verified: true,
    badgeText: "IITian Alumnus",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    experienceYears: 10,
    completedJobs: 230,
    phone: "+91 98280 77665",
    responseTime: "Within 1 hour",
    about: "Personalized 1-on-1 home coaching for Physics, Mathematics, and Chemistry (Class 9th to 12th & JEE Foundation). Regular weekly test series included.",
    highlights: [
      "1-on-1 Personalized Attention",
      "Free 2 Demo Classes",
      "Weekly Progress Dashboard",
      "Conceptual Problem Solving Focus"
    ],
    pricingItems: [
      { title: "Class 9-10 Science & Maths", price: 500, unit: "per hour" },
      { title: "Class 11-12 Physics & Maths", price: 700, unit: "per hour" },
      { title: "Monthly Full Subject Package", price: 6500, unit: "per month" }
    ]
  },
  {
    id: "sp-8",
    name: "ProFix AutoCare Doorstep",
    ownerName: "Karan Johar",
    category: "Mechanic & Auto",
    categoryId: "mechanic",
    rating: 4.7,
    reviewCount: 112,
    location: "Jaipur",
    locality: "Sanganer",
    distanceKm: 6.0,
    startingPrice: 349,
    priceUnit: "service",
    availableToday: true,
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    experienceYears: 11,
    completedJobs: 730,
    phone: "+91 94130 99887",
    responseTime: "Within 25 mins",
    about: "Mobile mechanic van offering doorstep two-wheeler servicing, synthetic oil change, brake adjustments, and emergency car battery jumpstarts.",
    highlights: [
      "Mobile Van Equipped with OBD Scanners",
      "Motul / Castrol Original Oils",
      "Breakdown Assistance in 30 Min",
      "Transparent Parts Invoicing"
    ],
    pricingItems: [
      { title: "Doorstep Two-Wheeler Service", price: 349, unit: "per bike" },
      { title: "Car Battery Emergency Jumpstart", price: 299, unit: "per instance" },
      { title: "Car General Checkup & Fluid Topup", price: 699, unit: "package" }
    ]
  }
];

export const TOP_PROVIDERS: TopProvider[] = [
  {
    id: "tp-1",
    name: "Rajesh Sharma",
    profession: "Master Electrician",
    rating: 4.9,
    reviewsCount: 142,
    location: "Vaishali Nagar, Jaipur",
    experience: "9+ Years",
    completedJobs: 480,
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80",
    bannerBg: "bg-blue-600",
    specialities: ["Solar Wiring", "Smart Home Automation", "Short Circuit Repair"]
  },
  {
    id: "tp-2",
    name: "Manoj Kumar",
    profession: "Senior Hydro Plumber",
    rating: 4.9,
    reviewsCount: 98,
    location: "Malviya Nagar, Jaipur",
    experience: "12+ Years",
    completedJobs: 620,
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    bannerBg: "bg-emerald-600",
    specialities: ["Underground Pipe Fixing", "Pressure Pumps", "Geyser Setup"]
  },
  {
    id: "tp-3",
    name: "Sunita Devi",
    profession: "Deep Clean Specialist",
    rating: 4.9,
    reviewsCount: 176,
    location: "Raja Park, Jaipur",
    experience: "6+ Years",
    completedJobs: 510,
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    bannerBg: "bg-purple-600",
    specialities: ["Flat Deep Cleaning", "Sofa Sanitization", "Eco Chemicals"]
  },
  {
    id: "tp-4",
    name: "Amit Verma",
    profession: "HVAC & AC Specialist",
    rating: 4.8,
    reviewsCount: 215,
    location: "C-Scheme, Jaipur",
    experience: "7+ Years",
    completedJobs: 890,
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    bannerBg: "bg-cyan-600",
    specialities: ["Inverter AC Gas Refill", "Jet Foam Clean", "PCB Repairs"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    customerName: "Vikramaditya S.",
    customerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    location: "Vaishali Nagar",
    rating: 5,
    date: "2 days ago",
    serviceBooked: "Switchboard & MCB Repair",
    providerName: "Sharma Electricals",
    comment: "Rajesh ji arrived within 25 minutes of booking on Sahayak-Local. Fixed our main trip issue cleanly and explained the load division. Extremely professional and courteous!",
    verifiedBooking: true
  },
  {
    id: "rev-2",
    customerName: "Ananya Mehta",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    location: "C-Scheme",
    rating: 5,
    date: "1 week ago",
    serviceBooked: "Split AC Foam Jet Service",
    providerName: "Verma AC Care",
    comment: "The foam jet cleaning restored cooling instantly. The price quoted on the app (₹499) was exactly what was charged. No hidden fees. Will definitely use Sahayak-Local again!",
    verifiedBooking: true
  },
  {
    id: "rev-3",
    customerName: "Rohan Kulkarni",
    customerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    location: "Malviya Nagar",
    rating: 5,
    date: "3 days ago",
    serviceBooked: "Bathroom Leakage Fixing",
    providerName: "Apex Plumbing Solutions",
    comment: "Great discovery platform! Found a top-rated plumber nearby in 2 minutes. Manoj fixed a persistent shower valve leak that 2 other mechanics failed to solve.",
    verifiedBooking: true
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Search",
    subtitle: "Find the service you need.",
    description: "Enter your requirement or browse local categories to find verified professionals right in your neighborhood.",
    icon: "Search"
  },
  {
    step: "02",
    title: "Compare",
    subtitle: "Compare nearby providers.",
    description: "View ratings, customer reviews, distance, response times, and upfront prices before picking a provider.",
    icon: "SlidersHorizontal"
  },
  {
    step: "03",
    title: "Book",
    subtitle: "Choose convenient slot.",
    description: "Select your preferred date, time, and service details with instant confirmation and no upfront payment required.",
    icon: "Calendar"
  },
  {
    step: "04",
    title: "Get Service",
    subtitle: "Hassle-free doorstep service.",
    description: "The verified professional arrives at your location on time with full safety and equipment guarantee.",
    icon: "UserCheck"
  }
];

export const WHY_CHOOSE_US = [
  {
    id: "feat-1",
    title: "Verified Providers",
    description: "Connect with trusted and verified local professionals who undergo strict background checks and identity verification.",
    icon: "ShieldCheck",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: "feat-2",
    title: "Nearby Services",
    description: "Find useful services available right around your location with real-time distance and estimated arrival times.",
    icon: "MapPin",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    id: "feat-3",
    title: "Genuine Reviews",
    description: "Make better decisions using authentic ratings and detailed feedback left by actual neighborhood customers.",
    icon: "Star",
    color: "bg-amber-50 text-amber-600 border-amber-100"
  },
  {
    id: "feat-4",
    title: "Easy Booking",
    description: "Book local services quickly with a simple, transparent process, upfront pricing, and direct communication.",
    icon: "CheckCircle2",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  }
];
