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
import ScrollReveal from '@/components/effects/ScrollReveal';
import ParallaxContainer from '@/components/effects/ParallaxContainer';
import { Scale, ShieldCheck, CheckCircle2, Phone, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Practice Areas & Legal Disciplines | Low, Wah Chin & Co.',
  description: 'Explore the full legal disciplines of Messrs. Low, Wah Chin & Co. Advocates & Solicitors in Kuala Lumpur. Corporate Advisory, Conveyancing, Family Divorce, Estate Probate, Employment Law & Commercial Litigation.',
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

      {/* Hero Header with Parallax */}
      <section className="relative bg-[#170b1e] text-[#faf9f6] py-20 sm:py-28 overflow-hidden border-b border-[#c6a052]/30">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <ParallaxContainer speed={0.15} className="w-full h-[120%] -top-[10%] absolute">
            <Image
              src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85"
              alt="Low, Wah Chin & Co. Practice Disciplines Kuala Lumpur"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-65 brightness-95 contrast-105 scale-105"
            />
          </ParallaxContainer>
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#432056]/35 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#c6a052]/20 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/40 text-xs font-bold uppercase tracking-wider mb-4 animate-float-slow">
              <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Advocates & Solicitors • High Court of Malaya</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf9f6] mb-4 drop-shadow-md">
              Practice Areas & Legal Disciplines
            </h1>
            <p className="font-serif italic text-[#e5c777] text-lg sm:text-xl mb-4">
              &ldquo;Comprehensive Legal Protection for Individuals, Families & Enterprises&rdquo;
            </p>
            <p className="text-[#faf9f6]/85 text-base sm:text-lg leading-relaxed font-light">
              With over 15 years of courtroom diligence in the High Court of Malaya and Appellate Courts, Low, Wah Chin & Co. provides dedicated legal counsel across 6 core practice disciplines and specialized statutory scope areas.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <TrustBar />

      {/* 1. Core Practice Disciplines (Top 9) */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="Foundational Practice"
              title="Core Practice Disciplines (9 Primary Areas)"
              subtitle="The 9 core legal practice areas handled with deep appellate diligence, commercial acumen, and human-centric care by Low, Wah Chin & Co."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.slice(0, 9).map((practice, pIdx) => (
              <ScrollReveal key={practice.slug} animation="fade-up" delay={(pIdx % 3) * 100}>
                <PracticeCard practice={practice} featured />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Specialized Service Offerings & Scope (Following Areas) */}
      <section className="py-20 md:py-28 bg-white border-t border-[#c6a052]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="Specialized Scope"
              title="Specialized Service Offerings & Scope"
              subtitle="Focused legal representation tailored for specific claims, dispute resolutions, and statutory procedures."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.slice(9).map((practice, sIdx) => (
              <ScrollReveal key={practice.slug} animation="fade-up" delay={(sIdx % 3) * 100}>
                <PracticeCard practice={practice} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Comprehensive Service Checklist */}
      <section className="py-20 bg-[#faf9f6] border-t border-[#e8e1d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Full Service Spectrum"
            title="Complete Scope of Matters We Attend To"
            subtitle="Our legal services cover both transactional documentation and contentious courtroom trials."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Corporate & Commercial Advisory',
                desc: 'Commercial agreements, M&A due diligence, SME compliance, and shareholder dispute resolution.',
              },
              {
                title: 'Real Estate & Conveyancing (SPA)',
                desc: 'Sub-sale, direct developer, perfection of transfer (14A), tenancy drafting, and private caveats.',
              },
              {
                title: 'Civil & Commercial Litigation',
                desc: 'High Court injunctions, commercial dispute resolution, contractual breach, and appellate advocacy.',
              },
              {
                title: 'Family, Matrimonial & Child Custody',
                desc: 'Joint petitions (mutual consent), contested single petitions, custody hearings, and asset division.',
              },
              {
                title: 'Will Writing, Probate & Estate Administration',
                desc: 'Testamentary wills, High Court Grant of Probate, Letters of Administration (LA), and estate distribution.',
              },
              {
                title: 'Employment & Industrial Relations',
                desc: 'Unfair dismissal claims, employment agreements, retrenchment advisory, and Industrial Court trials.',
              },
              {
                title: 'Personal Injury & Medical Negligence',
                desc: 'Motor vehicle accident compensation, hospital malpractice claims, and actuarial damage recovery.',
              },
              {
                title: 'Debt Recovery & Winding Up Petitions',
                desc: 'Formal Letters of Demand, Section 466 Companies Act 2016 statutory notices, and judgment execution.',
              },
              {
                title: 'Construction Claims & CIPAA Adjudication',
                desc: 'Renovation defect claims, liquidated damages (LAD), contractor abandonment, and CIPAA proceedings.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#e8e1d5] flex items-start gap-4 shadow-sm hover:border-[#c6a052] transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#c6a052] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#22122b] text-base mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Callout */}
      <section className="py-20 md:py-28 bg-[#170b1e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                badge="Confidential Case Appraisal"
                title="Require Immediate Legal Representation?"
                subtitle="Submit your legal matter details. Our principal advocate will review your brief with strict confidentiality within one business day."
                alignment="left"
                light
              />
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
