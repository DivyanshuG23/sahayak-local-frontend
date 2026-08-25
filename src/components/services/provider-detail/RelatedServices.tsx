"use client";

import React from "react";
import { ServiceProvider } from "@/data/mockData";
import { ServiceCard } from "../ServiceCard";

interface RelatedServicesProps {
  currentProviderId: string;
  category: string;
  allProviders: ServiceProvider[];
  onSelectProvider: (provider: ServiceProvider) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({
  currentProviderId,
  category,
  allProviders,
  onSelectProvider,
  favorites,
  onToggleFavorite,
}) => {
  const related = allProviders
    .filter((p) => p.id !== currentProviderId && (p.category === category || p.categoryId === category))
    .slice(0, 3);

  // Fallback to top rated if not enough matching category
  const finalRelated = related.length >= 3 ? related : allProviders.filter((p) => p.id !== currentProviderId).slice(0, 3);

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Similar Services Near You
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Explore other top-rated {category} providers in your neighborhood
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {finalRelated.map((provider) => (
          <ServiceCard
            key={provider.id}
            provider={provider}
            onSelectProvider={onSelectProvider}
            isFavorite={favorites.includes(provider.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
