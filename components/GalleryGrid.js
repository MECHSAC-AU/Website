"use client";

import { useState, useEffect } from "react";
import { galleryData, galleryCategories } from "@/data/gallery";
import ImagePlaceholder from "./ImagePlaceholder";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Calendar } from "lucide-react";

export default function GalleryGrid({ initialCategory = "All", limit = null }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter images based on category
  const filteredImages =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const displayedImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  // Lightbox navigation
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? displayedImages.length - 1 : prev - 1
    );
  };

  const showNext = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === displayedImages.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex, displayedImages]);

  const activeLightboxItem =
    selectedImageIndex !== null ? displayedImages[selectedImageIndex] : null;

  return (
    <div>
      {/* Category Filter Pills (if not limited or requested) */}
      {!limit && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 ${
                  isActive
                    ? "bg-racing-600 text-white border border-racing-500 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                    : "bg-[#121520] text-slate-300 hover:text-white border border-[#212638] hover:border-slate-500"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedImages.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative bg-[#0f1118] border border-[#212638] hover:border-racing-500/80 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(225,29,72,0.15)]"
          >
            {/* Visual Aspect Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0c0e14]">
              <ImagePlaceholder
                src={item.image}
                alt={item.title}
                aspectRatio="aspect-[4/3]"
                type="gallery"
                label={item.category.toUpperCase()}
                sublabel={item.tag}
              />

              {/* Hover Dark Overlay with Zoom & Details */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-racing-400 bg-black/80 px-2 py-0.5 rounded border border-racing-500/30">
                    {item.category}
                  </span>
                  <div className="p-1.5 rounded bg-black/80 text-white border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h4 className="font-sans text-sm font-bold text-white uppercase">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Tag Bar */}
            <div className="px-4 py-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-[#1b1f2e]">
              <span className="text-slate-300 font-medium truncate max-w-[180px]">
                {item.title}
              </span>
              <span className="text-racing-500">{item.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          />

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 p-2 rounded bg-[#171b28] border border-[#282f44] text-slate-300 hover:text-white hover:border-racing-500 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={showPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/70 border border-[#2b3248] text-white hover:border-racing-500 hover:bg-racing-600/30 transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={showNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/70 border border-[#2b3248] text-white hover:border-racing-500 hover:bg-racing-600/30 transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Image Box */}
          <div className="relative z-10 max-w-5xl w-full max-h-[85vh] flex flex-col bg-[#0d0f17] border border-[#262c3e] rounded-sm overflow-hidden shadow-2xl">
            <div className="relative aspect-[16/10] max-h-[65vh] w-full bg-black">
              <ImagePlaceholder
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                aspectRatio="aspect-[16/10]"
                fill
                priority
                type="gallery"
                label={activeLightboxItem.category.toUpperCase()}
              />
            </div>

            {/* Captions and Info Bar */}
            <div className="p-5 bg-[#0f1118] border-t border-[#1f2436] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-racing-500 uppercase font-semibold">
                    {activeLightboxItem.category}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="font-mono text-xs text-slate-400">
                    SEASON {activeLightboxItem.year}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-white uppercase">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {activeLightboxItem.caption}
                </p>
              </div>

              <div className="font-mono text-xs text-slate-400 shrink-0">
                {selectedImageIndex + 1} / {displayedImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
