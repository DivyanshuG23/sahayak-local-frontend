import React from "react";
import { Phone, MessageSquare, Flag, Info } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface HelpSupportCardProps {
  onContactSupport: () => void;
  onReportIssue: () => void;
}

export const HelpSupportCard: React.FC<HelpSupportCardProps> = ({
  onContactSupport,
  onReportIssue
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4 relative overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
          <Info size={18} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-white">Need Help?</h3>
          <p className="text-xs text-slate-400">Sahayak customer care team is available 24/7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <Button
          variant="outline"
          onClick={onContactSupport}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700 text-xs font-bold rounded-xl h-10 flex items-center justify-center gap-1.5"
        >
          <Phone size={14} className="text-blue-400" />
          <span>Contact Support</span>
        </Button>

        <Button
          variant="outline"
          onClick={onReportIssue}
          className="bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-rose-200 border-slate-700 text-xs font-bold rounded-xl h-10 flex items-center justify-center gap-1.5"
        >
          <Flag size={14} className="text-rose-400" />
          <span>Report an Issue</span>
        </Button>
      </div>
    </div>
  );
};
