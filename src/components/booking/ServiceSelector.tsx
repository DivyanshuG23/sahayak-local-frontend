"use client";

import React from "react";
import { CheckCircle2, Zap } from "@/components/icons/Icons";

export interface ServicePackage {
  id: string;
  title: string;
  price: number;
  unit: string;
  description?: string;
  popular?: boolean;
}

interface ServiceSelectorProps {
  services: ServicePackage[];
  selectedServiceId: string;
  onSelectService: (service: ServicePackage) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServiceId,
  onSelectService,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Zap size={18} className="text-blue-600" />
            <span>Select Service Variant</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Choose the specific work scope required for your doorstep service.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {services.map((srv, idx) => {
          const isSelected = selectedServiceId === srv.id || (idx === 0 && !selectedServiceId);
          return (
            <button
              key={srv.id || idx}
              type="button"
              onClick={() => onSelectService(srv)}
              className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 relative overflow-hidden ${
                isSelected
                  ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                  : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80 text-slate-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                }`}>
                  {isSelected && <CheckCircle2 size={14} className="text-white" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-extrabold text-slate-900">
                      {srv.title}
                    </span>
                    {srv.popular && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Most Booked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {srv.description || `Verified doorstep ${srv.title.toLowerCase()} service by expert technician.`}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black text-blue-600 block">
                  ₹{srv.price}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  /{srv.unit}
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
