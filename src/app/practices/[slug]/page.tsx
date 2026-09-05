import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPracticeAreas, getPracticeAreaBySlug } from '@/db';
import { constructMetadata, getBreadcrumbSchema, getFaqSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import FaqAccordion from '@/components/common/FaqAccordion';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import TrustBar from '@/components/common/TrustBar';
import PreparationChecklistCard from '@/components/common/PreparationChecklistCard';
import SectionDivider from '@/components/common/SectionDivider';
import AuroraBackground from '@/components/effects/AuroraBackground';
import AuroraGlow from '@/components/effects/AuroraGlow';
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
      title: 'Practice Area Not Found | Low, Wah Chin & Co.',
      description: 'The requested practice area could not be found.',
    });
  }

  return constructMetadata({
    title: `${practice.title} | Low, Wah Chin & Co. Advocates & Solicitors`,
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

      {/* Practice Hero Section with Aurora UI */}
      <AuroraBackground
        intensity="vibrant"
        showGrid={true}
        className="bg-[#170b1e] text-[#faf9f6] py-16 sm:py-24 border-b border-[#c6a052]/30"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={practice.heroImage}
            alt={`${practice.title} Lawyer in Kuala Lumpur`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-50 brightness-95 contrast-105 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/95 via-[#22122b]/80 to-[#170b1e]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#faf9f6]/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#e5c777] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c6a052]/60" />
            <Link href="/practices" className="hover:text-[#e5c777] transition-colors">Practice Areas</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c6a052]/60" />
            <span className="text-[#e5c777] font-medium truncate">{practice.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full aurora-pill text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-4 animate-float-slow">
              <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Advocates & Solicitors • High Court of Malaya</span>
            </div>

            <div className="mb-4">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#faf9f6] leading-tight aurora-text-gradient">
                {practice.title}
              </h1>
              {practice.chineseTitle && (
                <div className="text-[#e5c777]/90 text-xl sm:text-2xl font-serif font-light tracking-wide mt-1">
                  【 {practice.chineseTitle} 】
                </div>
              )}
            </div>

            <p className="font-serif italic text-[#e5c777] text-base sm:text-lg mb-6">
              {practice.tagline}
            </p>

            <p className="text-[#faf9f6]/90 text-base sm:text-lg leading-relaxed mb-6 font-light">
              {practice.shortDescription}
            </p>

            {/* Statutory tags in hero */}
            {practice.statutoryFramework && practice.statutoryFramework.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs text-[#e5c777] font-mono flex items-center gap-1 mr-1 font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-[#c6a052]" />
                  Statutes:
                </span>
                {practice.statutoryFramework.slice(0, 3).map((statute, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-full text-xs font-serif aurora-glass text-white/95 border border-[#c6a052]/30 shadow-xs"
                  >
                    § {statute}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#consultation-box"
                className="btn-gold px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-[0_0_20px_rgba(198,160,82,0.35)] hover:scale-105 transition-all"
              >
                <span>Book a Confidential Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#170b1e]" />
              </Link>
              <WhatsAppButton
                variant="compact"
                label="Direct WhatsApp"
                message={`Hello Messrs. Low, Wah Chin & Co., I would like to inquire regarding ${practice.title}.`}
              />
            </div>
          </div>
        </div>
      </AuroraBackground>

      <TrustBar />

      {/* Main Content Layout (2-Column Grid) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: In-depth Legal Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Featured Practice Photo Banner */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border-2 border-[#c6a052]/40 bg-[#22122b]">
                <Image
                  src={practice.heroImage}
                  alt={`${practice.title} Legal Counsel Kuala Lumpur`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#22122b]/90 backdrop-blur-sm border border-[#c6a052]/40 text-[#faf9f6] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#e5c777] uppercase font-bold tracking-wider block">
                      Advocates & Solicitors • High Court of Malaya
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-white">
                      Messrs. Low, Wah Chin & Co. — {practice.title}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/30 text-xs font-semibold">
                    Kuala Lumpur Chambers
                  </span>
                </div>
              </div>

              {/* Comprehensive Overview */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#22122b] mb-4">
                  Overview & Legal Representation
                </h2>
                <div className="prose prose-lg text-[#231f20] leading-relaxed space-y-4 font-normal">
                  {practice.fullDescription.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-base sm:text-lg leading-relaxed text-[#231f20]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Malaysian Statutory & Regulatory Framework Box */}
              {practice.statutoryFramework && practice.statutoryFramework.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#170b1e] text-[#faf9f6] border border-[#c6a052]/40 shadow-xl">
                  <div className="flex items-center gap-2 text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-2">
                    <BookOpen className="w-4 h-4 text-[#c6a052]" />
                    <span>Governing Laws & Malaysian Statutory Framework</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Statutory Authorities & Precedential Grounding
                  </h3>
                  <p className="text-xs sm:text-sm text-[#faf9f6]/75 mb-6">
                    Our legal briefs, interlocutory applications, and transactional structures in this discipline are rigorously grounded in Malaysian statutes, subsidiary legislation, and authoritative precedents:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {practice.statutoryFramework.map((statute, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-white/5 border border-[#c6a052]/25 hover:border-[#c6a052]/60 transition-colors flex items-start gap-3"
                      >
                        <Scale className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-white/95">
                          {statute}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What We Handle Breakdown */}
              <div className="p-8 rounded-2xl bg-[#faf9f6] border border-[#e8e1d5] space-y-6 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#22122b]">
                  What We Handle in This Practice Discipline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {practice.whatWeHandle.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#e8e1d5] shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-[#c6a052] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#231f20] font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedural Overview & Matter Progression Timeline */}
              {practice.proceduralTimeline && practice.proceduralTimeline.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#c6a052]/30 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-[#c6a052]" />
                    <span>Litigation Pathway & Advisory Progression</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#22122b]">
                      How We Progress Your Matter
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595355] mt-1">
                      A clear, predictable roadmap from statutory assessment through resolution or court judgment.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {practice.proceduralTimeline.map((item, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#faf9f6] border border-[#e8e1d5] hover:border-[#c6a052]/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#170b1e] text-[#e5c777] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#c6a052]/40 shadow-xs">
                          {item.step || tIdx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <h4 className="font-serif font-bold text-sm sm:text-base text-[#22122b]">
                              {item.title}
                            </h4>
                            {item.duration && (
                              <span className="text-[10.5px] font-semibold text-[#9d7835] bg-white px-2 py-0.5 rounded border border-[#c6a052]/30">
                                ⏱ {item.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preparation Checklist Component */}
              <PreparationChecklistCard
                practiceTitle={practice.title}
                checklist={practice.preparationChecklist}
              />

              {/* Key Benefits */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#22122b] mb-6">
                  Why Clients Choose LWCCO for {practice.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {practice.keyBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="p-5 rounded-xl border border-[#c6a052]/30 bg-[#faf9f6]">
                      <div className="flex items-center gap-2 text-[#22122b] font-bold text-sm mb-1.5">
                        <Award className="w-4 h-4 text-[#c6a052]" />
                        <span>Core Advantage</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice-Specific FAQs */}
              <div>
                <div className="flex items-center gap-2 text-[#9d7835] text-sm font-bold uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4 text-[#c6a052]" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#22122b] mb-6">
                  Common Questions Regarding {practice.title}
                </h3>
                <FaqAccordion items={practice.faqs} />
              </div>
            </div>

            {/* Right Column: Sticky Consultation Box & Quick Actions (4 cols) */}
            <div id="consultation-box" className="lg:col-span-4 static lg:sticky lg:top-28 space-y-6">
              <AuroraGlow glowColor="gold" rounded="rounded-2xl">
                <div className="bg-[#22122b] p-6 sm:p-8 rounded-2xl text-[#faf9f6] border-2 border-[#c6a052]/50 shadow-2xl">
                  <div className="flex items-center gap-2 text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-3">
                    <Clock className="w-4 h-4 text-[#c6a052]" />
                    <span>24-Hour Response Guarantee</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Speak With Senior Counsel
                  </h3>
                  <p className="text-xs sm:text-sm text-[#faf9f6]/75 mb-6 font-light">
                    Request a confidential case review for your {practice.title.toLowerCase()} matter.
                  </p>

                  <div className="space-y-3 mb-6 text-xs text-[#faf9f6]/85">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-[#c6a052] shrink-0" />
                      <span>100% Legal Professional Privilege</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
                      <span>Transparent Upfront Fee Estimates</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#c6a052] shrink-0" />
                      <a href="tel:+60175483157" className="hover:text-[#e5c777] font-semibold text-white">
                        Direct: +60 17-548 3157
                      </a>
                    </div>
                  </div>

                  <WhatsAppButton
                    variant="inline"
                    label="WhatsApp About This Service"
                    message={`Hi LWCCO, I would like to book a consultation regarding ${practice.title}.`}
                    className="w-full text-center justify-center text-sm shadow-md mb-3"
                  />

                  <Link
                    href={`/contact?practice=${practice.slug}`}
                    className="btn-gold w-full py-3 rounded-xl text-center block text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Go to Full Booking Form
                  </Link>
                </div>
              </AuroraGlow>

              {/* Other Practice Areas Quick Links */}
              <div className="bg-[#faf9f6] p-6 rounded-2xl border border-[#e8e1d5]">
                <h4 className="font-serif font-bold text-[#22122b] text-sm uppercase tracking-wider border-b border-[#c6a052]/25 pb-2 mb-3">
                  Other Practice Disciplines
                </h4>
                <div className="space-y-2 text-xs">
                  {allPractices
                    .filter((p) => p.slug !== practice.slug)
                    .slice(0, 8)
                    .map((p, idx) => (
                      <Link
                        key={idx}
                        href={`/practices/${p.slug}`}
                        className="block py-1.5 text-[#231f20] hover:text-[#9d7835] font-medium transition-colors truncate"
                      >
                        → {p.title} {p.chineseTitle ? `(${p.chineseTitle})` : ''}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Booking Form */}
      <section className="py-20 bg-[#faf9f6] border-t border-[#e8e1d5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Direct Inquiry"
            title={`Schedule a Consultation on ${practice.title}`}
            subtitle="Fill out the form below with the details of your situation to receive partner-level guidance."
          />
          <ConsultationForm defaultPracticeArea={practice.title} />
        </div>
      </section>
    </>
  );
}
