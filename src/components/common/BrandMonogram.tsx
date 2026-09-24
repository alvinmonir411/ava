import React from 'react';
import Link from 'next/link';

interface BrandMonogramProps {
  variant?: 'header' | 'hero' | 'footer' | 'card';
  className?: string;
  light?: boolean;
}

export default function BrandMonogram({
  variant = 'header',
  className = '',
  light = true,
}: BrandMonogramProps) {
  if (variant === 'hero' || variant === 'card') {
    return (
      <div className={`inline-flex flex-col items-start ${className}`}>
        <div className="flex items-center gap-3.5">
          {/* Business Card Sharp Serif Monogram "L" + "wcco" */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#6A3CA8] via-[#4B2A7B] to-[#3A1F60] p-[1.5px] shadow-xl shrink-0">
            <div className="w-full h-full bg-[#4B2A7B] rounded-[10px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3A1F60]/40 to-transparent opacity-50" />
              <span className="font-serif text-2xl font-black text-white leading-none tracking-tighter">
                L
              </span>
              <span className="text-[8px] font-sans font-black tracking-widest text-[#FAF8F2]/90 uppercase absolute bottom-1 right-1">
                wcco
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B2D33] uppercase">
                Low, Wah Chin & Co.
              </span>
              <span className="text-xs font-serif font-medium text-[#4B2A7B] tracking-wider">
                劉華晶
              </span>
            </div>
            <span className="text-[10px] font-sans tracking-[0.22em] text-[#4B2A7B] uppercase font-semibold mt-0.5">
              Advocates & Solicitors • High Court of Malaya
            </span>
          </div>
        </div>

        {/* Founding Baseline */}
        <div className="mt-2.5 flex items-center gap-2 text-[10.5px] tracking-wider text-[#2B2D33]/70 uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4B2A7B]" />
          <span>Admitted 11 Nov 2011</span>
          <span className="text-[#4B2A7B]/50">•</span>
          <span>Member of the Malaysian Bar Council</span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex flex-col items-start ${className}`}>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A3CA8] via-[#4B2A7B] to-[#3A1F60] p-[1.5px] shadow-md shrink-0">
            <div className="w-full h-full bg-[#3A1F60] rounded-[7px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4B2A7B]/40 to-transparent opacity-50" />
              <span className="font-serif text-xl font-black text-[#FAF8F2] leading-none">
                L
              </span>
              <span className="text-[7px] font-sans font-bold tracking-widest text-[#FAF8F2]/90 uppercase absolute bottom-0.5 right-1">
                wcco
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-tight text-[#FAF8F2] uppercase">
                Low, Wah Chin & Co.
              </span>
              <span className="text-xs font-serif text-purple-200">
                劉華晶
              </span>
            </div>
            <span className="text-[9px] font-sans tracking-[0.18em] text-purple-200 font-semibold uppercase">
              Advocates & Solicitors
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href="/" className={`group flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
      {/* Sharp Serif Monogram "L" + "wcco" */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#6A3CA8] via-[#4B2A7B] to-[#3A1F60] p-[1px] shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-[#4B2A7B] rounded-[7px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A1F60]/40 to-transparent opacity-60" />
          <span className="font-serif text-base sm:text-xl font-black text-white leading-none tracking-tighter">
            L
          </span>
          <span className="text-[5.5px] sm:text-[7px] font-sans font-extrabold tracking-widest text-[#FAF8F2]/90 uppercase absolute bottom-0.5 right-0.5 sm:right-1">
            wcco
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-serif text-xs sm:text-base font-bold tracking-tight text-[#2B2D33] group-hover:text-[#4B2A7B] transition-colors leading-tight">
            LOW, WAH CHIN & CO.
          </span>
          <span className="text-[9px] sm:text-[10px] font-serif font-medium text-[#4B2A7B] leading-none">
            劉華晶
          </span>
        </div>
        <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.15em] sm:tracking-[0.2em] text-[#4B2A7B] font-semibold uppercase leading-tight mt-0.5">
          Advocates & Solicitors
        </span>
      </div>
    </Link>
  );
}


