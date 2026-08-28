"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingProgress } from "@/components/booking/BookingProgress";
import { SelectedService } from "@/components/booking/SelectedService";
import { ServiceSelector, ServicePackage } from "@/components/booking/ServiceSelector";
import { DateSelector } from "@/components/booking/DateSelector";
import { TimeSlotSelector } from "@/components/booking/TimeSlotSelector";
import { AddressForm, AddressFormData } from "@/components/booking/AddressForm";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingSuccessModal } from "@/components/booking/BookingSuccessModal";
import { ProviderRegistrationModal } from "@/components/home/ProviderRegistrationModal";
import { AuthModal } from "@/components/home/AuthModal";
import { POPULAR_SERVICES, ServiceProvider } from "@/data/mockData";
import { HomeIcon, ChevronRight, CheckCircle2, Calendar, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerIdParam = searchParams.get("providerId");
  const serviceTitleParam = searchParams.get("serviceTitle");

  // Find selected provider from mock data, default to sp-1 if not found
  const provider: ServiceProvider =
    POPULAR_SERVICES.find((p) => p.id === providerIdParam) || POPULAR_SERVICES[0];

  // Convert provider pricing items into service packages
  const servicePackages: ServicePackage[] = provider.pricingItems.map((item, idx) => ({
    id: `pkg-${idx}`,
    title: item.title,
    price: item.price,
    unit: item.unit,
    description: `Complete ${item.title.toLowerCase()} by certified technician with 30-day Sahayak warranty.`,
    popular: idx === 0,
  }));

  // Initial selected service match
  const matchedService = servicePackages.find((s) => s.title === serviceTitleParam) || servicePackages[0];

  const [selectedService, setSelectedService] = useState<ServicePackage>(matchedService);
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("09:00 AM - 12:00 PM");

  const [selectedCity, setSelectedCity] = useState<string>("Ghaziabad, UP");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<AddressFormData>({
    houseNo: "",
    street: "",
    landmark: "",
    city: "Ghaziabad, UP",
    pincode: "",
    addressType: "Home",
    customerName: "Manoj Prajapati",
    customerPhone: "9876543210",
    customerEmail: "manoj@example.com",
    instructions: "",
    agreeTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [generatedBookingId, setGeneratedBookingId] = useState<string>("SHK-89412");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFormChange = (updated: Partial<AddressFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
    // Clear field error on edit
    const keys = Object.keys(updated);
    if (keys.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        keys.forEach((k) => delete next[k]);
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.houseNo.trim()) newErrors.houseNo = "House No. is required";
    if (!formData.street.trim()) newErrors.street = "Street/Locality is required";
    if (!formData.pincode.trim() || formData.pincode.trim().length < 6) {
      newErrors.pincode = "Valid 6-digit Pincode required";
    }
    if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
    if (!formData.customerPhone.trim() || formData.customerPhone.trim().length < 10) {
      newErrors.customerPhone = "Valid 10-digit mobile required";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Cancellation policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) {
      showToast("Please fill in all required address & contact fields!");
      const formEl = document.getElementById("address-form");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = `SHK-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedBookingId(randomId);
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  const addressSummary = `${formData.houseNo || "House"}, ${formData.street || "Locality"}, ${formData.city}`;
  const totalPayable = Math.max(0, selectedService.price + 20 - 50);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white pb-24 lg:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
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
          <Link href={`/services/${provider.id}`} className="hover:text-blue-600 transition-colors truncate max-w-[150px]">
            <span>{provider.name}</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Booking</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 space-y-6">
        
        {/* Booking Progress Tracker */}
        <BookingProgress currentStep={3} />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols desktop) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Selected Provider Card */}
            <SelectedService
              provider={provider}
              selectedServiceTitle={selectedService.title}
              selectedServicePrice={selectedService.price}
              selectedServiceUnit={selectedService.unit}
            />

            {/* Variant / Service Selector */}
            <ServiceSelector
              services={servicePackages}
              selectedServiceId={selectedService.id}
              onSelectService={(srv) => setSelectedService(srv)}
            />

            {/* Date Selector */}
            <DateSelector
              selectedDate={selectedDate}
              onSelectDate={(date) => setSelectedDate(date)}
            />

            {/* Time Slot Selector */}
            <TimeSlotSelector
              selectedSlot={selectedTimeSlot}
              onSelectSlot={(slot) => setSelectedTimeSlot(slot)}
            />

            {/* Service Address Form */}
            <div id="address-form">
              <AddressForm
                formData={formData}
                onChange={handleFormChange}
                errors={errors}
              />
            </div>

          </div>

          {/* Right Sticky Column (4 cols desktop) */}
          <div className="lg:col-span-4">
            <BookingSummary
              provider={provider}
              selectedServiceTitle={selectedService.title}
              selectedServicePrice={selectedService.price}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              addressSummary={addressSummary}
              onConfirmBooking={handleConfirmBooking}
              isSubmitting={isSubmitting}
            />
          </div>

        </div>

      </main>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-500 font-semibold block">Total Amount</span>
          <span className="text-xl font-black text-slate-900">
            ₹{totalPayable}{" "}
            <span className="text-[11px] text-slate-400 font-normal">({selectedService.title})</span>
          </span>
        </div>

        <Button
          size="lg"
          onClick={handleConfirmBooking}
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md gap-1.5 cursor-pointer"
        >
          <Calendar size={16} />
          <span>{isSubmitting ? "Processing..." : "Confirm Booking"}</span>
        </Button>
      </div>

      {/* Footer */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Booking Success Modal */}
      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingDetails={{
          bookingId: generatedBookingId,
          providerName: provider.name,
          serviceTitle: selectedService.title,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          address: addressSummary,
          totalAmount: totalPayable,
          customerPhone: formData.customerPhone,
        }}
      />

      {/* Shared Modals */}
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

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500 text-sm font-bold">
        Loading Sahayak Booking Experience...
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
