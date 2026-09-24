'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-[#E5DFD3] px-4 sm:px-8 py-3.5 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 shrink-0 shadow-xs">
      <div className="space-y-0.5 min-w-0">
        <h1 className="font-serif text-lg sm:text-2xl font-bold text-[#2B2D33] tracking-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-[#2B2D33]/70 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-2.5 shrink-0 self-start md:self-center">
        {action}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F2] text-[#4B2A7B] border border-[#E5DFD3] hover:border-[#4B2A7B] text-xs font-semibold transition-all shadow-xs"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#4B2A7B]" />
        </Link>
      </div>
    </header>
  );
}
