"use client";

import React from "react";
import { Wrench, CheckCircle2, Zap, Check } from "@/components/icons/Icons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ServiceItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
}

interface ServiceListProps {
  services: ServiceItemData[];
  selectedServiceId: string;
  onSelectService: (service: ServiceItemData) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  selectedServiceId,
  onSelectService,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Services Offered
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          Select a service to calculate booking total
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((item) => {
          const isSelected = selectedServiceId === item.id;
          return (
            <Card
              key={item.id}
              onClick={() => onSelectService(item)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? "bg-blue-50/70 border-blue-600 shadow-md ring-2 ring-blue-500/20"
                  : "bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div>
                {/* Top Row: Icon & Title */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-blue-600"
                    }`}>
                      <Wrench size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Standard Service Package
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check size={14} />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Price & Selection Button */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">Starting from</span>
                  <span className="text-lg font-black text-slate-900">
                    ₹{item.price}{" "}
                    <span className="text-xs font-semibold text-slate-500">/ {item.unit}</span>
                  </span>
                </div>

                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(item);
                  }}
                  className={`px-4 py-2 font-bold text-xs rounded-xl cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      : "border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {isSelected ? "Selected ✓" : "Select Service"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
