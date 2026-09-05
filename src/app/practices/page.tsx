import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPracticeAreas } from '@/db';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import PracticeCard from '@/components/cards/PracticeCard';
import TrustBar from '@/components/common/TrustBar';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { Scale, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Practice Areas & Legal Disciplines | LWCCO Advocates & Solicitors',
  description: 'Explore the full legal disciplines of Messrs. Low Wah Chin & Co. in Kuala Lumpur. Personal Injury, Property Conveyancing, Family Divorce, Corporate Law & Commercial Litigation.',
  canonicalUrl: `${SITE_CONFIG.url}/practices`,
});

export default async function PracticesPage() {
  const practiceAreas = await getPracticeAreas();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Practice Areas', url: `${SITE_CONFIG.url}/practices` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header */}
      <section className="relative bg-navy text-cream py-20 sm:py-28 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85"
            alt="LWCCO Practice Disciplines Kuala Lumpur"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/90 to-navy-dark/95" />
          <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Advocates & Solicitors • Kuala Lumpur</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4">
            Practice Areas & Service Offerings
          </h1>
          <p className="font-serif italic text-brass-light text-lg sm:text-xl mb-4">
            &ldquo;Comprehensive Legal Protection for Individuals, Families & Enterprises&rdquo;
          </p>
          <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
            With over 15 years of courtroom diligence in the High Court of Malaya and Appellate Courts, Low Wah Chin & Co. provides dedicated legal counsel across 6 core practice disciplines and 12 specialized service scope areas.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* 1. Core Practice Disciplines (Top 6) */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Foundational Practice"
            title="Core Practice Disciplines"
            subtitle="The 6 primary legal disciplines handled with deep appellate diligence by Low Wah Chin & Co."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.slice(0, 6).map((practice) => (
              <PracticeCard key={practice.slug} practice={practice} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Specialized Service Offerings & Scope (Following 12) */}
      <section className="py-20 md:py-28 bg-[#FAF8F4] border-t border-[#B8935A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Specialized Scope"
            title="Specialized Service Offerings & Scope"
            subtitle="Focused legal representation tailored for specific claims, dispute resolutions, and statutory procedures."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.slice(6).map((practice) => (
              <PracticeCard key={practice.slug} practice={practice} />
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Service Checklist */}
      <section className="py-20 bg-white border-t border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Full Service Spectrum"
            title="Complete Scope of Matters We Attend To"
            subtitle="Our legal services cover both transactional documentation and contentious courtroom trials."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Personal Injury & Motor Claims',
                desc: 'Pursuing general and special damages for accident victims against insurance companies.',
              },
              {
                title: 'Medical & Professional Negligence',
                desc: 'Holding hospitals, doctors, and professionals accountable for standards of care.',
              },
              {
                title: 'Property Sale & Purchase (SPA)',
                desc: 'Sub-sale, direct developer, perfection of transfer (14A), and private caveats.',
              },
              {
                title: 'Tenancy Disputes & Land Recovery',
                desc: 'Eviction notices, recovery of rental arrears, distress actions, and trespass claims.',
              },
              {
                title: 'Mutual & Contested Divorces',
                desc: 'Joint petitions, custody hearings, maintenance enforcement, and asset division.',
              },
              {
                title: 'Will Writing & Probate',
                desc: 'Custom testamentary trusts, High Court Grant of Probate, and LA applications.',
              },
              {
                title: 'Corporate Debt Recovery',
                desc: 'Letters of demand, Section 466 winding-up notices, and judgment execution.',
              },
              {
                title: 'Commercial Agreement Crafting',
                desc: 'Shareholder agreements, joint ventures, supply contracts, and employment covenants.',
              },
              {
                title: 'Banking & Financial Litigation',
                desc: 'Performance bond calls, account freezing disputes, and bankruptcy proceedings.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-cream border border-charcoal-light/40 flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-brass shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-navy text-base mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Callout */}
      <section className="py-20 md:py-28 bg-navy text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream tracking-tight">
                Require Immediate Legal Assistance?
              </h2>
              <p className="text-cream/80 text-base leading-relaxed font-light">
                Fill out the consultation form with the specifics of your matter. Our senior lawyers will review your documents and provide a confidential preliminary assessment.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
