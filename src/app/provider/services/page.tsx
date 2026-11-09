"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  X,
  AlertCircle,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import {
  useGetMyOfferedServicesQuery,
  useAddMyOfferedServiceMutation,
  useRemoveMyOfferedServiceMutation,
} from "@/services/provider.service";
import { useGetServicesQuery } from "@/services/serviceCatalog.service";
import { getApiErrorMessage } from "@/lib/errorUtils";

export default function ProviderServicesPage() {
  const { provider, showToast } = useProvider();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCatalogServiceId, setSelectedCatalogServiceId] = useState("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [customDescription, setCustomDescription] = useState("");

  // Live Queries & Mutations
  const {
    data: myServicesData,
    isLoading: isServicesLoading,
    refetch,
  } = useGetMyOfferedServicesQuery(undefined);

  const { data: catalogData } = useGetServicesQuery({ limit: 50 });

  const [addServiceApi, { isLoading: isAddingService }] = useAddMyOfferedServiceMutation();
  const [removeServiceApi, { isLoading: isRemovingService }] = useRemoveMyOfferedServiceMutation();

  const myServices = Array.isArray(myServicesData?.data) ? myServicesData.data : [];
  const catalogServices = catalogData?.data?.services || catalogData?.data?.items || catalogData?.data || [];

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCatalogServiceId) {
      showToast("Please choose a catalog service to offer.");
      return;
    }

    try {
      await addServiceApi({
        serviceId: selectedCatalogServiceId,
        customPrice: customPrice ? Number(customPrice) : undefined,
        description: customDescription.trim() || undefined,
      }).unwrap();

      showToast("Service offering added to your live storefront!");
      setIsAdding(false);
      setSelectedCatalogServiceId("");
      setCustomPrice("");
      setCustomDescription("");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to add service."));
    }
  };

  const handleRemoveService = async (serviceId: string, title: string) => {
    try {
      await removeServiceApi(serviceId).unwrap();
      showToast(`Removed "${title}" from your storefront.`);
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to remove service."));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
            Offered Services & Rate Card
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage packages displayed on your public profile for customer bookings.
          </p>
        </div>

        <Button
          size="sm"
          variant="default"
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 self-start sm:self-auto cursor-pointer h-9 px-3.5 rounded-xl shadow-xs"
        >
          <Plus size={15} />
          <span>Add New Service</span>
        </Button>
      </div>

      {/* Add New Service Modal / Inline Form */}
      {isAdding && (
        <Card className="bg-blue-50/50 border-blue-200 shadow-sm py-0 rounded-2xl animate-in zoom-in-95 duration-200">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Add Service Offering to Storefront
              </h3>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X size={16} />
              </Button>
            </div>

            <form onSubmit={handleAddService} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Catalog Service *
                </label>
                <select
                  required
                  value={selectedCatalogServiceId}
                  onChange={(e) => setSelectedCatalogServiceId(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose from available platform catalog --</option>
                  {Array.isArray(catalogServices) &&
                    catalogServices.map((cs: any) => (
                      <option key={cs._id || cs.id} value={cs._id || cs.id}>
                        {cs.name} (Base: ₹{cs.price || cs.basePrice || 399})
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Custom Starting Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="e.g. 449 (Leave blank to use base)"
                    className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Special Warranty / Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="e.g. 30-day post service guarantee"
                    className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isAddingService}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 cursor-pointer"
                >
                  {isAddingService ? "Publishing..." : "Publish Service"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Services Grid */}
      {isServicesLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-32 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {!isServicesLoading && myServices.length === 0 && (
        <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-2xl">
          <CardContent className="p-12 text-center text-xs text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Wrench size={22} />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-700 text-sm">No services listed yet.</p>
              <p className="text-slate-500">
                Add services from the catalog so customers in {provider.city} can book you.
              </p>
            </div>
            <Button
              size="sm"
              variant="default"
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 text-white font-bold text-xs"
            >
              Add First Service
            </Button>
          </CardContent>
        </Card>
      )}

      {!isServicesLoading && myServices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {myServices.map((item: any, idx: number) => {
            const serviceDetails = item.serviceId || {};
            const serviceTitle = serviceDetails.name || item.name || `Service #${idx + 1}`;
            const price = item.customPrice || serviceDetails.price || 399;
            const targetId = item.serviceId?._id || item.serviceId || item._id;

            return (
              <Card
                key={item._id || item.serviceId?._id || idx}
                className="bg-white border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow py-0 rounded-xl sm:rounded-2xl"
              >
                <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {serviceTitle}
                        </span>
                        <Badge
                          variant="emerald"
                          className="text-[10px] px-1.5 py-0 font-bold"
                        >
                          Active
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        {item.description || serviceDetails.shortDescription || "Doorstep service with 30-day warranty"}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemoveService(targetId, serviceTitle)}
                      disabled={isRemovingService}
                      className="text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer shrink-0"
                      title="Remove package"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-lg font-black text-slate-900">₹{price}</span>
                      <span className="text-[11px] text-slate-400 font-medium ml-1">
                        / visit
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span>30-Day Warranty</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
