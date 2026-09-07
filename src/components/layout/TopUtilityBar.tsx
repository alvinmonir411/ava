import React from 'react';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function TopUtilityBar() {
  return (
    <div className="bg-[#1a2332] text-[#faf9f6]/85 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#c6a052]/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Phone + Email */}
        <div className="flex items-center gap-5 text-xs tracking-wide">
          <a
            href="tel:+60175483157"
            className="flex items-center gap-1.5 hover:text-[#dcc280] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>+60 17-548 3157</span>
          </a>
          <span className="text-[#c6a052]/40 hidden sm:inline">•</span>
          <a
            href="mailto:lwclegal5@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#dcc280] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>lwclegal5@gmail.com</span>
          </a>
        </div>

        {/* Right: Office Hours & Google Rating */}
        <div className="flex items-center gap-4 text-xs text-[#faf9f6]/75">
          <a
            href="https://share.google/4f6BOdPxefdpTafG3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#dcc280] hover:text-white transition-colors"
          >
            <span className="font-bold">★ 5.0</span>
            <span className="text-[11px] underline">Google Reviews (34)</span>
          </a>
          <span className="text-[#c6a052]/40 hidden md:inline">•</span>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Clock className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Mon – Fri · 9:00am – 5:30pm</span>
          </div>
          <span className="text-[#c6a052]/40 hidden md:inline">•</span>
          <span className="text-[#dcc280] font-medium hidden md:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>BC/L/2019</span>
          </span>
        </div>
      </div>
    </div>
  );
}
