import React from 'react';
import Link from 'next/link';
import { PracticeArea } from '@/types';
import { Scale, Building2, HeartHandshake, ShieldAlert, ScrollText, Briefcase, ArrowRight } from 'lucide-react';

interface PracticeCardProps {
  practice: PracticeArea;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Building2,
  HeartHandshake,
  ShieldAlert,
  ScrollText,
  Briefcase,
};

export default function PracticeCard({ practice, className = '' }: PracticeCardProps) {
  const Icon = ICON_MAP[practice.iconName] || Scale;

  return (
    <div className={`group bg-white rounded-2xl border border-charcoal-light/40 p-6 sm:p-8 flex flex-col justify-between legal-card-shadow legal-card-hover hover:border-brass/70 transition-all duration-300 ${className}`}>
      <div>
        <div className="w-14 h-14 rounded-xl bg-cream-dark/80 border border-brass/30 flex items-center justify-center text-brass-dark mb-6 group-hover:bg-navy group-hover:text-brass-light group-hover:border-navy transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy mb-3 group-hover:text-brass-dark transition-colors duration-200">
          {practice.title}
        </h3>

        <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed mb-6">
          {practice.shortDescription}
        </p>

        <ul className="space-y-2 mb-6 text-xs sm:text-sm text-charcoal">
          {practice.whatWeHandle.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass mt-1.5 shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
        <Link
          href={`/practices/${practice.slug}`}
          className="inline-flex items-center gap-2 text-navy font-bold text-sm group-hover:text-brass transition-colors"
        >
          <span>Learn More & Scope</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </Link>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-dark/70">
          Kuala Lumpur
        </span>
      </div>
    </div>
  );
}
