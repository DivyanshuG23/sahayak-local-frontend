"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Bell,
  Trash2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowRight,
  Check,
  Navigation
} from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { NotificationItemData } from "@/data/mockNotifications";

interface NotificationItemProps {
  notification: NotificationItemData;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onToggleRead,
  onDelete,
}) => {
  // Config icon and color scheme based on notification type
  const getNotificationConfig = () => {
    switch (notification.type) {
      case "booking_confirmed":
        return {
          icon: Calendar,
          iconBg: "bg-blue-100 text-blue-600 border-blue-200",
          dotColor: "bg-blue-600",
          tagLabel: "Booking Confirmed",
          tagVariant: "blue" as const,
        };
      case "service_completed":
        return {
          icon: CheckCircle2,
          iconBg: "bg-emerald-100 text-emerald-600 border-emerald-200",
          dotColor: "bg-emerald-600",
          tagLabel: "Service Completed",
          tagVariant: "emerald" as const,
        };
      case "booking_reminder":
        return {
          icon: Clock,
          iconBg: "bg-amber-100 text-amber-700 border-amber-200",
          dotColor: "bg-amber-500",
          tagLabel: "Booking Reminder",
          tagVariant: "secondary" as const,
        };
      case "provider_update":
        return {
          icon: Navigation,
          iconBg: "bg-indigo-100 text-indigo-600 border-indigo-200",
          dotColor: "bg-indigo-600",
          tagLabel: "En Route",
          tagVariant: "blue" as const,
        };
      case "offer":
        return {
          icon: Tag,
          iconBg: "bg-rose-100 text-rose-600 border-rose-200",
          dotColor: "bg-rose-500",
          tagLabel: "Special Offer",
          tagVariant: "rose" as const,
        };
      case "security":
      default:
        return {
          icon: ShieldCheck,
          iconBg: "bg-slate-100 text-slate-700 border-slate-200",
          dotColor: "bg-slate-500",
          tagLabel: "Security Alert",
          tagVariant: "secondary" as const,
        };
    }
  };

  const config = getNotificationConfig();
  const Icon = config.icon;

  return (
    <div
      className={`rounded-3xl p-5 border transition-all duration-200 group relative flex flex-col sm:flex-row items-start justify-between gap-4 ${
        !notification.isRead
          ? "bg-blue-50/60 border-blue-200/80 shadow-xs ring-1 ring-blue-500/10"
          : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-2xs"
      }`}
    >
      {/* Left: Icon + Unread Dot + Details */}
      <div className="flex items-start gap-4 flex-1">
        {/* Icon Avatar */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${config.iconBg}`}>
            <Icon size={22} />
          </div>

          {/* Unread indicator dot */}
          {!notification.isRead && (
            <span
              className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ${config.dotColor} ring-2 ring-white shadow-xs animate-pulse`}
              title="Unread notification"
            />
          )}
        </div>

        {/* Content Details */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={config.tagVariant} className="text-[10px] py-0 px-2 font-bold">
              {config.tagLabel}
            </Badge>

            {!notification.isRead && (
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider bg-blue-100/80 px-2 py-0.5 rounded-full">
                New
              </span>
            )}

            <span className="text-xs text-slate-400 font-medium ml-auto sm:ml-0">
              {notification.timestamp}
            </span>
          </div>

          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
            {notification.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            {notification.message}
          </p>

          {/* Action Link Button */}
          {notification.actionUrl && (
            <div className="pt-2">
              <Link
                href={notification.actionUrl}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <span>{notification.actionLabel || "View Details"}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions (Mark Read/Unread, Delete) */}
      <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0 pt-2 sm:pt-0">
        <button
          type="button"
          onClick={() => onToggleRead(notification.id)}
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            notification.isRead
              ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              : "text-blue-600 bg-blue-100/70 hover:bg-blue-100"
          }`}
          title={notification.isRead ? "Mark as unread" : "Mark as read"}
        >
          <Check size={15} />
          <span className="hidden md:inline text-[11px]">
            {notification.isRead ? "Read" : "Mark Read"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(notification.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Delete notification"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
