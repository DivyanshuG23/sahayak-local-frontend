"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  RotateCcw,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import {
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
} from "@/services/provider.service";
import { getApiErrorMessage } from "@/lib/errorUtils";
import { cn } from "@/lib/utils";

const ALL_DAYS = [
  { id: "monday", label: "Mon" },
  { id: "tuesday", label: "Tue" },
  { id: "wednesday", label: "Wed" },
  { id: "thursday", label: "Thu" },
  { id: "friday", label: "Fri" },
  { id: "saturday", label: "Sat" },
  { id: "sunday", label: "Sun" },
];

export default function ProviderSettingsPage() {
  const { provider, showToast } = useProvider();

  // Live Availability Query & Mutation
  const { data: availabilityData, refetch } = useGetAvailabilityQuery();
  const [updateAvailabilityApi, { isLoading: isUpdating }] = useUpdateAvailabilityMutation();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("19:00");

  useEffect(() => {
    if (availabilityData?.data) {
      const a = availabilityData.data;
      if (typeof a.isOnline === "boolean") setIsOnline(a.isOnline);
      if (Array.isArray(a.workingDays)) setSelectedDays(a.workingDays);
      if (Array.isArray(a.timeSlots) && a.timeSlots.length > 0) {
        if (a.timeSlots[0].startTime) setStartTime(a.timeSlots[0].startTime);
        if (a.timeSlots[0].endTime) setEndTime(a.timeSlots[0].endTime);
      }
    }
  }, [availabilityData]);

  const handleToggleDay = (dayId: string) => {
    if (selectedDays.includes(dayId)) {
      if (selectedDays.length <= 1) {
        showToast("You must select at least one working day.");
        return;
      }
      setSelectedDays(selectedDays.filter((d) => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const handleSaveAvailability = async () => {
    try {
      await updateAvailabilityApi({
        isOnline,
        workingDays: selectedDays,
        timeSlots: [
          {
            startTime,
            endTime,
            isAvailable: true,
          },
        ],
      }).unwrap();

      showToast("Availability and working hours saved to server!");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to save availability settings."));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
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
            Provider Availability & Schedule
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Control online status, working days, and job dispatch hours.
          </p>
        </div>

        <Button
          size="sm"
          variant="default"
          disabled={isUpdating}
          onClick={handleSaveAvailability}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 self-start sm:self-auto cursor-pointer h-9 px-4 rounded-xl shadow-xs"
        >
          <CheckCircle2 size={14} />
          <span>{isUpdating ? "Saving..." : "Save Settings"}</span>
        </Button>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs py-0 rounded-xl sm:rounded-2xl">
        {/* Instant Online Dispatch Switch */}
        <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Live Job Dispatch Status
            </h4>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              When online, customers in {provider.city} can book instant doorstep service.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isOnline}
            onClick={() => setIsOnline(!isOnline)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 shadow-inner",
              isOnline ? "bg-emerald-500" : "bg-slate-200"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 bg-white rounded-full block shadow-md transition-transform duration-200 absolute top-0.5",
                isOnline ? "translate-x-6.5" : "translate-x-0.5"
              )}
            />
          </button>
        </div>

        {/* Working Days */}
        <div className="p-4 sm:p-6 space-y-3">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Active Working Days</h4>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              Select which days of the week you accept service appointments.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-1">
            {ALL_DAYS.map((d) => {
              const active = selectedDays.includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleToggleDay(d.id)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                    active
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Hours */}
        <div className="p-4 sm:p-6 space-y-3">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Daily Operating Hours</h4>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              Appointments will only be slotted within these hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-1">
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs font-bold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                Closing Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-xs font-bold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
