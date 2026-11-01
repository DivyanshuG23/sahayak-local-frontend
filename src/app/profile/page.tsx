"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
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
import {
  INITIAL_USER_PROFILE,
  UserProfile,
  SavedAddress,
  NotificationPreferences,
} from "@/data/mockProfile";
import { CheckCircle2, AlertCircle, LogOut, RotateCcw } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import {
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
} from "@/services/auth.service";
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/services/address.service";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getApiErrorMessage } from "@/lib/errorUtils";

function ProfileContent() {
  const router = useRouter();

  // Redux Auth State
  const auth = useAppSelector((state) => state.auth);

  // 1. Live GET /api/v1/auth/me query
  const {
    data: meData,
    isLoading: isMeLoading,
    isError: isMeError,
    error: meError,
    refetch: refetchMe,
  } = useGetMeQuery(undefined);

  // 2. Mutations
  const [updateMe] = useUpdateMeMutation();
  const [changePasswordApi] = useChangePasswordMutation();
  const [logoutUser] = useLogoutUserMutation();

  // 3. Addresses Queries & Mutations
  const { data: addressesData } = useGetAddressesQuery(undefined, {
    skip: !auth.isAuthenticated,
  });
  const [createAddress] = useCreateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();

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

  // Sync Live /me API data into user profile state
  useEffect(() => {
    const liveUser = meData?.data?.user || auth.user;
    if (liveUser) {
      setUserProfile((prev) => ({
        ...prev,
        fullName: liveUser.fullName || liveUser.name || prev.fullName,
        email: liveUser.email || prev.email,
        phone: liveUser.phone || prev.phone,
        avatarUrl:
          liveUser.avatar ||
          prev.avatarUrl ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        verifiedStatus: Boolean(liveUser.isVerified),
        memberTier:
          liveUser.role === "provider"
            ? "Verified Service Provider"
            : "Verified Customer",
        joinedDate: liveUser.createdAt
          ? new Date(liveUser.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : prev.joinedDate,
      }));
    }
  }, [meData, auth.user]);

  // Map Backend Addresses into UI format
  const currentAddresses: SavedAddress[] = useMemo(() => {
    const rawList = addressesData?.data || [];
    if (!Array.isArray(rawList) || rawList.length === 0) {
      return userProfile.addresses;
    }
    return rawList.map((a: any) => ({
      id: a._id,
      type: (a.addressType || "home").toLowerCase() as "home" | "work" | "other",
      label: (a.addressType || "Home").toUpperCase(),
      name: a.recipientName || userProfile.fullName,
      phone: a.phone || userProfile.phone,
      addressLine: `${a.houseFlatNo || ""}${a.streetAddress ? ", " + a.streetAddress : ""}`,
      landmark: a.landmark || "",
      city: a.city || "Ghaziabad",
      state: a.state || "UP",
      pincode: a.pincode || "201014",
      isDefault: Boolean(a.isDefault),
    }));
  }, [addressesData, userProfile.fullName, userProfile.phone, userProfile.addresses]);

  // Profile Form Handler (PATCH /api/v1/auth/me)
  const handleSaveProfile = async (updatedFields: Partial<UserProfile>) => {
    try {
      const payload: Record<string, any> = {};
      if (updatedFields.fullName !== undefined) payload.fullName = updatedFields.fullName;
      if (updatedFields.phone !== undefined) payload.phone = updatedFields.phone;
      if (updatedFields.avatarUrl !== undefined) payload.avatar = updatedFields.avatarUrl;
      if (updatedFields.bio !== undefined) payload.bio = updatedFields.bio;

      if (Object.keys(payload).length > 0) {
        await updateMe(payload).unwrap();
      }

      setUserProfile((prev) => ({
        ...prev,
        ...updatedFields,
      }));
      showToast("Profile details updated successfully!");
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to update profile details."));
    }
  };

  // Address Handlers (POST /api/v1/addresses)
  const handleAddAddress = async (newAddr: Omit<SavedAddress, "id">) => {
    try {
      await createAddress({
        addressType: newAddr.type,
        houseFlatNo: newAddr.addressLine,
        streetAddress: newAddr.landmark || "",
        city: newAddr.city || "Ghaziabad",
        state: newAddr.state || "UP",
        pincode: newAddr.pincode || "201014",
        isDefault: newAddr.isDefault,
      }).unwrap();
      showToast(`Added address "${newAddr.label}" successfully.`);
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to add address."));
    }
  };

  const handleEditAddress = (id: string, updatedAddr: Partial<SavedAddress>) => {
    setUserProfile((prev) => {
      let updatedAddresses = prev.addresses.map((a) => {
        if (a.id === id) return { ...a, ...updatedAddr };
        if (updatedAddr.isDefault) return { ...a, isDefault: false };
        return a;
      });
      return { ...prev, addresses: updatedAddresses };
    });
    showToast("Address updated.");
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id).unwrap();
      showToast("Address removed successfully.");
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to delete address."));
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      await setDefaultAddress(id).unwrap();
      showToast("Default address updated.");
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to set default address."));
    }
  };

  // Security: Password Change Handler (POST /api/v1/auth/change-password)
  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await changePasswordApi({
        currentPassword,
        newPassword,
      }).unwrap();
      showToast("Password updated successfully!");
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to update password. Check your current password."));
    }
  };

  const handleToggle2FA = () => {
    setUserProfile((prev) => {
      const nextStatus = !prev.security.twoFactorEnabled;
      showToast(nextStatus ? "Two-Factor Authentication enabled." : "Two-Factor Authentication disabled.");
      return {
        ...prev,
        security: { ...prev.security, twoFactorEnabled: nextStatus },
      };
    });
  };

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
  const handleConfirmLogout = async () => {
    setIsLogoutModalOpen(false);
    showToast("Logging out...");
    try {
      await logoutUser().unwrap();
    } catch {
      // Ignore
    }
    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  // Loading State while fetching /auth/me
  if (isMeLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <h3 className="text-sm font-bold text-slate-800">Fetching Your Profile...</h3>
          <p className="text-xs text-slate-500">Connecting to Sahayak-Local backend</p>
        </div>
      </div>
    );
  }

  // Error State with Retry
  if (isMeError) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-rose-200 shadow-xl max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Failed to Load Profile</h3>
            <p className="text-xs text-slate-500 mt-1">
              {getApiErrorMessage(meError, "Could not retrieve your user details.")}
            </p>
          </div>
          <Button
            onClick={() => refetchMe()}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            <RotateCcw size={14} />
            <span>Retry Connection</span>
          </Button>
        </div>
      </div>
    );
  }

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
        isLoggedIn={true}
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
              savedAddressCount={currentAddresses.length}
            />
          </div>

          {/* Main Tab Content Panel */}
          <div className="lg:col-span-8 space-y-8">
            {/* Account Statistics overview on top of profile info */}
            <AccountStats stats={userProfile.stats} />

            {/* Tab 1: Profile Form */}
            {activeTab === "profile" && (
              <ProfileForm
                profile={userProfile}
                onSaveProfile={handleSaveProfile}
              />
            )}

            {/* Tab 2: Saved Addresses */}
            {activeTab === "addresses" && (
              <SavedAddressesSection
                addresses={currentAddresses}
                onAddAddress={handleAddAddress}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
                onSetDefault={handleSetDefaultAddress}
              />
            )}

            {/* Tab 3: Security & Passwords */}
            {activeTab === "security" && (
              <SecuritySection
                loginActivities={userProfile.security.loginActivities}
                twoFactorEnabled={userProfile.security.twoFactorEnabled}
                onToggle2FA={handleToggle2FA}
                onChangePassword={handleChangePassword}
              />
            )}

            {/* Tab 4: Notifications */}
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

      {/* Provider Registration Modal */}
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
                className="flex-1 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmLogout}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
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
      <ProtectedRoute>
        <ProfileContent />
      </ProtectedRoute>
    </Suspense>
  );
}
