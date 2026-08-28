import React, { useState } from "react";
import { BookingItem } from "@/data/mockBookings";
import { X, Star, Check } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

interface ReviewModalProps {
  booking: BookingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (bookingId: string, rating: number, comment: string) => void;
}

const REVIEW_TAGS = [
  "Punctual & On Time",
  "Polite & Professional",
  "Fair Transparent Pricing",
  "Clean & Neat Work",
  "Expert Knowledge"
];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Punctual & On Time", "Polite & Professional"]);

  if (!isOpen || !booking) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullComment = selectedTags.length > 0
      ? `${selectedTags.join(", ")}. ${comment}`.trim()
      : comment;
    onSubmitReview(booking.id, rating, fullComment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Rate & Review Service</h3>
            <p className="text-xs text-slate-500">Share your experience with {booking.providerName}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Banner */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center gap-3">
            <img
              src={booking.providerImage}
              alt={booking.providerName}
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="text-xs">
              <h4 className="font-bold text-slate-900">{booking.serviceTitle}</h4>
              <p className="text-slate-500">{booking.providerName}</p>
            </div>
          </div>

          {/* Interactive Star Rating */}
          <div className="text-center space-y-2 py-2 bg-amber-50/50 rounded-2xl border border-amber-200/50 p-4">
            <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider block">
              Overall Service Rating
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-125 transition-transform duration-150 cursor-pointer"
                >
                  <Star
                    size={32}
                    className={(hoverRating || rating) >= star ? "text-amber-500" : "text-slate-300"}
                    fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-800 block">
              {rating === 5 && "⭐ Excellent! Highly Recommended"}
              {rating === 4 && "👍 Good Service"}
              {rating === 3 && "😐 Average Experience"}
              {rating === 2 && "👎 Below Expectations"}
              {rating === 1 && "⚠️ Disappointed"}
            </span>
          </div>

          {/* Quick Compliment Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              What did you like best?
            </label>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected ? `✓ ${tag}` : tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text comment */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Write detailed review (optional)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about the work quality, punctuality, and behavior..."
              className="w-full p-3 text-xs border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Buttons */}
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl px-6"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
