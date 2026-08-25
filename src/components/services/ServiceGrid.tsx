"use client";

import React, { useState } from "react";
import { ServiceProvider } from "@/data/mockData";
import { ServiceCard } from "./ServiceCard";
import { EmptyServices } from "./EmptyServices";
import { ChevronLeft, ChevronRight, RotateCcw } from "../icons/Icons";
import { Button } from "../ui/button";

interface ServiceGridProps {
  services: ServiceProvider[];
  onSelectProvider: (provider: ServiceProvider) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onResetFilters: () => void;
  onResetSearch: () => void;
}

const ITEMS_PER_PAGE = 6;

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  onSelectProvider,
  favorites,
  onToggleFavorite,
  onResetFilters,
  onResetSearch,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileItemsLimit, setMobileItemsLimit] = useState<number>(6);

  const totalResults = services.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE) || 1;

  // Pagination slicing for Desktop
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDesktopServices = services.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Mobile Load More slicing
  const paginatedMobileServices = services.slice(0, mobileItemsLimit);

  if (totalResults === 0) {
    return (
      <EmptyServices
        onResetFilters={onResetFilters}
        onResetSearch={onResetSearch}
      />
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Desktop Grid View */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedDesktopServices.map((provider) => (
          <ServiceCard
            key={provider.id}
            provider={provider}
            onSelectProvider={onSelectProvider}
            isFavorite={favorites.includes(provider.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Mobile Grid View */}
      <div className="sm:hidden grid grid-cols-1 gap-6">
        {paginatedMobileServices.map((provider) => (
          <ServiceCard
            key={provider.id}
            provider={provider}
            onSelectProvider={onSelectProvider}
            isFavorite={favorites.includes(provider.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Pagination Footer Container */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Results Counter Text */}
        <div className="text-xs text-slate-500 font-semibold">
          Showing{" "}
          <span className="font-bold text-slate-900">
            {Math.min(startIndex + 1, totalResults)}–{Math.min(startIndex + ITEMS_PER_PAGE, totalResults)}
          </span>{" "}
          of <span className="font-bold text-slate-900">{totalResults}</span> services
        </div>

        {/* Desktop Pagination Controls */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="h-9 px-3 gap-1 rounded-xl text-slate-700 border-slate-300 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 rounded-xl font-bold transition-all cursor-pointer ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="h-9 px-3 gap-1 rounded-xl text-slate-700 border-slate-300 disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Mobile Load More Button */}
        <div className="sm:hidden w-full">
          {mobileItemsLimit < totalResults ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setMobileItemsLimit((prev) => prev + 4)}
              className="w-full justify-center py-3 bg-white font-extrabold text-blue-600 border-blue-200 shadow-sm rounded-xl"
            >
              <span>Load More Services</span>
            </Button>
          ) : (
            <div className="text-center text-xs text-slate-400 font-semibold py-2">
              All {totalResults} services loaded
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
