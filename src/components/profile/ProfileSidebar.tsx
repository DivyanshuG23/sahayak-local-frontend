"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Calendar,
  Heart,
  Bell,
  MapPin,
  Lock,
  LogOut,
  Pencil,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/data/mockProfile";

export type ProfileTabType = "profile" | "addresses" | "stats" | "notifications" | "security";

interface ProfileSidebarProps {
  profile: UserProfile;
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
  onLogoutClick: () => void;
  savedAddressCount: number;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  activeTab,
  onTabChange,
  onLogoutClick,
  savedAddressCount,
}) => {
  const navItems = [
    {
      id: "profile" as ProfileTabType,
      label: "Profile Information",
      icon: User,
      badge: null,
      type: "tab" as const,
    },
    {
      id: "bookings",
      label: "My Bookings",
      icon: Calendar,
      badge: `${profile.stats.totalBookings}`,
      type: "link" as const,
      href: "/my-bookings",
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Heart,
      badge: `${profile.stats.savedProviders}`,
      type: "link" as const,
      href: "/favorites",
    },
    {
      id: "addresses" as ProfileTabType,
      label: "Saved Addresses",
      icon: MapPin,
      badge: `${savedAddressCount}`,
      type: "tab" as const,
    },
    {
      id: "notifications" as ProfileTabType,
      label: "Notifications",
      icon: Bell,
      badge: "2",
      type: "tab" as const,
    },
    {
      id: "security" as ProfileTabType,
      label: "Security & Login",
      icon: Lock,
      badge: null,
      type: "tab" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden text-center space-y-4">
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

        {/* Avatar with Camera/Edit Button */}
        <div className="relative inline-block mx-auto group">
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-blue-50 shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={() => onTabChange("profile")}
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg border-2 border-white transition-colors"
            title="Edit Profile"
          >
            <Pencil size={14} />
          </button>
        </div>

        {/* User Details */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-black text-lg text-slate-900">
            <span>{profile.fullName}</span>
            <ShieldCheck size={16} className="text-emerald-500 fill-emerald-100" />
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Mail size={13} className="text-slate-400 shrink-0" />
            <span className="truncate max-w-[200px]">{profile.email}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Phone size={13} className="text-slate-400 shrink-0" />
            <span>{profile.phone}</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button
          variant={activeTab === "profile" ? "default" : "outline"}
          size="sm"
          onClick={() => onTabChange("profile")}
          className="w-full text-xs font-semibold rounded-xl gap-2 shadow-2xs"
        >
          <Pencil size={13} />
          <span>Edit Profile Details</span>
        </Button>
      </div>

      {/* Navigation Menu (Desktop Sidebar + Mobile Scrollable Pills) */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs space-y-1">
        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">
          Account Navigation
        </div>

        {/* Mobile Horizontal Tabs */}
        <div className="flex lg:flex-col overflow-x-auto pb-2 lg:pb-0 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isTab = item.type === "tab";
            const isActive = isTab && activeTab === item.id;

            if (isTab) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as ProfileTabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all shrink-0 whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? "bg-blue-50/90 text-blue-700 shadow-2xs border border-blue-200/60"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={16}
                      className={isActive ? "text-blue-600" : "text-slate-400"}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge
                        variant={isActive ? "blue" : "secondary"}
                        className="text-[10px] py-0 px-1.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight
                      size={14}
                      className={`hidden lg:block transition-transform ${
                        isActive ? "text-blue-600 translate-x-0.5" : "text-slate-300"
                      }`}
                    />
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shrink-0 whitespace-nowrap lg:whitespace-normal"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-slate-400" />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight size={14} className="hidden lg:block text-slate-300" />
                </div>
              </Link>
            );
          })}

          <div className="w-full h-px bg-slate-100 my-1 hidden lg:block" />

          {/* Logout Trigger */}
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50/80 transition-colors shrink-0 whitespace-nowrap lg:whitespace-normal"
          >
            <div className="flex items-center gap-3">
              <LogOut size={16} className="text-rose-500" />
              <span>Log Out</span>
            </div>
            <ChevronRight size={14} className="hidden lg:block text-rose-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
