"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  Menu,
  ChevronDown,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2
} from "../icons/Icons";
import { CITIES } from "../../data/mockData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "../ui/sheet";

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenSearch: () => void;
  onOpenProviderModal: () => void;
  onOpenAuthModal: () => void;
  activePage?: "home" | "services" | "businesses" | "how-it-works" | "about";
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  onOpenSearch,
  onOpenProviderModal,
  onOpenAuthModal,
  activePage = "home"
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all duration-200">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
        <Badge variant="emerald" className="py-0.5 px-2 text-[10px] uppercase tracking-wider shrink-0">
          <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
          <span>Verified Platform</span>
        </Badge>
        <span className="hidden sm:inline text-slate-300 text-xs truncate max-w-md">
          Discover 500+ trusted neighborhood professionals in your city.
        </span>
        <button
          onClick={onOpenProviderModal}
          className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors ml-1 cursor-pointer text-xs shrink-0"
        >
          Register as Provider →
        </button>
      </div>

      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">

          {/* Left: Brand Logo & Location Picker */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Building2 size={20} className="sm:hidden" strokeWidth={2.2} />
                <Building2 size={22} className="hidden sm:block" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Sahayak<span className="text-blue-600">-Local</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wide uppercase hidden xs:inline">
                  Trusted Neighborhood Services
                </span>
              </div>
            </Link>

            {/* Desktop Location Selector (Shadcn DropdownMenu) */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 gap-2 bg-slate-100/80 border-slate-200/80 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold rounded-lg"
                    >
                      <MapPin size={14} className="text-blue-600 shrink-0" />
                      <span className="max-w-[130px] truncate">{selectedCity}</span>
                      <ChevronDown size={14} className="text-slate-500 shrink-0" />
                    </Button>
                  }
                />
                <DropdownMenuContent className="w-60" align="start">
                  <DropdownMenuLabel>Select Location</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {CITIES.map((city) => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => onSelectCity(city)}
                      className="justify-between"
                    >
                      <span className="truncate">{city}</span>
                      {selectedCity === city && (
                        <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link href="/">
              <Button
                variant={activePage === "home" ? "secondary" : "ghost"}
                size="sm"
                className={
                  activePage === "home"
                    ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-100/70"
                    : "text-slate-600 font-medium hover:text-slate-900"
                }
              >
                Home
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant={activePage === "services" ? "secondary" : "ghost"}
                size="sm"
                className={
                  activePage === "services"
                    ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-100/70"
                    : "text-slate-600 font-medium hover:text-slate-900"
                }
              >
                Services
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant={activePage === "businesses" ? "secondary" : "ghost"}
                size="sm"
                className={
                  activePage === "businesses"
                    ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-100/70"
                    : "text-slate-600 font-medium hover:text-slate-900"
                }
              >
                Businesses
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="ghost" size="sm" className="text-slate-600 font-medium hover:text-slate-900">
                How It Works
              </Button>
            </Link>
            <Link href="/#why-us">
              <Button variant="ghost" size="sm" className="text-slate-600 font-medium hover:text-slate-900">
                About
              </Button>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenSearch}
              title="Search Services"
              aria-label="Search Services"
              className="text-slate-600 hover:text-blue-600 hover:bg-slate-100"
            >
              <Search size={19} />
            </Button>

            {/* Login Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex gap-1.5 font-semibold text-slate-700 hover:text-blue-600"
            >
              <UserCheck size={16} />
              <span>Login</span>
            </Button>

            {/* Get Started Button */}
            <a href="#services">
              <Button variant="default" size="sm" className="hidden xs:inline-flex px-4 font-semibold">
                Get Started
              </Button>
            </a>

            {/* Mobile Sheet Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Toggle menu"
                      onClick={() => setMobileMenuOpen(true)}
                      className="text-slate-700 hover:bg-slate-100"
                    >
                      <Menu size={22} />
                    </Button>
                  }
                />
                <SheetContent side="right" className="w-[300px] sm:w-[360px] p-5">
                  <SheetHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                        <Building2 size={18} strokeWidth={2.2} />
                      </div>
                      <SheetTitle className="text-base font-extrabold text-slate-900">
                        Sahayak<span className="text-blue-600">-Local</span>
                      </SheetTitle>
                    </div>
                    <SheetDescription>
                      Find & book trusted local service professionals near you.
                    </SheetDescription>
                  </SheetHeader>

                  {/* Location Picker in Sheet */}
                  <div className="my-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <MapPin size={12} className="text-blue-600" />
                      Current City Location
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => onSelectCity(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg text-xs font-semibold py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Navigation Links in Sheet */}
                  <nav className="flex flex-col gap-1 my-2">
                    <a
                      href="#home"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 flex items-center justify-between"
                    >
                      <span>Home</span>
                      <Badge variant="default" className="text-[10px] py-0 px-1.5 bg-blue-600">Main</Badge>
                    </a>
                    <a
                      href="#services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Services
                    </a>
                    <a
                      href="#categories"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Businesses
                    </a>
                    <a
                      href="#how-it-works"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      How It Works
                    </a>
                    <a
                      href="#why-us"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      About Us
                    </a>
                  </nav>

                  {/* Actions in Sheet Footer */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuthModal();
                      }}
                      className="w-full justify-center gap-2 font-semibold text-slate-800"
                    >
                      <UserCheck size={16} />
                      <span>Login / Sign Up</span>
                    </Button>

                    <Button
                      variant="emerald"
                      size="default"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenProviderModal();
                      }}
                      className="w-full justify-center font-semibold"
                    >
                      Join as Service Provider
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
