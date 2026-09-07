import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import WhatsAppButton from '@/components/common/WhatsAppButton';
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
  GraduationCap,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About Our Law Firm | Messrs. Low Wah Chin & Co. (LWCCO)',
  description: 'Learn about the heritage, judicial philosophy, and courtroom track record of Messrs. Low Wah Chin & Co., founded by Lincoln’s Inn Barrister Low Wah Chin (Ava Rachel).',
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

      {/* Page Hero */}
      <PageHero
        title="About Our Law Practice"
        subtitle="Passion & Duty, Integrity & Care — To the Point."
        badge="Advocates & Solicitors • High Court of Malaya"
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
      />

      {/* 1. Main Firm Narrative & Principal Counsel (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Credentials in Thin Bordered Frame (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[380px] p-2 bg-white border border-[#c6a052]/40 rounded-lg shadow-md mb-6">
                <div className="relative h-[440px] sm:h-[480px] w-full rounded overflow-hidden bg-gray-100">
                  <Image
                    src="/lawyer-hero.jpg"
                    alt="Low Wah Chin (Ava Rachel) Advocate and Solicitor Messrs. Low Wah Chin & Co."
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-3 text-center px-2 py-1">
                  <p className="font-serif text-base font-bold text-[#1a2332]">
                    Low Wah Chin (Ava Rachel)
                    <span className="text-sm font-normal text-[#9d7835] ml-1.5">刘华律师</span>
                  </p>
                  <p className="text-xs text-[#4b5563] font-medium mt-0.5">
                    Managing Partner & Principal Counsel
                  </p>
                </div>
              </div>

              {/* Academic Qualifications Card */}
              <div className="w-full max-w-[380px] bg-white p-5 rounded-lg border border-[#e8e1d5] space-y-3 shadow-xs text-xs">
                <h4 className="font-serif font-bold text-[#1a2332] uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#c6a052]" />
                  <span>Academic Qualifications & Admissions</span>
                </h4>
                <ul className="space-y-2 text-[#4b5563]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] mt-0.5 shrink-0" />
                    <span>Advocate & Solicitor of the High Court of Malaya (Nov 2011)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] mt-0.5 shrink-0" />
                    <span>Barrister-at-Law, Lincoln’s Inn, London, UK (Oct 2010)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] mt-0.5 shrink-0" />
                    <span>Postgraduate Diploma (BVC), City University London (2010)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] mt-0.5 shrink-0" />
                    <span>LL.B. (Honours), University of Reading, UK (2009)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Full Narrative (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  <Award className="w-3.5 h-3.5 text-[#c6a052]" />
                  <span>The Firm Profile</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2332] leading-tight">
                  High-Calibre Legal Craftsmanship Rooted in Humanity
                </h2>
              </div>

              <div className="p-4 bg-white border-l-4 border-[#c6a052] rounded-r-md border border-gray-200 text-xs sm:text-sm text-[#1a2332] font-medium leading-relaxed shadow-xs">
                <strong>Messrs. Low Wah Chin & Co. (LWCCO)</strong> is an established Malaysian law practice providing comprehensive legal services with clarity, precision, and unwavering client commitment.
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
                <p>
                  Founded by senior advocate <strong>Low Wah Chin (Ava Rachel)</strong>, the firm was established with a clear mandate: to make top-tier legal advice accessible, transparent, and decisively effective. We bridge the gap between large, impersonal corporate law factories and small, single-issue practices by providing sophisticated counsel with dedicated, partner-led attention.
                </p>
                <p>
                  Our litigation and advisory capabilities span civil disputes, corporate agreements, land conveyancing, probate administration, family restructuring, employment law, and tort liabilities. We represent clients at all tiers of the Malaysian judicial hierarchy—from Magistrates’ and Sessions Courts to the High Court, Court of Appeal, and the Federal Court of Malaysia.
                </p>
                <p>
                  We operate with transparent fee frameworks, clear procedural timelines, and regular milestone updates so our clients always maintain strategic control of their legal positions.
                </p>

                {/* Verified Prior Experience Placeholder */}
                {/* TODO: insert verified prior firm experience from client CV */}
              </div>

              {/* Bilingual Bahasa Melayu Callout */}
              <div className="p-6 bg-[#1a2332] text-[#faf9f6] rounded-lg border border-[#c6a052]/40 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#dcc280] text-xs font-bold uppercase tracking-wider mb-1">
                  <Globe className="w-3.5 h-3.5 text-[#c6a052]" />
                  <span>Mengenai Firma (Bahasa Melayu)</span>
                </div>
                <p className="text-white/95 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;Tetuan Low, Wah Chin & Co. Peguambela & Peguamcara (LWCCO) di Kuala Lumpur diasaskan oleh peguam Low Wah Chin (Ava Rachel). Matlamat firma adalah untuk berkhidmat kepada masyarakat dan menyediakan perkhidmatan undang-undang yang paling waras dalam bidang nilai kemanusiaan, memastikan setiap lapisan komuniti dilayani dengan integriti dan kecemerlangan yang mendalam.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-4">
                <Link
                  href="/our-team"
                  className="btn-gold px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
                >
                  <span>View Principal Qualifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <WhatsAppButton variant="compact" label="Inquire on WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Guiding Values (Alternating Light Section) */}
      <section className="py-20 bg-white text-[#231f20] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Compass className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Core Pillars</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2332]">
              The Four Cornerstones of Our Practice
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-2 font-light">
              Principles guiding every brief, negotiation, and courtroom trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#faf9f6] border border-[#e8e1d5] rounded-lg hover:border-[#c6a052] transition-colors">
              <div className="w-10 h-10 rounded bg-white border border-[#c6a052]/40 flex items-center justify-center text-[#9d7835] mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1a2332] mb-2">
                1. Passion & Duty
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Relentless trial diligence backed by meticulous preparation and a tireless commitment to advancing our clients’ rightful legal remedies.
              </p>
            </div>

            <div className="p-6 bg-[#faf9f6] border border-[#e8e1d5] rounded-lg hover:border-[#c6a052] transition-colors">
              <div className="w-10 h-10 rounded bg-white border border-[#c6a052]/40 flex items-center justify-center text-[#9d7835] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1a2332] mb-2">
                2. Integrity & Ethics
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Absolute transparency in case merit appraisal and legal costs, adhering strictly to Malaysian Bar Professional Conduct rules.
              </p>
            </div>

            <div className="p-6 bg-[#faf9f6] border border-[#e8e1d5] rounded-lg hover:border-[#c6a052] transition-colors">
              <div className="w-10 h-10 rounded bg-white border border-[#c6a052]/40 flex items-center justify-center text-[#9d7835] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1a2332] mb-2">
                3. Genuine Client Care
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Accessible, empathetic representation providing clear legal roadmaps and direct partner communication in plain language.
              </p>
            </div>

            <div className="p-6 bg-[#faf9f6] border border-[#e8e1d5] rounded-lg hover:border-[#c6a052] transition-colors">
              <div className="w-10 h-10 rounded bg-white border border-[#c6a052]/40 flex items-center justify-center text-[#9d7835] mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1a2332] mb-2">
                4. To the Point
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Decisive, commercially pragmatic strategies that eliminate procedural waste and deliver tangible results without unnecessary delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Firm History & Tradition (Dark Section) */}
      <section className="py-20 lg:py-24 bg-[#1a2332] text-[#faf9f6] border-b border-[#c6a052]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#dcc280] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Landmark className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Chambers Heritage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
              A History of Fearless Advocacy
            </h2>
            <p className="font-serif italic text-[#dcc280] text-base">
              &ldquo;From London’s Inns of Court to the High Court of Malaya&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#faf9f6]/85">
            <div className="p-6 border border-[#c6a052]/30 bg-[#101826]/60 rounded-lg">
              <span className="font-mono text-xs font-bold text-[#dcc280] block mb-2">2009 – 2010</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">English Bar & University of Reading</h4>
              <p className="leading-relaxed text-[#faf9f6]/75">
                Completed LL.B. (Hons) at Reading and called to the English Bar at Lincoln’s Inn, London, laying the foundation of common law trial advocacy.
              </p>
            </div>

            <div className="p-6 border border-[#c6a052]/30 bg-[#101826]/60 rounded-lg">
              <span className="font-mono text-xs font-bold text-[#dcc280] block mb-2">2011 – 2019</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">High Court & Corporate Practice</h4>
              <p className="leading-relaxed text-[#faf9f6]/75">
                Admitted to the High Court of Malaya; practiced in tier-1 litigation firms handling insurance defense, banking disputes, and in-house corporate risk with KNM Group Berhad.
              </p>
            </div>

            <div className="p-6 border border-[#c6a052]/30 bg-[#101826]/60 rounded-lg">
              <span className="font-mono text-xs font-bold text-[#dcc280] block mb-2">2020 – PRESENT</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">Messrs. Low Wah Chin & Co.</h4>
              <p className="leading-relaxed text-[#faf9f6]/75">
                Established chambers at Colony @ KLCC, delivering full-service commercial, property, family, and appellate litigation representation across Malaysia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
