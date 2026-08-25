"use client";

import React, { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  mainImageUrl: string;
  providerName: string;
}

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
];

export const ImageGallery: React.FC<ImageGalleryProps> = ({ mainImageUrl, providerName }) => {
  const images = [mainImageUrl, ...GALLERY_IMAGES.slice(1, 4)];
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="space-y-3">
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 relative">
        
        {/* Main Large Image (3 Spans on Desktop) */}
        <div
          onClick={() => handleOpenLightbox(0)}
          className="md:col-span-3 h-full relative cursor-pointer group overflow-hidden bg-slate-900"
        >
          <img
            src={images[0]}
            alt={`${providerName} main work photo`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-white text-xs font-semibold flex items-center gap-1.5">
              <Camera size={16} /> Click to view fullscreen photo
            </span>
          </div>
        </div>

        {/* 3 Secondary Thumbnail Images Column */}
        <div className="hidden md:grid grid-rows-3 gap-3 h-full">
          {images.slice(1, 4).map((imgUrl, idx) => {
            const actualIndex = idx + 1;
            const isLast = idx === 2;
            return (
              <div
                key={actualIndex}
                onClick={() => handleOpenLightbox(actualIndex)}
                className="relative h-full overflow-hidden cursor-pointer group bg-slate-900 rounded-xl"
              >
                <img
                  src={imgUrl}
                  alt={`${providerName} photo ${actualIndex}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isLast && (
                  <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white text-xs font-extrabold gap-1.5 backdrop-blur-2xs">
                    <Camera size={16} />
                    <span>+2 Photos</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Photos Button Overlay */}
        <button
          type="button"
          onClick={() => handleOpenLightbox(0)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-900 font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg border border-white/60 flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
        >
          <Camera size={16} className="text-blue-600" />
          <span>View All Photos ({images.length})</span>
        </button>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Prev / Next Nav Controls */}
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
            className="absolute left-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
            className="absolute right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>

          {/* Active Image */}
          <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img
              src={images[activeIndex]}
              alt={`${providerName} photo ${activeIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/70 text-xs font-semibold bg-white/10 px-3 py-1 rounded-full">
            {activeIndex + 1} of {images.length}
          </div>

        </div>
      )}

    </div>
  );
};
