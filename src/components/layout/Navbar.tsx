"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Building2,
  UserCheck
} from "../icons/Icons";
import { CITIES } from "../../data/mockData";

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenSearch: () => void;
  onOpenProviderModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  onOpenSearch,
  onOpenProviderModal,
  onOpenAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
      {/* Top Banner / Announcement */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
          <ShieldCheck size={12} className="text-emerald-400" />
          Verified Local Platform
        </span>
        <span className="hidden sm:inline">Discover 500+ trusted neighborhood professionals in your city.</span>
        <button
          onClick={onOpenProviderModal}
          className="text-blue-400 underline font-semibold hover:text-blue-300 transition-colors ml-1 cursor-pointer"
        >
          Register as Provider →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Brand Logo & Location Picker */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Building2 size={22} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Sahayak<span className="text-blue-600">-Local</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                  Trusted Neighborhood Services
                </span>
              </div>
            </a>

            {/* Location Selector Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 px-3 py-2 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
              >
                <MapPin size={15} className="text-blue-600 shrink-0" />
                <span className="max-w-[130px] truncate">{selectedCity}</span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${cityDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {cityDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCityDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Select Location
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          onSelectCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCity === city
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <MapPin size={13} className="text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              href="#home"
              className="px-3.5 py-2 text-sm font-semibold text-blue-600 bg-blue-50/80 rounded-lg transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Services
            </a>
            <a
              href="#categories"
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Businesses
            </a>
            <a
              href="#how-it-works"
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              How It Works
            </a>
            <a
              href="#why-us"
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              About
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Search Services"
              aria-label="Search Services"
            >
              <Search size={20} />
            </button>

            {/* Login Button */}
            <button
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <UserCheck size={16} />
              <span>Login</span>
            </button>

            {/* Get Started Button */}
            <a
              href="#services"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              Get Started
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {/* Mobile Location Picker */}
          <div className="pb-2 border-b border-slate-100">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Current Location
            </label>
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <nav className="flex flex-col gap-1">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Services
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Businesses
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              About Us
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Login / Sign Up
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProviderModal();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200"
            >
              Join as Service Provider
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
