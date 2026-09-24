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
      institution: 'Azim, Tunku Farik & Wong',
      role: 'Banking & Professional Indemnity Defense',
      year: 'Insurance Litigation Leaders',
    },
    {
      institution: 'KNM Group Berhad',
      role: 'In-House Corporate Legal Counsel',
      year: 'Public Listed MNC (~9 Months / 2016–2017)',
    },
    {
      institution: 'Lincoln’s Inn (London, UK)',
      role: 'Barrister-at-Law, English Bar',
      year: 'Called October 2010',
    },
    {
      institution: 'Murali B. Pillai & Assoc.',
      role: 'High Court Civil & Personal Injury Litigation',
      year: 'Trial & Dispute Counsel',
    },
  ];

  return (
    <div className={`py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] border-y border-[#E5DFD3] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Trusted Malaysia & Editorial Commendation Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[#E5DFD3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#E5DFD3] flex items-center justify-center shrink-0 shadow-xs text-[#4B2A7B]">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4B2A7B]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-serif font-bold text-[#2B2D33] uppercase tracking-wide">
                  Independent Legal Trust & Commendation
                </span>
                <span className="text-[9.5px] sm:text-[10px] uppercase font-bold text-[#4B2A7B] bg-[#FAF8F2] border border-[#D8C7F0] px-2 py-0.5 rounded-full shadow-xs">
                  Trusted Malaysia Selected
                </span>
              </div>
              <p className="text-xs text-[#2B2D33]/80 mt-0.5 leading-snug">
                Featured & Recommended by <strong className="text-[#2B2D33]">Trusted Malaysia Editorial Review</strong> for Tenacious Advocacy & Professional Diligence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs w-full lg:w-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD3] text-[#2B2D33] shadow-xs flex-1 sm:flex-initial justify-center sm:justify-start">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
              <span>Malayan Bar: <strong>11 Nov 2011</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD3] text-[#2B2D33] shadow-xs flex-1 sm:flex-initial justify-center sm:justify-start">
              <Award className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
              <span>Trusted Malaysia <strong>Top 6 Firm</strong></span>
            </div>
          </div>
        </div>

        {/* Institutional Heritage Ticker */}
        <div className="pt-5 sm:pt-6">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2B2D33]/80 mb-3 flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-[#4B2A7B]" />
            <span>Institutional Pedigree & Benchmark Practice Heritage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {benchmarks.map((b, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E5DFD3] hover:border-[#4B2A7B] transition-all duration-300 group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-xs text-[#2B2D33] group-hover:text-[#4B2A7B] transition-colors truncate">
                      {b.institution}
                    </span>
                    <span className="text-[9px] text-[#4B2A7B]/60 font-mono">0{idx + 1}</span>
                  </div>
                  <p className="text-[10.5px] text-[#2B2D33]/75 leading-snug">
                    {b.role}
                  </p>
                </div>
                <span className="text-[9px] sm:text-[9.5px] text-[#4B2A7B] font-medium block mt-2 border-t border-[#E5DFD3] pt-1.5">
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

