'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Scale, Award, Landmark, ChevronRight, X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  badge: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/lawyer-hero.jpg',
    alt: 'Ava Rachel Low in Court Robe and Bands - Principal Advocate',
    title: 'Courtroom Trial Advocate',
    subtitle: 'Appellate & High Court of Malaya Representation',
    badge: 'Senior Counsel',
  },
  {
    src: '/lawyer-portrait-1.jpg',
    alt: 'Ava Rachel Low in Court Gown - Lincoln’s Inn Barrister',
    title: 'Barrister-at-Law',
    subtitle: 'The Honourable Society of Lincoln’s Inn, London',
    badge: 'English Bar 2010',
  },
  {
    src: '/lawyer-portrait-2.jpg',
    alt: 'Ava Rachel Low Portrait - Managing Partner Low, Wah Chin & Co.',
    title: 'Principal Lawyer',
    subtitle: 'Strategic Corporate & Dispute Advisory',
    badge: 'Admitted 2011',
  },
  {
    src: '/lawyer-portrait-3.jpg',
    alt: 'Ava Rachel Low Chambers Portrait - Kuala Lumpur Law Office',
    title: 'Client Advocacy & Counsel',
    subtitle: 'Compassionate & Humanity-Centric Legal Diligence',
    badge: 'LWCCO Chambers',
  },
];

export default function PartnerGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9d7835] block">
            PORTRAIT GALLERY & ACCREDITATIONS
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#22122b]">
            Ava Rachel Low (刘华律师)
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#595355] hidden sm:inline-block">
          Click photo to expand
        </span>
      </div>

      {/* 4-Image Luxury Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="group relative rounded-2xl overflow-hidden border border-[#c6a052]/30 bg-[#22122b] cursor-pointer shadow-md hover:border-[#c6a052] transition-all duration-300"
          >
            <div className="relative h-44 sm:h-56 w-full overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top group-hover:scale-108 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-[#170b1e]/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#170b1e]/85 backdrop-blur-sm border border-[#c6a052]/40 text-[9px] font-bold uppercase tracking-wider text-[#e5c777]">
                {img.badge}
              </div>

              {/* Zoom Indicator */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#170b1e]/80 text-[#e5c777] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="p-3 bg-[#22122b]/95 border-t border-[#c6a052]/20">
              <h4 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#e5c777] transition-colors truncate">
                {img.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#faf9f6]/75 truncate mt-0.5">
                {img.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#170b1e]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#22122b] border-2 border-[#c6a052]/60 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 sm:h-[480px] w-full bg-[#170b1e]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                priority
                className="object-cover object-top"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#170b1e]/80 text-white hover:text-[#e5c777] flex items-center justify-center border border-[#c6a052]/40 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 bg-[#22122b] text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#e5c777] block mb-1">
                {selectedImage.badge}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#faf9f6]">
                {selectedImage.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#faf9f6]/80 mt-1">
                {selectedImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
