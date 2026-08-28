"use client";

import React, { useMemo } from "react";
import { Calendar, CheckCircle2 } from "@/components/icons/Icons";

interface DateOption {
  fullDateString: string;
  dayLabel: string;
  dateLabel: string;
  badge?: string;
}

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (dateString: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  // Generate next 6 consecutive dates starting from today
  const dates: DateOption[] = useMemo(() => {
    const list: DateOption[] = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthName = d.toLocaleDateString("en-US", { month: "short" });
      const dayNum = d.getDate();

      let dayLabel = dayName;
      let badge: string | undefined = undefined;

      if (i === 0) {
        dayLabel = "Today";
        badge = "Fastest";
      } else if (i === 1) {
        dayLabel = "Tomorrow";
      }

      const dateLabel = `${monthName} ${dayNum}`;
      const fullDateString = i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${dayName}, ${dateLabel}`;

      list.push({
        fullDateString,
        dayLabel,
        dateLabel,
        badge,
      });
    }

    return list;
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            <span>Select Service Date</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Choose your preferred date for technician visit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {dates.map((d) => {
          const isSelected = selectedDate === d.fullDateString || (selectedDate === "" && d.dayLabel === "Today");

          return (
            <button
              key={d.fullDateString}
              type="button"
              onClick={() => onSelectDate(d.fullDateString)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 relative ${
                isSelected
                  ? "bg-blue-600 text-white font-extrabold border-blue-600 shadow-md ring-2 ring-blue-500/20 scale-[1.02]"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 font-medium"
              }`}
            >
              {d.badge && (
                <span
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm ${
                    isSelected
                      ? "bg-amber-400 text-slate-950"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {d.badge}
                </span>
              )}

              <div className="text-xs font-black uppercase tracking-wider pt-1">
                {d.dayLabel}
              </div>

              <div className={`text-sm font-black ${isSelected ? "text-white" : "text-slate-900"}`}>
                {d.dateLabel}
              </div>

              {isSelected && (
                <CheckCircle2 size={14} className="text-blue-200 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};
