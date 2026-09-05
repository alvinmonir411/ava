import React from 'react';
import Link from 'next/link';
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

import Image from 'next/image';

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

export default function PracticeCard({ practice, className = '' }: PracticeCardProps) {
  const Icon = ICON_MAP[practice.iconName] || Scale;

  return (
    <div className={`group bg-white rounded-2xl border border-charcoal-light/40 overflow-hidden flex flex-col justify-between legal-card-shadow legal-card-hover hover:border-brass/70 transition-all duration-300 ${className}`}>
      {/* Top Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-navy">
        <Image
          src={practice.heroImage}
          alt={`${practice.title} - LWCCO Law Firm Kuala Lumpur`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        
        {/* Floating Icon Badge */}
        <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-[#0F1F3D]/95 backdrop-blur-md border border-[#B8935A]/50 flex items-center justify-center text-[#CFA76F] shadow-lg group-hover:bg-[#B8935A] group-hover:text-[#0F1F3D] transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A1529]/80 backdrop-blur-sm border border-white/20 text-[10px] font-bold uppercase tracking-wider text-[#CFA76F]">
          Advocates & Solicitors
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy mb-2.5 group-hover:text-brass-dark transition-colors duration-200">
            {practice.title}
          </h3>

          <p className="text-charcoal-muted text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {practice.shortDescription}
          </p>

          <ul className="space-y-1.5 mb-6 text-xs text-charcoal">
            {practice.whatWeHandle.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-1.5 shrink-0" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-cream-dark flex items-center justify-between mt-auto">
          <Link
            href={`/practices/${practice.slug}`}
            className="inline-flex items-center gap-1.5 text-navy font-bold text-xs sm:text-sm group-hover:text-brass transition-colors"
          >
            <span>Learn More & Scope</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-dark/80">
            Kuala Lumpur
          </span>
        </div>
      </div>
    </div>
  );
}
