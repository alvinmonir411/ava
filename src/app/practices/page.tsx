import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPracticeAreas } from '@/db';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import PracticeCard from '@/components/cards/PracticeCard';
import { Scale, ArrowRight, ShieldCheck, CheckCircle2, Phone, Briefcase, Building2, Users, FileCheck, Shield } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

import { getFirmSettings } from '@/actions/settingsActions';

export const metadata = constructMetadata({
  title: 'Practice Areas & Legal Disciplines | Messrs. Low Wah Chin & Co.',
  description: 'Explore the full legal disciplines of Messrs. Low Wah Chin & Co. Advocates & Solicitors in Kuala Lumpur. Corporate Advisory, Conveyancing, Family Divorce, Estate Probate, Employment Law & Commercial Litigation.',
  canonicalUrl: `${SITE_CONFIG.url}/practices`,
});

const PRIMARY_SIX = [
  {
    title: 'Legal Advice & Consultation',
    slug: 'contract-drafting-commercial-advisory',
    icon: Scale,
    description: 'Strategic legal evaluation, rights appraisal, and actionable guidance across civil, commercial, and personal legal affairs.',
  },
  {
    title: 'Property & Conveyancing',
    slug: 'real-estate-conveyancing',
    icon: Building2,
    description: 'End-to-end management of Sale and Purchase Agreements (SPA), loan documentation, private caveats, and title perfection.',
  },
  {
    title: 'Family & Divorce Matters',
    slug: 'family-probate-estate',
    icon: Users,
    description: 'Empathetic counsel in mutual consent joint petitions, single petitions, child custody, spousal maintenance, and asset division.',
  },
  {
    title: 'Dispute Resolution & Claims',
    slug: 'contractual-dispute-claims',
    icon: Shield,
    description: 'Tenacious trial and appellate advocacy in commercial breaches, debt recovery, tort liabilities, and contractor disputes.',
  },
  {
    title: 'Wills & Estate Distribution',
    slug: 'family-probate-estate',
    icon: FileCheck,
    description: 'Meticulous testamentary will drafting, Grant of Probate applications, Letters of Administration, and estate distribution.',
  },
  {
    title: 'Company Matters & Agreements',
    slug: 'corporate-commercial',
    icon: Briefcase,
    description: 'Bespoke commercial contract drafting, shareholder deeds, employment governance, and Section 466 statutory recovery.',
  },
];

export default async function PracticesPage() {
  const settings = await getFirmSettings();
  const practiceAreas = await getPracticeAreas();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Practice Areas', url: `${SITE_CONFIG.url}/practices` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title="Practice Areas & Legal Disciplines"
        subtitle="Comprehensive Legal Protection for Individuals, Families & Enterprises"
        badge="Advocates & Solicitors • High Court of Malaya"
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage={settings.heroImages?.practicesHeroImage || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85"}
      />

      {/* 1. Tradition of Talent: 6 Core Practice Disciplines */}
      <section className="py-20 lg:py-28 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D8C7F0] text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-xs">
              <Scale className="w-3.5 h-3.5 text-[#4B2A7B]" />
              <span>Core Disciplines</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2D33] mb-3">
              A Tradition of Talent
            </h2>
            <p className="font-serif italic text-[#4B2A7B] text-base mb-3">
              &ldquo;Meticulous Legal Craftsmanship & Steadfast Courtroom Advocacy&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#2B2D33]/80 font-light leading-relaxed">
              Serving corporate entities, families, and individuals throughout Malaysia with transparent counsel and relentless trial execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRIMARY_SIX.map((area, idx) => {
              const Icon = area.icon;
              return (
                <Link
                  key={idx}
                  href={`/practices/${area.slug}`}
                  className="group block p-6 rounded-xl border border-[#E5DFD3] bg-white hover:border-[#4B2A7B] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-2.5 rounded-lg border border-[#E5DFD3] bg-[#FAF8F2] text-[#4B2A7B] group-hover:bg-[#4B2A7B] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#4B2A7B]/60">0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2B2D33] group-hover:text-[#4B2A7B] transition-colors mb-2">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2B2D33]/75 leading-relaxed font-light line-clamp-3 mb-4">
                    {area.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#4B2A7B] group-hover:text-[#3A1F60] group-hover:translate-x-1 transition-transform">
                    <span>View Discipline Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Full Directory of Practice Disciplines (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Briefcase className="w-3.5 h-3.5 text-[#4B2A7B]" />
              <span>Full Practice Directory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2D33]">
              All Legal Practice Areas & Statutory Scopes
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2D33]/70 mt-2 font-light">
              Detailed procedural frameworks, preparation checklists, and statutory references.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((practice) => (
              <PracticeCard key={practice.slug} practice={practice} />
            ))}
          </div>

          {/* Consultation Banner */}
          <div className="mt-16 p-6 sm:p-8 bg-white border border-[#E5DFD3] rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                Need Legal Guidance on a Matter?
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2D33]/70 mt-1">
                Consult with Lincoln’s Inn Barrister & High Court Advocate Ava Rachel Low.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link href="/contact" className="btn-gradient-royal px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center">
                Schedule Consultation
              </Link>
              <WhatsAppButton variant="compact" label="WhatsApp" className="justify-center text-center" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
