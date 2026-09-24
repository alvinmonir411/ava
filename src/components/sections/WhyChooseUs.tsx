import React from 'react';
import Link from 'next/link';
import {
  Scale,
  Building2,
  UserCheck,
  Compass,
  Banknote,
  Award,
  ShieldCheck,
  CheckCircle2,
  Target,
  Briefcase,
  ArrowRight,
  Sparkles,
  Lock,
  Clock,
  Landmark,
} from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { WhyChooseUsSettings, DEFAULT_WHY_CHOOSE_US_SETTINGS } from '@/types/settings';

const ICON_MAP: Record<string, React.ElementType> = {
  Scale,
  Building2,
  UserCheck,
  Compass,
  Banknote,
  Award,
  ShieldCheck,
  CheckCircle2,
  Target,
  Briefcase,
  Lock,
  Clock,
  Landmark,
};

interface WhyChooseUsProps {
  content?: WhyChooseUsSettings;
}

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  const c = content || DEFAULT_WHY_CHOOSE_US_SETTINGS;
  const items = c.items && c.items.length > 0 ? c.items : DEFAULT_WHY_CHOOSE_US_SETTINGS.items;

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3] relative overflow-hidden">
      {/* Subtle decorative background gradient circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4B2A7B]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#4B2A7B]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD3] text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4B2A7B]" />
            <span>{c.badge || 'Why Choose Low Wah Chin & Co.'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2D33] leading-tight mb-4">
            {c.title || 'Commanding Advocacy, Uncompromising Integrity & Direct Counsel'}
          </h2>

          <p className="text-sm sm:text-base text-[#2B2D33]/80 leading-relaxed font-normal">
            {c.subtitle ||
              'Why corporate leaders, business owners, and private individuals entrust their critical legal, litigation, and conveyancing matters to our chambers.'}
          </p>

          {c.quote && (
            <div className="mt-4 inline-block px-4 py-1.5 bg-white border-l-3 border-[#4B2A7B] rounded-r-md border border-[#E5DFD3] text-xs font-serif italic text-[#4B2A7B] font-semibold">
              {c.quote}
            </div>
          )}
        </div>

        {/* 6 High-Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Scale;
            return (
              <div
                key={item.id || index}
                className="group p-6 sm:p-7 bg-white rounded-2xl border border-[#E5DFD3] hover:border-[#4B2A7B]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between relative"
              >
                <div>
                  {/* Top Bar with Icon & Highlight Pill */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] flex items-center justify-center text-[#4B2A7B] group-hover:bg-[#4B2A7B] group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {item.highlight && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4B2A7B] bg-[#FAF8F2] px-2.5 py-1 rounded-md border border-[#E5DFD3]">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B2D33] mb-2.5 group-hover:text-[#4B2A7B] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#2B2D33]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom decorative accent line */}
                <div className="mt-5 pt-4 border-t border-[#E5DFD3]/70 flex items-center justify-between text-xs text-[#4B2A7B] font-semibold">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#2B2D33]/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    Chambers Standard
                  </span>
                  <span className="font-mono text-[10px] text-[#2B2D33]/40 font-bold">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance & Direct Action Banner */}
        <div className="mt-12 sm:mt-14 p-6 sm:p-8 bg-white rounded-2xl border border-[#E5DFD3] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-semibold text-[#2B2D33]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4B2A7B]" />
                Direct Principal Attention
              </span>
              <span className="text-[#E5DFD3] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#4B2A7B]" />
                Privilege & Confidentiality Guaranteed
              </span>
              <span className="text-[#E5DFD3] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-[#4B2A7B]" />
                Member of the Malaysian Bar Council
              </span>
            </div>
            <p className="text-xs text-[#2B2D33]/70">
              {c.footerNote ||
                'Practising since 11 November 2011 • Kuala Lumpur Chambers at Colony @ KLCC, Vipod Residences.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <WhatsAppButton variant="compact" label={c.whatsappText || 'Direct WhatsApp Inquiry'} />
            <Link
              href="/contact"
              className="btn-gradient-royal px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-xs hover:shadow-md transition-all"
            >
              <span>{c.ctaText || 'Schedule Consultation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
