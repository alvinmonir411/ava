import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Award, ShieldCheck, CheckCircle2, Sparkles, Scale } from 'lucide-react';
import TrustedMalaysiaBadge from '@/components/common/TrustedMalaysiaBadge';

export default function RecognitionSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#1a2332_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Master Card Container */}
        <div className="bg-white rounded-2xl border-2 border-[#e8e1d5] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Editorial Commendation & Recognition Narrative (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Authority Pill Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf5ea] border border-[#c6a052]/40 text-[#9d7835] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#c6a052]" />
                    <span>Official Editorial Selection</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[#c6a052] bg-white px-2.5 py-1 rounded-full border border-gray-200 text-xs font-semibold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c6a052] text-[#c6a052]" />
                    ))}
                    <span className="text-[11px] text-[#4b5563] ml-1">5.0 Star Commendation</span>
                  </div>
                </div>

                {/* Primary Heading */}
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a2332] leading-tight tracking-tight">
                    Best Law Firms in Kuala Lumpur
                  </h2>
                  <div className="w-20 h-1 bg-[#c6a052] mt-4 rounded-full" />
                </div>

                {/* Editorial Subheading Quote Ribbon */}
                <div className="p-4 bg-[#faf9f6] border-l-4 border-[#c6a052] rounded-r-lg">
                  <p className="text-sm sm:text-base text-[#9d7835] font-serif font-bold italic leading-relaxed">
                    &ldquo;Thank You Trusted Malaysia. We are honored to be recommended on your site.&rdquo;
                  </p>
                </div>

                {/* 3 Editorial Paragraphs */}
                <div className="space-y-4 text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#1a2332] font-semibold">Messrs. Low Wah Chin & Co. Advocates & Solicitors</strong> is a firm that provides high-quality legal services which exude passion, duty, integrity, and care for you as their client. They aim to work closely with you in order to thoroughly understand your case and be able to address your individual needs and the reason why you availed of their services.
                  </p>

                  <p>
                    They are highly commended to be professional and thorough in every case that they take up in which all of their staff are equally competent as well. Rest assured that each of them is a <span className="text-[#1a2332] font-semibold bg-[#faf5ea] px-1.5 py-0.5 rounded border border-[#c6a052]/30">Registered Member of the Malaysian Bar</span> which ensures that you are in good hands.
                  </p>

                  <p>
                    We highly recommend this firm for your legal needs due to their highly qualified lawyers and staff which enables them to guide you throughout the whole process as a whole.
                  </p>
                </div>

                {/* Micro Key Credentials Strip */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100 text-center">
                  <div className="p-2.5 bg-[#faf9f6] rounded-lg border border-gray-200/80">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#1a2332]">100%</span>
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-wider font-medium">Bar Certified</span>
                  </div>
                  <div className="p-2.5 bg-[#faf9f6] rounded-lg border border-gray-200/80">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#1a2332]">Top 10</span>
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-wider font-medium">KL Law Firms</span>
                  </div>
                  <div className="p-2.5 bg-[#faf9f6] rounded-lg border border-gray-200/80">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#1a2332]">15+ Yrs</span>
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-wider font-medium">Advocacy Duty</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/articles/10-best-law-firms-in-kuala-lumpur-by-mohammad-bin-amir-last-updated-july-1-2023"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a2332] text-white text-xs sm:text-sm font-semibold hover:bg-[#243044] hover:text-[#dcc280] transition-colors shadow-md group"
                >
                  <span>Read Full Article & Feature Review</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/articles/6-best-personal-injury-lawyers-in-kl-selangor-2023"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#c6a052] text-[#9d7835] text-xs sm:text-sm font-semibold hover:bg-[#faf5ea] transition-colors group"
                >
                  <span>Top 6 Personal Injury Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Scalloped Trusted Malaysia Badge on Rich Obsidian Background (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c121c] via-[#141d2b] to-[#080d14] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center relative border-t lg:border-t-0 lg:border-l-2 border-[#c6a052]/30 overflow-hidden">
              
              {/* Decorative Corner Filigree Lines */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c6a052]/40 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c6a052]/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#c6a052]/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#c6a052]/40 pointer-events-none" />

              {/* Watermark Scale of Justice in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Scale className="w-72 h-72 text-[#c6a052]" />
              </div>

              {/* Badge Component */}
              <div className="relative z-10 my-4">
                <TrustedMalaysiaBadge size="md" />
              </div>

              {/* Badge Certificate Metadata Footer */}
              <div className="relative z-10 mt-6 pt-5 border-t border-[#c6a052]/30 w-full max-w-[280px]">
                <div className="flex items-center justify-center gap-1.5 text-[#dcc280] text-xs font-bold uppercase tracking-widest mb-1">
                  <Award className="w-4 h-4 text-[#c6a052]" />
                  <span>Trusted Malaysia</span>
                </div>
                <p className="text-[11px] text-[#faf9f6]/70 font-mono">
                  Independent Editorial Recognition
                </p>
                <p className="text-[10px] text-[#dcc280]/80 mt-1 uppercase tracking-wider font-semibold">
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
