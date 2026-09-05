import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers, getRepresentativeMatters } from '@/db';
import { TEAM_MEMBERS_DATA } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import InstitutionalPedigree from '@/components/common/InstitutionalPedigree';
import PartnerGallery from '@/components/common/PartnerGallery';
import BrandMonogram from '@/components/common/BrandMonogram';
import RepresentativeMatters from '@/components/showcase/RepresentativeMatters';
import SectionDivider from '@/components/common/SectionDivider';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ScrollReveal from '@/components/effects/ScrollReveal';
import TiltCard from '@/components/effects/TiltCard';
import ParallaxContainer from '@/components/effects/ParallaxContainer';
import AuroraBackground from '@/components/effects/AuroraBackground';
import AuroraGlow from '@/components/effects/AuroraGlow';
import {
  Scale,
  Award,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Managing Partner Ava Rachel Low (刘华律师) | Low, Wah Chin & Co.',
  description: 'Meet founder Ava Rachel Low (刘华律师), Lincoln’s Inn Barrister & High Court Advocate. 15+ years of trial and appellate experience in civil, banking, corporate, and estate litigation.',
  canonicalUrl: `${SITE_CONFIG.url}/our-team`,
});

export default async function OurTeamPage() {
  const team = await getTeamMembers();
  const leader = team[0] || TEAM_MEMBERS_DATA[0];
  const matters = await getRepresentativeMatters();

  const credentials = leader.credentials || TEAM_MEMBERS_DATA[0].credentials;
  const careerHistory = leader.careerHistory || TEAM_MEMBERS_DATA[0].careerHistory || [];
  const appellateExperience = leader.appellateExperience || TEAM_MEMBERS_DATA[0].appellateExperience || [];
  const bioParagraphs = Array.isArray(leader.bio) ? leader.bio : [leader.bio];
  const photoUrl: string = leader.photo_url || '/lawyer-hero.jpg';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Managing Partner', url: `${SITE_CONFIG.url}/our-team` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header with Aurora UI */}
      <AuroraBackground
        intensity="vibrant"
        showGrid={true}
        className="bg-[#170b1e] text-[#faf9f6] py-20 sm:py-28 border-b border-[#c6a052]/30"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <ParallaxContainer speed={0.15} className="w-full h-[120%] -top-[10%] absolute">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
              alt="Messrs. Low, Wah Chin & Co. Leadership"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-55 brightness-95 contrast-105 scale-105"
            />
          </ParallaxContainer>
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full aurora-pill text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-4 animate-float-slow">
              <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Advocacy & Senior Chambers Leadership</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf9f6] mb-4 drop-shadow-md aurora-text-gradient">
              Ava Rachel Low (刘华律师)
            </h1>
            <p className="font-serif italic text-[#e5c777] text-lg sm:text-xl mb-4">
              &ldquo;Where legal mastery meets the art of strategy—navigating complexity with poise, discretion, and unwavering clarity.&rdquo;
            </p>
            <p className="text-[#faf9f6]/90 text-base sm:text-lg leading-relaxed font-light">
              Managing Partner & Founder of Messrs. Low, Wah Chin & Co. Lincoln’s Inn Barrister-at-Law and Advocate & Solicitor of the High Court of Malaya with over 15 years of distinguished appellate and corporate practice.
            </p>
          </ScrollReveal>
        </div>
      </AuroraBackground>

      {/* Institutional Pedigree & Singapore Recognition */}
      <InstitutionalPedigree />

      {/* Leader Bio Profile */}
      <section className="py-20 md:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Bar Badges with Aurora Glow & 3D Tilt */}
            <ScrollReveal animation="fade-up" duration={700} className="lg:col-span-5 static lg:sticky lg:top-28 space-y-6">
              <AuroraGlow glowColor="multi" rounded="rounded-2xl">
                <TiltCard maxTilt={6} glare={true}>
                  <div className="relative h-[520px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#c6a052]/50 bg-[#22122b] gold-shimmer-hover">
                    <Image
                      src={photoUrl}
                      alt="Ava Rachel Low (刘华律师) Advocate & Solicitor"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top filter brightness-100 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e]/95 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#22122b]/95 backdrop-blur-md border border-[#c6a052]/40 text-[#faf9f6]">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="font-serif text-2xl font-bold text-[#faf9f6]">
                          {leader.name}
                        </h2>
                        <span className="font-serif text-sm text-[#e5c777]">刘华律师</span>
                      </div>
                      <p className="text-[#e5c777] text-xs font-semibold">
                        Managing Partner & Principal Counsel
                      </p>
                      <p className="text-[11px] text-[#faf9f6]/70 mt-1">
                        Lincoln’s Inn Barrister (UK) • Advocate & Solicitor (High Court of Malaya • BC/L/2019)
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </AuroraGlow>

              {/* Admissions & Academic Degrees */}
              <div className="bg-white p-6 rounded-2xl border border-[#e8e1d5] space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-[#22122b] text-sm uppercase tracking-wider border-b border-[#c6a052]/25 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#c6a052]" />
                  <span>Academic Qualifications & Admissions</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#231f20]">
                  {credentials.map((cred: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact Chambers Card */}
              <div className="bg-[#22122b] p-6 rounded-2xl text-[#faf9f6] border border-[#c6a052]/40 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[11px] text-[#e5c777] uppercase font-bold tracking-wider block">Direct Chambers Line:</span>
                  <a href="tel:+60175483157" className="text-sm font-semibold text-white hover:text-[#e5c777] transition-colors">
                    +60 17-548 3157
                  </a>
                </div>
                <WhatsAppButton variant="compact" label="WhatsApp Ava" />
              </div>
            </ScrollReveal>

            {/* Right Column: Narrative & Practice Experience */}
            <ScrollReveal animation="fade-up" delay={200} duration={800} className="lg:col-span-7 space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Biography & Professional Background</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22122b] tracking-tight leading-tight">
                  Ava Rachel Low (刘华律师)
                </h2>
                <p className="font-serif italic text-[#9d7835] text-base sm:text-lg mt-1">
                  Advocate & Solicitor of the High Court of Malaya • Barrister-at-Law (Lincoln’s Inn, London)
                </p>
              </div>

              <div className="prose prose-lg text-[#231f20] leading-relaxed space-y-4 font-normal">
                {bioParagraphs.map((paragraph: string, bIdx: number) => (
                  <p key={bIdx} className="text-base sm:text-lg leading-relaxed text-[#231f20]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Interactive Multi-Image Gallery */}
              <div className="pt-4 pb-2">
                <PartnerGallery />
              </div>

              {/* Career History & Law Firm Timeline */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#22122b] mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-[#c6a052]" />
                  <span>Career History & Associated Law Firms</span>
                </h3>

                <div className="relative border-l-2 border-[#c6a052]/40 pl-6 space-y-6 ml-3">
                  {careerHistory.map((item, cIdx: number) => (
                    <div key={cIdx} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#c6a052] border-2 border-white shadow-sm" />
                      <div className="bg-white p-5 rounded-xl border border-[#e8e1d5] shadow-sm hover:border-[#c6a052]/60 transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <strong className="text-sm font-bold text-[#22122b]">{item.firm}</strong>
                          <span className="text-xs font-semibold text-[#9d7835] bg-[#faf9f6] px-2.5 py-0.5 rounded-md border border-[#c6a052]/25">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-xs text-[#595355]">{item.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appellate & Trial Court Experience */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#22122b] mb-3 flex items-center gap-2">
                  <Landmark className="w-6 h-6 text-[#c6a052]" />
                  <span>Appellate & Trial Court Experience (A to G)</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#595355] mb-6">
                  Ms. Ava Rachel Low has practiced and attained extensive legal experience in the following litigation matters up to the Appellate Courts:
                </p>

                <div className="space-y-4">
                  {appellateExperience.map((exp, eIdx: number) => (
                    <div
                      key={eIdx}
                      className="p-5 rounded-xl bg-white border border-[#e8e1d5] flex items-start gap-4 hover:border-[#c6a052] transition-colors shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#22122b] text-[#e5c777] font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {exp.code}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-[#22122b] text-base mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#e8e1d5] flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-gold px-7 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md"
                >
                  <span>Book Consultation with Ava Rachel Low</span>
                  <ArrowRight className="w-4 h-4 text-[#170b1e]" />
                </Link>
                <Link
                  href="/practices"
                  className="px-5 py-3 rounded-xl border border-[#22122b]/30 text-[#22122b] font-semibold text-sm hover:bg-white transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Practice Areas</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider glyph="❖" theme="dark" />

      {/* Representative Landmark Matters Showcase */}
      <RepresentativeMatters matters={matters} />

      {/* Consultation Section */}
      <section className="py-20 bg-[#170b1e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="Direct Senior Counsel Review"
              title="Discuss Your Case With Ms. Ava Rachel Low"
              subtitle="Get prompt, confidential, and partner-level advice on your legal brief."
              light
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <ConsultationForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}


