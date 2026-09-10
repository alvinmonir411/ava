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
      intensity="medium"
      showGrid={true}
      className={`py-16 sm:py-24 bg-gradient-to-br from-[#070e1e] via-[#0d1738] to-[#1c0c30] text-[#faf9f6] border-y border-white/10 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-gradient-royal text-white text-xs font-bold uppercase tracking-wider mb-3 animate-float-slow">
              <Landmark className="w-3.5 h-3.5 text-purple-300" />
              <span>Judicial Track Record & Representative Briefs</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 aurora-text-gradient">
              Notable Matters & Landmark Decisions
            </h2>
            <p className="text-sm sm:text-base text-[#faf9f6]/85 leading-relaxed font-light">
              A curated selection of representative High Court and Appellate decisions illustrating our tactical litigation, statutory precision, and commercial problem-solving across Malaysian and cross-border arenas.
            </p>

            {/* Confidentiality Assurance Notice */}
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] text-[#faf9f6]/80 shadow-md">
              <Lock className="w-3 h-3 text-purple-300" />
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
                      ? 'bg-gradient-to-r from-[#2563eb] via-[#6366f1] to-[#7e22ce] text-white font-bold shadow-[0_0_20px_rgba(126,34,206,0.45)] scale-105 border border-white/40'
                      : 'bg-white/5 text-white/80 border border-white/10 hover:border-purple-400/50 hover:text-white backdrop-blur-md'
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
              <div className="group h-full aurora-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-purple-400/60 transition-all duration-300 relative overflow-hidden">
                {/* Top Corner Gradient Accent */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-purple-500/20 via-blue-500/10 to-transparent rounded-bl-3xl pointer-events-none" />

                <div>
                  {/* Category & Forum Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200 bg-purple-950/60 border border-purple-500/40 px-2.5 py-0.5 rounded-full shadow-inner">
                      {matter.category}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#faf9f6]/75 flex items-center gap-1.5">
                      <Scale className="w-3 h-3 text-purple-300" />
                      <span className="truncate max-w-[240px]">{matter.forum}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#faf9f6] group-hover:text-purple-200 transition-colors leading-snug mb-3">
                    {matter.title}
                  </h3>

                  {/* Statutory Framework Tag */}
                  <div className="mb-4 pb-3 border-b border-white/10 flex items-start gap-2 text-xs text-purple-200">
                    <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-300" />
                    <span className="font-medium text-[11.5px] text-purple-200/95 leading-tight">
                      {matter.statutoryFramework}
                    </span>
                  </div>

                  {/* Narrative Breakdown */}
                  <div className="space-y-2.5 text-xs text-[#faf9f6]/85 leading-relaxed mb-4">
                    <p>
                      <strong className="text-white">Brief / Challenge:</strong>{' '}
                      {matter.background}
                    </p>
                    <p>
                      <strong className="text-white">Tactical Strategy:</strong>{' '}
                      {matter.strategy}
                    </p>
                  </div>
                </div>

                {/* Strategic Outcome Box */}
                <div className="mt-2 pt-3 border-t border-white/10 space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 shadow-inner">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-purple-200 uppercase tracking-wider mb-1">
                      <Award className="w-3.5 h-3.5 text-purple-300" />
                      <span>Strategic Outcome</span>
                    </div>
                    <p className="text-xs font-semibold text-[#faf9f6] leading-snug">
                      {matter.outcome}
                    </p>
                  </div>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matter.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[10px] font-semibold text-[#faf9f6]/90 bg-white/5 px-2.5 py-0.5 rounded border border-white/10 shadow-xs"
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
