'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  return (
    <header className="bg-[#0F1F3D] border-b border-[#B8935A]/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-white/70 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B2F57] text-[#CFA76F] border border-[#B8935A]/40 text-xs font-semibold hover:bg-[#1B2F57]/80 transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}
