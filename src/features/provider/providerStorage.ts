import { ProviderBusinessProfile } from "@/features/provider/types";
import { OnboardingFormData } from "@/features/provider/onboardingTypes";
import { CURRENT_PROVIDER } from "@/data/mockProvider";

export const PROVIDER_STORAGE_KEY = "sahayak_provider_profile";

/**
 * Safely retrieve the stored provider profile from localStorage in browser environments.
 * Returns null during SSR or if no profile is stored.
 */
export function getStoredProviderProfile(): ProviderBusinessProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(PROVIDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.id) {
      return parsed as ProviderBusinessProfile;
    }
  } catch (err) {
    console.warn("Failed to load provider profile from localStorage:", err);
  }

  return null;
}

/**
 * Safely persist the provider profile to localStorage in browser environments.
 */
export function saveStoredProviderProfile(profile: ProviderBusinessProfile): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PROVIDER_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("Failed to save provider profile to localStorage:", err);
  }
}

/**
 * Reset/clear provider storage back to defaults.
 */
export function clearStoredProviderProfile(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(PROVIDER_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear provider profile from localStorage:", err);
  }
}

/**
 * Convert onboarding form submission data into a complete ProviderBusinessProfile.
 */
export function convertOnboardingToProviderProfile(
  formData: OnboardingFormData,
  baseProfile: ProviderBusinessProfile = CURRENT_PROVIDER
): ProviderBusinessProfile {
  // Extract a clean locality prefix from street address if possible
  const addressParts = formData.address.split(",").map((s) => s.trim()).filter(Boolean);
  const locality = addressParts.length > 1
    ? addressParts[1]
    : addressParts[0] || baseProfile.locality;

  return {
    ...baseProfile,
    id: `prov-${formData.category.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-4)}`,
    businessName: formData.businessName.trim() || baseProfile.businessName,
    ownerName: formData.fullName.trim() || baseProfile.ownerName,
    phone: formData.phone.trim() || baseProfile.phone,
    email: formData.email.trim() || baseProfile.email,
    category: formData.category || baseProfile.category,
    categoryId: formData.category.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    about: formData.description.trim() || baseProfile.about,
    experienceYears: formData.experienceYears ?? baseProfile.experienceYears,
    locality: locality,
    address: formData.address.trim() || baseProfile.address || baseProfile.locality,
    city: formData.city || baseProfile.city,
    pincode: formData.pincode.trim(),
    serviceRadiusKm: formData.serviceRadiusKm || baseProfile.serviceRadiusKm,
    workingHours: formData.workingHours.trim() || baseProfile.workingHours,
    emergencyAvailability: formData.emergencyAvailability ?? true,
    startingPrice: formData.startingPrice || 399,
    priceUnit: formData.priceUnit || "per visit",
    servicesOffered: formData.servicesOffered && formData.servicesOffered.length > 0
      ? formData.servicesOffered
      : ["Doorstep Inspection & Diagnostic Check"],
    activeServicesCount: formData.servicesOffered?.length || 1,
    kycStatus: formData.kycDocumentNumber.trim() ? "verified" : "pending",
    availability: "available",
    badgeText: formData.kycDocumentNumber.trim()
      ? "Sahayak Verified Partner"
      : "Sahayak Registered Partner",
  };
}
