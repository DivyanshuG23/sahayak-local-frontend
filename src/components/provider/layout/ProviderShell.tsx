"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProviderSidebar } from "./ProviderSidebar";
import { ProviderHeader } from "./ProviderHeader";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CheckCircle2, Building2, Phone } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { CURRENT_PROVIDER } from "@/data/mockProvider";
import { ProviderBusinessProfile } from "@/features/provider/types";
import { OnboardingFormData } from "@/features/provider/onboardingTypes";
import {
  getStoredProviderProfile,
  saveStoredProviderProfile,
  clearStoredProviderProfile,
  convertOnboardingToProviderProfile,
} from "@/features/provider/providerStorage";

interface ProviderContextType {
  provider: ProviderBusinessProfile;
  isOnline: boolean;
  toggleAvailability: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  showToast: (message: string) => void;
  saveOnboardingData: (data: OnboardingFormData) => void;
  updateProviderProfile: (fields: Partial<ProviderBusinessProfile>) => void;
  resetToDefaultProfile: () => void;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export const useProvider = (): ProviderContextType => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useProvider must be used within a ProviderShell");
  }
  return context;
};

interface ProviderShellProps {
  children: ReactNode;
}

export const ProviderShell: React.FC<ProviderShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isOnboarding = pathname === "/provider/onboarding" || pathname?.startsWith("/provider/onboarding");

  const [provider, setProvider] = useState<ProviderBusinessProfile>(CURRENT_PROVIDER);
  const [isOnline, setIsOnline] = useState<boolean>(CURRENT_PROVIDER.availability === "available");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hydrate provider from localStorage upon client mount (safe against SSR hydration mismatch)
  useEffect(() => {
    const stored = getStoredProviderProfile();
    if (stored) {
      setProvider(stored);
      setIsOnline(stored.availability === "available");
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleAvailability = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    const updatedProfile: ProviderBusinessProfile = {
      ...provider,
      availability: nextState ? "available" : "offline",
    };
    setProvider(updatedProfile);
    saveStoredProviderProfile(updatedProfile);

    showToast(
      nextState
        ? "You are now Online! Accepting incoming booking requests."
        : "You are now Offline. Lead alerts paused."
    );
  };

  const saveOnboardingData = (formData: OnboardingFormData) => {
    const newProfile = convertOnboardingToProviderProfile(formData, provider);
    setProvider(newProfile);
    saveStoredProviderProfile(newProfile);
  };

  const updateProviderProfile = (fields: Partial<ProviderBusinessProfile>) => {
    const updatedProfile: ProviderBusinessProfile = {
      ...provider,
      ...fields,
    };
    setProvider(updatedProfile);
    saveStoredProviderProfile(updatedProfile);
  };

  const resetToDefaultProfile = () => {
    clearStoredProviderProfile();
    setProvider(CURRENT_PROVIDER);
    showToast("Reset to default showcase provider profile.");
  };

  // Dedicated Distraction-Free Layout for Onboarding Flow
  if (isOnboarding) {
    return (
      <ProviderContext.Provider
        value={{
          provider,
          isOnline,
          toggleAvailability,
          mobileSidebarOpen,
          setMobileSidebarOpen,
          showToast,
          saveOnboardingData,
          updateProviderProfile,
          resetToDefaultProfile,
        }}
      >
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
          {/* Top Focused Onboarding Bar */}
          <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <Building2 size={22} strokeWidth={2.2} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                      Sahayak<span className="text-blue-600">-Local</span>
                    </span>
                    <Badge variant="emerald" className="text-[9px] px-1.5 py-0 uppercase font-black tracking-wider">
                      Partner
                    </Badge>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Partner Registration Portal
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70">
                  <Phone size={13} className="text-blue-600" />
                  <span>Partner Desk: <strong>1800-123-SAHAYAK</strong></span>
                </div>
                <Link
                  href="/"
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Exit to Website
                </Link>
              </div>
            </div>
          </header>

          {/* Centered Onboarding Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto">
            {children}
          </main>

          {/* Global Floating Toast */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold">{toastMessage}</span>
            </div>
          )}
        </div>
      </ProviderContext.Provider>
    );
  }

  return (
    <ProviderContext.Provider
      value={{
        provider,
        isOnline,
        toggleAvailability,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        showToast,
        saveOnboardingData,
        updateProviderProfile,
        resetToDefaultProfile,
      }}
    >
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
        <div className="flex flex-1 min-h-screen">
          {/* Desktop Persistent Sidebar */}
          <div className="hidden lg:block sticky top-0 h-screen z-20">
            <ProviderSidebar isOnline={isOnline} provider={provider} />
          </div>

          {/* Mobile Sheet Drawer Sidebar */}
          <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
            <SheetContent
              side="left"
              className="p-0 w-[84vw] max-w-[320px] bg-white border-r border-slate-200 h-full overflow-hidden flex flex-col"
            >
              <div className="sr-only">
                <SheetTitle>Provider Navigation</SheetTitle>
                <SheetDescription>Main navigation menu for provider portal</SheetDescription>
              </div>
              <ProviderSidebar
                isOnline={isOnline}
                provider={provider}
                onItemClick={() => setMobileSidebarOpen(false)}
                className="w-full h-full border-r-0"
              />
            </SheetContent>
          </Sheet>

          {/* Main Content Workspace */}
          <div className="flex-1 flex flex-col min-w-0">
            <ProviderHeader
              isOnline={isOnline}
              provider={provider}
              onToggleOnline={toggleAvailability}
              onOpenMobileMenu={() => setMobileSidebarOpen(true)}
            />

            <main className="flex-1 p-3.5 sm:p-6 lg:p-8 w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>

        {/* Global Floating Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}
      </div>
    </ProviderContext.Provider>
  );
};
