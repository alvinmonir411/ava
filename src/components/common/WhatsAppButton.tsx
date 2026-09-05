'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';

interface WhatsAppButtonProps {
  message?: string;
  variant?: 'floating' | 'inline' | 'compact';
  label?: string;
  className?: string;
}

export default function WhatsAppButton({
  message,
  variant = 'inline',
  label = 'Chat on WhatsApp',
  className = '',
}: WhatsAppButtonProps) {
  const url = createWhatsAppLink(message);

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation with LWCCO"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 group border-2 border-white/20 ${className}`}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-semibold text-sm tracking-wide hidden sm:inline">
          {label}
        </span>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#20ba59] transition-all duration-200 shadow-sm ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-[#20ba59] transition-all duration-200 hover:scale-[1.02] ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-current shrink-0" />
      <span>{label}</span>
    </a>
  );
}
