"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  User,
  SlidersHorizontal,
  CreditCard,
  Building2,
  LogOut,
  Clock,
  MapPin,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CURRENT_PROVIDER, PROVIDER_NOTIFICATIONS } from "@/data/mockProvider";
import { ProviderNotification, ProviderBusinessProfile } from "@/features/provider/types";
import { cn } from "@/lib/utils";

interface ProviderHeaderProps {
  isOnline: boolean;
  provider?: ProviderBusinessProfile;
  onToggleOnline: () => void;
  onOpenMobileMenu: () => void;
}

export const ProviderHeader: React.FC<ProviderHeaderProps> = ({
  isOnline,
  provider = CURRENT_PROVIDER,
  onToggleOnline,
  onOpenMobileMenu,
}) => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<ProviderNotification[]>(PROVIDER_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Determine current page title based on route
  const getPageTitle = () => {
    if (pathname.includes("/provider/profile")) return "Business Profile";
    if (pathname.includes("/provider/services")) return "My Services";
    if (pathname.includes("/provider/bookings")) return "Bookings Management";
    if (pathname.includes("/provider/customers")) return "Customers Directory";
    if (pathname.includes("/provider/reviews")) return "Ratings & Reviews";
    if (pathname.includes("/provider/earnings")) return "Earnings & Payouts";
    if (pathname.includes("/provider/settings")) return "Provider Settings";
    return "Dashboard Overview";
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-200">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu Trigger & Page Title */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenMobileMenu}
            className="lg:hidden text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {getPageTitle()}
              </h1>
              <Badge
                variant="emerald"
                className="hidden sm:inline-flex text-[10px] px-1.5 py-0 font-bold gap-1"
              >
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>Verified Provider</span>
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:flex items-center gap-1.5 font-medium mt-0.5">
              <MapPin size={11} className="text-blue-500 shrink-0" />
              <span>{provider.locality || provider.address || "Service Area"}, {provider.city}</span>
              <span>•</span>
              <span>Radius: {provider.serviceRadiusKm} km</span>
            </p>
          </div>
        </div>

        {/* Right Section: Online Toggle, Quick Stats, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Real-time Online / Offline Availability Toggle */}
          <button
            onClick={onToggleOnline}
            type="button"
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs cursor-pointer select-none",
              isOnline
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/80"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80"
            )}
            title="Click to toggle real-time booking availability"
          >
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full shrink-0 transition-all",
                isOnline
                  ? "bg-emerald-500 ring-4 ring-emerald-400/30 animate-pulse"
                  : "bg-slate-400"
              )}
            />
            <span className="hidden xs:inline">
              {isOnline ? "Accepting Jobs" : "Offline"}
            </span>
          </button>

          {/* Quick Metrics Badge (Desktop only) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold">
            <span className="text-slate-500">Today:</span>
            <span className="text-emerald-600 font-bold">₹3,450</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-600 font-bold">4 Bookings</span>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl"
                  aria-label="Provider Notifications"
                >
                  <Bell size={19} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                  )}
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl border-slate-200">
              <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="py-1 max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={cn(
                        "p-2.5 rounded-lg text-left transition-colors cursor-pointer",
                        notif.isRead ? "hover:bg-slate-50 opacity-80" : "bg-blue-50/40 hover:bg-blue-50/70"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 leading-snug">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {notif.timeAgo}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-1.5 border-t border-slate-100 text-center">
                <Link
                  href="/provider/dashboard"
                  className="text-[11px] text-blue-600 font-bold hover:underline"
                >
                  View Activity Feed →
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Provider Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer select-none"
                >
                  <img
                    src={provider.avatarUrl}
                    alt={provider.ownerName}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {provider.ownerName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-none">
                      {provider.category}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl border-slate-200">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1.5">
                  <div className="text-xs font-extrabold text-slate-900">
                    {provider.businessName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {provider.email}
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={
                    <Link
                      href="/provider/profile"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 w-full"
                    >
                      <Building2 size={15} className="text-slate-400" />
                      <span>Business Profile</span>
                    </Link>
                  }
                />

                <DropdownMenuItem
                  render={
                    <Link
                      href="/provider/services"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 w-full"
                    >
                      <SlidersHorizontal size={15} className="text-slate-400" />
                      <span>Manage Services ({provider.servicesOffered?.length || provider.activeServicesCount})</span>
                    </Link>
                  }
                />

                <DropdownMenuItem
                  render={
                    <Link
                      href="/provider/earnings"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 w-full"
                    >
                      <CreditCard size={15} className="text-slate-400" />
                      <span>Payouts & Earnings</span>
                    </Link>
                  }
                />

                <DropdownMenuItem
                  render={
                    <Link
                      href="/services/sp-1"
                      target="_blank"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 w-full"
                    >
                      <CheckCircle2 size={15} className="text-blue-500" />
                      <span>View Public Profile</span>
                    </Link>
                  }
                />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 w-full"
                    >
                      <User size={15} className="text-slate-400" />
                      <span>Switch to Customer View</span>
                    </Link>
                  }
                />

                <DropdownMenuItem
                  variant="destructive"
                  render={
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 w-full"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </Link>
                  }
                />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
