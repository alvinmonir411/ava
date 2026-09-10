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
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#120720] text-[#faf7fc] overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Full-width atmospheric background with deep royal purple & obsidian vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Messrs. Low Wah Chin & Co. Advocates & Solicitors Kuala Lumpur Courtroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0517]/95 via-[#1b0a2d]/90 to-[#0d0517]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] opacity-10 [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Firm Title, Mission & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Established Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c6a052]/50 bg-[#1e0d33]/85 text-[#dcc280] text-xs uppercase tracking-[0.15em] font-semibold shadow-md backdrop-blur-sm">
              <Scale className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
              <span>{c.establishedBadge || 'Advocates & Solicitors • High Court of Malaya'}</span>
            </div>

            {/* Firm Master Headline */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-md">
                {c.firmName || 'Messrs. Low Wah Chin & Co.'}
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#dcc280] font-serif font-normal mt-2">
                  {c.firmSubtitle || 'Advocates & Solicitors'}
                </span>
              </h1>
            </div>

            {/* Firm Motto / Tagline */}
            <p className="font-serif italic text-[#f3ecf9] text-base sm:text-xl font-light leading-relaxed max-w-2xl text-white/90">
              {c.motto || '“Passion & Duty, Integrity & Care — To the Point.”'}
            </p>

            {/* Micro Credential Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left text-xs text-[#faf7fc]/90 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1e0d33]/75 border border-[#c6a052]/30 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
                <span>Lincoln’s Inn Barrister (London, UK)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1e0d33]/75 border border-[#c6a052]/30 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
                <span>Malaysian Bar Council BC/L/2019</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1e0d33]/75 border border-[#c6a052]/30 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
                <span>15 Years Practice Experience (Since 2011)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1e0d33]/75 border border-[#c6a052]/30 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
                <span>Kuala Lumpur Chambers (Colony @ KLCC)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/contact"
                className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <WhatsAppButton variant="compact" label="Inquire on WhatsApp" />
            </div>

          </div>

          {/* Right Column: Prominent Lawyer Portrait Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[380px] p-2.5 sm:p-3 bg-[#1e0d33] border-2 border-[#c6a052]/50 rounded-2xl shadow-2xl overflow-hidden group">
              
              {/* Corner Luxury Filigree Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#dcc280] pointer-events-none z-20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#dcc280] pointer-events-none z-20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#dcc280] pointer-events-none z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#dcc280] pointer-events-none z-20" />

              {/* Portrait Photo */}
              <div className="relative h-[400px] sm:h-[450px] w-full rounded-xl overflow-hidden bg-gray-900">
                <Image
                  src={c.heroLawyerPhoto || '/lawyer-portrait-1.jpg'}
                  alt={`${c.heroLawyerName} Advocate & Solicitor Messrs. Low Wah Chin & Co.`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover object-top filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120720]/95 via-[#120720]/20 to-transparent" />

                {/* Overlay Nameplate */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#120720]/95 border border-[#c6a052]/40 backdrop-blur-md text-white text-center">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                    {c.heroLawyerName || 'Low Wah Chin (Ava Rachel)'}
                    {c.heroLawyerChinese && (
                      <span className="text-xs font-serif text-[#dcc280] ml-1.5">{c.heroLawyerChinese}</span>
                    )}
                  </h3>
                  <p className="text-[#dcc280] text-xs font-medium mt-0.5">
                    {c.heroLawyerTitle || 'Managing Partner & Principal Legal Practitioner'}
                  </p>
                  <p className="text-[11px] text-[#faf7fc]/75 mt-1">
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

