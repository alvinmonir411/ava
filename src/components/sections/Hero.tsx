import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Scale, CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { HeroContentSettings, DEFAULT_FIRM_SETTINGS } from '@/types/settings';

interface HeroProps {
  bgImage?: string;
  content?: HeroContentSettings;
}

export default function Hero({
  bgImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85',
  content,
}: HeroProps) {
  const c = content || DEFAULT_FIRM_SETTINGS.heroContent;

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#FAF8F2] text-[#2B2D33] overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-[#E5DFD3]">
      {/* Background with ivory tone */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Messrs. Low Wah Chin & Co. Advocates & Solicitors Kuala Lumpur Courtroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-10 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F2] via-[#FAF8F2]/90 to-[#FAF8F2]" />
        <div className="absolute inset-0 bg-[radial-gradient(#4B2A7B_1px,transparent_1px)] opacity-5 [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Firm Title, Mission & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Established Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8C7F0] bg-white text-[#4B2A7B] text-xs uppercase tracking-[0.15em] font-semibold shadow-xs">
              <Scale className="w-3.5 h-3.5 text-[#4B2A7B] shrink-0" />
              <span>{c.establishedBadge || 'Advocates & Solicitors • High Court of Malaya'}</span>
            </div>

            {/* Firm Master Headline */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B2D33] leading-[1.12]">
                {c.firmName || 'Messrs. Low Wah Chin & Co.'}
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#4B2A7B] font-serif font-normal mt-2">
                  {c.firmSubtitle || 'Advocates & Solicitors'}
                </span>
              </h1>
            </div>

            {/* Firm Motto / Tagline */}
            <p className="font-serif italic text-[#2B2D33]/85 text-base sm:text-xl font-light leading-relaxed max-w-2xl">
              {c.motto || '“Passion & Duty, Integrity & Care — To the Point.”'}
            </p>

            {/* Micro Credential Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left text-xs text-[#2B2D33] pt-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#E5DFD3] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4B2A7B] shrink-0" />
                <span>Lincoln’s Inn Barrister (London, UK)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#E5DFD3] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4B2A7B] shrink-0" />
                <span>Member of the Malaysian Bar Council</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#E5DFD3] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4B2A7B] shrink-0" />
                <span>Practising since 11 November 2011</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#E5DFD3] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4B2A7B] shrink-0" />
                <span>Kuala Lumpur Chambers (Colony @ KLCC)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/contact"
                className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <WhatsAppButton variant="compact" label="Inquire on WhatsApp" />
            </div>

          </div>

          {/* Right Column: Prominent Lawyer Portrait Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[380px] p-2.5 sm:p-3 bg-white border-2 border-[#4B2A7B] rounded-2xl shadow-xl overflow-hidden group">
              
              {/* Corner Luxury Filigree Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#4B2A7B]/40 pointer-events-none z-20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#4B2A7B]/40 pointer-events-none z-20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#4B2A7B]/40 pointer-events-none z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#4B2A7B]/40 pointer-events-none z-20" />

              {/* Portrait Photo */}
              <div className="relative h-[400px] sm:h-[450px] w-full rounded-xl overflow-hidden bg-[#FAF8F2]">
                <Image
                  src={c.heroLawyerPhoto || '/hero_image.jpeg'}
                  alt={`${c.heroLawyerName} Advocate & Solicitor Messrs. Low Wah Chin & Co.`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover object-[center_15%] filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2D33]/60 via-transparent to-transparent" />

                {/* Overlay Nameplate */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white/95 border border-[#E5DFD3] backdrop-blur-md text-[#2B2D33] text-center shadow-lg">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B2D33] tracking-wide">
                    {c.heroLawyerName || 'Low Wah Chin (Ava Rachel)'}
                    {c.heroLawyerChinese && (
                      <span className="text-xs font-serif text-[#4B2A7B] ml-1.5">{c.heroLawyerChinese}</span>
                    )}
                  </h3>
                  <p className="text-[#4B2A7B] text-xs font-semibold mt-0.5">
                    {c.heroLawyerTitle || 'Managing Partner & Principal Legal Practitioner'}
                  </p>
                  <p className="text-[11px] text-[#2B2D33]/70 mt-1">
                    {c.heroLawyerSub || 'Lincoln’s Inn Barrister (London) • Malayan Bar (2011)'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

