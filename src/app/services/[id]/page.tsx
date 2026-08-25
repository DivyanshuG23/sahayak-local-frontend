"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProviderHeader } from "@/components/services/provider-detail/ProviderHeader";
import { ImageGallery } from "@/components/services/provider-detail/ImageGallery";
import { ProviderStats } from "@/components/services/provider-detail/ProviderStats";
import { ServiceList, ServiceItemData } from "@/components/services/provider-detail/ServiceList";
import { BookingCard } from "@/components/services/provider-detail/BookingCard";
import { WorkingHours } from "@/components/services/provider-detail/WorkingHours";
import { ServiceArea } from "@/components/services/provider-detail/ServiceArea";
import { ReviewSection } from "@/components/services/provider-detail/ReviewSection";
import { TrustSection } from "@/components/services/provider-detail/TrustSection";
import { ReportProviderModal } from "@/components/services/provider-detail/ReportProviderModal";
import { RelatedServices } from "@/components/services/provider-detail/RelatedServices";
import { ServiceDetailModal } from "@/components/home/ServiceDetailModal";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import { POPULAR_SERVICES, ServiceProvider } from "@/data/mockData";
import { CheckCircle2, HomeIcon, ChevronRight, Flag, Calendar, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProviderDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Find provider by ID, fallback to first item if not found
  const provider = POPULAR_SERVICES.find((p) => p.id === resolvedParams.id) || POPULAR_SERVICES[0];

  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  
  // Transform provider pricing items into selectable service list format
  const serviceItems: ServiceItemData[] = provider.pricingItems.map((item, idx) => ({
    id: `item-${idx}`,
    title: item.title,
    description: `Professional ${item.title.toLowerCase()} service carried out by verified technician with 30-day warranty.`,
    price: item.price,
    unit: item.unit,
  }));

  const [selectedService, setSelectedService] = useState<ServiceItemData>(serviceItems[0] || {
    id: "item-0",
    title: `${provider.category} Inspection & Basic Repair`,
    description: "Full safety audit and basic repair service.",
    price: provider.startingPrice,
    unit: provider.priceUnit,
  });

  // State for modals
  const [favorites, setFavorites] = useState<string[]>(["sp-1", "sp-9"]);
  const [selectedModalProvider, setSelectedModalProvider] = useState<ServiceProvider | null>(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

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
      showToast("Saved provider to your local favorites!");
    }
  };

  const handleScrollToBooking = () => {
    const el = document.getElementById("booking-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setSelectedModalProvider(provider);
    }
  };

  const handleContinueBooking = (date: string, time: string, address: string) => {
    showToast(`Booking request generated for ${selectedService.title} on ${date} (${time})!`);
    setSelectedModalProvider(provider);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white pb-20 md:pb-0">
      
      {/* Toast Banner Notification */}
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
          <Link href="/services" className="hover:text-blue-600 transition-colors">
            <span>Services</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <Link href={`/services?category=${provider.categoryId}`} className="hover:text-blue-600 transition-colors">
            <span>{provider.category}</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-[200px]">{provider.name}</span>
        </div>
      </nav>

      {/* Main Page Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 flex-1">
        
        {/* Section 1: Provider Profile Header */}
        <ProviderHeader
          provider={provider}
          isFavorite={favorites.includes(provider.id)}
          onToggleFavorite={handleToggleFavorite}
          onBookClick={handleScrollToBooking}
          onContactClick={() => {
            showToast(`Call line: ${provider.phone} (Direct provider WhatsApp available)`);
          }}
          onShareClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            showToast("Copied provider profile link to clipboard!");
          }}
        />

        {/* Section 2: Image Gallery */}
        <ImageGallery
          mainImageUrl={provider.imageUrl}
          providerName={provider.name}
        />

        {/* Section 3: Credentials Horizontal Stats Strip */}
        <ProviderStats
          rating={provider.rating}
          reviewCount={provider.reviewCount}
          experienceYears={provider.experienceYears}
          completedJobs={provider.completedJobs}
          responseTime={provider.responseTime}
        />

        {/* 2-Column Split Layout: 70% Content + 30% Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 70% Provider Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About Provider Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                About {provider.name}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {provider.about}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {provider.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-xl border border-blue-100">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Offered Selectable List */}
            <ServiceList
              services={serviceItems}
              selectedServiceId={selectedService.id}
              onSelectService={(item) => setSelectedService(item)}
            />

            {/* Working Hours Schedule */}
            <WorkingHours responseTime={provider.responseTime} />

            {/* Service Area & Map */}
            <ServiceArea locality={provider.locality} location={provider.location} />

            {/* Customer Reviews & Ratings */}
            <ReviewSection
              providerName={provider.name}
              rating={provider.rating}
              reviewCount={provider.reviewCount}
            />

            {/* Trust & Safety Banner */}
            <TrustSection />

            {/* Report Provider Action */}
            <div className="bg-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Flag size={16} className="text-rose-500 shrink-0" />
                <span>Have an issue or safety concern with this provider?</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReportModalOpen(true)}
                className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs font-bold rounded-xl cursor-pointer"
              >
                Report Provider
              </Button>
            </div>

          </div>

          {/* Right Column: 30% Sticky Booking Card */}
          <div id="booking-card" className="lg:col-span-4">
            <BookingCard
              selectedService={selectedService}
              providerName={provider.name}
              onContinueBooking={handleContinueBooking}
            />
          </div>

        </div>

        {/* Section 4: Related Services / Similar Providers */}
        <RelatedServices
          currentProviderId={provider.id}
          category={provider.category}
          allProviders={POPULAR_SERVICES}
          onSelectProvider={(relProvider) => {
            router.push(`/services/${relProvider.id}`);
          }}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

      </main>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-500 font-semibold block">Total Price</span>
          <span className="text-lg font-black text-slate-900">
            ₹{selectedService.price}{" "}
            <span className="text-xs text-slate-500 font-normal">({selectedService.title})</span>
          </span>
        </div>

        <Button
          size="lg"
          onClick={handleScrollToBooking}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md gap-1.5 cursor-pointer"
        >
          <Calendar size={16} />
          <span>Book Now</span>
        </Button>
      </div>

      {/* Shared Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ServiceDetailModal
        provider={selectedModalProvider}
        onClose={() => setSelectedModalProvider(null)}
        onBookSuccess={(name, date, time) => {
          showToast(`Successfully booked ${selectedService.title} with ${name} for ${date} (${time})!`);
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

      <ReportProviderModal
        providerName={provider.name}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={() => {
          showToast("Thank you. Safety report submitted to Sahayak-Local support team.");
        }}
      />

    </div>
  );
}
