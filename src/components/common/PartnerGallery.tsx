'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Scale, Award, Landmark, ChevronRight, X, ZoomIn, ShieldCheck, Sparkles } from 'lucide-react';
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
  isDark = false,
}: PartnerGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const displayTitle = title || gallery?.sectionTitle || 'Portraits & Chambers Leadership Gallery';
  const displaySubtitle = subtitle || gallery?.sectionSubtitle || 'Principal Counsel Low Wah Chin (Ava Rachel) 劉華晶';
  const displayBadge = badge || gallery?.sectionBadge || 'Advocate & Solicitor • Lincoln’s Inn Barrister';
  const displayItems = gallery?.items && gallery.items.length > 0 ? gallery.items : DEFAULT_GALLERY_ITEMS;

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${isDark ? 'bg-[#101826] text-[#faf9f6]' : 'bg-[#faf9f6] text-[#231f20]'} border-b border-[#e5e7eb]/40 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/40 text-[#9d7835] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>{displayBadge}</span>
          </div>
          <h2 className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
            {displayTitle}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#9d7835] mt-2">
            {displaySubtitle}
          </p>
          <div className="w-16 h-0.5 bg-[#c6a052] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Responsive Luxury Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {displayItems.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="group relative rounded-2xl overflow-hidden border-2 border-[#c6a052]/40 bg-[#162032] cursor-pointer shadow-lg hover:border-[#dcc280] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-950">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-top filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101826]/95 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#101826]/90 backdrop-blur-md border border-[#c6a052]/50 text-[10px] font-bold uppercase tracking-wider text-[#dcc280] shadow-sm">
                  {img.badge}
                </div>

                {/* Zoom Indicator Top Right */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#101826]/80 text-[#dcc280] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-[#c6a052]/40 shadow-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption Info */}
              <div className="p-4 bg-[#162032] border-t border-[#c6a052]/30 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#dcc280] transition-colors leading-snug">
                    {img.title}
                  </h3>
                  <p className="text-[11px] text-[#faf9f6]/75 mt-1 leading-normal line-clamp-2">
                    {img.subtitle}
                  </p>
                </div>
                
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#dcc280]">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#6b7280] font-light">
            Portraits of Principal Advocate & Solicitor Low Wah Chin (Ava Rachel) 劉華晶 • Lincoln’s Inn Barrister & High Court of Malaya
          </p>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-[#0c121d]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-[#162032] border-2 border-[#c6a052] rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Header */}
              <div className="relative h-80 sm:h-96 md:h-[420px] w-full bg-[#0c121d] shrink-0">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162032] via-transparent to-transparent opacity-60" />
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close image modal"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#101826]/90 text-white hover:text-[#dcc280] flex items-center justify-center border border-[#c6a052]/60 cursor-pointer shadow-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badge on Modal */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#101826]/90 border border-[#c6a052]/50 text-xs font-bold uppercase tracking-wider text-[#dcc280] shadow-md">
                  {selectedImage.badge}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 bg-[#162032] text-white space-y-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#dcc280] mt-0.5">
                    {selectedImage.subtitle}
                  </p>
                </div>

                {selectedImage.description && (
                  <p className="text-xs sm:text-sm text-[#faf9f6]/85 leading-relaxed pt-1">
                    {selectedImage.description}
                  </p>
                )}

                <div className="pt-3 border-t border-[#c6a052]/30 flex items-center justify-between text-xs text-[#faf9f6]/70">
                  <span>Messrs. Low Wah Chin & Co. • Advocates & Solicitors</span>
                  <span className="font-mono text-[#dcc280]">BC/L/2019</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

