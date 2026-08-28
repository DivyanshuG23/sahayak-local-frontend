import React from "react";

export type BookingTabType = "all" | "upcoming" | "completed" | "cancelled";

interface BookingTabsProps {
  activeTab: BookingTabType;
  onTabChange: (tab: BookingTabType) => void;
  counts: {
    all: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
}

export const BookingTabs: React.FC<BookingTabsProps> = ({
  activeTab,
  onTabChange,
  counts
}) => {
  const tabs: { id: BookingTabType; label: string; count: number }[] = [
    { id: "all", label: "All Bookings", count: counts.all },
    { id: "upcoming", label: "Upcoming", count: counts.upcoming },
    { id: "completed", label: "Completed", count: counts.completed },
    { id: "cancelled", label: "Cancelled", count: counts.cancelled }
  ];

  return (
    <div className="w-full border-b border-slate-200/80 overflow-x-auto no-scrollbar scroll-smooth bg-white/60 backdrop-blur-xs rounded-2xl p-1.5 shadow-2xs">
      <nav className="flex gap-1.5 sm:gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
