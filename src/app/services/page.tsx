"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrustStrip } from "@/components/services/TrustStrip";
import { ServiceSearch } from "@/components/services/ServiceSearch";
import { ServiceSort } from "@/components/services/ServiceSort";
import { ServiceFilters } from "@/components/services/ServiceFilters";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { ServiceDetailModal } from "@/components/home/ServiceDetailModal";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import { POPULAR_SERVICES, ServiceProvider, CATEGORIES } from "@/data/mockData";
import { ServiceFilterState, SortOption } from "@/features/services/types";
import { CheckCircle2, HomeIcon, ChevronRight, SlidersHorizontal } from "@/components/icons/Icons";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function ServicesPage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  
  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("Electrician");
  const [locationTerm, setLocationTerm] = useState<string>("Ghaziabad");
  
  // Filters state
  const [filters, setFilters] = useState<ServiceFilterState>({
    category: "electrician",
    distanceMax: 50,
    priceRange: [200, 2000],
    ratingMin: 0,
    availableToday: false,
    availableNow: false,
    verifiedOnly: false,
    topRatedOnly: false,
  });

  // Sort state
  const [sortOption, setSortOption] = useState<SortOption>("recommended");

  // Mobile filters sheet state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(["sp-1", "sp-9"]);

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
      showToast("Removed provider from saved favorites.");
    } else {
      setFavorites([...favorites, id]);
      showToast("Added provider to your saved local favorites!");
    }
  };

  const handleFilterChange = (updated: Partial<ServiceFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      distanceMax: 50,
      priceRange: [200, 3000],
      ratingMin: 0,
      availableToday: false,
      availableNow: false,
      verifiedOnly: false,
      topRatedOnly: false,
    });
    showToast("Cleared all active filters.");
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setLocationTerm("");
    handleResetFilters();
  };

  const handleQuickCategoryClick = (categorySlug: string) => {
    setFilters((prev) => ({ ...prev, category: categorySlug }));
    const foundCategory = CATEGORIES.find((c) => c.slug === categorySlug);
    if (foundCategory) {
      setSearchTerm(foundCategory.name);
      showToast(`Showing ${foundCategory.name} services`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Searching for "${searchTerm || "all services"}" in ${locationTerm || "your location"}`);
  };

  // Active filter count logic
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.distanceMax < 50) count++;
    if (filters.priceRange[1] < 3000) count++;
    if (filters.ratingMin > 0) count++;
    if (filters.availableToday) count++;
    if (filters.verifiedOnly) count++;
    return count;
  }, [filters]);

  // Filtering and Sorting Process
  const filteredAndSortedServices = useMemo(() => {
    return POPULAR_SERVICES.filter((provider) => {
      // Search Term Matching
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = provider.name.toLowerCase().includes(q);
        const matchesCategory = provider.category.toLowerCase().includes(q);
        const matchesLocality = provider.locality.toLowerCase().includes(q);
        const matchesOwner = provider.ownerName.toLowerCase().includes(q);
        const matchesHighlight = provider.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory && !matchesLocality && !matchesOwner && !matchesHighlight) {
          return false;
        }
      }

      // Location Term Matching
      if (locationTerm.trim()) {
        const loc = locationTerm.toLowerCase();
        const matchesLoc = provider.location.toLowerCase().includes(loc) || provider.locality.toLowerCase().includes(loc);
        if (!matchesLoc) return false;
      }

      // Category Filter
      if (filters.category !== "all") {
        if (provider.categoryId.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Distance Filter
      if (provider.distanceKm > filters.distanceMax) {
        return false;
      }

      // Price Range Filter
      if (provider.startingPrice > filters.priceRange[1]) {
        return false;
      }

      // Rating Filter
      if (provider.rating < filters.ratingMin) {
        return false;
      }

      // Available Today Filter
      if (filters.availableToday && !provider.availableToday) {
        return false;
      }

      // Verified Filter
      if (filters.verifiedOnly && !provider.verified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "rating-desc") return b.rating - a.rating;
      if (sortOption === "price-asc") return a.startingPrice - b.startingPrice;
      if (sortOption === "price-desc") return b.startingPrice - a.startingPrice;
      if (sortOption === "distance-asc") return a.distanceKm - b.distanceKm;
      // Default: recommended balance score
      return (b.rating * 2 + (b.verified ? 1 : 0)) - (a.rating * 2 + (a.verified ? 1 : 0));
    });
  }, [searchTerm, locationTerm, filters, sortOption]);

  // Derived Title for Results Header
  const activeCategoryObj = CATEGORIES.find((c) => c.slug === filters.category);
  const categoryDisplayTitle = activeCategoryObj ? `${activeCategoryObj.name} Services` : searchTerm ? `"${searchTerm}" Services` : "Local Services";

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
        activePage="services"
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          const cityNameOnly = city.split(",")[0];
          setLocationTerm(cityNameOnly);
        }}
        onOpenSearch={() => {
          const el = document.getElementById("search-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Breadcrumb Navigation Bar */}
      <nav className="bg-white border-b border-slate-200/60 py-3 px-4 sm:px-6 lg:px-8 text-xs font-medium text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <Link href="/services" className="hover:text-blue-600 transition-colors">
            <span>Services</span>
          </Link>
          {activeCategoryObj && (
            <>
              <ChevronRight size={12} className="text-slate-400" />
              <span className="text-slate-900 font-bold">{activeCategoryObj.name}</span>
            </>
          )}
        </div>
      </nav>

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* Search Header Section */}
        <section id="search-section">
          <ServiceSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            locationTerm={locationTerm}
            setLocationTerm={setLocationTerm}
            onSearchSubmit={handleSearchSubmit}
            onQuickCategoryClick={handleQuickCategoryClick}
            selectedCategory={filters.category}
          />
        </section>

        {/* Results Sort & Summary Bar */}
        <ServiceSort
          categoryTitle={categoryDisplayTitle}
          locationName={locationTerm || selectedCity.split(",")[0]}
          totalResults={filteredAndSortedServices.length}
          currentSort={sortOption}
          onSortChange={setSortOption}
          onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* 2-Column Desktop Layout: Left Sidebar + Right Results Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Left Sidebar: Filters */}
            <aside className="hidden lg:block lg:col-span-3">
              <ServiceFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
              />
            </aside>

            {/* Right Column: Service Cards Grid */}
            <div className="lg:col-span-9">
              <ServiceGrid
                services={filteredAndSortedServices}
                onSelectProvider={(provider) => router.push(`/services/${provider.id}`)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onResetFilters={handleResetFilters}
                onResetSearch={handleResetSearch}
              />
            </div>

          </div>
        </div>

      </main>

      {/* Mobile Filters Sheet/Drawer */}
      <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
        <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b border-slate-100">
            <SheetTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-blue-600" />
              <span>Filter Services</span>
            </SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <ServiceFilters
              filters={filters}
              onFilterChange={(updated) => {
                handleFilterChange(updated);
              }}
              onResetFilters={() => {
                handleResetFilters();
                setIsMobileFiltersOpen(false);
              }}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Shared Footer */}
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
