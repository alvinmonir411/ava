import React from 'react';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function TopUtilityBar() {
  return (
    <div className="bg-[#FAF8F2] text-[#2B2D33]/80 text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        {/* Left: Phone + Email */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[11px] sm:text-xs tracking-wide">
          <a
            href="tel:+60175483157"
            className="flex items-center gap-1.5 text-[#2B2D33] hover:text-[#4B2A7B] transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
            <span>+60 17-548 3157</span>
          </a>
          <span className="text-[#2B2D33]/20 hidden xs:inline sm:inline">•</span>
          <a
            href="mailto:lwclegal5@gmail.com"
            className="flex items-center gap-1.5 text-[#2B2D33] hover:text-[#4B2A7B] transition-colors font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
            <span>lwclegal5@gmail.com</span>
          </a>
        </div>

        {/* Right: Office Hours & Google Rating */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 sm:gap-x-4 gap-y-1 text-[10.5px] sm:text-xs text-[#2B2D33]/70">
          <a
            href="https://share.google/4f6BOdPxefdpTafG3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#4B2A7B] hover:text-[#3A1F60] transition-colors"
          >
            <span className="font-bold">★ 5.0</span>
            <span className="text-[10px] sm:text-[11px] underline text-[#2B2D33]/80">Google Reviews (34)</span>
          </a>
          <span className="text-[#2B2D33]/20 hidden md:inline">•</span>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Clock className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
            <span>Mon – Fri · 9:00am – 5:30pm</span>
          </div>
          <span className="text-[#2B2D33]/20 hidden md:inline">•</span>
          <span className="text-[#4B2A7B] font-semibold hidden md:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
            <span>Member of Malaysia Bar Council</span>
          </span>
        </div>
      </div>
    </div>
  );
}
