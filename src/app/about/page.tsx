import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import PartnerGallery from '@/components/common/PartnerGallery';
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

import { getFirmSettings } from '@/actions/settingsActions';

export const metadata = constructMetadata({
  title: 'About Our Law Firm | Messrs. Low Wah Chin & Co. (LWCCO)',
  description: 'Learn about the heritage, judicial philosophy, and courtroom track record of Messrs. Low Wah Chin & Co., founded by Lincoln’s Inn Barrister Low Wah Chin (Ava Rachel).',
  canonicalUrl: `${SITE_CONFIG.url}/about`,
});

export default async function AboutPage() {
  const settings = await getFirmSettings();

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
        bgImage={settings.heroImages?.aboutHeroImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"}
      />

      {/* 1. Main Firm Narrative & Principal Counsel (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Credentials in Thin Bordered Frame (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[380px] p-2 bg-white border border-[#E5DFD3] rounded-lg shadow-md mb-6">
                <div className="relative h-[440px] sm:h-[480px] w-full rounded overflow-hidden bg-[#3A1F60]">
                  <Image
                    src="/hero_image.jpeg"
                    alt="Low Wah Chin (Ava Rachel) Advocate and Solicitor Messrs. Low Wah Chin & Co."
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-[center_15%]"
                  />
                </div>
                <div className="mt-3 text-center px-2 py-1">
                  <p className="font-serif text-base font-bold text-[#2B2D33]">
                    Low Wah Chin (Ava Rachel)
                    <span className="text-sm font-normal text-[#4B2A7B] ml-1.5">劉華晶</span>
                  </p>
                  <p className="text-xs text-[#2B2D33]/70 font-medium mt-0.5">
                    Managing Partner & Principal Counsel
                  </p>
                </div>
              </div>

              {/* Academic Qualifications Card */}
              <div className="w-full max-w-[380px] bg-white p-5 rounded-lg border border-[#E5DFD3] space-y-3 shadow-xs text-xs">
                <h4 className="font-serif font-bold text-[#2B2D33] uppercase tracking-wider border-b border-[#FAF8F2] pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#4B2A7B]" />
                  <span>Academic Qualifications & Admissions</span>
                </h4>
                <ul className="space-y-2 text-[#2B2D33]/75">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B] mt-0.5 shrink-0" />
                    <span>Advocate & Solicitor of the High Court of Malaya (Nov 2011)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B] mt-0.5 shrink-0" />
                    <span>Barrister-at-Law, Lincoln’s Inn, London, UK (Oct 2010)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B] mt-0.5 shrink-0" />
                    <span>Postgraduate Diploma (BVC), City University London (2010)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B] mt-0.5 shrink-0" />
                    <span>LL.B. (Honours), University of Reading, UK (2009)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Full Narrative (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  <Award className="w-3.5 h-3.5 text-[#4B2A7B]" />
                  <span>The Firm Profile</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2D33] leading-tight">
                  High-Calibre Legal Craftsmanship Rooted in Humanity
                </h2>
              </div>

              <div className="p-4 bg-white border-l-4 border-[#4B2A7B] rounded-r-md border border-[#E5DFD3] text-xs sm:text-sm text-[#2B2D33] font-medium leading-relaxed shadow-xs">
                <strong>Messrs. Low Wah Chin & Co. (LWCCO)</strong> is an established Malaysian law practice providing comprehensive legal services with clarity, precision, and unwavering client commitment.
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#2B2D33]/80 leading-relaxed">
                <p>
                  Founded by senior advocate <strong>Low Wah Chin (Ava Rachel) 劉華晶</strong>, the firm was established with a clear mandate: to make top-tier legal advice accessible, transparent, and decisively effective. We bridge the gap between large, impersonal corporate law factories and single-issue practices by providing sophisticated counsel with dedicated, partner-led attention.
                </p>
                <p>
                  Ms. Low has been practising since 11 November 2011 across civil litigation, corporate agreements, land conveyancing, probate administration, family law, employment disputes, and insurance negligence. Her practice foundation was honed at benchmark Malaysian institutions—including <em>Shook Lin & Bok</em>, <em>Azim, Tunku Farik & Wong</em>, <em>Murali B. Pillai & Associates</em>, and ~9 months as In-House Legal Counsel for public listed multinational <em>KNM Group Berhad</em>.
                </p>
                <p>
                  Our litigation and advisory capabilities span all tiers of the Malaysian judicial hierarchy—from Magistrates’ and Sessions Courts to the High Court of Malaya, Court of Appeal, and the Federal Court of Malaysia.
                </p>
                <p>
                  We operate with transparent fee frameworks, clear procedural timelines, and regular milestone updates so our clients always maintain strategic control of their legal positions.
                </p>
              </div>

              {/* Bilingual Bahasa Melayu Callout */}
              <div className="p-6 bg-gradient-to-r from-[#3A1F60] via-[#4B2A7B] to-[#3A1F60] text-[#FAF8F2] rounded-lg border border-purple-300/30 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-purple-200 text-xs font-bold uppercase tracking-wider mb-1">
                  <Globe className="w-3.5 h-3.5 text-purple-200" />
                  <span>Mengenai Firma (Bahasa Melayu)</span>
                </div>
                <p className="text-white/95 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;Tetuan Low, Wah Chin & Co. Peguambela & Peguamcara (LWCCO) di Kuala Lumpur diasaskan oleh peguam Low Wah Chin (Ava Rachel) 劉華晶. Matlamat firma adalah untuk berkhidmat kepada masyarakat dan menyediakan perkhidmatan undang-undang yang paling waras dalam bidang nilai kemanusiaan, memastikan setiap lapisan komuniti dilayani dengan integriti dan kecemerlangan yang mendalam.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFD3] flex flex-wrap gap-4">
                <Link
                  href="/our-team"
                  className="btn-gradient-royal px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
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
      <section className="py-20 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Compass className="w-3.5 h-3.5 text-[#4B2A7B]" />
              <span>Core Pillars</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2D33]">
              The Four Cornerstones of Our Practice
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2D33]/70 mt-2 font-light">
              Principles guiding every brief, negotiation, and courtroom trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#E5DFD3] rounded-lg hover:border-[#4B2A7B]/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded bg-[#4B2A7B]/10 border border-[#4B2A7B]/20 flex items-center justify-center text-[#4B2A7B] mb-4 shadow-2xs">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2B2D33] mb-2">
                1. Passion & Duty
              </h3>
              <p className="text-xs text-[#2B2D33]/70 leading-relaxed">
                Relentless trial diligence backed by meticulous preparation and a tireless commitment to advancing our clients’ rightful legal remedies.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5DFD3] rounded-lg hover:border-[#4B2A7B]/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded bg-[#4B2A7B]/10 border border-[#4B2A7B]/20 flex items-center justify-center text-[#4B2A7B] mb-4 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2B2D33] mb-2">
                2. Integrity & Ethics
              </h3>
              <p className="text-xs text-[#2B2D33]/70 leading-relaxed">
                Absolute transparency in case merit appraisal and legal costs, adhering strictly to Malaysian Bar Professional Conduct rules.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5DFD3] rounded-lg hover:border-[#4B2A7B]/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded bg-[#4B2A7B]/10 border border-[#4B2A7B]/20 flex items-center justify-center text-[#4B2A7B] mb-4 shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2B2D33] mb-2">
                3. Genuine Client Care
              </h3>
              <p className="text-xs text-[#2B2D33]/70 leading-relaxed">
                Accessible, empathetic representation providing clear legal roadmaps and direct partner communication in plain language.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5DFD3] rounded-lg hover:border-[#4B2A7B]/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded bg-[#4B2A7B]/10 border border-[#4B2A7B]/20 flex items-center justify-center text-[#4B2A7B] mb-4 shadow-2xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2B2D33] mb-2">
                4. To the Point
              </h3>
              <p className="text-xs text-[#2B2D33]/70 leading-relaxed">
                Decisive, commercially pragmatic strategies that eliminate procedural waste and deliver tangible results without unnecessary delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Firm History & Tradition */}
      <section className="py-20 lg:py-24 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-2 bg-white border border-[#D8C7F0] px-3.5 py-1.5 rounded-full shadow-xs">
              <Landmark className="w-3.5 h-3.5 text-[#4B2A7B]" />
              <span>Chambers Heritage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2D33] mb-3">
              A History of Fearless Advocacy
            </h2>
            <p className="font-serif italic text-[#4B2A7B] text-base">
              &ldquo;From London’s Inns of Court to the High Court of Malaya&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#2B2D33]/85">
            <div className="p-6 border border-[#E5DFD3] bg-white rounded-lg shadow-xs hover:border-[#4B2A7B] hover:shadow-md transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#4B2A7B] block mb-2">2009 – 2010</span>
              <h4 className="font-serif text-base font-bold text-[#2B2D33] mb-2">English Bar & University of Reading</h4>
              <p className="leading-relaxed text-[#2B2D33]/75">
                Completed LL.B. (Hons) at Reading and called to the English Bar at Lincoln’s Inn, London, laying the foundation of common law trial advocacy.
              </p>
            </div>

            <div className="p-6 border border-[#E5DFD3] bg-white rounded-lg shadow-xs hover:border-[#4B2A7B] hover:shadow-md transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#4B2A7B] block mb-2">2011 – 2019</span>
              <h4 className="font-serif text-base font-bold text-[#2B2D33] mb-2">High Court & Corporate Practice</h4>
              <p className="leading-relaxed text-[#2B2D33]/75">
                Admitted to the High Court of Malaya; practiced in tier-1 litigation firms handling insurance defense, banking disputes, and in-house corporate risk with KNM Group Berhad.
              </p>
            </div>

            <div className="p-6 border border-[#E5DFD3] bg-white rounded-lg shadow-xs hover:border-[#4B2A7B] hover:shadow-md transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#4B2A7B] block mb-2">2020 – PRESENT</span>
              <h4 className="font-serif text-base font-bold text-[#2B2D33] mb-2">Messrs. Low Wah Chin & Co.</h4>
              <p className="leading-relaxed text-[#2B2D33]/75">
                Established chambers at Colony @ KLCC, delivering full-service commercial, property, family, and appellate litigation representation across Malaysia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Principal Counsel & Chambers Portrait Gallery */}
      <PartnerGallery
        gallery={settings.gallery}
        title="Chambers & Portrait Gallery"
        subtitle="Principal Advocate & Solicitor Low Wah Chin (Ava Rachel) 劉華晶"
        badge="Lincoln’s Inn London • High Court of Malaya"
        isDark={false}
      />
    </>
  );
}
