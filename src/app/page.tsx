import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPracticeAreas, getArticles, getTestimonials } from '@/db';
import TrustBar from '@/components/common/TrustBar';
import SectionHeading from '@/components/common/SectionHeading';
import PracticeCard from '@/components/cards/PracticeCard';
import ArticleCard from '@/components/cards/ArticleCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import JsonLd from '@/components/common/JsonLd';
import { getLegalServiceSchema } from '@/lib/metadata';
import {
  Scale,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Phone,
  CheckCircle2,
  FileCheck,
  Building,
  UserCheck,
  ChevronRight,
} from 'lucide-react';

export default async function HomePage() {
  const practiceAreas = await getPracticeAreas();
  const articles = await getArticles();
  const testimonials = await getTestimonials();
  const legalServiceSchema = getLegalServiceSchema();

  return (
    <>
      <JsonLd data={legalServiceSchema} />

      {/* Hero Section */}
      <section className="relative bg-[#0F1F3D] text-white overflow-hidden min-h-[90vh] flex items-center justify-center py-20 lg:py-28">
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85"
            alt="Messrs. Low Wah Chin & Co. Advocates & Solicitors Kuala Lumpur"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1529] via-[#0F1F3D]/95 to-[#0A1529]" />
          <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Authority Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#B8935A]/20 border border-[#B8935A]/50 text-[#CFA76F] text-xs font-bold tracking-wider uppercase mb-6 shadow-inner">
              <Scale className="w-4 h-4 text-[#CFA76F]" />
              <span>Advocates & Solicitors • High Court of Malaya</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Legal Expertise in All Areas of{' '}
              <span className="text-[#CFA76F] italic underline decoration-[#B8935A]/60 underline-offset-8">
                Business & Private Life
              </span>
            </h1>

            {/* Tagline & Subheading */}
            <p className="font-serif italic text-lg sm:text-xl text-[#CFA76F] mb-4 font-medium">
              &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
            </p>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl font-normal">
              Founded by <strong className="text-white font-semibold">Low Wah Chin (Ava Rachel)</strong>, Barrister-at-Law (Lincoln’s Inn) and Advocate of the High Court of Malaya. Delivering relentless advocacy, high responsiveness, and human-centric legal solutions across Kuala Lumpur and Peninsular Malaysia.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="btn-brass px-8 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="tel:+60175483157"
                className="btn-navy px-6 py-4 rounded-xl text-base font-semibold text-center flex items-center justify-center gap-2 bg-[#1B2F57]/80 border-[#B8935A]/40 hover:border-[#B8935A] text-white transition-all shadow-md"
              >
                <Phone className="w-5 h-5 text-[#CFA76F]" />
                <span>Call +60 17-548 3157</span>
              </a>
            </div>

            {/* Fast Guarantees */}
            <div className="mt-10 pt-8 border-t border-[#B8935A]/25 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#CFA76F]" />
                <span>100% Confidential Legal Privilege</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#CFA76F]" />
                <span>24-Hour Response Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#CFA76F]" />
                <span>Lincoln’s Inn Barrister Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar Directly Under Hero */}
      <TrustBar />

      {/* About Preview Section (Asymmetric & Premium) */}
      <section className="py-20 md:py-28 bg-[#FAF8F4] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image & Accreditation Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#B8935A]/40 bg-[#0F1F3D]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Low Wah Chin (Ava Rachel) Advocate & Solicitor LWCCO Kuala Lumpur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1529]/95 via-transparent to-transparent" />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0F1F3D]/95 backdrop-blur-md border border-[#B8935A]/40 text-white">
                  <h4 className="font-serif text-lg font-bold text-white">
                    Low Wah Chin (Ava Rachel)
                  </h4>
                  <p className="text-[#CFA76F] text-xs font-semibold">
                    Founder & Managing Partner
                  </p>
                  <p className="text-[11px] text-white/80 mt-1">
                    Barrister-at-Law, Lincoln’s Inn (UK) • LL.B (Hons) Reading (UK)
                  </p>
                </div>
              </div>

              {/* Decorative Corner Brass Emblem */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-[#B8935A]/20 border border-[#B8935A]/40 -z-10 hidden sm:block" />
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8935A]/15 border border-[#B8935A]/30 text-[#967440] text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="w-3.5 h-3.5 text-[#B8935A]" />
                <span>Firm Tradition & Core Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1F3D] tracking-tight leading-tight mb-6">
                Protecting Every Class of the Community with Excellence
              </h2>

              <p className="text-[#2B2B2B] leading-relaxed text-base sm:text-lg mb-6 font-normal">
                <strong>Messrs. Low Wah Chin & Co. (LWCCO)</strong> was established to provide clients with the most sensible, direct, and compassionate legal representation in Kuala Lumpur.
              </p>

              <blockquote className="border-l-4 border-[#B8935A] pl-5 py-3 my-6 bg-[#F0EAE1]/70 rounded-r-xl italic font-serif text-base sm:text-lg text-[#0F1F3D]">
                &ldquo;Our aim in practice is to serve the community and provide clients with the most sensible service at the sphere of humanity values. We do not limit our practice to a narrow niche—we ensure every class of the community is properly protected with excellence.&rdquo;
              </blockquote>

              <p className="text-[#5A5A5A] leading-relaxed text-sm sm:text-base mb-8">
                With a strong grounding in Civil and Commercial Litigation, Personal Injury Tort, Property Conveyancing, Family Law, and Corporate Dispute Resolution, Ms. Low brings deep courtroom experience extending up to the Appellate Courts of Malaysia.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white border border-[#E2DDD5] shadow-sm">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1F3D] block">2011</span>
                  <span className="text-xs text-[#5A5A5A] font-semibold">Admitted to Malaysian Bar</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E2DDD5] shadow-sm">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1F3D] block">Top 6</span>
                  <span className="text-xs text-[#5A5A5A] font-semibold">Trusted Malaysia Personal Injury</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="btn-navy px-6 py-3.5 rounded-lg text-sm font-bold inline-flex items-center gap-2 shadow-md"
                >
                  <span>Read Full Firm Bio</span>
                  <ChevronRight className="w-4 h-4 text-[#CFA76F]" />
                </Link>
                <Link
                  href="/our-team"
                  className="px-5 py-3 rounded-lg border border-[#0F1F3D]/30 text-[#0F1F3D] font-bold text-sm hover:bg-[#F0EAE1] transition-colors inline-flex items-center gap-2"
                >
                  <span>View Appellate Experience</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview Grid */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Legal Disciplines"
            title="Comprehensive Legal Representation"
            subtitle="Explore our core practice areas tailored for individual protection, real estate, families, and commercial growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((practice) => (
              <PracticeCard key={practice.slug} practice={practice} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/practices"
              className="btn-brass px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg"
            >
              <span>View Full Practice Directory & Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose LWCCO / Distinct Advantages */}
      <section className="py-20 md:py-28 bg-[#0F1F3D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The LWCCO Advantage"
            title="Why Clients Entrust Their Legal Matters to Us"
            subtitle="A boutique legal firm with top-tier capability, direct senior partner access, and fearless appellate advocacy."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1B2F57]/70 border border-[#B8935A]/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Direct Partner Attention
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Your file is never relegated to junior paralegals. Ms. Ava Rachel Low directly supervises every brief, ensuring rigorous quality and strategic depth.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#1B2F57]/70 border border-[#B8935A]/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                High Responsiveness
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                We know legal uncertainty creates anxiety. We provide prompt updates, transparent timelines, and guarantee a 24-hour response to client inquiries.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#1B2F57]/70 border border-[#B8935A]/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Appellate Court Diligence
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Extensive litigation track record up to the Court of Appeal and Federal Court of Malaysia across commercial, land, banking, and insurance disputes.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#1B2F57]/70 border border-[#B8935A]/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Transparent & Sensible Fees
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Upfront, transparent billing with no hidden disbursements. Generous professional advice with cost-effective retainer and fixed-fee options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven 3-Step Process */}
      <section className="py-20 md:py-28 bg-[#FAF8F4] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="How We Work"
            title="A Clear, Structured Path to Legal Resolution"
            subtitle="From initial fact-finding to decisive legal action, we keep the process simple, transparent, and focused on results."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E2DDD5] shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-[#0F1F3D] text-[#CFA76F] font-serif font-bold text-xl flex items-center justify-center mb-6">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F1F3D] mb-3">
                Confidential Case Appraisal
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                We review your documents, examine the statutory framework, and identify key strengths, risks, and preliminary remedies under Malaysian law.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#B8935A]/60 shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-[#B8935A] text-[#0F1F3D] font-serif font-bold text-xl flex items-center justify-center mb-6">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F1F3D] mb-3">
                Transparent Legal Strategy
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                We provide a written roadmap detailing recommended steps (negotiation, LOD, court petition), realistic timelines, and a fixed fee quote.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E2DDD5] shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-[#0F1F3D] text-[#CFA76F] font-serif font-bold text-xl flex items-center justify-center mb-6">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F1F3D] mb-3">
                Diligent Execution & Advocacy
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                Our advocates execute with precision—drafting airtight agreements or championing your rights tenaciously in courtroom trials and appellate hearings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Accolades Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Client Testimonials & Recognition"
            title="Trusted by Individuals and Corporations Alike"
            subtitle="Hear what independent legal analysts, consumer review portals, and our clients say about LWCCO."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Legal Insights & Articles Preview */}
      <section className="py-20 md:py-28 bg-[#FAF8F4] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8935A]/15 border border-[#B8935A]/30 text-[#967440] text-xs font-bold uppercase tracking-wider mb-3">
                <span>Legal Publications & Guides</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1F3D] tracking-tight">
                Latest Insights & Industry Reviews
              </h2>
            </div>
            <Link
              href="/articles"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#0F1F3D] hover:text-[#B8935A] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Final Booking Consultation Section */}
      <section id="consultation" className="py-20 md:py-32 bg-[#0F1F3D] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8935A]/20 border border-[#B8935A]/40 text-[#CFA76F] text-xs font-bold uppercase tracking-wider">
                <span>Start Your Case Review</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Let Us Help You Resolve Your Legal Matter With Confidence
              </h2>

              <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal">
                Whether you are facing an urgent court dispute, purchasing a property, organizing family arrangements, or requiring contract drafting, our senior team is ready to advise you.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#B8935A]/25 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#CFA76F] uppercase font-bold tracking-wider block">Call Direct:</span>
                    <a href="tel:+60175483157" className="text-white font-semibold hover:text-[#CFA76F] transition-colors">
                      +60 17-548 3157
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#CFA76F] uppercase font-bold tracking-wider block">Office Location:</span>
                    <span className="text-white/90">Colony @ KLCC, Vipod Residences, KL</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <WhatsAppButton
                  variant="inline"
                  label="Instant WhatsApp Chat with Counsel"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
