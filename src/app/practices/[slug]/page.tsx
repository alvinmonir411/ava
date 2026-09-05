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
      title: 'Practice Area Not Found | LWCCO',
      description: 'The requested practice area could not be found.',
    });
  }

  return constructMetadata({
    title: practice.seoTitle,
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

      {/* Practice Hero Section */}
      <section className="relative bg-navy text-cream py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0">
          <Image
            src={practice.heroImage}
            alt={`${practice.title} Lawyer in Kuala Lumpur`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/90 to-navy-dark/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-cream/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brass-light transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brass/60" />
            <Link href="/practices" className="hover:text-brass-light transition-colors">Practice Areas</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brass/60" />
            <span className="text-brass-light font-medium truncate">{practice.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              <span>Advocates & Solicitors • Kuala Lumpur</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-tight mb-4">
              {practice.title} in Kuala Lumpur
            </h1>

            <p className="font-serif italic text-brass-light text-base sm:text-lg mb-6">
              {practice.tagline}
            </p>

            <p className="text-cream/80 text-base sm:text-lg leading-relaxed mb-8 font-light">
              {practice.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#consultation-box"
                className="btn-brass px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-xl"
              >
                <span>Book a Confidential Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppButton
                variant="compact"
                label="Direct WhatsApp"
                message={`Hello Messrs. Low Wah Chin & Co., I would like to inquire regarding ${practice.title}.`}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Main Content Layout (2-Column Grid) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: In-depth Legal Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Featured Practice Photo Banner */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border-2 border-brass/30 bg-navy">
                <Image
                  src={practice.heroImage}
                  alt={`${practice.title} Legal Counsel Kuala Lumpur`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-navy/85 backdrop-blur-sm border border-brass/30 text-cream flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brass-light uppercase font-bold tracking-wider block">
                      Advocates & Solicitors • High Court of Malaya
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-white">
                      Messrs. Low Wah Chin & Co. — {practice.title}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-semibold">
                    Kuala Lumpur Chambers
                  </span>
                </div>
              </div>

              {/* Comprehensive Overview */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-4">
                  Overview & Legal Representation
                </h2>
                <div className="prose prose-lg text-charcoal leading-relaxed space-y-4 font-light">
                  {practice.fullDescription.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-base sm:text-lg leading-relaxed text-charcoal">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* What We Handle Breakdown */}
              <div className="p-8 rounded-2xl bg-cream border border-charcoal-light/40 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-navy">
                  What We Handle in This Practice Discipline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {practice.whatWeHandle.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-charcoal-light/30">
                      <CheckCircle2 className="w-5 h-5 text-brass shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-charcoal font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-6">
                  Why Clients Choose LWCCO for {practice.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {practice.keyBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="p-5 rounded-xl border border-brass/30 bg-cream-dark/30">
                      <div className="flex items-center gap-2 text-navy font-bold text-sm mb-1.5">
                        <Award className="w-4 h-4 text-brass" />
                        <span>Core Advantage</span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice-Specific FAQs */}
              <div>
                <div className="flex items-center gap-2 text-brass text-sm font-bold uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-6">
                  Common Questions Regarding {practice.title}
                </h3>
                <FaqAccordion items={practice.faqs} />
              </div>
            </div>

            {/* Right Column: Sticky Consultation Box & Quick Actions (4 cols) */}
            <div id="consultation-box" className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-navy p-6 sm:p-8 rounded-2xl text-cream border-2 border-brass/40 shadow-2xl">
                <div className="flex items-center gap-2 text-brass-light text-xs font-bold uppercase tracking-wider mb-3">
                  <Clock className="w-4 h-4 text-brass" />
                  <span>24-Hour Response Guarantee</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2">
                  Speak With Senior Counsel
                </h3>
                <p className="text-xs sm:text-sm text-cream/75 mb-6">
                  Request a confidential case review for your {practice.title.toLowerCase()} matter.
                </p>

                <div className="space-y-3 mb-6 text-xs text-cream/80">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-brass shrink-0" />
                    <span>100% Legal Professional Privilege</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brass shrink-0" />
                    <span>Transparent Upfront Fee Estimates</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-brass shrink-0" />
                    <a href="tel:+60175483157" className="hover:text-brass-light font-semibold">
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
                  className="btn-brass w-full py-3 rounded-lg text-center block text-xs font-bold uppercase tracking-wider"
                >
                  Go to Full Booking Form
                </Link>
              </div>

              {/* Other Practice Areas Quick Links */}
              <div className="bg-cream p-6 rounded-2xl border border-charcoal-light/40">
                <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wider border-b border-brass/20 pb-2 mb-3">
                  Other Practice Disciplines
                </h4>
                <div className="space-y-2 text-xs">
                  {allPractices
                    .filter((p) => p.slug !== practice.slug)
                    .map((p, idx) => (
                      <Link
                        key={idx}
                        href={`/practices/${p.slug}`}
                        className="block py-1.5 text-charcoal hover:text-brass font-medium transition-colors truncate"
                      >
                        → {p.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Booking Form */}
      <section className="py-20 bg-cream border-t border-cream-dark">
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
