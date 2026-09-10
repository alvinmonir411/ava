import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPracticeAreas, getPracticeAreaBySlug } from '@/db';
import { constructMetadata, getBreadcrumbSchema, getFaqSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import FaqAccordion from '@/components/common/FaqAccordion';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import PreparationChecklistCard from '@/components/common/PreparationChecklistCard';
import {
  Scale,
  CheckCircle2,
  Phone,
  Shield,
  Clock,
  ArrowRight,
  HelpCircle,
  Award,
  ChevronRight,
  BookOpen,
  FileText,
  Compass,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const practiceAreas = await getPracticeAreas();
  return practiceAreas.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const practice = await getPracticeAreaBySlug(slug);

  if (!practice) {
    return constructMetadata({
      title: 'Practice Area Not Found | Messrs. Low Wah Chin & Co.',
      description: 'The requested practice area could not be found.',
    });
  }

  return constructMetadata({
    title: `${practice.title} | Messrs. Low Wah Chin & Co. Advocates & Solicitors`,
    description: practice.seoDescription,
    canonicalUrl: `${SITE_CONFIG.url}/practices/${practice.slug}`,
    ogImage: practice.heroImage,
  });
}

export default async function IndividualPracticePage({ params }: Props) {
  const { slug } = await params;
  const practice = await getPracticeAreaBySlug(slug);
  const allPractices = await getPracticeAreas();

  if (!practice) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Practice Areas', url: `${SITE_CONFIG.url}/practices` },
    { name: practice.title, url: `${SITE_CONFIG.url}/practices/${practice.slug}` },
  ]);

  const faqSchema = getFaqSchema(practice.faqs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />

      {/* Page Hero */}
      <PageHero
        title={practice.title}
        subtitle={practice.tagline}
        badge={practice.chineseTitle ? `【 ${practice.chineseTitle} 】• High Court of Malaya` : 'Advocates & Solicitors • High Court of Malaya'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Practice Areas', href: '/practices' },
        ]}
        bgImage={practice.heroImage}
      />

      {/* 1. Main Practice Content Layout (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#faf7fc] text-[#1e0d33] border-b border-[#ebdff5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: In-depth Legal Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Practice Photo Banner in thin frame */}
              <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden border border-[#c6a052]/40 bg-[#1e0d33] shadow-sm">
                <Image
                  src={practice.heroImage}
                  alt={`${practice.title} Legal Counsel Kuala Lumpur`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120720]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded bg-[#1e0d33]/90 border border-[#c6a052]/40 text-[#faf7fc] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#dcc280] block">
                      Advocates & Solicitors • High Court of Malaya
                    </span>
                    <span className="font-serif text-xs sm:text-sm font-bold text-white">
                      Messrs. Low Wah Chin & Co. — {practice.title}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-[#c6a052]/20 text-[#dcc280] border border-[#c6a052]/30 text-xs font-semibold">
                    Kuala Lumpur Chambers
                  </span>
                </div>
              </div>

              {/* Comprehensive Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#ebdff5] shadow-xs">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e0d33] mb-4">
                  Overview & Legal Representation
                </h2>
                <div className="prose text-[#4b3d56] leading-relaxed space-y-4 text-sm sm:text-base font-normal">
                  {practice.fullDescription.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Malaysian Statutory & Regulatory Framework */}
              {practice.statutoryFramework && practice.statutoryFramework.length > 0 && (
                <div className="p-6 sm:p-8 rounded-lg bg-[#180829] text-[#faf7fc] border border-[#c6a052]/40 shadow-sm">
                  <div className="flex items-center gap-2 text-[#dcc280] text-xs font-bold uppercase tracking-wider mb-2">
                    <BookOpen className="w-4 h-4 text-[#c6a052]" />
                    <span>Governing Laws & Malaysian Statutory Framework</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Statutory Authorities & Precedential Grounding
                  </h3>
                  <p className="text-xs text-[#faf7fc]/75 mb-5">
                    Our legal briefs, applications, and advisory in this discipline are grounded in the following Malaysian statutes and authoritative precedents:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {practice.statutoryFramework.map((statute, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded bg-white/5 border border-[#c6a052]/30 flex items-start gap-2.5 text-xs text-white/90"
                      >
                        <Scale className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                        <span className="font-medium">{statute}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What We Handle Breakdown */}
              <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#ebdff5] space-y-5 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-[#1e0d33]">
                  What We Handle in This Practice Discipline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {practice.whatWeHandle.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-[#faf7fc] p-3.5 rounded border border-[#ebdff5]">
                      <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#4b3d56] font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedural Pathway Timeline */}
              {practice.proceduralTimeline && practice.proceduralTimeline.length > 0 && (
                <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#ebdff5] shadow-xs space-y-5">
                  <div className="flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-[#c6a052]" />
                    <span>Litigation Pathway & Matter Progression</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1e0d33]">
                    How We Progress Your Matter
                  </h3>
                  <div className="space-y-3">
                    {practice.proceduralTimeline.map((item, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-start gap-3.5 p-3.5 rounded bg-[#faf7fc] border border-[#ebdff5]"
                      >
                        <div className="w-7 h-7 rounded bg-[#1e0d33] text-[#dcc280] font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#c6a052]/40">
                          {item.step || tIdx + 1}
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <h4 className="font-serif font-bold text-sm text-[#1e0d33]">
                              {item.title}
                            </h4>
                            {item.duration && (
                              <span className="text-[10px] font-semibold text-[#9d7835] bg-white px-2 py-0.5 rounded border border-[#ebdff5]">
                                ⏱ {item.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-[#594d63] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequently Asked Questions */}
              {practice.faqs && practice.faqs.length > 0 && (
                <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#ebdff5] shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-[#c6a052]" />
                    <span>Common Questions</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1e0d33]">
                    Frequently Asked Questions ({practice.title})
                  </h3>
                  <FaqAccordion items={practice.faqs} />
                </div>
              )}
            </div>

            {/* Right Column: Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Preparation Checklist */}
              {practice.preparationChecklist && practice.preparationChecklist.length > 0 && (
                <PreparationChecklistCard practiceTitle={practice.title} checklist={practice.preparationChecklist} />
              )}

              {/* Direct WhatsApp Callout */}
              <div className="p-6 bg-white rounded-lg border border-[#c6a052]/40 shadow-xs space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9d7835] block">
                  Quick Legal Inquiry
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1e0d33]">
                  Consult with Principal Counsel
                </h4>
                <p className="text-xs text-[#594d63] leading-relaxed">
                  Have an urgent question regarding {practice.title}? Connect directly with our chambers.
                </p>
                <div className="pt-1">
                  <WhatsAppButton
                    variant="inline"
                    label="WhatsApp Senior Counsel"
                    message={`Hello Messrs. Low, Wah Chin & Co., I would like to inquire regarding ${practice.title}.`}
                  />
                </div>
              </div>

              {/* All Practice Areas Quick Nav */}
              <div className="p-5 bg-white rounded-lg border border-[#ebdff5] space-y-3 shadow-xs">
                <h4 className="font-serif text-sm font-bold text-[#1e0d33] uppercase tracking-wider border-b border-[#ebdff5] pb-2">
                  Other Practice Disciplines
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {allPractices.slice(0, 7).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/practices/${p.slug}`}
                        className={`block py-1 hover:text-[#9d7835] transition-colors line-clamp-1 ${
                          p.slug === practice.slug ? 'font-bold text-[#9d7835]' : 'text-[#594d63]'
                        }`}
                      >
                        • {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Consultation Booking (Alternating Dark Section) */}
      <section id="consultation-box" className="py-20 bg-[#180829] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Book a Consultation on {practice.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#faf7fc]/75">
              All communications are strictly protected by Legal Professional Privilege.
            </p>
          </div>
          <div className="bg-white text-[#1e0d33] p-6 sm:p-8 rounded-lg shadow-xl border border-[#c6a052]/30">
            <ConsultationForm defaultPracticeArea={practice.title} />
          </div>
        </div>
      </section>
    </>
  );
}
