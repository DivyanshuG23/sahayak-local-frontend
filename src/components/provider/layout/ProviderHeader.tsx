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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
    if (pathname.includes("/provider/bookings")) return "Bookings";
    if (pathname.includes("/provider/customers")) return "Customers";
    if (pathname.includes("/provider/reviews")) return "Reviews";
    if (pathname.includes("/provider/earnings")) return "Earnings";
    if (pathname.includes("/provider/settings")) return "Settings";
    return "Dashboard";
  };

  const initials = provider.ownerName
    ? provider.ownerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "SP";

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-200">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: Mobile Menu Trigger & Page Title */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenMobileMenu}
            className="lg:hidden text-slate-700 hover:bg-slate-100 shrink-0 h-9 w-9"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </Button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight truncate">
                {getPageTitle()}
              </h1>
              <Badge
                variant="emerald"
                className="hidden sm:inline-flex text-[10px] px-1.5 py-0 font-bold gap-1 shrink-0"
              >
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>Verified</span>
              </Badge>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 hidden md:flex items-center gap-1.5 font-medium mt-0.5 truncate">
              <MapPin size={11} className="text-blue-500 shrink-0" />
              <span className="truncate">{provider.locality || provider.address || "Service Area"}, {provider.city}</span>
              <span>•</span>
              <span className="shrink-0">Radius: {provider.serviceRadiusKm} km</span>
            </p>
          </div>
        </div>

        {/* Right Section: Online Toggle, Notifications & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Real-time Online / Offline Availability Toggle */}
          <Button
            variant={isOnline ? "outline" : "secondary"}
            size="sm"
            onClick={onToggleOnline}
            className={cn(
              "h-8 rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all shadow-2xs cursor-pointer select-none gap-1.5 sm:gap-2",
              isOnline
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/80 hover:text-emerald-800"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80"
            )}
            title="Click to toggle real-time booking availability"
          >
            <span
              className={cn(
                "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 transition-all",
                isOnline
                  ? "bg-emerald-500 ring-2 sm:ring-3 ring-emerald-400/40 animate-pulse"
                  : "bg-slate-400"
              )}
            />
            {/* Show short label on mobile, full label on sm+ screens */}
            <span className="inline sm:hidden text-[11px]">
              {isOnline ? "Online" : "Off"}
            </span>
            <span className="hidden sm:inline">
              {isOnline ? "Accepting Jobs" : "Offline"}
            </span>
          </Button>

          {/* Quick Metrics Badge (Desktop only) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold">
            <span className="text-slate-500">Today:</span>
            <Badge variant="emerald" className="px-1.5 py-0 h-4.5 text-[11px] font-bold">
              ₹3,450
            </Badge>
            <Separator orientation="vertical" className="h-3" />
            <Badge variant="blue" className="px-1.5 py-0 h-4.5 text-[11px] font-bold">
              4 Bookings
            </Badge>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                  aria-label="Provider Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                  )}
                </Button>
              }
            />
            <DropdownMenuContent
              align="end"
              className="w-[calc(100vw-1.5rem)] max-w-sm sm:w-80 p-2 shadow-xl border-slate-200"
            >
              <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="blue" className="text-[10px] px-1.5 py-0 h-4 font-bold">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={markAllAsRead}
                    className="text-[11px] text-blue-600 hover:text-blue-700 h-6 px-1.5 font-semibold"
                  >
                    Mark all read
                  </Button>
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
                        "p-2.5 rounded-lg text-left transition-colors cursor-pointer active:bg-slate-100",
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
                  className="text-[11px] text-blue-600 font-bold hover:underline inline-block py-1"
                >
                  View Activity Feed →
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Provider Profile Dropdown using Shadcn DropdownMenu & Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 sm:h-9 px-1 sm:px-2 gap-1.5 sm:gap-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 shrink-0"
                >
                  <Avatar className="w-7 h-7 rounded-lg ring-1 ring-slate-200">
                    <AvatarImage
                      src={provider.avatarUrl}
                      alt={provider.ownerName}
                      className="rounded-lg"
                    />
                    <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[90px]">
                      {provider.ownerName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-none truncate max-w-[90px]">
                      {provider.category}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl border-slate-200">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1.5">
                  <div className="text-xs font-extrabold text-slate-900 truncate">
                    {provider.businessName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate">
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
