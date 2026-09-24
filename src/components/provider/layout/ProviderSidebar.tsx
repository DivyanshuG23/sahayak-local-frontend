"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  HomeIcon,
  Wrench,
  Calendar,
  Users,
  Star,
  CreditCard,
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  LogOut,
} from "@/components/icons/Icons";
import { PROVIDER_NAV_ITEMS, CURRENT_PROVIDER } from "@/data/mockProvider";
import { ProviderNavItem, ProviderBusinessProfile } from "@/features/provider/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProviderSidebarProps {
  isOnline?: boolean;
  provider?: ProviderBusinessProfile;
  onItemClick?: () => void;
  className?: string;
}

export const ProviderSidebar: React.FC<ProviderSidebarProps> = ({
  isOnline = true,
  provider = CURRENT_PROVIDER,
  onItemClick,
  className,
}) => {
  const pathname = usePathname();

  const getNavIcon = (iconName: string, active: boolean) => {
    const iconClass = cn(
      "shrink-0 transition-colors",
      active ? "text-blue-600" : "text-slate-500 group-hover:text-slate-800"
    );
    const props = { size: 18, className: iconClass };

    switch (iconName) {
      case "HomeIcon":
        return <HomeIcon {...props} />;
      case "Building2":
        return <Building2 {...props} />;
      case "Wrench":
        return <Wrench {...props} />;
      case "Calendar":
        return <Calendar {...props} />;
      case "Users":
        return <Users {...props} />;
      case "Star":
        return <Star {...props} />;
      case "CreditCard":
        return <CreditCard {...props} />;
      case "SlidersHorizontal":
        return <SlidersHorizontal {...props} />;
      default:
        return <Building2 {...props} />;
    }
  };

  const mainNavItems = PROVIDER_NAV_ITEMS.filter((item) => item.section === "main");
  const accountNavItems = PROVIDER_NAV_ITEMS.filter((item) => item.section === "account");

  const renderNavLink = (item: ProviderNavItem) => {
    const isActive =
      pathname === item.href || (item.href !== "/provider/dashboard" && pathname.startsWith(item.href));

    const count =
      item.id === "services"
        ? provider.servicesOffered?.length ?? provider.activeServicesCount
        : item.badgeCount;

    return (
      <Link
        key={item.id}
        href={item.href}
        onClick={onItemClick}
        className={cn(
          "group flex items-center justify-between px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 relative active:scale-[0.98]",
          isActive
            ? "bg-blue-50/90 text-blue-700 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {getNavIcon(item.iconName, isActive)}
          <span className="truncate">{item.title}</span>
        </div>

        {/* Optional count badge */}
        {count !== undefined && count > 0 && (
          <Badge
            variant={
              item.badgeVariant === "emerald"
                ? "emerald"
                : item.badgeVariant === "blue"
                ? "blue"
                : "secondary"
            }
            className="text-[10px] px-1.5 py-0 h-4.5 font-bold shrink-0"
          >
            {count}
          </Badge>
        )}

        {/* Active side indicator accent */}
        {isActive && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r-full" />
        )}
      </Link>
    );
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
    <aside
      className={cn(
        "w-64 lg:w-72 h-full max-h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between select-none shrink-0 overflow-hidden",
        className
      )}
    >
      {/* Top Header & Brand (Fixed / Non-scrolling) */}
      <div className="p-3.5 sm:p-5 shrink-0">
        <Link
          href="/provider/dashboard"
          onClick={onItemClick}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Building2 size={20} className="sm:hidden" strokeWidth={2.2} />
            <Building2 size={22} className="hidden sm:block" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                Sahayak<span className="text-blue-600">-Local</span>
              </span>
              <Badge
                variant="emerald"
                className="text-[9px] px-1.5 py-0 uppercase font-black tracking-wider"
              >
                Partner
              </Badge>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate">
              Service Provider Portal
            </span>
          </div>
        </Link>
      </div>

      <Separator className="shrink-0" />

      {/* Middle Scrollable Section (Profile + Navigation links) */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 space-y-3 sm:space-y-4">
        {/* Provider Profile Snapshot Box with Shadcn Card & Avatar */}
        <Card className="bg-slate-50/80 border-slate-200/70 shadow-2xs py-0">
          <CardContent className="p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
            <div className="relative shrink-0">
              <Avatar className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl ring-2 ring-white shadow-2xs">
                <AvatarImage
                  src={provider.avatarUrl}
                  alt={provider.ownerName}
                  className="rounded-xl"
                />
                <AvatarFallback className="rounded-xl bg-blue-100 text-blue-700 font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Real-time Status Indicator Dot */}
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs",
                  isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                )}
                title={isOnline ? "Online & Receiving Bookings" : "Offline / Paused"}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {provider.businessName}
                </h4>
                <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 truncate font-medium">
                {provider.ownerName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-amber-200 bg-amber-50 text-amber-700 font-bold gap-0.5">
                  ★ {provider.rating}
                </Badge>
                <span className="text-[10px] text-slate-500 font-semibold truncate">
                  {isOnline ? "Accepting Jobs" : "Offline"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Sections */}
        <div className="space-y-4 py-1">
          {/* Main Menu */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Main Menu
            </p>
            {mainNavItems.map(renderNavLink)}
          </div>

          <Separator className="my-2" />

          {/* Account & Finance */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Management & Finance
            </p>
            {accountNavItems.map(renderNavLink)}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section (Anchored / Always visible) */}
      <div className="p-3 border-t border-slate-100 space-y-1 mt-auto shrink-0 bg-white">
        {/* View Public Storefront */}
        <Link href="/services/sp-1" target="_blank" className="block w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between px-3 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl h-8.5"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-blue-500" />
              <span>Public Storefront</span>
            </span>
            <ArrowRight size={13} className="text-slate-400" />
          </Button>
        </Link>

        {/* Switch to Consumer View */}
        <Link href="/" className="block w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between px-3 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-xl h-8.5"
          >
            <span>Switch to Customer View</span>
            <ArrowRight size={13} className="text-slate-400" />
          </Button>
        </Link>

        {/* Logout button */}
        <div className="pt-1">
          <Link href="/login" className="block w-full">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2.5 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl h-8.5"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};
