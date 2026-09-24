import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PracticeArea } from '@/types';
import {
  Scale,
  Building2,
  HeartHandshake,
  ShieldAlert,
  ScrollText,
  Briefcase,
  ArrowRight,
  Activity,
  Stethoscope,
  FileText,
  Users,
  ShieldCheck,
  Home,
  Handshake,
  Gavel,
  Award,
  Hammer,
  Banknote,
  DollarSign,
} from 'lucide-react';

interface PracticeCardProps {
  practice: PracticeArea;
  className?: string;
  featured?: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Building2,
  HeartHandshake,
  ShieldAlert,
  ScrollText,
  Briefcase,
  Activity,
  Stethoscope,
  FileText,
  Users,
  ShieldCheck,
  Home,
  Handshake,
  Gavel,
  Award,
  Hammer,
  Banknote,
  DollarSign,
};

export default function PracticeCard({ practice, className = '', featured = false }: PracticeCardProps) {
  const Icon = ICON_MAP[practice.iconName] || Scale;

  return (
    <div
      className={`group relative bg-white rounded-lg border border-[#E5DFD3] overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-[#4B2A7B]/50 hover:shadow-xl ${
        featured ? 'ring-2 ring-[#4B2A7B]/40' : ''
      } ${className}`}
    >
      {/* Top Image Banner */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#FAF8F2]">
        <Image
          src={practice.heroImage}
          alt={`${practice.title} - Messrs. Low Wah Chin & Co.`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2D33]/60 via-[#2B2D33]/15 to-transparent" />

        {/* Category Badge & Icon */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="w-9 h-9 rounded bg-white border border-[#E5DFD3] flex items-center justify-center text-[#4B2A7B] shadow-xs">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B2A7B] bg-white/95 px-2.5 py-0.5 rounded border border-[#D8C7F0] shadow-xs">
            Practice Area
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B2D33] group-hover:text-[#4B2A7B] transition-colors leading-snug">
              {practice.title}
            </h3>
            {practice.chineseTitle && (
              <span className="text-xs font-serif font-semibold text-[#4B2A7B] shrink-0">
                {practice.chineseTitle}
              </span>
            )}
          </div>

          {practice.statutoryFramework && practice.statutoryFramework.length > 0 && (
            <div className="mb-3">
              <span className="text-[11px] font-mono text-[#2B2D33]/70 bg-[#FAF8F2] px-2 py-0.5 rounded border border-[#E5DFD3] inline-block truncate max-w-full">
                ⚖ {practice.statutoryFramework[0]}
              </span>
            </div>
          )}

          <p className="text-[#2B2D33]/80 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {practice.shortDescription}
          </p>

          {/* Key Scopes */}
          <ul className="space-y-1 mb-5 text-xs text-[#2B2D33]/75">
            {practice.whatWeHandle.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B2A7B] mt-1.5 shrink-0" />
                <span className="line-clamp-1 text-[#2B2D33]/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Action */}
        <div className="pt-3 border-t border-[#E5DFD3] flex items-center justify-between mt-auto">
          <Link
            href={`/practices/${practice.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2B2D33] group-hover:text-[#4B2A7B] transition-colors uppercase tracking-wider"
          >
            <span>Explore Practice Scope</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#4B2A7B] group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] uppercase tracking-wider text-[#2B2D33]/50">
            High Court of Malaya
          </span>
        </div>
      </div>
    </div>
  );
}
