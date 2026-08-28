"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_SAVED_ITEMS, SavedItem } from "@/data/mockFavorites";
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
  ShieldCheck
} from "@/components/icons/Icons";

function FavoritesContent() {
  const router = useRouter();

  // Platform state
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Saved items state
  const [savedItems, setSavedItems] = useState<SavedItem[]>(INITIAL_SAVED_ITEMS);
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
          <span className="text-slate-900 font-bold">Saved Services</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        
        {/* Page Hero Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold border border-rose-200/60">
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              <span>Saved Collection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Saved Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Your favorite local providers and services in one place.
            </p>
          </div>

          {/* Stats Summary Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center flex items-center gap-4 shrink-0 w-full md:w-auto justify-around sm:justify-start">
            <div>
              <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider block">Total Saved</span>
              <span className="text-2xl font-black text-slate-900">{savedItems.length}</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-[11px] text-blue-600 font-extrabold uppercase tracking-wider block">Providers</span>
              <span className="text-2xl font-black text-blue-700">{tabCounts.providers}</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-wider block">Services</span>
              <span className="text-2xl font-black text-rose-600">{tabCounts.services}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <FavoriteTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />

        {/* Favorites Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FavoriteCard
                key={item.id}
                item={item}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyFavorites activeTab={activeTab} />
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="w-6 h-6 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading Saved Services...</span>
          </div>
        </div>
      }
    >
      <FavoritesContent />
    </Suspense>
  );
}
