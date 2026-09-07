"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, ArrowLeft, Plus, Trash2, CheckCircle2, ShieldCheck, X } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import { POPULAR_SERVICES } from "@/data/mockData";

export default function ProviderServicesPage() {
  const { provider, updateProviderProfile, showToast } = useProvider();
  const [isAdding, setIsAdding] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState<number | "">("");

  // Determine pricing items: use onboarding services if present, otherwise fallback to category mock data
  const fallbackProvider =
    POPULAR_SERVICES.find((p) => p.categoryId === provider.categoryId) ||
    POPULAR_SERVICES.find((p) => p.categoryId === "electrician") ||
    POPULAR_SERVICES[0];

  // If user has servicesOffered from onboarding, construct service items
  const customServices =
    provider.servicesOffered && provider.servicesOffered.length > 0
      ? provider.servicesOffered.map((title, index) => ({
          id: `srv-${index}`,
          title,
          price:
            index === 0
              ? provider.startingPrice || 399
              : Math.round((provider.startingPrice || 399) * (1 + index * 0.45)),
          unit: provider.priceUnit || "per visit",
          warranty: "30 days",
          isCustom: true,
        }))
      : fallbackProvider.pricingItems.map((item, index) => ({
          id: `mock-${index}`,
          title: item.title,
          price: item.price,
          unit: item.unit,
          warranty: "30 days",
          isCustom: false,
        }));

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const existingServices =
      provider.servicesOffered && provider.servicesOffered.length > 0
        ? [...provider.servicesOffered]
        : fallbackProvider.pricingItems.map((item) => item.title);

    const updated = [...existingServices, newServiceName.trim()];
    updateProviderProfile({
      servicesOffered: updated,
      activeServicesCount: updated.length,
      ...(newServicePrice && typeof newServicePrice === "number" && !provider.startingPrice
        ? { startingPrice: newServicePrice }
        : {}),
    });

    setNewServiceName("");
    setNewServicePrice("");
    setIsAdding(false);
    showToast(`Added package "${newServiceName.trim()}" successfully!`);
  };

  const handleRemovePackage = (titleToRemove: string) => {
    const existingServices =
      provider.servicesOffered && provider.servicesOffered.length > 0
        ? [...provider.servicesOffered]
        : fallbackProvider.pricingItems.map((item) => item.title);

    if (existingServices.length <= 1) {
      showToast("You must have at least one active service package.");
      return;
    }

    const updated = existingServices.filter((title) => title !== titleToRemove);
    updateProviderProfile({
      servicesOffered: updated,
      activeServicesCount: updated.length,
    });
    showToast("Removed package from your active listings.");
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/provider/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2.5 mt-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              My Services & Pricing
            </h2>
            <Badge variant="blue" className="text-xs font-bold px-2 py-0.5">
              {provider.category}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Manage packages, starting labor rates, and doorstep service coverage for {provider.businessName}.
          </p>
        </div>

        <Button
          size="sm"
          variant="default"
          onClick={() => setIsAdding(!isAdding)}
          className="gap-1.5 self-start sm:self-auto font-bold text-xs cursor-pointer shadow-xs"
        >
          {isAdding ? <X size={14} /> : <Plus size={14} />}
          <span>{isAdding ? "Cancel" : "+ Add New Package"}</span>
        </Button>
      </div>

      {/* Add Package Card Form */}
      {isAdding && (
        <Card className="bg-blue-50/50 border-blue-200 shadow-xs animate-in zoom-in-95 duration-150">
          <CardContent className="p-4 sm:p-5">
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                  Add New Service Package
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  Category: {provider.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Service Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Inverter & Battery Routine Maintenance"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Estimated Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g., 499"
                    value={newServicePrice}
                    onChange={(e) =>
                      setNewServicePrice(e.target.value ? Number(e.target.value) : "")
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdding(false)}
                  className="text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" size="sm" className="text-xs font-bold cursor-pointer">
                  Save Package to Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Overview Stat Strip */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Wrench size={20} />
          </div>
          <div>
            <div className="font-bold text-slate-900">
              {customServices.length} Active Packages Listed
            </div>
            <div className="text-slate-500 text-[11px]">
              Base Rate: ₹{provider.startingPrice || 399} ({provider.priceUnit || "per visit"})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>All packages include Sahayak Verified Quality & 30-Day Guarantee</span>
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customServices.map((service, index) => (
          <Card
            key={service.id || index}
            className="bg-white border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-blue-300/70 transition-all group"
          >
            <CardContent className="p-4 sm:p-5 flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{service.title}</h3>
                  <Badge variant="emerald" className="text-[10px] px-1.5 py-0 font-bold">
                    Active
                  </Badge>
                  {index === 0 && (
                    <Badge variant="blue" className="text-[10px] px-1.5 py-0 font-bold">
                      Starting Package
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Standard doorstep inspection, diagnostics, and verified professional labor.
                </p>
                <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                  <span>Warranty: {service.warranty}</span>
                  <span>•</span>
                  <span>{provider.category}</span>
                </div>
              </div>

              <div className="text-right shrink-0 flex flex-col items-end justify-between self-stretch">
                <div>
                  <div className="text-base font-black text-slate-900">₹{service.price}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{service.unit}</div>
                </div>

                {customServices.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(service.title)}
                    title="Remove this package"
                    className="text-slate-300 hover:text-rose-600 transition-colors p-1 rounded-md opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
