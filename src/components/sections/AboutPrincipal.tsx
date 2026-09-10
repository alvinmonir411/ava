import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, GraduationCap, ArrowRight, CheckCircle2, Landmark, Scale, Briefcase } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function AboutPrincipal() {
  return (
    <section className="pt-6 pb-12 sm:pt-14 sm:pb-20 lg:py-24 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#9d7835] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c6a052]" />
            <span>Principal Counsel</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1a2332] tracking-tight">
            About
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-[#c6a052] mx-auto mt-1.5 sm:mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Academic Credentials & Institutional Admissions Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-white border-2 border-[#c6a052]/40 rounded-2xl shadow-md space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-1">
                  <Landmark className="w-4 h-4 text-[#c6a052]" />
                  <span>Statutory Bar Admissions</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a2332]">
                  Low Wah Chin <span className="text-sm font-normal text-[#9d7835]">(Ava Rachel)</span>
                </h3>
                <p className="text-xs text-[#4b5563] font-medium mt-0.5">
                  Managing Partner & Principal Legal Practitioner
                </p>
              </div>

              {/* Admission Items */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-[#faf9f6] rounded-xl border border-[#e8e1d5]">
                  <span className="font-mono text-[10px] font-bold text-[#9d7835] block mb-0.5">11TH NOVEMBER 2011</span>
                  <strong className="text-[#1a2332] block font-serif text-sm">Advocate & Solicitor</strong>
                  <span className="text-[#4b5563]">The High Court of Malaya, Malaysia</span>
                  <span className="inline-block mt-1 text-[10px] font-mono text-[#6b7280] bg-white px-2 py-0.5 rounded border border-gray-200">
                    Bar No: BC/L/2019
                  </span>
                </div>

                <div className="p-3.5 bg-[#faf9f6] rounded-xl border border-[#e8e1d5]">
                  <span className="font-mono text-[10px] font-bold text-[#9d7835] block mb-0.5">14TH OCTOBER 2010</span>
                  <strong className="text-[#1a2332] block font-serif text-sm">Barrister-at-Law (Non-Practicing)</strong>
                  <span className="text-[#4b5563]">The Honourable Society of Lincoln’s Inn, London, UK</span>
                </div>
              </div>

              {/* Institutional Pedigree Summary */}
              <div className="pt-2 border-t border-gray-100 text-xs text-[#4b5563] space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                  <span>Benchmark Practice: Shook Lin & Bok • Azim, Tunku Farik & Wong</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                  <span>Corporate In-House: 1 Year Legal Counsel at KNM Group Berhad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Qualifications, Practice Bio & Practice Areas (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Legal Qualifications Card */}
            <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#e8e1d5] shadow-xs space-y-4">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#1a2332] flex items-center gap-2 border-b border-gray-100 pb-2.5">
                <GraduationCap className="w-5 h-5 text-[#c6a052]" />
                <span>Legal Qualifications:-</span>
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#374151]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1a2332] block font-serif text-sm">L.L.B (Hons)</strong>
                    <span className="text-[#4b5563]">The University of Reading, Reading, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1a2332] block font-serif text-sm">Postgraduate Diploma in Professional Legal Skills (Bar Vocational Course, BVC)</strong>
                    <span className="text-[#4b5563]">The City University London, London, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1a2332] block font-serif text-sm">Barrister-at-Law</strong>
                    <span className="text-[#4b5563]">The Honourable Society of Lincoln’s Inn, London, United Kingdom (Non-Practicing)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Bio Narrative */}
            <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#e8e1d5] shadow-xs space-y-4 text-xs sm:text-sm text-[#374151] leading-relaxed">
              <div className="p-3.5 bg-[#faf9f6] border-l-4 border-[#c6a052] rounded-r-lg border border-gray-200">
                <p className="font-serif font-bold text-[#1a2332] text-sm sm:text-base">
                  &ldquo;I am an Advocate & Solicitor Malaysia of 15 years in practice since 11th November 2011.&rdquo;
                </p>
              </div>

              <p>
                Founded by senior advocate <strong>Low Wah Chin (Ava Rachel) 劉華晶</strong>, Messrs. Low Wah Chin & Co. provides commanding courtroom advocacy, precise contract drafting, and strategic corporate risk guidance. Her legal foundation was honed across premier Malaysian institutions including <em>Shook Lin & Bok</em>, <em>Azim, Tunku Farik & Wong</em>, and <em>Murali B. Pillai & Associates</em>.
              </p>

              <p>
                In addition to private trial practice, Ms. Low served <strong>1 year at KNM Group Berhad as In-House Legal Counsel</strong>, managing corporate risk, cross-border engineering, procurement, and construction (EPC) agreements, and international commercial transactions.
              </p>

              <div className="pt-2">
                <strong className="text-[#1a2332] block mb-1 font-serif text-xs uppercase tracking-wider text-[#9d7835]">
                  Core Practice Areas:
                </strong>
                <p className="text-xs text-[#4b5563] leading-normal">
                  Laws of Contract · Commercial Disputes · Tort & Negligence · Family & Divorce · Property Conveyancing · Corporate Advisory & MOUs · Wills & Estate Distribution · High Court Litigation
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/our-team"
                className="btn-gold px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
              >
                <span>View Full Principal Credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <WhatsAppButton variant="compact" label="Direct WhatsApp Inquiry" />
              <Link
                href="/contact"
                className="px-5 py-3 rounded-lg border border-[#c6a052] text-[#9d7835] hover:bg-[#c6a052]/10 font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

