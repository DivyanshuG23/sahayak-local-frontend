"use client";

import React from "react";
import { Clock, CheckCircle2 } from "@/components/icons/Icons";

export interface TimeSlot {
  id: string;
  timeRange: string;
  period: "Morning" | "Afternoon" | "Evening";
  badge?: string;
}

interface TimeSlotSelectorProps {
  selectedSlot: string;
  onSelectSlot: (slotRange: string) => void;
}

const TIME_SLOTS: TimeSlot[] = [
  { id: "slot-1", timeRange: "09:00 AM - 12:00 PM", period: "Morning", badge: "Most Popular" },
  { id: "slot-2", timeRange: "12:00 PM - 03:00 PM", period: "Afternoon" },
  { id: "slot-3", timeRange: "03:00 PM - 06:00 PM", period: "Afternoon", badge: "Fastest Arrival" },
  { id: "slot-4", timeRange: "06:00 PM - 09:00 PM", period: "Evening" },
];

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedSlot,
  onSelectSlot,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            <span>Select Time Slot</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Choose a 3-hour arrival window that fits your schedule.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedSlot === slot.timeRange || (selectedSlot === "" && slot.id === "slot-1");

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelectSlot(slot.timeRange)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? "bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                  : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-md">
                    {slot.period}
                  </span>
                  {slot.badge && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {slot.badge}
                    </span>
                  )}
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  {slot.timeRange}
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
              }`}>
                {isSelected && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
