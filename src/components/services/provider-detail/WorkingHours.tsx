"use client";

import React from "react";
import { Clock, CheckCircle2 } from "@/components/icons/Icons";

interface WorkingHoursProps {
  responseTime: string;
}

export const WorkingHours: React.FC<WorkingHoursProps> = ({ responseTime }) => {
  const currentDay = "Tuesday"; // static mock day matching prompt

  const schedule = [
    { day: "Monday", hours: "9:00 AM – 7:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 7:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 7:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 7:00 PM" },
    { day: "Friday", hours: "9:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "Closed (Emergency Only)" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-blue-600" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Working Hours
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Response: <strong className="text-slate-900">{responseTime}</strong>
        </span>
      </div>

      <div className="space-y-2 text-xs font-medium">
        {schedule.map((s) => {
          const isToday = s.day === currentDay;
          return (
            <div
              key={s.day}
              className={`p-3 rounded-xl flex items-center justify-between transition-colors ${
                isToday
                  ? "bg-blue-50 border border-blue-200/80 text-slate-900 font-bold"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{s.day}</span>
                {isToday && (
                  <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </div>
              <span className={s.hours.includes("Closed") ? "text-rose-500 font-bold" : "text-slate-900 font-semibold"}>
                {s.hours}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
