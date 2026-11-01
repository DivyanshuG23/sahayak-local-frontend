"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { useLogoutUserMutation } from "@/services/auth.service";
import {
  MapPin,
  Search,
  Menu,
  ChevronDown,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2,
  Heart,
  User,
  Bell,
  LogOut
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
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
  activePage?: "home" | "services" | "businesses" | "how-it-works" | "about" | "my-bookings" | "favorites" | "profile" | "notifications" | "login" | "register" | "forgot-password";
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  onOpenSearch,
  onOpenProviderModal,
  onOpenAuthModal,
  isLoggedIn: propIsLoggedIn,
  userName: propUserName,
  onLogout: propOnLogout,
  activePage = "home"
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();

  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : auth.isAuthenticated;
  const userName =
    propUserName && propUserName !== "User"
      ? propUserName
      : auth.user?.fullName || auth.user?.name || "User";

  const onLogout = () => {
    if (propOnLogout) {
      propOnLogout();
    } else {
      logoutUser();
    }
  };

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
        <Link
          href="/provider/onboarding"
          className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors ml-1 cursor-pointer text-xs shrink-0"
        >
          Register as Provider →
        </Link>
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
            {/* === Common links (always visible) === */}
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

            {/* === Landing page only links (not logged in) === */}
            {!isLoggedIn && (
              <>
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
              </>
            )}

            {/* === Logged-in user links === */}
            {isLoggedIn && (
              <>
                <Link href="/my-bookings">
                  <Button
                    variant={activePage === "my-bookings" ? "secondary" : "ghost"}
                    size="sm"
                    className={
                      activePage === "my-bookings"
                        ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-100/70"
                        : "text-slate-600 font-medium hover:text-slate-900"
                    }
                  >
                    My Bookings
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button
                    variant={activePage === "favorites" ? "secondary" : "ghost"}
                    size="sm"
                    className={
                      activePage === "favorites"
                        ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-100/70 flex items-center gap-1.5"
                        : "text-slate-600 font-medium hover:text-slate-900 flex items-center gap-1.5"
                    }
                  >
                    <Heart size={14} className={activePage === "favorites" ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
                    <span>Favorites</span>
                  </Button>
                </Link>
              </>
            )}
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

            {/* === Logged-in: Notifications, Profile dropdown === */}
            {isLoggedIn && (
              <>
                {/* Notifications Button */}
                <Link href="/notifications">
                  <Button
                    variant={activePage === "notifications" ? "secondary" : "ghost"}
                    size="icon"
                    title="Notifications"
                    aria-label="Notifications"
                    className={`relative ${
                      activePage === "notifications"
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                    }`}
                  >
                    <Bell size={19} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                  </Button>
                </Link>

                {/* Profile Link: Directly opens user profile */}
                <Link
                  href={auth.user?.role === "provider" ? "/provider/profile" : "/profile"}
                  title="My Profile"
                >
                  <Button
                    variant={activePage === "profile" ? "secondary" : "ghost"}
                    size="icon"
                    title="Profile"
                    aria-label="Profile"
                    className={`cursor-pointer transition-colors overflow-hidden ${
                      activePage === "profile"
                        ? "bg-blue-50 text-blue-600 ring-2 ring-blue-500/30"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                    }`}
                  >
                    {auth.user?.avatar ? (
                      <img
                        src={auth.user.avatar}
                        alt={auth.user.fullName || "User"}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <User size={19} />
                    )}
                  </Button>
                </Link>
              </>
            )}

            {/* === Not logged in: Login + Get Started === */}
            {!isLoggedIn && (
              <>
                {/* Login Button */}
                <Link href="/login">
                  <Button
                    variant={activePage === "login" ? "secondary" : "outline"}
                    size="sm"
                    className={`hidden sm:inline-flex gap-1.5 font-semibold ${
                      activePage === "login" ? "bg-blue-50 text-blue-700 font-bold border-blue-200" : "text-slate-700 hover:text-blue-600"
                    }`}
                  >
                    <UserCheck size={16} />
                    <span>Login</span>
                  </Button>
                </Link>

                {/* Get Started Button */}
                <a href="#services">
                  <Button variant="default" size="sm" className="hidden xs:inline-flex px-4 font-semibold">
                    Get Started
                  </Button>
                </a>
              </>
            )}

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
                    {/* === Common links === */}
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                        activePage === "home"
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>Home</span>
                      {activePage === "home" && (
                        <Badge variant="default" className="text-[10px] py-0 px-1.5 bg-blue-600">Main</Badge>
                      )}
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activePage === "services"
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Services
                    </Link>
                    <a
                      href="#categories"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activePage === "businesses"
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Businesses
                    </a>

                    {/* === Landing page only links (not logged in) === */}
                    {!isLoggedIn && (
                      <>
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
                      </>
                    )}

                    {/* === Logged-in user links === */}
                    {isLoggedIn && (
                      <>
                        <Link
                          href="/my-bookings"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                            activePage === "my-bookings"
                              ? "text-blue-700 bg-blue-50"
                              : "text-blue-700 bg-blue-50/70 hover:bg-blue-100"
                          }`}
                        >
                          <span>My Bookings</span>
                          <Badge variant="blue" className="text-[10px] py-0 px-1.5">Track</Badge>
                        </Link>
                        <Link
                          href="/favorites"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                            activePage === "favorites"
                              ? "text-rose-700 bg-rose-50"
                              : "text-rose-700 bg-rose-50/70 hover:bg-rose-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Heart size={15} className="text-rose-500 fill-rose-500" />
                            <span>Favorites</span>
                          </div>
                          <Badge variant="rose" className="text-[10px] py-0 px-1.5 bg-rose-500 text-white">Saved</Badge>
                        </Link>
                        <Link
                          href="/notifications"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                            activePage === "notifications"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Bell size={15} className="text-slate-500" />
                            <span>Notifications</span>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                            activePage === "profile"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {auth.user?.avatar ? (
                            <img
                              src={auth.user.avatar}
                              alt={auth.user.fullName || "User"}
                              className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                            />
                          ) : (
                            <User size={15} className="text-slate-500" />
                          )}
                          <span>My Profile</span>
                        </Link>
                      </>
                    )}
                  </nav>

                  {/* Actions in Sheet Footer */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                    {/* === Not logged in: Login + Provider CTA === */}
                    {!isLoggedIn && (
                      <>
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

                        <Link
                          href="/provider/onboarding"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full"
                        >
                          <Button
                            variant="emerald"
                            size="default"
                            className="w-full justify-center font-semibold cursor-pointer"
                          >
                            Join as Service Provider
                          </Button>
                        </Link>
                      </>
                    )}

                    {/* === Logged in: Provider CTA + Logout === */}
                    {isLoggedIn && (
                      <>
                        <Link
                          href="/provider/onboarding"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full"
                        >
                          <Button
                            variant="emerald"
                            size="default"
                            className="w-full justify-center font-semibold cursor-pointer"
                          >
                            Join as Service Provider
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          size="default"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onLogout?.();
                          }}
                          className="w-full justify-center gap-2 font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </Button>
                      </>
                    )}
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
