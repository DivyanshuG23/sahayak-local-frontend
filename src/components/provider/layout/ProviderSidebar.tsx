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
    const props = { size: 19, className: iconClass };

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

    return (
      <Link
        key={item.id}
        href={item.href}
        onClick={onItemClick}
        className={cn(
          "group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 relative",
          isActive
            ? "bg-blue-50/90 text-blue-700 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          {getNavIcon(item.iconName, isActive)}
          <span className="truncate">{item.title}</span>
        </div>

        {/* Optional count badge */}
        {(() => {
          const count =
            item.id === "services"
              ? provider.servicesOffered?.length ?? provider.activeServicesCount
              : item.badgeCount;
          return count !== undefined && count > 0 ? (
            <span
              className={cn(
                "text-[11px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
                item.badgeVariant === "emerald"
                  ? "bg-emerald-100 text-emerald-700"
                  : item.badgeVariant === "blue"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              {count}
            </span>
          ) : null;
        })()}

        {/* Active side indicator accent */}
        {isActive && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r-full" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "w-64 lg:w-72 h-full min-h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between select-none shrink-0",
        className
      )}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <Link
            href="/provider/dashboard"
            onClick={onItemClick}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Building2 size={22} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col">
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
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Service Provider Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Provider Profile Snapshot Box */}
        <div className="p-3 mx-3 my-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center gap-3">
          <div className="relative shrink-0">
            {/* Avatar */}
            <img
              src={provider.avatarUrl}
              alt={provider.ownerName}
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-2xs"
            />
            {/* Real-time Status Indicator Dot */}
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs",
                isOnline ? "bg-emerald-500" : "bg-slate-400"
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
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                ★ {provider.rating}
              </span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-[10px] text-slate-500 font-semibold">
                {isOnline ? "Accepting Jobs" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 space-y-5 py-2">
          {/* Main Menu */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Main Menu
            </p>
            {mainNavItems.map(renderNavLink)}
          </div>

          {/* Account & Finance */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 pt-2">
              Management & Finance
            </p>
            {accountNavItems.map(renderNavLink)}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-100 space-y-2 mt-auto">
        {/* View Public Storefront */}
        <Link
          href="/services/sp-1"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-blue-500" />
            <span>Public Storefront</span>
          </span>
          <ArrowRight size={13} className="text-slate-400" />
        </Link>

        {/* Switch to Consumer View */}
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-xl transition-colors"
        >
          <span>Switch to Customer View</span>
          <ArrowRight size={13} className="text-slate-400" />
        </Link>

        {/* Logout button */}
        <div className="pt-1">
          <Link
            href="/login"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors w-full text-left"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
