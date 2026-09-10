import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, GraduationCap, ArrowRight, CheckCircle2, Landmark, Scale, Briefcase } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { AboutPrincipalSettings, DEFAULT_FIRM_SETTINGS } from '@/types/settings';

interface AboutPrincipalProps {
  content?: AboutPrincipalSettings;
}

export default function AboutPrincipal({ content }: AboutPrincipalProps) {
  const c = content || DEFAULT_FIRM_SETTINGS.aboutPrincipal;

  return (
    <section className="pt-6 pb-12 sm:pt-14 sm:pb-20 lg:py-24 bg-[#faf9f6] text-[#231f20] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-indigo-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600" />
            <span>{c.sectionTag || 'Principal Counsel'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0F1F3D] tracking-tight">
            {c.sectionTitle || 'About'}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#2563eb] via-[#6366f1] to-[#7e22ce] mx-auto mt-1.5 sm:mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Portrait & Academic Credentials & Institutional Admissions Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Principal Lawyer Portrait Card */}
            <div className="relative w-full max-w-[420px] mx-auto p-2.5 bg-white border border-slate-200 rounded-2xl shadow-lg group">
              <div className="relative h-[360px] sm:h-[400px] w-full rounded-xl overflow-hidden bg-gray-950">
                <Image
                  src={c.lawyerPhoto || '/lawyer-portrait-2.jpg'}
                  alt={`${c.lawyerName || 'Low Wah Chin (Ava Rachel)'} ${c.lawyerChinese || '劉華晶'} Managing Partner Messrs. Low Wah Chin & Co.`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1529]/90 via-[#0A1529]/20 to-transparent" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0A1529]/90 border border-white/15 text-white backdrop-blur-md">
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-sm sm:text-base font-bold text-white">
                      {c.lawyerName || 'Low Wah Chin'}
                    </p>
                    {c.lawyerChinese && (
                      <span className="text-xs font-serif text-purple-300">{c.lawyerChinese}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-purple-200 font-medium mt-0.5">
                    Managing Partner & Principal Legal Practitioner
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-md space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <Landmark className="w-4 h-4 text-indigo-600" />
                  <span>Statutory Bar Admissions</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F1F3D]">
                  Statutory Accreditation
                </h3>
                <p className="text-xs text-[#556987] font-medium mt-0.5">
                  The High Court of Malaya & Lincoln’s Inn, London
                </p>
              </div>

              {/* Admission Items */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-[#faf9f6] rounded-xl border border-gray-200">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block mb-0.5">11TH NOVEMBER 2011</span>
                  <strong className="text-[#0F1F3D] block font-serif text-sm">Advocate & Solicitor</strong>
                  <span className="text-[#556987]">The High Court of Malaya, Malaysia</span>
                  <span className="inline-block mt-1 text-[10px] font-mono text-[#6b7280] bg-white px-2 py-0.5 rounded border border-gray-200">
                    Bar No: BC/L/2019
                  </span>
                </div>

                <div className="p-3.5 bg-[#faf9f6] rounded-xl border border-gray-200">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block mb-0.5">14TH OCTOBER 2010</span>
                  <strong className="text-[#0F1F3D] block font-serif text-sm">Barrister-at-Law (Non-Practicing)</strong>
                  <span className="text-[#556987]">The Honourable Society of Lincoln’s Inn, London, UK</span>
                </div>
              </div>

              {/* Institutional Pedigree Summary */}
              <div className="pt-2 border-t border-gray-100 text-xs text-[#556987] space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Benchmark Practice: Shook Lin & Bok • Azim, Tunku Farik & Wong</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Corporate In-House: 1 Year Legal Counsel at KNM Group Berhad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Qualifications, Practice Bio & Practice Areas (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Legal Qualifications Card */}
            <div className="p-5 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F1F3D] flex items-center gap-2 border-b border-gray-100 pb-2.5">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Legal Qualifications:-</span>
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#374151]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F1F3D] block font-serif text-sm">L.L.B (Hons)</strong>
                    <span className="text-[#556987]">The University of Reading, Reading, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F1F3D] block font-serif text-sm">Postgraduate Diploma in Professional Legal Skills (Bar Vocational Course, BVC)</strong>
                    <span className="text-[#556987]">The City University London, London, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F1F3D] block font-serif text-sm">Barrister-at-Law</strong>
                    <span className="text-[#564566]">The Honourable Society of Lincoln’s Inn, London, United Kingdom (Non-Practicing)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Bio Narrative */}
            <div className="p-5 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4 text-xs sm:text-sm text-[#374151] leading-relaxed">
              <div className="p-3.5 bg-[#faf9f6] border-l-4 border-indigo-600 rounded-r-lg border border-gray-200">
                <p className="font-serif font-bold text-[#0F1F3D] text-sm sm:text-base">
                  {c.quote || '“I am an Advocate & Solicitor Malaysia of 15 years in practice since 11th November 2011.”'}
                </p>
              </div>

              <p>
                {c.bioParagraph1 ||
                  'Founded by senior advocate Low Wah Chin (Ava Rachel) 劉華晶, Messrs. Low Wah Chin & Co. provides commanding courtroom advocacy, precise contract drafting, and strategic corporate risk guidance.'}
              </p>

              <p>
                {c.bioParagraph2 ||
                  'In addition to private trial practice, Ms. Low served 1 year at KNM Group Berhad as In-House Legal Counsel, managing corporate risk, cross-border engineering, procurement, and construction (EPC) agreements, and international commercial transactions.'}
              </p>

              <div className="pt-2">
                <strong className="text-[#0F1F3D] block mb-1 font-serif text-xs uppercase tracking-wider text-indigo-700">
                  Core Practice Areas:
                </strong>
                <p className="text-xs text-[#556987] leading-normal">
                  {c.corePractices ||
                    'Laws of Contract · Commercial Disputes · Tort & Negligence · Family & Divorce · Property Conveyancing · Corporate Advisory & MOUs · Wills & Estate Distribution · High Court Litigation'}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/our-team"
                className="btn-gradient-royal px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
              >
                <span>View Full Principal Credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <WhatsAppButton variant="compact" label="Direct WhatsApp Inquiry" />
              <Link
                href="/contact"
                className="px-5 py-3 rounded-lg border border-slate-300 text-[#0F1F3D] hover:bg-slate-100 font-bold uppercase tracking-wider text-xs transition-colors"
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

