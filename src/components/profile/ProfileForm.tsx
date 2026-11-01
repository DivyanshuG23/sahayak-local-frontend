"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Camera,
  Check,
  Upload,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/data/mockProfile";
import {
  useUploadAvatarMutation,
  useUploadSingleMutation,
} from "@/services/upload.service";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface ProfileFormProps {
  profile: UserProfile;
  onSaveProfile: (updatedProfile: Partial<UserProfile>) => Promise<void> | void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSaveProfile,
}) => {
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [dateOfBirth, setDateOfBirth] = useState(profile.dateOfBirth || "");
  const [gender, setGender] = useState(profile.gender || "Male");
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);

  // File upload state & mutations
  const [uploadAvatarApi, { isLoading: isUploadingAvatar }] =
    useUploadAvatarMutation();
  const [uploadSingleApi, { isLoading: isUploadingSingle }] =
    useUploadSingleMutation();

  const isUploading = isUploadingAvatar || isUploadingSingle;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);

  // Synchronize internal state when incoming profile prop updates
  useEffect(() => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setDateOfBirth(profile.dateOfBirth || "");
    setGender(profile.gender || "Male");
    setBio(profile.bio || "");
    setAvatarUrl(profile.avatarUrl);
  }, [profile]);

  // Preset avatar samples for fast selection
  const avatarOptions = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
  ];

  // Trigger native file picker
  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Upload photo handler with validation and automatic Cloudinary face-centering
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setPhotoError(null);
    setPhotoSuccess(null);

    // 1. Validation: Max 5MB file size
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      setPhotoError("Image size must be less than 5MB. Please choose a smaller photo.");
      return;
    }

    // 2. Validation: Image MIME types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Invalid file type. Please upload a JPG, PNG, or WebP image.");
      return;
    }

    // 3. Optimistic local preview
    const objectUrl = URL.createObjectURL(file);
    const previousAvatar = avatarUrl;
    setAvatarUrl(objectUrl);

    try {
      // Step A: Attempt primary POST /api/v1/upload/avatar endpoint
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", file);

      try {
        const res = await uploadAvatarApi(avatarFormData).unwrap();
        const uploadedUrl =
          res.data?.avatar || res.data?.user?.avatar || objectUrl;
        setAvatarUrl(uploadedUrl);
        await onSaveProfile({ avatarUrl: uploadedUrl });
        setPhotoSuccess("Profile photo updated successfully!");
        setTimeout(() => setPhotoSuccess(null), 4000);
        return;
      } catch (avatarErr) {
        // Step B: Fallback attempt with POST /api/v1/upload/single
        const singleFormData = new FormData();
        singleFormData.append("file", file);
        singleFormData.append("type", "avatar");

        const singleRes = await uploadSingleApi(singleFormData).unwrap();
        const uploadedUrl = singleRes.data?.url;
        if (uploadedUrl) {
          setAvatarUrl(uploadedUrl);
          await onSaveProfile({ avatarUrl: uploadedUrl });
          setPhotoSuccess("Profile photo uploaded successfully!");
          setTimeout(() => setPhotoSuccess(null), 4000);
          return;
        }
        throw avatarErr;
      }
    } catch (err: any) {
      // Revert to previous avatar on error
      setAvatarUrl(previousAvatar);
      setPhotoError(
        getApiErrorMessage(
          err,
          "Failed to upload profile photo. Please try again."
        )
      );
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Preset avatar click handler
  const handleSelectPreset = async (url: string) => {
    setAvatarUrl(url);
    setPhotoError(null);
    setPhotoSuccess("Avatar preset selected. Click 'Save Changes' to apply.");
    setTimeout(() => setPhotoSuccess(null), 3000);
  };

  // Profile details form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg(null);
    setPhotoError(null);

    try {
      await onSaveProfile({
        fullName,
        email,
        phone,
        dateOfBirth,
        gender,
        bio,
        avatarUrl,
      });
      setSuccessMsg("Profile information saved successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setPhotoError(getApiErrorMessage(err, "Failed to save profile changes."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            <span>Profile Information</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update your personal details, avatar photo, and contact information.
          </p>
        </div>

        {successMsg && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 animate-in fade-in duration-300">
            <Check size={14} className="text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden Native File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />

        {/* Profile Photo Upload & Preset Selection */}
        <div className="space-y-4 bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Camera size={14} className="text-blue-600" />
              <span>Profile Photo</span>
            </label>

            {photoSuccess && (
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <Check size={13} /> {photoSuccess}
              </span>
            )}
          </div>

          {/* Photo Error Banner */}
          {photoError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold animate-in fade-in">
              <AlertCircle size={15} className="shrink-0 text-rose-500" />
              <span className="flex-1">{photoError}</span>
              <button
                type="button"
                onClick={() => setPhotoError(null)}
                className="text-rose-400 hover:text-rose-600 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Avatar Preview with Camera Overlay */}
            <div className="relative group shrink-0">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-slate-200">
                <img
                  src={avatarUrl}
                  alt={fullName || "Profile Avatar"}
                  className="w-full h-full object-cover"
                />

                {/* Upload Spinner Overlay */}
                {isUploading && (
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-1 text-white">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-[9px] font-bold">Uploading</span>
                  </div>
                )}
              </div>

              {/* Camera Trigger Button on Avatar */}
              <button
                type="button"
                onClick={handleOpenFileDialog}
                disabled={isUploading}
                title="Change Photo"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md border-2 border-white transition-all hover:scale-110 cursor-pointer disabled:opacity-50"
              >
                <Camera size={13} />
              </button>
            </div>

            {/* Action Buttons & Presets */}
            <div className="space-y-3 text-center sm:text-left w-full">
              <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleOpenFileDialog}
                  disabled={isUploading}
                  className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border-slate-300 gap-2 rounded-xl shadow-2xs cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span>Uploading to Cloud...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={14} className="text-blue-600" />
                      <span>Upload New Photo</span>
                    </>
                  )}
                </Button>

                <span className="text-[11px] text-slate-400">
                  JPG, PNG, or WebP (Max 5MB)
                </span>
              </div>

              {/* Avatar Presets */}
              <div className="space-y-1.5 pt-1 border-t border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Or select a quick avatar preset:
                </span>
                <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                  {avatarOptions.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectPreset(url)}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        avatarUrl === url
                          ? "border-blue-600 ring-2 ring-blue-500/30 scale-105"
                          : "border-slate-200 opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                      title={`Select Avatar Preset ${i + 1}`}
                    >
                      <img
                        src={url}
                        alt={`Preset ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User size={13} className="text-slate-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Manoj Prajapati"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail size={13} className="text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manoj.prajapati@example.com"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone size={13} className="text-slate-400" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar size={13} className="text-slate-400" />
              <span>Date of Birth (Optional)</span>
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs cursor-pointer"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Short Bio */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">About Me / Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell local service providers a bit about your preferences..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs resize-none"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Check size={15} />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
