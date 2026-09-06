export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export interface PersonalInfoData {
  fullName: string;
  phone: string;
  email: string;
}

export interface BusinessInfoData {
  businessName: string;
  category: string;
  description: string;
  experienceYears: number;
}

export interface ServiceInfoData {
  servicesOffered: string[];
  startingPrice: number;
  priceUnit: string;
  workingHours: string;
  emergencyAvailability: boolean;
}

export interface LocationInfoData {
  address: string;
  city: string;
  pincode: string;
  serviceRadiusKm: number;
}

export interface KycInfoData {
  kycDocumentType: "Aadhaar Card" | "PAN Card" | "GST / Trade License";
  kycDocumentNumber: string;
  termsAccepted: boolean;
}

export interface OnboardingFormData
  extends PersonalInfoData,
    BusinessInfoData,
    ServiceInfoData,
    LocationInfoData,
    KycInfoData {}

export const INITIAL_ONBOARDING_DATA: OnboardingFormData = {
  // Step 1: Personal
  fullName: "",
  phone: "",
  email: "",

  // Step 2: Business
  businessName: "",
  category: "Electrician",
  description: "",
  experienceYears: 3,

  // Step 3: Service
  servicesOffered: ["Basic Inspection & Diagnostic Repair"],
  startingPrice: 399,
  priceUnit: "per visit",
  workingHours: "09:00 AM - 08:00 PM (Mon - Sat)",
  emergencyAvailability: true,

  // Step 4: Location
  address: "",
  city: "Jaipur, Rajasthan",
  pincode: "",
  serviceRadiusKm: 15,

  // Step 5: KYC & Submit
  kycDocumentType: "Aadhaar Card",
  kycDocumentNumber: "",
  termsAccepted: false,
};
