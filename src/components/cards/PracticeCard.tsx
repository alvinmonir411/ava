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
      className={`group relative bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-indigo-400 hover:shadow-xl ${
        featured ? 'ring-2 ring-indigo-500/40' : ''
      } ${className}`}
    >
      {/* Top Image Banner */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#0F1F3D]">
        <Image
          src={practice.heroImage}
          alt={`${practice.title} - Messrs. Low Wah Chin & Co.`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1C] via-[#070E1C]/30 to-transparent" />

        {/* Category Badge & Icon */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="w-9 h-9 rounded bg-[#0F1F3D] border border-white/20 flex items-center justify-center text-white shadow-sm">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 bg-[#0F1F3D]/90 px-2.5 py-0.5 rounded border border-white/10">
            Practice Area
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F1F3D] group-hover:text-indigo-600 transition-colors leading-snug">
              {practice.title}
            </h3>
            {practice.chineseTitle && (
              <span className="text-xs font-serif font-semibold text-indigo-600 shrink-0">
                {practice.chineseTitle}
              </span>
            )}
          </div>

          {practice.statutoryFramework && practice.statutoryFramework.length > 0 && (
            <div className="mb-3">
              <span className="text-[11px] font-mono text-slate-600 bg-[#f8fafc] px-2 py-0.5 rounded border border-slate-200 inline-block truncate max-w-full">
                ⚖ {practice.statutoryFramework[0]}
              </span>
            </div>
          )}

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {practice.shortDescription}
          </p>

          {/* Key Scopes */}
          <ul className="space-y-1 mb-5 text-xs text-slate-700">
            {practice.whatWeHandle.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <span className="line-clamp-1 text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <Link
            href={`/practices/${practice.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0F1F3D] group-hover:text-indigo-600 transition-colors uppercase tracking-wider"
          >
            <span>Explore Practice Scope</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            High Court of Malaya
          </span>
        </div>
      </div>
    </div>
  );
}
