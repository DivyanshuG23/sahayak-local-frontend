"use client";

import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { HeroSection } from "../components/home/HeroSection";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { PopularServicesSection } from "../components/home/PopularServicesSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { WhyChooseUsSection } from "../components/home/WhyChooseUsSection";
import { TopProvidersSection } from "../components/home/TopProvidersSection";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { ProviderCTA } from "../components/home/ProviderCTA";
import { Footer } from "../components/layout/Footer";
import { ServiceDetailModal } from "../components/home/ServiceDetailModal";
import { ProviderRegistrationModal } from "../components/home/ProviderRegistrationModal";
import { AuthModal } from "../components/home/AuthModal";
import { POPULAR_SERVICES, ServiceProvider } from "../data/mockData";
import { CheckCircle2, Heart } from "../components/icons/Icons";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>("Jaipur, Rajasthan");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(["sp-1", "sp-3"]);
  
  // Modals state
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      showToast("Removed from saved favorites.");
    } else {
      setFavorites([...favorites, id]);
      showToast("Added to saved local favorites!");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}" in ${selectedCity}`);
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleQuickCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    showToast(`Filtered by category`);
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactTopProvider = (providerName: string) => {
    const found = POPULAR_SERVICES.find((p) => p.name.includes(providerName.split(" ")[0]));
    if (found) {
      setSelectedProvider(found);
    } else {
      setSelectedProvider(POPULAR_SERVICES[0]);
    }
  };

  // Filter services by search term if typed
  const displayedServices = POPULAR_SERVICES.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.ownerName.toLowerCase().includes(q) ||
      item.locality.toLowerCase().includes(q) ||
      item.highlights.some((h) => h.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenSearch={() => {
          const element = document.getElementById("home");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 2: HERO SECTION */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onSearchSubmit={handleSearchSubmit}
          onQuickCategoryClick={handleQuickCategoryClick}
        />

        {/* Section 3: POPULAR CATEGORIES */}
        <CategoriesSection
          activeCategory={selectedCategory}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug === selectedCategory ? null : slug);
            const element = document.getElementById("services");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Section 4: POPULAR SERVICES NEAR YOU */}
        <PopularServicesSection
          services={displayedServices}
          selectedCategory={selectedCategory}
          onSelectCategoryFilter={setSelectedCategory}
          onSelectProvider={(provider) => setSelectedProvider(provider)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Section 5: HOW IT WORKS */}
        <HowItWorksSection />

        {/* Section 6: WHY CHOOSE SAHAYAK-LOCAL */}
        <WhyChooseUsSection />

        {/* Section 7: TOP RATED PROVIDERS */}
        <TopProvidersSection onContactProvider={handleContactTopProvider} />

        {/* Section 8: CUSTOMER REVIEWS */}
        <ReviewsSection />

        {/* Section 9: PROVIDER CTA */}
        <ProviderCTA onOpenProviderModal={() => setIsProviderModalOpen(true)} />
      </main>

      {/* Section 10: FOOTER */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ServiceDetailModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onBookSuccess={(name, date, time) => {
          showToast(`Successfully requested booking with ${name} for ${date} (${time})!`);
        }}
      />

      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSuccess={(bName) => {
          showToast(`Registered "${bName}" successfully on Sahayak-Local!`);
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(userName) => {
          showToast(`Welcome back, ${userName}!`);
        }}
      />

    </div>
  );
}
