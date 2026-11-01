"use client";

import React from "react";
import Link from "next/link";
import { HomeIcon, ChevronRight, User, ShieldCheck, Sparkles, Calendar } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/data/mockProfile";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation Bar */}
      <nav className="bg-white border border-slate-200/80 rounded-2xl py-3 px-4 sm:px-6 text-xs font-medium text-slate-500 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold flex items-center gap-1">
            <User size={13} className="text-blue-600" />
            My Profile
          </span>
        </div>
      </nav>

      {/* Page Hero Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Background Decorative Accents */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10 max-w-2xl">
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white/20 shadow-xl shrink-0"
          />

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span>{profile.memberTier}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-400" /> Verified Account
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">{profile.fullName}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Manage your personal information, saved addresses, service preferences, and account security.
            </p>
          </div>
        </div>

        {/* Quick Account Info Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-slate-200 text-xs space-y-2 shrink-0 w-full md:w-auto">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400 font-medium">Member Since</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <Calendar size={13} className="text-blue-400" />
              {profile.joinedDate}
            </span>
          </div>
          <div className="w-full h-px bg-white/10" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400 font-medium">Account Status</span>
            <Badge variant="emerald" className="py-0 px-2 text-[10px]">
              Active & Protected
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
