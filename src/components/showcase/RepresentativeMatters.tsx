'use client';

import React, { useState } from 'react';
import { RepresentativeMatter } from '@/types';
import { Landmark, Scale, ShieldCheck, CheckCircle2, ChevronRight, Lock, BookOpen, Award, Sparkles } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import AuroraBackground from '../effects/AuroraBackground';

interface RepresentativeMattersProps {
  matters: RepresentativeMatter[];
  className?: string;
  limit?: number;
}

const CATEGORIES = [
  'All Disciplines',
  'Appellate Litigation',
  'Commercial & Corporate',
  'Real Estate & Land',
  'Family & Matrimonial Law',
  'Debt & Insolvency',
  'Tort & Medical Negligence',
  'Employment & Industrial',
] as const;

export default function RepresentativeMatters({
  matters,
  className = '',
  limit,
}: RepresentativeMattersProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All Disciplines');

  const filtered = matters.filter((m) => {
    if (activeCategory === 'All Disciplines') return true;
    return m.category === activeCategory;
  });

  const displayMatters = limit ? filtered.slice(0, limit) : filtered;

  return (
    <AuroraBackground
      intensity="subtle"
      showGrid={false}
      className={`py-16 sm:py-24 bg-[#FAF8F2] text-[#2B2D33] border-y border-[#E5DFD3] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D8C7F0] text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Landmark className="w-3.5 h-3.5 text-[#4B2A7B]" />
              <span>Judicial Track Record & Representative Briefs</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-[#2B2D33]">
              Notable Matters & Landmark Decisions
            </h2>
            <p className="text-sm sm:text-base text-[#2B2D33]/80 leading-relaxed font-light">
              A curated selection of representative High Court and Appellate decisions illustrating our tactical litigation, statutory precision, and commercial problem-solving across Malaysian and cross-border arenas.
            </p>

            {/* Confidentiality Assurance Notice */}
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD3] text-[11px] text-[#2B2D33]/70 shadow-xs">
              <Lock className="w-3 h-3 text-[#4B2A7B]" />
              <span>
                Matters summarized with client confidentiality preserved pursuant to the <em>Legal Profession Act 1976</em>.
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal animation="fade-up" delay={100} duration={700}>
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none px-1">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#4B2A7B] text-white font-bold shadow-xs border border-[#4B2A7B]'
                      : 'bg-white text-[#2B2D33]/70 border border-[#E5DFD3] hover:border-[#4B2A7B] hover:text-[#4B2A7B]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Matters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayMatters.map((matter, mIdx) => (
            <ScrollReveal
              key={matter.id}
              animation="fade-up"
              delay={mIdx * 80}
              duration={600}
            >
              <div className="group h-full bg-white border border-[#E5DFD3] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#4B2A7B] hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Top Corner Gradient Accent */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#4B2A7B]/5 to-transparent rounded-bl-3xl pointer-events-none" />

                <div>
                  {/* Category & Forum Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2A7B] bg-[#FAF8F2] border border-[#D8C7F0] px-2.5 py-0.5 rounded-full">
                      {matter.category}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#2B2D33]/70 flex items-center gap-1.5">
                      <Scale className="w-3 h-3 text-[#4B2A7B]" />
                      <span className="truncate max-w-[240px]">{matter.forum}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B2D33] group-hover:text-[#4B2A7B] transition-colors leading-snug mb-3">
                    {matter.title}
                  </h3>

                  {/* Statutory Framework Tag */}
                  <div className="mb-4 pb-3 border-b border-[#E5DFD3] flex items-start gap-2 text-xs text-[#4B2A7B]">
                    <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#4B2A7B]" />
                    <span className="font-medium text-[11.5px] text-[#4B2A7B] leading-tight">
                      {matter.statutoryFramework}
                    </span>
                  </div>

                  {/* Narrative Breakdown */}
                  <div className="space-y-2.5 text-xs text-[#2B2D33]/80 leading-relaxed mb-4">
                    <p>
                      <strong className="text-[#2B2D33]">Brief / Challenge:</strong>{' '}
                      {matter.background}
                    </p>
                    <p>
                      <strong className="text-[#2B2D33]">Tactical Strategy:</strong>{' '}
                      {matter.strategy}
                    </p>
                  </div>
                </div>

                {/* Strategic Outcome Box */}
                <div className="mt-2 pt-3 border-t border-[#E5DFD3] space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3]">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#4B2A7B] uppercase tracking-wider mb-1">
                      <Award className="w-3.5 h-3.5 text-[#4B2A7B]" />
                      <span>Strategic Outcome</span>
                    </div>
                    <p className="text-xs font-semibold text-[#2B2D33] leading-snug">
                      {matter.outcome}
                    </p>
                  </div>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matter.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[10px] font-semibold text-[#2B2D33]/80 bg-white px-2.5 py-0.5 rounded border border-[#E5DFD3] shadow-xs"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}
