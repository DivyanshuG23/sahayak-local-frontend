"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar, ProfileTabType } from "@/components/profile/ProfileSidebar";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { AccountStats } from "@/components/profile/AccountStats";
import { SavedAddressesSection } from "@/components/profile/AddressCard";
import { SecuritySection } from "@/components/profile/SecuritySection";
import { NotificationsSection } from "@/components/profile/NotificationsSection";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import { INITIAL_USER_PROFILE, UserProfile, SavedAddress, NotificationPreferences } from "@/data/mockProfile";
import { CheckCircle2, AlertCircle, LogOut } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

function ProfileContent() {
  const router = useRouter();

  // Navigation & Platform Modals State
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<ProfileTabType>("profile");

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Profile Form Handler
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    showToast("Profile details updated successfully!");
  };

  // Address Handlers
  const handleAddAddress = (newAddr: Omit<SavedAddress, "id">) => {
    const id = `addr-${Date.now()}`;
    const formattedAddr: SavedAddress = { ...newAddr, id };

    setUserProfile((prev) => {
      let updatedAddresses = [...prev.addresses];
      if (newAddr.isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: [...updatedAddresses, formattedAddr],
      };
    });
    showToast(`Added address "${newAddr.label}" to your saved list.`);
  };

  const handleEditAddress = (id: string, updatedAddr: Partial<SavedAddress>) => {
    setUserProfile((prev) => {
      let updatedAddresses = prev.addresses.map((a) => {
        if (a.id === id) {
          return { ...a, ...updatedAddr };
        }
        if (updatedAddr.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      return {
        ...prev,
        addresses: updatedAddresses,
      };
    });
    showToast("Address updated successfully.");
  };

  const handleDeleteAddress = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
    showToast("Address removed from saved list.");
  };

  const handleSetDefaultAddress = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    }));
    showToast("Default address updated.");
  };

  // Security Handlers
  const handleToggle2FA = () => {
    setUserProfile((prev) => {
      const nextStatus = !prev.security.twoFactorEnabled;
      showToast(nextStatus ? "Two-Factor Authentication enabled." : "Two-Factor Authentication disabled.");
      return {
        ...prev,
        security: {
          ...prev.security,
          twoFactorEnabled: nextStatus,
        },
      };
    });
  };

  const handleChangePassword = () => {
    showToast("Password updated successfully.");
  };

  // Notification Handler
  const handleToggleNotification = (key: keyof NotificationPreferences) => {
    setUserProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    showToast("Notification preference updated.");
  };

  // Logout Action
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    showToast("Logged out successfully.");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Navbar */}
      <Navbar
        activePage="profile"
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        {/* Profile Page Header */}
        <ProfileHeader profile={userProfile} />

        {/* Main Profile Layout (Sidebar + Tab Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <ProfileSidebar
              profile={userProfile}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onLogoutClick={() => setIsLogoutModalOpen(true)}
              savedAddressCount={userProfile.addresses.length}
            />
          </div>

          {/* Main Tab Content Panel */}
          <div className="lg:col-span-8 space-y-8">
            {/* Account Statistics overview on top of profile info */}
            <AccountStats stats={userProfile.stats} />

            {/* Tab Render Switch */}
            {activeTab === "profile" && (
              <ProfileForm
                profile={userProfile}
                onSaveProfile={handleSaveProfile}
              />
            )}

            {activeTab === "addresses" && (
              <SavedAddressesSection
                addresses={userProfile.addresses}
                onAddAddress={handleAddAddress}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
                onSetDefault={handleSetDefaultAddress}
              />
            )}

            {activeTab === "security" && (
              <SecuritySection
                loginActivities={userProfile.security.loginActivities}
                twoFactorEnabled={userProfile.security.twoFactorEnabled}
                onToggle2FA={handleToggle2FA}
                onChangePassword={handleChangePassword}
              />
            )}

            {activeTab === "notifications" && (
              <NotificationsSection
                preferences={userProfile.notifications}
                onTogglePreference={handleToggleNotification}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Modals */}
      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSuccess={(bName) => showToast(`Registered "${bName}" successfully on Sahayak-Local!`)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(userName) => showToast(`Welcome back, ${userName}!`)}
      />

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <LogOut size={26} />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">Sign Out of Sahayak-Local?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to log out of your account on this browser?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmLogout}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading Your Profile...</span>
          </div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
