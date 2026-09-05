import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PracticeArea } from '@/types';
import TiltCard from '@/components/effects/TiltCard';
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
  ChevronRight,
  Sparkles,
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
    <TiltCard maxTilt={5} glare={true} className="h-full">
      <div
        className={`group relative bg-white rounded-2xl border border-[#e8e1d5] overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-[#c6a052] hover:shadow-2xl gold-shimmer-hover ${
          featured ? 'ring-1 ring-[#c6a052]/50 shadow-md' : 'shadow-sm'
        } ${className}`}
        style={{
          boxShadow: '0 8px 30px -4px rgba(34, 18, 43, 0.08)',
        }}
      >
        {/* Top Image Banner with Royal Plum Overlay */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#170b1e]">
          <Image
            src={practice.heroImage}
            alt={`${practice.title} - Low Wah Chin & Co. Advocates & Solicitors`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-[#170b1e]/40 to-transparent" />
          
          {/* Floating Champagne Gold Icon Badge */}
          <div className="absolute bottom-2.5 left-3.5 sm:bottom-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#22122b]/95 backdrop-blur-md border border-[#c6a052]/60 flex items-center justify-center text-[#e5c777] shadow-lg group-hover:bg-[#c6a052] group-hover:text-[#170b1e] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
          </div>

          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#170b1e]/85 backdrop-blur-md border border-[#c6a052]/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#e5c777] flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#c6a052]" />
            <span>Advocates & Solicitors</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-7 flex flex-col justify-between flex-1 bg-white">
          <div>
            {/* Warm Amber / Leather Brown Category Tag with Chinese Subtitle */}
            <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#9a532a] bg-[#9a532a]/10 border border-[#9a532a]/25 px-2 py-0.5 rounded-full inline-block">
                Legal Discipline
              </span>
              {practice.chineseTitle && (
                <span className="text-[11px] font-serif font-bold text-[#9d7835] tracking-wider">
                  {practice.chineseTitle}
                </span>
              )}
            </div>

            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#0a0a0a] mb-2 group-hover:text-[#9d7835] transition-colors duration-200 leading-snug">
              {practice.title}
            </h3>

            {/* Primary Statutory Reference */}
            {practice.statutoryFramework && practice.statutoryFramework.length > 0 && (
              <div className="mb-2.5">
                <span className="text-[10.5px] font-mono text-[#595355] bg-[#faf9f6] px-2 py-0.5 rounded border border-[#e8e1d5] inline-block truncate max-w-full">
                  ⚖ {practice.statutoryFramework[0]}
                </span>
              </div>
            )}

            <p className="text-[#595355] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 font-normal">
              {practice.shortDescription}
            </p>

            {/* Practice Scope Highlights */}
            <ul className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-6 text-xs text-[#231f20]">
              {practice.whatWeHandle.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052] mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="line-clamp-1 text-[#595355] text-[11.5px] sm:text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Footer with Gold Hover Indicator */}
          <div className="pt-3 sm:pt-4 border-t border-[#f3efe6] flex items-center justify-between mt-auto">
            <Link
              href={`/practices/${practice.slug}`}
              className="inline-flex items-center gap-1.5 text-[#0a0a0a] font-bold text-xs sm:text-sm group-hover:text-[#9d7835] transition-colors"
            >
              <span>Explore Scope</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c6a052] group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#9a532a] bg-[#9a532a]/10 border border-[#9a532a]/20 px-1.5 py-0.5 rounded">
              Malaysian Bar
            </span>
          </div>
        </div>

        {/* Bottom Gold Accent Bar on Hover */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c6a052] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </TiltCard>
  );
}

