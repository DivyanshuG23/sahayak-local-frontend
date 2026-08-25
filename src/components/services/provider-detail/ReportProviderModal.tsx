"use client";

import React, { useState } from "react";
import { Flag, X, CheckCircle2 } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface ReportProviderModalProps {
  providerName: string;
  isOpen: boolean;
  onClose: () => void;
  onReportSubmitted: () => void;
}

export const ReportProviderModal: React.FC<ReportProviderModalProps> = ({
  providerName,
  isOpen,
  onClose,
  onReportSubmitted,
}) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReportSubmitted();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[340px] sm:w-[420px] p-6 space-y-6">
        <SheetHeader className="space-y-1">
          <SheetTitle className="text-lg font-black text-rose-600 flex items-center gap-2">
            <Flag size={20} />
            <span>Report Provider</span>
          </SheetTitle>
          <SheetDescription className="text-xs text-slate-500 font-medium">
            Flag inappropriate behavior, incorrect pricing, or safety concerns regarding {providerName}.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              Reason for Report
            </label>
            <select
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="">Select a reason...</option>
              <option value="pricing">Incorrect or misleading pricing</option>
              <option value="behavior">Unprofessional conduct or tardiness</option>
              <option value="impersonation">Identity or fake credentials issue</option>
              <option value="other">Other issue</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              Additional Details
            </label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md gap-2 cursor-pointer"
          >
            <Flag size={15} />
            <span>Submit Safety Report</span>
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
