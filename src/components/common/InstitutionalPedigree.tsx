import React from 'react';
import { Award, ShieldCheck, Landmark, Globe, CheckCircle2, Sparkles, Scale } from 'lucide-react';

interface InstitutionalPedigreeProps {
  className?: string;
  light?: boolean;
}

export default function InstitutionalPedigree({ className = '', light = false }: InstitutionalPedigreeProps) {
  const benchmarks = [
    {
      institution: 'Shook Lin & Bok',
      role: 'Pupillage & Foundational Litigation',
      year: 'Est. 1918 Tier-1 Heritage',
    },
    {
      institution: 'Sreenevasan',
      role: 'Commercial Trial & Appellate Advocacy',
      year: 'Premier Dispute Practice',
    },
    {
      institution: 'Azim, Tunku Farik & Wong (ATFW)',
      role: 'Banking & Professional Indemnity Defense',
      year: 'Insurance Litigation Leaders',
    },
    {
      institution: 'Lincoln’s Inn (London, UK)',
      role: 'Barrister-at-Law, English Bar',
      year: 'Called October 2010',
    },
    {
      institution: 'Raja Eleena, Siew Ang & Assoc.',
      role: 'Real Estate Conveyancing & Developer Advisory',
      year: 'Land Title Transactions',
    },
  ];

  return (
    <div className={`py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1b0d25] via-[#161e31] to-[#1b0d25] border-y border-[#c6a052]/30 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Singapore Legal Media & Regional Commendation Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[#c6a052]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#e5c777] via-[#c6a052] to-[#9d7835] p-0.5 flex items-center justify-center shrink-0 shadow-lg">
              <div className="w-full h-full bg-[#1b0d25] rounded-[10px] flex items-center justify-center text-[#e5c777]">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c777]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-serif font-bold text-[#faf9f6] uppercase tracking-wide">
                  Regional Legal Trust & Commendation
                </span>
                <span className="text-[9.5px] sm:text-[10px] uppercase font-bold text-[#e5c777] bg-[#c6a052]/25 border border-[#c6a052]/50 px-2 py-0.5 rounded-full shadow-xs">
                  Singapore Media Featured
                </span>
              </div>
              <p className="text-xs text-[#faf9f6]/80 mt-0.5 leading-snug">
                Featured & Recommended by <strong className="text-[#e5c777]">Leading Singapore Legal Publications</strong> for Tenacious Advocacy & Professional Diligence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs w-full lg:w-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#241133] border border-[#c6a052]/30 text-[#faf9f6]/90 shadow-sm flex-1 sm:flex-initial justify-center sm:justify-start">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
              <span>Malayan Bar: <strong>11 Nov 2011</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#241133] border border-[#c6a052]/30 text-[#faf9f6]/90 shadow-sm flex-1 sm:flex-initial justify-center sm:justify-start">
              <Award className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
              <span>Trusted Malaysia <strong>Top 6 Firm</strong></span>
            </div>
          </div>
        </div>

        {/* Institutional Heritage Ticker */}
        <div className="pt-5 sm:pt-6">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#e5c777] mb-3 flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Institutional Pedigree & Benchmark Practice Heritage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {benchmarks.map((b, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-[#200f2b]/90 border border-[#c6a052]/25 hover:border-[#c6a052] transition-all duration-300 group shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-xs text-[#faf9f6] group-hover:text-[#e5c777] transition-colors truncate">
                      {b.institution}
                    </span>
                    <span className="text-[9px] text-[#c6a052] font-mono">0{idx + 1}</span>
                  </div>
                  <p className="text-[10.5px] text-[#faf9f6]/75 leading-snug">
                    {b.role}
                  </p>
                </div>
                <span className="text-[9px] sm:text-[9.5px] text-[#e5c777]/85 font-medium block mt-2 border-t border-[#c6a052]/15 pt-1.5">
                  {b.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

