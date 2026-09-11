'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, X, ZoomIn, Sparkles } from 'lucide-react';
import { GallerySectionSettings, GalleryItem, DEFAULT_GALLERY_ITEMS } from '@/types/settings';

export type { GalleryItem };

interface PartnerGalleryProps {
  gallery?: GallerySectionSettings;
  title?: string;
  subtitle?: string;
  badge?: string;
  isDark?: boolean;
}

export default function PartnerGallery({
  gallery,
  title,
  subtitle,
  badge,
  isDark = true,
}: PartnerGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const displayTitle = title || gallery?.sectionTitle || 'Portraits & Chambers Leadership Gallery';
  const displaySubtitle = subtitle || gallery?.sectionSubtitle || 'Principal Counsel Low Wah Chin (Ava Rachel) 劉華晶';
  const displayBadge = badge || gallery?.sectionBadge || 'Advocate & Solicitor • Lincoln’s Inn Barrister';
  const displayItems = gallery?.items && gallery.items.length > 0 ? gallery.items : DEFAULT_GALLERY_ITEMS;

  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#070e1e] via-[#0d1738] to-[#1c0c30] text-[#faf9f6]'
    : 'bg-[#f8fafc] text-[#0F1F3D]';

  const cardBg = 'bg-gradient-to-b from-[#0F1F3D] via-[#16183e] to-[#201035]';
  const cardGradient = 'from-[#070e1e]/95 via-transparent to-transparent';
  const badgeBg = 'bg-gradient-to-r from-[#0F1F3D]/95 via-[#1E1B4B]/95 to-[#2E1065]/95';
  const modalBg = 'bg-gradient-to-b from-[#0F1F3D] via-[#131b38] to-[#1a112c]';

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${sectionBg} border-b border-white/10 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0F1F3D]/90 via-[#1E1B4B]/90 to-[#2E1065]/90 border border-purple-500/30 text-white text-[11px] font-bold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{displayBadge}</span>
          </div>
          <h2 className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0F1F3D]'}`}>
            {displayTitle}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-purple-200 mt-2">
            {displaySubtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#6366f1] to-[#7e22ce] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Responsive Luxury Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {displayItems.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`group relative rounded-2xl overflow-hidden border border-white/15 ${cardBg} cursor-pointer shadow-lg hover:border-purple-400/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Photo Area */}
              <div className="relative h-72 sm:h-80 md:h-84 xl:h-76 w-full overflow-hidden bg-[#050b18] flex items-center justify-center">
                {/* Ambient Blur Fill */}
                <Image
                  src={img.src}
                  alt=""
                  fill
                  aria-hidden="true"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover filter blur-md opacity-25 scale-110"
                />
                <div className="relative h-full w-full z-10 flex items-center justify-center">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-contain filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500 p-2"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${cardGradient} opacity-50 group-hover:opacity-30 transition-opacity z-20 pointer-events-none`} />
                
                {/* Badge Top Left */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md ${badgeBg} backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-30`}>
                  {img.badge}
                </div>

                {/* Zoom Indicator Top Right */}
                <div className={`absolute top-3 right-3 w-8 h-8 rounded-full ${badgeBg} text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 shadow-sm z-30`}>
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption Info */}
              <div className={`p-4 ${cardBg} border-t border-white/10 flex flex-col justify-between flex-1`}>
                <div>
                  <h3 className="font-serif text-sm font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                    {img.title}
                  </h3>
                  <p className="text-[11px] text-slate-200/80 mt-1 leading-normal line-clamp-2">
                    {img.subtitle}
                  </p>
                </div>
                
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  <span>View Full Portrait</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-light">
            Portraits of Principal Advocate & Solicitor Low Wah Chin (Ava Rachel) 劉華晶 • Lincoln’s Inn Barrister & High Court of Malaya
          </p>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className={`relative max-w-2xl w-full ${modalBg} border-2 border-purple-500/60 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col my-auto max-h-[92vh]`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Header */}
              <div className="relative h-[360px] sm:h-[460px] md:h-[500px] w-full bg-[#050b18] shrink-0 overflow-hidden flex items-center justify-center">
                {/* Ambient blurred backdrop */}
                <Image
                  src={selectedImage.src}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover filter blur-3xl opacity-35 scale-125"
                />
                <div className="relative h-full w-full z-10 flex items-center justify-center p-3 sm:p-6">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    priority
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${modalBg} via-transparent to-transparent opacity-40 z-20 pointer-events-none`} />
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close image modal"
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full ${badgeBg} text-white hover:text-purple-300 flex items-center justify-center border border-white/20 cursor-pointer shadow-lg transition-colors z-30 hover:scale-105 active:scale-95`}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badge on Modal */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-md ${badgeBg} border border-white/20 text-xs font-bold uppercase tracking-wider text-white shadow-md z-30`}>
                  {selectedImage.badge}
                </div>
              </div>

              {/* Modal Content */}
              <div className={`p-5 sm:p-6 ${modalBg} text-white space-y-3 overflow-y-auto`}>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-purple-200 mt-0.5">
                    {selectedImage.subtitle}
                  </p>
                </div>

                {selectedImage.description && (
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed pt-1">
                    {selectedImage.description}
                  </p>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Messrs. Low Wah Chin & Co. • Advocates & Solicitors</span>
                  <span className="font-mono text-purple-200">BC/L/2019</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
