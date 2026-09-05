import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import TrustBar from '@/components/common/TrustBar';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ScrollReveal from '@/components/effects/ScrollReveal';
import TiltCard from '@/components/effects/TiltCard';
import SpotlightCard from '@/components/effects/SpotlightCard';
import ParallaxContainer from '@/components/effects/ParallaxContainer';
import AuroraBackground from '@/components/effects/AuroraBackground';
import AuroraGlow from '@/components/effects/AuroraGlow';
import {
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  FileText,
  Clock,
  Building2,
  Landmark,
  ArrowRight,
  Sparkles,
  Globe,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About Our Law Firm | Low, Wah Chin & Co. (LWCCO)',
  description: 'Learn about the heritage, judicial philosophy, and courtroom track record of Messrs. Low, Wah Chin & Co., founded by Lincoln’s Inn Barrister Low Wah Chin (Ava Rachel).',
  canonicalUrl: `${SITE_CONFIG.url}/about`,
});

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'About Us', url: `${SITE_CONFIG.url}/about` },
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
              alt="Messrs. Low, Wah Chin & Co. Chambers Kuala Lumpur"
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
              <span>Advocates & Solicitors • High Court of Malaya</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf9f6] mb-4 drop-shadow-md aurora-text-gradient">
              About Our Law Practice
            </h1>
            <p className="font-serif italic text-[#e5c777] text-lg sm:text-xl mb-4">
              &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
            </p>
            <p className="text-[#faf9f6]/90 text-base sm:text-lg leading-relaxed font-light">
              Founded on the deep conviction that high-calibre legal representation must be grounded in humanity values, accessibility, and unyielding integrity.
            </p>
          </ScrollReveal>
        </div>
      </AuroraBackground>

      <TrustBar />

      {/* Main Firm Narrative */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Credentials with Aurora Glow */}
            <ScrollReveal animation="fade-up" duration={700} className="lg:col-span-5 static lg:sticky lg:top-28 space-y-6">
              <AuroraGlow glowColor="multi" rounded="rounded-2xl">
                <TiltCard maxTilt={6} glare={true}>
                  <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#c6a052]/50 bg-[#22122b] gold-shimmer-hover">
                    <Image
                      src="/lawyer-hero.jpg"
                      alt="Low Wah Chin (Ava Rachel) Advocate and Solicitor Low, Wah Chin & Co."
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top filter brightness-100 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e]/95 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#22122b]/95 backdrop-blur-md border border-[#c6a052]/40 text-[#faf9f6]">
                      <h3 className="font-serif text-xl font-bold text-[#faf9f6]">
                        Low Wah Chin (Ava Rachel)
                      </h3>
                      <p className="text-[#e5c777] text-xs font-semibold">
                        Managing Partner & Principal Advocate
                      </p>
                      <p className="text-[11px] text-[#faf9f6]/70 mt-1">
                        Lincoln’s Inn Barrister (UK) • High Court of Malaya (BC/L/2019)
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </AuroraGlow>

              {/* Fast Fact Card */}
              <div className="bg-[#faf9f6] p-6 rounded-2xl border border-[#e8e1d5] space-y-3 shadow-sm">
                <h4 className="font-serif font-bold text-[#22122b] text-sm uppercase tracking-wider border-b border-[#c6a052]/25 pb-2">
                  Key Professional Milestones
                </h4>
                <div className="space-y-2 text-xs text-[#231f20]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#595355]">Malaysian Bar Admission:</span>
                    <strong className="text-[#22122b]">11th November 2011</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#595355]">English Bar (Lincoln’s Inn):</span>
                    <strong className="text-[#22122b]">October 2010</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#595355]">Bar Council Registration:</span>
                    <strong className="text-[#22122b]">BC/L/2019</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#595355]">Total Practice Experience:</span>
                    <strong className="text-[#22122b]">15+ Years</strong>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: In-depth Story */}
            <ScrollReveal animation="fade-up" delay={200} duration={800} className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Our Philosophy & Background</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22122b] tracking-tight leading-tight">
                  Experienced Legal Excellence Anchored in Humanity Values
                </h2>
              </div>

              <div className="prose prose-lg text-[#231f20] leading-relaxed space-y-5 font-normal">
                <p>
                  <strong>Messrs. Low, Wah Chin & Co. (LWCCO)</strong>, based in Kuala Lumpur, was established by principal lawyer <strong>Low Wah Chin (Ava Rachel)</strong>. Grounded in Civil and Commercial Litigation with some of Malaysia’s most established law firms, Ms. Low set out with a distinctive mission: to serve the community and provide clients with the most sensible, direct legal advice at the sphere of humanity values.
                </p>

                <p>
                  Unlike firms that restrict their practice to narrow commercial niches or cater solely to corporate institutions, <strong>Low, Wah Chin & Co. spreads its practice across comprehensive areas of the law</strong>. The firm ensures that every class of the community—from individuals fighting for personal injury compensation to businesses negotiating multi-million Ringgit agreements—is properly protected with excellence.
                </p>

                <div className="p-6 bg-[#f3efe6]/80 rounded-2xl border-l-4 border-[#c6a052] my-6">
                  <p className="font-serif italic text-[#22122b] text-base sm:text-lg m-0">
                    &ldquo;We understand the immense pressure, uncertainty, and financial stakes that accompany every legal dispute. We pride ourselves on dependable, calm, and well-spoken advocacy that treats each client with genuine dignity.&rdquo;
                  </p>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#22122b] pt-4">
                  Academic Rigor & English Bar Foundations
                </h3>

                <p>
                  Ms. Ava Rachel Low commenced her academic legal journey in the United Kingdom, reading law at the <strong>University of Reading</strong> and graduating with a Bachelor of Laws (Honours) degree in 2009. She completed her Bar Vocational Course (BVC) Postgraduate Diploma at <strong>The City University London</strong> and was called to the English Bar as a Barrister-at-Law of the <strong>Honourable Society of Lincoln’s Inn</strong> in October 2010.
                </p>

                <p>
                  Upon returning to Malaysia, she completed her pupillage with premier legal firm <strong>Shook Lin & Bok Malaysia</strong> and was admitted to the Roll of Advocates and Solicitors of the High Court of Malaya on <strong>11th November 2011</strong>.
                </p>

                <h3 className="font-serif text-2xl font-bold text-[#22122b] pt-4">
                  Decade of Multidisciplinary Practice
                </h3>

                <p>
                  Before establishing LWCCO, Ms. Low expanded her capabilities across premier legal institutions:
                </p>

                <ul className="space-y-3 text-sm sm:text-base text-[#231f20] list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c6a052] mt-2 shrink-0" />
                    <span><strong>Conveyancing & Land Law (2012):</strong> Advised on property developments and real estate transactions at <em>Raja Eleena, Siew Ang & Associates</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c6a052] mt-2 shrink-0" />
                    <span><strong>Insurance & Banking Litigation (2013):</strong> Handled professional indemnity insurance, bank litigation, and performance bonds with <em>Azim, Tunku Farik & Wong</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c6a052] mt-2 shrink-0" />
                    <span><strong>Medical Negligence & Tort Claims (2015):</strong> Managed complex personal injury, medical negligence, and non-motor insurance claims with <em>Murali B. Pillai & Associates</em> and <em>K.S. Ong</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c6a052] mt-2 shrink-0" />
                    <span><strong>In-House Corporate Risk Management (2016):</strong> Handled engineering contracts, procurement, and risk management with public listed company <em>KNM Group Berhad</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c6a052] mt-2 shrink-0" />
                    <span><strong>Litigation Partnership (2017–2020):</strong> Served as partner with <em>Serena Paul Naveen & Associates</em> and senior counsel with <em>Burton Tan, Syazwan & Co.</em> in Johor.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-[#22122b] text-white rounded-2xl border border-[#c6a052]/40 my-6 shadow-xl">
                <div className="flex items-center gap-2 text-[#e5c777] text-xs font-bold uppercase tracking-wider mb-2">
                  <Globe className="w-4 h-4 text-[#c6a052]" />
                  <span>Mengenai Firma (Bahasa Melayu)</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed italic mb-3">
                  &ldquo;Tetuan Low, Wah Chin & Co. Peguambela & Peguamcara LWCCO yang berada di Kuala Lumpur Malaysia diasaskan oleh peguam Low Wah Chin (Ava Rachel). Ava Rachel Low membumikan amalannya dalam Litigasi Sivil dan Komersial dengan firma-firma yang ditubuhkan di kawasan Kuala Lumpur.&rdquo;
                </p>
                <p className="text-xs text-white/75 leading-relaxed">
                  Matlamat firma adalah untuk berkhidmat kepada masyarakat dan menyediakan perkhidmatan yang paling waras dalam bidang nilai kemanusiaan, memastikan setiap lapisan komuniti dilayani dengan integriti dan kecemerlangan yang mendalam.
                </p>
              </div>

              <div className="pt-6 border-t border-[#e8e1d5] flex flex-wrap gap-4">
                <Link
                  href="/our-team"
                  className="btn-gold px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md"
                >
                  <span>View Qualifications & Appellate Record</span>
                  <ArrowRight className="w-4 h-4 text-[#170b1e]" />
                </Link>
                <WhatsAppButton variant="compact" label="Chat with Ava Rachel Low" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Practice */}
      <section className="py-20 bg-[#faf9f6] border-t border-[#c6a052]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              badge="Our Guiding Values"
              title="The Four Cornerstones of Low, Wah Chin & Co."
              subtitle="How we maintain our reputation as a trusted legal partner across Malaysia."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal animation="fade-up" delay={100}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="bg-white p-8 rounded-2xl border border-[#e8e1d5] shadow-sm hover:border-[#c6a052] transition-colors h-full flex flex-col justify-between gold-shimmer-hover">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center mb-6 shadow-sm">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#22122b] mb-3">
                      Uncompromising Integrity
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                      Absolute transparency regarding legal merits, risks, and fee structures. We give clients realistic assessments rather than false promises.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="bg-white p-8 rounded-2xl border border-[#e8e1d5] shadow-sm hover:border-[#c6a052] transition-colors h-full flex flex-col justify-between gold-shimmer-hover">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center mb-6 shadow-sm">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#22122b] mb-3">
                      Fearless Advocacy
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                      Tenacious courtroom representation extending from the Subordinate Courts to the Court of Appeal and Federal Court of Malaysia.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="bg-white p-8 rounded-2xl border border-[#e8e1d5] shadow-sm hover:border-[#c6a052] transition-colors h-full flex flex-col justify-between gold-shimmer-hover">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center mb-6 shadow-sm">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#22122b] mb-3">
                      Humanity Values
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                      Compassionate counsel that recognizes the emotional and human dimensions behind every legal crisis and family dispute.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="bg-white p-8 rounded-2xl border border-[#e8e1d5] shadow-sm hover:border-[#c6a052] transition-colors h-full flex flex-col justify-between gold-shimmer-hover">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center mb-6 shadow-sm">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#22122b] mb-3">
                      Multidisciplinary Depth
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595355] leading-relaxed">
                      Comprehensive legal scope covering corporate advisory, conveyancing, probate, tort litigation, and dispute resolution.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Consultation Callout */}
      <section className="py-20 bg-[#170b1e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-up" duration={700} className="lg:col-span-5 space-y-4">
              <SectionHeading
                badge="Consult Senior Counsel"
                title="Discuss Your Legal Matter Confidentially"
                subtitle="Schedule a private consultation at our KLCC chambers or request a virtual case evaluation."
                alignment="left"
                light
              />
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Direct partner-level legal review from Ms. Ava Rachel Low. We examine the statutory framework, evidentiary strength, and provide practical next steps.
              </p>
              <div className="pt-2">
                <WhatsAppButton label="WhatsApp Instant Booking" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200} duration={800} className="lg:col-span-7">
              <div className="bg-[#22122b] p-8 sm:p-10 rounded-2xl border border-[#c6a052]/40 shadow-2xl">
                <ConsultationForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
