import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Scale, ArrowRight, Building2, Users, FileCheck, Shield, BookOpen, Briefcase } from 'lucide-react';

const PRACTICE_AREAS = [
  {
    title: 'Legal Advice & Consultation',
    slug: 'contract-drafting-commercial-advisory',
    icon: Scale,
    description: 'Strategic legal evaluation, rights appraisal, and actionable guidance across civil, commercial, and personal legal affairs.',
  },
  {
    title: 'Property & Conveyancing',
    slug: 'real-estate-conveyancing',
    icon: Building2,
    description: 'End-to-end management of Sale and Purchase Agreements (SPA), loan documentation, private caveats, and title perfection.',
  },
  {
    title: 'Family & Divorce Matters',
    slug: 'family-probate-estate',
    icon: Users,
    description: 'Empathetic counsel in mutual consent joint petitions, single petitions, child custody, spousal maintenance, and asset division.',
  },
  {
    title: 'Dispute Resolution & Claims',
    slug: 'contractual-dispute-claims',
    icon: Shield,
    description: 'Tenacious trial and appellate advocacy in commercial breaches, debt recovery, tort liabilities, and contractor disputes.',
  },
  {
    title: 'Wills & Estate Distribution',
    slug: 'family-probate-estate',
    icon: FileCheck,
    description: 'Meticulous testamentary will drafting, Grant of Probate applications, Letters of Administration, and estate distribution.',
  },
  {
    title: 'Company Matters & Agreements',
    slug: 'corporate-commercial',
    icon: Briefcase,
    description: 'Bespoke commercial contract drafting, shareholder deeds, employment governance, and Section 466 statutory recovery.',
  },
];

export default function PracticeAreasDark() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#1a2332] text-[#faf9f6] overflow-hidden border-b border-[#c6a052]/30">
      {/* Subtle architectural background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Messrs. Low Wah Chin & Co. Kuala Lumpur Architecture"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-[#101826]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading + Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c6a052]/40 bg-[#1a2332]/80 text-[#dcc280] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Practice Disciplines</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            A Tradition of Talent
          </h2>
          <p className="font-serif italic text-[#dcc280] text-base sm:text-lg max-w-xl mx-auto mb-3">
            &ldquo;Meticulous Legal Craftsmanship & Steadfast Courtroom Advocacy&rdquo;
          </p>
          <p className="text-sm sm:text-base text-[#faf9f6]/80 font-light leading-relaxed">
            Representing individuals, commercial enterprises, and institutional clients across Peninsular Malaysia with integrity, precision, and decisive legal execution.
          </p>
        </div>

        {/* 2-column × 3-row grid (6 cards total) with thin-bordered boxes (no fill, just border on dark bg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {PRACTICE_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <Link
                key={idx}
                href={`/practices/${area.slug}`}
                className="group block p-5 sm:p-7 lg:p-8 rounded-none border border-[#c6a052]/40 bg-transparent hover:border-[#dcc280] hover:bg-[#243044]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded border border-[#c6a052]/30 text-[#dcc280] group-hover:text-white group-hover:border-[#dcc280] transition-colors shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-[#dcc280] transition-colors leading-snug">
                      {area.title}
                    </h3>
                  </div>
                  <span className="text-xs font-sans text-[#c6a052]/60 font-mono tracking-widest mt-1 shrink-0">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#faf9f6]/80 leading-relaxed font-light line-clamp-2 mb-4">
                  {area.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#dcc280] group-hover:translate-x-1 transition-transform">
                  <span>Explore Practice Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Practices CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href="/practices"
            className="btn-outline-gold w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-[#c6a052]/20"
          >
            <span>View Full Practice Directory & Statutes</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
