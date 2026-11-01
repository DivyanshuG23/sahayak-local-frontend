"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SavedItem } from "@/data/mockFavorites";
import { FavoriteTabs, FavoriteTabType } from "@/components/favorites/FavoriteTabs";
import { FavoriteCard } from "@/components/favorites/FavoriteCard";
import { EmptyFavorites } from "@/components/favorites/EmptyFavorites";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import {
  HomeIcon,
  ChevronRight,
  Heart,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "@/components/icons/Icons";
import { useAppSelector } from "@/store/hooks";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function FavoritesContent() {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  // Platform state
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Saved items state
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [activeTab, setActiveTab] = useState<FavoriteTabType>("all");

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Remove item from saved list
  const handleRemoveFavorite = (id: string) => {
    const itemToRemove = savedItems.find((i) => i.id === id);
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.providerName}" from your saved list.`);
    }
  };

  // Calculate dynamic tab counts
  const tabCounts = useMemo(() => {
    const all = savedItems.length;
    const providers = savedItems.filter((i) => i.type === "provider").length;
    const services = savedItems.filter((i) => i.type === "service").length;
    return { all, providers, services };
  }, [savedItems]);

  // Filter items by active tab
  const filteredItems = useMemo(() => {
    if (activeTab === "providers") {
      return savedItems.filter((i) => i.type === "provider");
    }
    if (activeTab === "services") {
      return savedItems.filter((i) => i.type === "service");
    }
    return savedItems;
  }, [savedItems, activeTab]);

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
        activePage="favorites"
        isLoggedIn={auth.isAuthenticated}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => router.push("/services")}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Breadcrumb Navigation Bar */}
      <nav className="bg-white border-b border-slate-200/60 py-3 px-4 sm:px-6 lg:px-8 text-xs font-medium text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Saved Favorites</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-6">
        {/* Header Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span>Personal Shortlist</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Your Favorite Providers & Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Quickly rebook top-rated local professionals and saved service packages you trust.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white text-xs space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-300">Saved Professionals:</span>
              <span className="font-extrabold text-blue-400 text-sm">
                {tabCounts.providers} Verified
              </span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-300">Saved Packages:</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {tabCounts.services} Services
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <FavoriteTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />

        {/* Favorites Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <EmptyFavorites activeTab={activeTab} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FavoriteCard
                key={item.id}
                item={item}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Platform Modals */}
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
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500 text-sm font-bold">
          Loading Saved Favorites...
        </div>
      }
    >
      <ProtectedRoute>
        <FavoritesContent />
      </ProtectedRoute>
    </Suspense>
  );
}
