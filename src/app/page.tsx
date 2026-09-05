import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPracticeAreas, getArticles, getTestimonials, getRepresentativeMatters } from '@/db';
import TrustBar from '@/components/common/TrustBar';
import SectionHeading from '@/components/common/SectionHeading';
import PracticeCard from '@/components/cards/PracticeCard';
import ArticleCard from '@/components/cards/ArticleCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import BrandMonogram from '@/components/common/BrandMonogram';
import InstitutionalPedigree from '@/components/common/InstitutionalPedigree';
import PartnerGallery from '@/components/common/PartnerGallery';
import FounderPhilosophy from '@/components/common/FounderPhilosophy';
import RepresentativeMatters from '@/components/showcase/RepresentativeMatters';
import EngagementWorkflow from '@/components/common/EngagementWorkflow';
import SectionDivider from '@/components/common/SectionDivider';
import JsonLd from '@/components/common/JsonLd';
import ScrollReveal from '@/components/effects/ScrollReveal';
import TiltCard from '@/components/effects/TiltCard';
import AnimatedCounter from '@/components/effects/AnimatedCounter';
import SpotlightCard from '@/components/effects/SpotlightCard';
import ParallaxContainer from '@/components/effects/ParallaxContainer';
import AuroraBackground from '@/components/effects/AuroraBackground';
import AuroraGlow from '@/components/effects/AuroraGlow';
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
  Landmark,
  GraduationCap,
  BookOpen,
  Sparkles,
  MapPin,
  Mail,
  HelpCircle,
  Briefcase,
  TrendingUp,
} from 'lucide-react';

export default async function HomePage() {
  const practiceAreas = await getPracticeAreas();
  const articles = await getArticles();
  const testimonials = await getTestimonials();
  const representativeMatters = await getRepresentativeMatters();
  const legalServiceSchema = getLegalServiceSchema();

  return (
    <>
      <JsonLd data={legalServiceSchema} />

      {/* 1. Hero Banner: Architectural Editorial Split Layout with Aurora UI */}
      <AuroraBackground
        intensity="vibrant"
        showGrid={true}
        className="bg-[#170b1e] text-[#faf9f6] min-h-[92vh] flex items-center justify-center py-16 lg:py-24 border-b border-[#c6a052]/30"
      >
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <ParallaxContainer speed={0.15} className="w-full h-[120%] -top-[10%] absolute">
            <Image
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85"
              alt="Messrs. Low, Wah Chin & Co. Advocates & Solicitors Kuala Lumpur"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-55 scale-105 filter brightness-95 contrast-105"
            />
          </ParallaxContainer>
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Clean, Elegant Typography & Strategic CTAs (7 cols) */}
            <ScrollReveal animation="fade-up" duration={700} className="lg:col-span-7">
              {/* Minimal Authority Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full aurora-pill text-[#e5c777] text-xs font-semibold tracking-wider uppercase mb-5">
                <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
                <span>Advocates & Solicitors • Est. 2011 • Kuala Lumpur</span>
              </div>

              {/* Minimal Striking Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#faf9f6] leading-[1.15] mb-5">
                Seasoned intellect.{' '}
                <span className="aurora-text-gradient italic">Uncompromising</span> advocacy.
              </h1>

              {/* Refined Single Narrative */}
              <p className="text-[#faf9f6]/85 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-light">
                Led by principal counsel <strong className="text-white font-medium">Ava Rachel Low (刘华律师)</strong>, Lincoln’s Inn Barrister & Advocate of the High Court of Malaya. Providing strategic corporate advisory and deliberate courtroom representation with poise and clarity.
              </p>

              {/* Clean Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8">
                <Link
                  href="/contact"
                  className="btn-gold w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,160,82,0.3)] hover:scale-102 transition-transform"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#170b1e]" />
                </Link>

                <Link
                  href="/practices"
                  className="btn-outline-gold w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-center flex items-center justify-center gap-2 hover:scale-102 transition-transform"
                >
                  <Scale className="w-4 h-4 text-[#e5c777]" />
                  <span>Explore Practice Disciplines</span>
                </Link>
              </div>

              {/* Minimal Trust Strip */}
              <div className="pt-5 border-t border-[#c6a052]/20 flex flex-wrap items-center gap-6 text-xs text-[#faf9f6]/80 font-light">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                  <span>Absolute Legal Privilege</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                  <span>24-Hour Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                  <span>Lincoln’s Inn Barrister</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Clean, Uncluttered Minimalist Portrait (5 cols) */}
            <ScrollReveal animation="fade-up" delay={150} duration={700} className="lg:col-span-5 relative mt-4 lg:mt-0">
              <AuroraGlow glowColor="multi" rounded="rounded-3xl">
                <TiltCard maxTilt={6} glare={false} className="w-full">
                  <div className="relative rounded-3xl overflow-hidden border border-[#c6a052]/40 bg-[#22122b]/60 shadow-2xl">
                    <div className="relative h-[390px] sm:h-[460px] lg:h-[500px] w-full">
                      <Image
                        src="/lawyer-hero.jpg"
                        alt="Ava Rachel Low (刘华律师) Advocate & Solicitor Low, Wah Chin & Co. Kuala Lumpur"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top filter brightness-100 contrast-102"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-transparent" />
                    </div>

                    {/* Sleek Minimal Glass Caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3.5 sm:p-4 rounded-2xl aurora-glass border border-[#c6a052]/30 backdrop-blur-xl flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#faf9f6] leading-tight">
                          Ava Rachel Low (刘华律师)
                        </h4>
                        <p className="text-[#e5c777] text-[11px] sm:text-xs font-medium mt-0.5">
                          Lincoln’s Inn Barrister (UK) • High Court of Malaya
                        </p>
                      </div>
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c6a052]/20 border border-[#c6a052]/40 text-[#e5c777] flex items-center justify-center font-bold shrink-0">
                        <Scale className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </AuroraGlow>
            </ScrollReveal>
          </div>
        </div>
      </AuroraBackground>

      {/* 2. Institutional Pedigree & Regional Media Trust Bar */}
      <InstitutionalPedigree />

      {/* 2.5 Live Animated Firm Metrics Bar with Aurora Mesh */}
      <AuroraBackground intensity="subtle" showGrid={false} className="bg-[#22122b] py-8 border-b border-[#c6a052]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <ScrollReveal animation="fade-up" delay={50}>
              <div className="p-4 rounded-xl aurora-glass">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5c777] block drop-shadow-sm">
                  <AnimatedCounter end={15} suffix="+" />
                </span>
                <span className="text-xs text-[#faf9f6]/80 uppercase tracking-wider font-semibold mt-1 block">
                  Years of Courtroom Practice
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="p-4 rounded-xl aurora-glass">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5c777] block drop-shadow-sm">
                  <AnimatedCounter end={100} suffix="%" />
                </span>
                <span className="text-xs text-[#faf9f6]/80 uppercase tracking-wider font-semibold mt-1 block">
                  Legal Privilege & Secrecy
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <div className="p-4 rounded-xl aurora-glass">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5c777] block drop-shadow-sm">
                  <AnimatedCounter end={500} suffix="+" />
                </span>
                <span className="text-xs text-[#faf9f6]/80 uppercase tracking-wider font-semibold mt-1 block">
                  Matters & Advisory Briefs
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={350}>
              <div className="p-4 rounded-xl aurora-glass">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5c777] block drop-shadow-sm">
                  Top 6
                </span>
                <span className="text-xs text-[#faf9f6]/80 uppercase tracking-wider font-semibold mt-1 block">
                  Trusted Malaysia Recommended
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </AuroraBackground>

      {/* 3. "Meet the Founder / Managing Partner" Profile Showcase & Gallery */}
      <section className="py-20 md:py-28 bg-[#faf9f6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Multi-Image Portrait Gallery (5 cols) */}
            <div className="lg:col-span-5 static lg:sticky lg:top-28 space-y-6">
              <PartnerGallery />

              {/* Fast Milestone Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#e8e1d5] shadow-sm space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9d7835] block">
                  HERITAGE & ADMISSIONS
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#faf9f6] border border-[#e8e1d5]">
                    <span className="text-[10px] text-[#595355] block">Malayan Bar:</span>
                    <strong className="text-[#22122b]">11 Nov 2011</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#faf9f6] border border-[#e8e1d5]">
                    <span className="text-[10px] text-[#595355] block">English Bar:</span>
                    <strong className="text-[#22122b]">Lincoln's Inn 2010</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Narrative, Philosophy & Benchmark Roots (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-[#c6a052]" />
                <span>Meet the Founder & Principal Advocate</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#22122b] tracking-tight leading-tight">
                Ava Rachel Low (刘华律师)
              </h2>

              <p className="font-serif italic text-[#9d7835] text-lg font-medium">
                Advocate & Solicitor of the High Court of Malaya • Barrister-at-Law (Lincoln’s Inn, London)
              </p>

              <p className="text-[#231f20] leading-relaxed text-base sm:text-lg font-normal">
                <strong>Messrs. Low, Wah Chin & Co. (LWCCO)</strong> was established on <strong>11th November 2011</strong> with a discerning vision: to provide thoughtful, poised, and compassionate legal representation anchored in the highest standards of legal craftsmanship and human dignity.
              </p>

              <blockquote className="border-l-4 border-[#c6a052] pl-5 py-3.5 my-6 bg-[#f3efe6]/80 rounded-r-xl italic font-serif text-base sm:text-lg text-[#22122b]">
                &ldquo;Where legal mastery meets the art of strategy—navigating complexity with poise, discretion, and unwavering clarity. Our purpose is to serve with deliberate care, ensuring every client receives tailored counsel of the highest caliber.&rdquo;
              </blockquote>

              <p className="text-[#595355] leading-relaxed text-sm sm:text-base">
                Ms. Low completed her formative legal training across distinguished Malaysian institutions: undertaking pupillage at <strong>Shook Lin & Bok</strong> (trial and appellate practice), mastering conveyancing at <strong>Raja Eleena, Siew Ang & Associates</strong>, conducting insurance defense and banking litigation at <strong>Azim, Tunku Farik & Wong</strong>, and directing corporate risk for listed multinational <strong>KNM Group Berhad</strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-xs">
                  <span className="font-serif text-2xl font-bold text-[#22122b] block">15+</span>
                  <span className="text-[11px] text-[#595355] font-semibold">Years Continuous Courtroom Practice</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-xs">
                  <span className="font-serif text-2xl font-bold text-[#22122b] block">Appellate</span>
                  <span className="text-[11px] text-[#595355] font-semibold">Court of Appeal & Federal Court Track Record</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-xs col-span-2 sm:col-span-1">
                  <span className="font-serif text-2xl font-bold text-[#22122b] block">Top 6</span>
                  <span className="text-[11px] text-[#595355] font-semibold">Trusted Malaysia Commendation</span>
                </div>
              </div>

              {/* Chinese Bilingual Profile Card */}
              <div className="p-5 rounded-2xl bg-[#22122b] text-white border border-[#c6a052]/40 shadow-md">
                <div className="flex items-center gap-2 text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-2">
                  <span>关于刘华律师事务所 (中文简介)</span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed italic mb-2">
                  &ldquo;刘华律师事务所（Low, Wah Chin & Co.）位于吉隆坡KLCC核心商务区，由英国林肯律师学院出庭大律师及马来西亚高等法院执业律师刘华（Ava Rachel Low）创立。&rdquo;
                </p>
                <p className="text-xs text-white/75 leading-relaxed">
                  本所秉持“热忱、职责、诚信与关怀”之宗旨，为个人、家庭及企业提供民商事诉讼、房地产买卖过户、遗产继承与遗嘱起草、公司商业协议及劳动人事争议等全方位法律服务。
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/about"
                  className="btn-gold px-6 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-md"
                >
                  <span>Read Full Firm Philosophy</span>
                  <ChevronRight className="w-4 h-4 text-[#170b1e]" />
                </Link>
                <Link
                  href="/our-team"
                  className="px-5 py-3 rounded-xl border border-[#22122b]/30 text-[#22122b] font-bold text-sm hover:bg-[#f3efe6] transition-colors inline-flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#c6a052]" />
                  <span>View Credentials & Appellate Jurisprudence</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Founder Insight & Judicial Philosophy Section */}
      <FounderPhilosophy />

      <SectionDivider glyph="§" theme="dark" />

      {/* 4. Comprehensive Practice Areas (Interactive 9-Discipline Grid) */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="Our Core Disciplines"
              title="Comprehensive Legal Practice Areas"
              subtitle="Sharp, dedicated legal representation across corporate contracts, commercial disputes, debt recovery, tort liabilities, real estate conveyancing, family, and appellate litigation."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {practiceAreas.slice(0, 9).map((practice, pIdx) => (
              <ScrollReveal key={practice.slug} animation="fade-up" delay={pIdx * 75} duration={600}>
                <PracticeCard practice={practice} featured />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={200} className="mt-12 text-center">
            <Link
              href="/practices"
              className="btn-gold px-8 py-4 rounded-xl font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <span>View Full Practice Directory & Specialized Scope (18 Disciplines)</span>
              <ArrowRight className="w-4 h-4 text-[#170b1e]" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 4.5 Landmark Decisions & Representative Matters Showcase */}
      <RepresentativeMatters matters={representativeMatters} />

      <SectionDivider glyph="❖" theme="dark" />

      {/* 5. Why Choose LWCC / 4 Core Value Pillars with Aurora Glass Cards */}
      <AuroraBackground
        intensity="medium"
        showGrid={true}
        className="py-20 md:py-28 bg-[#170b1e] text-white border-y border-[#c6a052]/30"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="The LWCCO Advantage"
              title="Why Clients Entrust Their Legal Matters to Us"
              subtitle="An elite boutique practice combining premier institutional pedigree, direct partner attention, and fearless appellate advocacy."
              light
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <ScrollReveal animation="fade-up" delay={50}>
              <div className="h-full rounded-2xl aurora-glass p-6 sm:p-8 hover:border-[#c6a052] transition-all duration-300 shadow-lg gold-shimmer-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c6a052]/30 to-[#7928ca]/20 text-[#e5c777] border border-[#c6a052]/40 flex items-center justify-center mb-6 shadow-inner">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    Strategic Wisdom
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    Ms. Ava Rachel Low directly supervises every brief, ensuring rigorous quality, strategic foresight, and multidisciplinary courtroom experience.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="h-full rounded-2xl aurora-glass p-6 sm:p-8 hover:border-[#c6a052] transition-all duration-300 shadow-lg gold-shimmer-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c6a052]/30 to-[#7928ca]/20 text-[#e5c777] border border-[#c6a052]/40 flex items-center justify-center mb-6 shadow-inner">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    Rapid Response
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    We understand legal urgency. We provide prompt updates, transparent timelines, and guarantee a 24-hour response to client inquiries.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <div className="h-full rounded-2xl aurora-glass p-6 sm:p-8 hover:border-[#c6a052] transition-all duration-300 shadow-lg gold-shimmer-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c6a052]/30 to-[#7928ca]/20 text-[#e5c777] border border-[#c6a052]/40 flex items-center justify-center mb-6 shadow-inner">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    Integrity & Bar Compliance
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    Strict adherence to the Legal Profession Act 1976 and Malaysian Bar standards with zero conflict of interest and unyielding ethics.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={350}>
              <div className="h-full rounded-2xl aurora-glass p-6 sm:p-8 hover:border-[#c6a052] transition-all duration-300 shadow-lg gold-shimmer-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c6a052]/30 to-[#7928ca]/20 text-[#e5c777] border border-[#c6a052]/40 flex items-center justify-center mb-6 shadow-inner">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    Tailored Client Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    Upfront, transparent billing with no hidden disbursements. Pragmatic, human-centric strategies designed to protect your rights cost-effectively.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </AuroraBackground>

      {/* 6. Interactive Engagement & Fee Roadmap Workflow */}
      <EngagementWorkflow />

      <SectionDivider glyph="⚖" theme="light" />

      {/* 7. Testimonials & Accolades Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="Client Testimonials & Recognition"
              title="Trusted by Individuals and Corporations Alike"
              subtitle="Hear what independent legal analysts, consumer review portals, and our clients say about Low, Wah Chin & Co."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, tIdx) => (
              <ScrollReveal key={testimonial.id} animation="fade-up" delay={tIdx * 100}>
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Recent Legal Articles & Guides */}
      <section className="py-20 md:py-28 bg-[#faf9f6] relative border-t border-[#e8e1d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <ScrollReveal animation="fade-up">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-[#c6a052]" />
                  <span>Legal Insights & Knowledge</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#22122b] tracking-tight">
                  Recent Publications & Articles
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150}>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#9d7835] hover:text-[#22122b] transition-colors"
              >
                <span>Browse All Articles & Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, aIdx) => (
              <ScrollReveal key={article.id} animation="fade-up" delay={aIdx * 100}>
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Comprehensive Consultation Request & Chambers Location with Aurora UI */}
      <AuroraBackground
        intensity="vibrant"
        showGrid={true}
        className="py-20 md:py-28 bg-gradient-to-b from-[#1b0d25] via-[#161e31] to-[#120718] text-white border-t border-[#c6a052]/30"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Chambers Details & Interactive Map (5 cols) */}
            <ScrollReveal animation="fade-up" duration={700} className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full aurora-pill text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-4 animate-float-slow">
                  <Building className="w-3.5 h-3.5 text-[#c6a052]" />
                  <span>Kuala Lumpur Chambers & Coordinates</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight aurora-text-gradient">
                  Schedule a Consultation With Principal Counsel
                </h2>
                <p className="text-sm text-[#faf9f6]/80 mt-3 leading-relaxed font-light">
                  Confidential, privileged, and partner-level legal advisory. Discuss your matter directly with Ms. Ava Rachel Low and our senior advocates.
                </p>
              </div>

              <div className="space-y-3.5 text-sm text-[#faf9f6]/90">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl aurora-glass shadow-md">
                  <MapPin className="w-5 h-5 text-[#e5c777] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Chambers Address:</strong>
                    <span className="text-xs text-[#faf9f6]/80 leading-relaxed block mt-0.5 font-light">
                      Colony @ KLCC, Vipod Residences, No. 6, Jalan Kia Peng, 50450 Kuala Lumpur, Malaysia.
                    </span>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl aurora-glass shadow-md">
                  <Clock className="w-5 h-5 text-[#e5c777] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Office Hours:</strong>
                    <span className="text-xs text-[#faf9f6]/80 leading-relaxed block mt-0.5 font-light">
                      Monday – Friday: 9:00 AM – 5:30 PM (Closed on Weekends & Public Holidays)
                    </span>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl aurora-glass shadow-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-[#e5c777]" />
                      <span className="text-xs font-semibold text-white">Direct Phone:</span>
                    </div>
                    <a href="tel:+60175483157" className="text-xs text-[#e5c777] hover:underline font-semibold block">
                      +60 17-548 3157
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl aurora-glass shadow-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-[#e5c777]" />
                      <span className="text-xs font-semibold text-white">Inquiry Email:</span>
                    </div>
                    <a href="mailto:lwclegal5@gmail.com" className="text-xs text-[#e5c777] hover:underline block truncate">
                      lwclegal5@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed Container */}
              <div className="rounded-2xl overflow-hidden border border-[#c6a052]/40 shadow-xl relative h-52 w-full bg-[#120718]">
                <iframe
                  title="Low, Wah Chin & Co. Chambers Location Map"
                  src="https://maps.google.com/maps?q=Vipod+Residences+Jalan+Kia+Peng+Kuala+Lumpur&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter brightness-90 contrast-105"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-5 rounded-2xl aurora-glass border border-[#c6a052]/40 text-center space-y-2.5">
                <span className="text-xs text-[#e5c777] uppercase font-bold tracking-wider block">
                  Need Urgent Courtroom Representation?
                </span>
                <p className="text-xs text-[#faf9f6]/80 font-light">
                  Connect immediately with our senior counsel via WhatsApp for urgent injunctions or criminal arrest warrants.
                </p>
                <div className="pt-1 flex justify-center">
                  <WhatsAppButton label="WhatsApp Senior Counsel" />
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Interactive Consultation Form (7 cols) */}
            <ScrollReveal animation="fade-up" delay={200} duration={800} className="lg:col-span-7">
              <AuroraGlow glowColor="gold" rounded="rounded-2xl">
                <ConsultationForm className="shadow-2xl" />
              </AuroraGlow>
            </ScrollReveal>
          </div>
        </div>
      </AuroraBackground>
    </>
  );
}



