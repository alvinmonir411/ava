import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Award, ShieldCheck, CheckCircle2, Sparkles, Scale } from 'lucide-react';
import TrustedMalaysiaBadge from '@/components/common/TrustedMalaysiaBadge';
import { RecognitionContentSettings, DEFAULT_FIRM_SETTINGS } from '@/types/settings';

interface RecognitionSectionProps {
  content?: RecognitionContentSettings;
}

export default function RecognitionSection({ content }: RecognitionSectionProps) {
  const c = content || DEFAULT_FIRM_SETTINGS.recognition;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#4B2A7B_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Master Card Container */}
        <div className="bg-white rounded-2xl border border-[#E5DFD3] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Editorial Commendation & Recognition Narrative (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Authority Pill Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B2A7B]/10 border border-[#4B2A7B]/20 text-[#4B2A7B] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    <span>{c.badgeLabel || 'Official Editorial Selection'}</span>
                  </div>

                  {/* 5-Star Commendation (Stars preserved in Gold per Option 2) */}
                  <div className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#E5DFD3] text-xs font-semibold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] text-[#2B2D33]/70 ml-1">{c.ratingText || '5.0 Star Commendation'}</span>
                  </div>
                </div>

                {/* Primary Heading */}
                <div>
                  <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2B2D33] leading-tight tracking-tight">
                    {c.title || 'Best Law Firms in Kuala Lumpur'}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#4B2A7B] via-[#6A3CA8] to-[#3A1F60] mt-4 rounded-full" />
                </div>

                {/* Editorial Subheading Quote Ribbon */}
                <div className="p-4 bg-[#FAF8F2] border-l-4 border-[#4B2A7B] rounded-r-lg">
                  <p className="text-sm sm:text-base text-[#2B2D33] font-serif font-bold italic leading-relaxed">
                    {c.quote || '“Thank You Trusted Malaysia. We are honored to be recommended on your site.”'}
                  </p>
                </div>

                {/* 3 Editorial Paragraphs */}
                <div className="space-y-4 text-xs sm:text-sm text-[#2B2D33]/80 leading-relaxed font-normal">
                  <p>
                    {c.paragraph1 ||
                      'Messrs. Low Wah Chin & Co. Advocates & Solicitors is a firm that provides high-quality legal services which exude passion, duty, integrity, and care for you as their client.'}
                  </p>

                  <p>
                    {c.paragraph2 ||
                      'They are highly commended to be professional and thorough in every case that they take up in which all of their staff are equally competent as well.'}
                  </p>
                </div>

                {/* Micro Key Credentials Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 border-t border-[#E5DFD3] text-center">
                  <div className="p-2.5 bg-[#FAF8F2] rounded-lg border border-[#E5DFD3]">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#2B2D33]">
                      {c.stat1Value || '100%'}
                    </span>
                    <span className="text-[10px] text-[#2B2D33]/60 uppercase tracking-wider font-medium">
                      {c.stat1Label || 'Bar Certified'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F2] rounded-lg border border-[#E5DFD3]">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#2B2D33]">
                      {c.stat2Value || 'Top 10'}
                    </span>
                    <span className="text-[10px] text-[#2B2D33]/60 uppercase tracking-wider font-medium">
                      {c.stat2Label || 'KL Law Firms'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F2] rounded-lg border border-[#E5DFD3]">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#2B2D33]">
                      {c.stat3Value || '2011'}
                    </span>
                    <span className="text-[10px] text-[#2B2D33]/60 uppercase tracking-wider font-medium">
                      {c.stat3Label || 'Practising Since 11 Nov'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/articles/10-best-law-firms-in-kuala-lumpur-by-mohammad-bin-amir-last-updated-july-1-2023"
                  className="btn-gradient-royal inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-bold shadow-md group text-center"
                >
                  <span>Read Full Article & Feature Review</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/articles/6-best-personal-injury-lawyers-in-kl-selangor-2023"
                  className="border border-[#E5DFD3] hover:border-[#4B2A7B] hover:text-[#4B2A7B] text-[#2B2D33] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all group text-center bg-white"
                >
                  <span>Top 6 Personal Injury Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Column: Scalloped Trusted Malaysia Badge on Soft Ivory Background (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF8F2] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center relative border-t lg:border-t-0 lg:border-l border-[#E5DFD3] overflow-hidden">
              
              {/* Decorative Corner Filigree Lines */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#4B2A7B]/20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#4B2A7B]/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#4B2A7B]/20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#4B2A7B]/20 pointer-events-none" />

              {/* Watermark Scale of Justice in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Scale className="w-72 h-72 text-[#4B2A7B]" />
              </div>

              {/* Badge Component */}
              <div className="relative z-10 my-4">
                <TrustedMalaysiaBadge size="md" />
              </div>

              {/* Badge Certificate Metadata Footer */}
              <div className="relative z-10 mt-6 pt-5 border-t border-[#E5DFD3] w-full max-w-[280px]">
                <div className="flex items-center justify-center gap-1.5 text-[#4B2A7B] text-xs font-bold uppercase tracking-widest mb-1">
                  <Award className="w-4 h-4 text-[#4B2A7B]" />
                  <span>Trusted Malaysia</span>
                </div>
                <p className="text-[11px] text-[#2B2D33]/70 font-mono">
                  Independent Editorial Recognition
                </p>
                <p className="text-[10px] text-[#4B2A7B] mt-1 uppercase tracking-wider font-semibold">
                  Kuala Lumpur • Peninsular Malaysia
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
