import React, { useState } from "react";
import { BookingItem } from "@/data/mockBookings";
import { X, Flag, Check } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ReportIssueModalProps {
  booking: BookingItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmitIssue: (issueType: string, description: string) => void;
}

const ISSUE_TYPES = [
  "Provider did not arrive / Late arrival",
  "Poor quality of service",
  "Incorrect billing / extra charges",
  "Unprofessional behavior",
  "Property damage issue",
  "Other concern"
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmitIssue
}) => {
  const [selectedIssue, setSelectedIssue] = useState(ISSUE_TYPES[0]);
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitIssue(selectedIssue, details);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600 font-extrabold text-lg">
            <Flag size={20} />
            <span>Report an Issue</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Booking ID: <strong>#{booking.id}</strong> ({booking.serviceTitle})
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Issue Category
            </label>
            <div className="space-y-1.5">
              {ISSUE_TYPES.map((issue) => (
                <label
                  key={issue}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    selectedIssue === issue
                      ? "bg-rose-50 border-rose-300 text-rose-950 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="issueType"
                    value={issue}
                    checked={selectedIssue === issue}
                    onChange={() => setSelectedIssue(issue)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span>{issue}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Provide Details
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what went wrong so our support team can assist..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs font-bold text-slate-700"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold px-5"
            >
              Submit Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
