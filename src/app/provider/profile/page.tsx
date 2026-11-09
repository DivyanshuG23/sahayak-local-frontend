"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Camera,
  Pencil,
  X,
  AlertCircle,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import { useUploadAvatarMutation } from "@/services/upload.service";
import { useUpdateMyProviderProfileMutation } from "@/services/provider.service";
import { getApiErrorMessage } from "@/lib/errorUtils";

export default function ProviderProfilePage() {
  const { provider, updateProviderProfile, resetToDefaultProfile, showToast, refetchProfile } =
    useProvider();

  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState(provider.businessName || "");
  const [ownerName, setOwnerName] = useState(provider.ownerName || "");
  const [category, setCategory] = useState(provider.category || "");
  const [city, setCity] = useState(provider.city || "");
  const [address, setAddress] = useState(provider.address || "");
  const [experienceYears, setExperienceYears] = useState(provider.experienceYears || 2);
  const [bio, setBio] = useState(provider.about || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadAvatarApi, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();
  const [updateProfileApi, { isLoading: isUpdatingProfile }] = useUpdateMyProviderProfileMutation();

  const initials = provider.ownerName
    ? provider.ownerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "SP";

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file (PNG, JPG, WebP).");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await uploadAvatarApi(formData).unwrap();
      const newAvatarUrl = res.data?.avatar || (res as any).avatar;
      if (newAvatarUrl) {
        updateProviderProfile({ avatarUrl: newAvatarUrl });
        showToast("Profile avatar uploaded successfully!");
        refetchProfile?.();
      }
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to upload avatar photo."));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileApi({
        businessName: businessName.trim(),
        ownerName: ownerName.trim(),
        category: category.trim(),
        city: city.trim(),
        address: address.trim(),
        experienceYears: Number(experienceYears),
        bio: bio.trim(),
      }).unwrap();

      updateProviderProfile({
        businessName: businessName.trim(),
        ownerName: ownerName.trim(),
        category: category.trim(),
        city: city.trim(),
        address: address.trim(),
        experienceYears: Number(experienceYears),
        about: bio.trim(),
      });

      showToast("Business profile updated successfully on live server!");
      setIsEditing(false);
      refetchProfile?.();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to update profile."));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
            Business Profile & Verification
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage your public storefront details, business credentials, and service areas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            size="sm"
            variant="default"
            onClick={() => {
              setBusinessName(provider.businessName || "");
              setOwnerName(provider.ownerName || "");
              setCategory(provider.category || "");
              setCity(provider.city || "");
              setAddress(provider.address || "");
              setExperienceYears(provider.experienceYears || 2);
              setBio(provider.about || "");
              setIsEditing(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold gap-1.5 h-8 px-3 rounded-xl cursor-pointer"
          >
            <Pencil size={13} />
            <span>Edit Profile</span>
          </Button>

          <Badge
            variant={provider.kycStatus === "verified" ? "emerald" : "blue"}
            className="px-2.5 py-1 text-[11px] sm:text-xs gap-1.5 font-bold"
          >
            <ShieldCheck
              size={13}
              className={provider.kycStatus === "verified" ? "text-emerald-500" : "text-blue-500"}
            />
            <span>{provider.badgeText || "Verified Partner"}</span>
          </Badge>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Edit Business Details</h3>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsEditing(false)}
                className="rounded-full cursor-pointer"
              >
                <X size={16} />
              </Button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Service Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    City Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Full Workshop Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                  About / Bio (Public)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 cursor-pointer"
                >
                  {isUpdatingProfile ? "Saving..." : "Save Live Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Profile Info Card */}
      <Card className="bg-white border-slate-200/80 shadow-2xs overflow-hidden py-0 rounded-xl sm:rounded-2xl">
        {/* Cover Banner */}
        <div className="h-28 sm:h-44 w-full relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Profile Details Header */}
        <CardContent className="p-4 sm:p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 -mt-12 sm:-mt-20 mb-4 sm:mb-6">
            <div className="flex items-end gap-3 sm:gap-4">
              <div className="relative group">
                <Avatar className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl ring-4 ring-white shadow-md bg-white shrink-0">
                  <AvatarImage src={provider.avatarUrl} alt={provider.ownerName} />
                  <AvatarFallback className="rounded-2xl bg-blue-50 text-blue-700 font-black text-xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-0 right-0 p-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                  title="Upload New Photo"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <h1 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight">
                  {provider.businessName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Owner: {provider.ownerName} • {provider.category}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Business Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Workshop Address</div>
                  <div className="text-slate-500">
                    {provider.address || "Local Workshop"}, {provider.city}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Helpline / Phone</div>
                  <div className="text-slate-500">{provider.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Email Address</div>
                  <div className="text-slate-500">{provider.email}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Experience</div>
                  <div className="text-slate-500">{provider.experienceYears || 2} Years Active Experience</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">About Storefront</div>
                <p className="text-slate-600 leading-relaxed">
                  {provider.about || "Verified local service provider on Sahayak-Local."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
