import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import TrustBar from '@/components/common/TrustBar';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import {
  Scale,
  Award,
  BookOpen,
  GraduationCap,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Heart,
  Briefcase,
  ArrowRight,
  Globe2,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About the Firm & Senior Counsel Ava Rachel Low | LWCCO',
  description: 'Learn about Messrs. Low Wah Chin & Co. (LWCCO), founded by Lincoln’s Inn Barrister & High Court Advocate Low Wah Chin (Ava Rachel). Member of Malaysian Bar Council No. BC/L/2019. Dedicated to community-wide excellence and fearless advocacy.',
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

      {/* Hero Header */}
      <section className="relative bg-navy text-cream py-20 sm:py-28 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
            alt="Messrs. Low Wah Chin & Co. Chambers Kuala Lumpur"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/90 to-navy-dark/95" />
          <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Advocates & Solicitors • Kuala Lumpur</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4">
            About Our Law Firm
          </h1>
          <p className="font-serif italic text-brass-light text-lg sm:text-xl mb-4">
            &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
          </p>
          <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
            Founded on the deep conviction that high-calibre legal representation must be grounded in humanity values, accessibility, and unyielding integrity.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Main Firm Narrative */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Credentials */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-brass/40 bg-navy">
                <Image
                  src="/profile-image.avif"
                  alt="Low Wah Chin (Ava Rachel) Advocate and Solicitor LWCCO"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top filter brightness-100 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-navy/90 backdrop-blur-md border border-brass/30 text-cream">
                  <h3 className="font-serif text-xl font-bold text-cream">
                    Low Wah Chin (Ava Rachel)
                  </h3>
                  <p className="text-brass-light text-xs font-semibold">
                    Managing Partner & Principal Advocate
                  </p>
                  <p className="text-[11px] text-cream/70 mt-1">
                    Lincoln’s Inn Barrister (UK) • High Court of Malaya
                  </p>
                </div>
              </div>

              {/* Fast Fact Card */}
              <div className="bg-cream p-6 rounded-2xl border border-charcoal-light/40 space-y-3">
                <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wider border-b border-brass/20 pb-2">
                  Key Professional Milestones
                </h4>
                <div className="space-y-2 text-xs text-charcoal">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-muted">Malaysian Bar Admission:</span>
                    <strong className="text-navy">11th November 2011</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-muted">English Bar (Lincoln’s Inn):</span>
                    <strong className="text-navy">October 2010</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-muted">Firm Establishment:</span>
                    <strong className="text-navy">Year 2020</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-muted">Total Practice Experience:</span>
                    <strong className="text-navy">15+ Years</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Story */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/10 border border-brass/30 text-brass-dark text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Our Philosophy & Background</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
                  Experienced Legal Excellence Anchored in Humanity Values
                </h2>
              </div>

              <div className="prose prose-lg text-charcoal leading-relaxed space-y-5 font-light">
                <p>
                  <strong>Messrs. Low Wah Chin & Co. (LWCCO)</strong>, based in Kuala Lumpur, was established by <strong>Low Wah Chin (Ava Rachel)</strong>. Grounded in Civil and Commercial Litigation with some of Malaysia’s most established law firms, Ms. Low set out with a distinctive mission: to serve the community and provide clients with the most sensible, direct legal advice at the sphere of humanity values.
                </p>

                <p>
                  Unlike firms that restrict their practice to narrow commercial niches or cater solely to ultra-wealthy institutions, <strong>Low Wah Chin & Co. spreads its practice to wide areas of the law</strong>. The firm ensures that every class of the community—from individuals fighting for personal injury restitution to businesses negotiating multi-million Ringgit contracts—is properly protected with excellence.
                </p>

                <div className="p-6 bg-cream-dark/60 rounded-2xl border-l-4 border-brass my-6">
                  <p className="font-serif italic text-navy text-base sm:text-lg m-0">
                    &ldquo;We understand the immense pressure, uncertainty, and financial stakes that accompany every legal dispute. We pride ourselves on dependable, calm, and well-spoken advocacy that treats each client with genuine dignity.&rdquo;
                  </p>
                </div>

                <h3 className="font-serif text-2xl font-bold text-navy pt-4">
                  Academic Rigor & English Bar Foundations
                </h3>

                <p>
                  Ms. Ava Rachel Low commenced her academic legal journey in the United Kingdom, reading law at the <strong>University of Reading</strong> and graduating with a Bachelor of Laws (Honours) degree in 2009. She completed her Bar Vocational Course (BVC) Postgraduate Diploma at <strong>The City University London</strong> and was called to the English Bar as a Barrister-at-Law of the <strong>Honourable Society of Lincoln’s Inn</strong> in October 2010.
                </p>

                <p>
                  Upon returning to Malaysia, she completed her pupillage with premier legal firm <strong>Shook Lin & Bok Malaysia</strong> and was admitted to the Roll of Advocates and Solicitors of the High Court of Malaya on <strong>11th November 2011</strong>.
                </p>

                <h3 className="font-serif text-2xl font-bold text-navy pt-4">
                  Decade of Multidisciplinary Practice
                </h3>

                <p>
                  Before establishing LWCCO, Ms. Low expanded her capabilities across premier legal institutions:
                </p>

                <ul className="space-y-3 text-sm sm:text-base text-charcoal list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brass mt-2 shrink-0" />
                    <span><strong>Conveyancing & Land Law (2012):</strong> Advised on property developments and real estate transactions at <em>Raja Eleena, Siew Ang & Associates</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brass mt-2 shrink-0" />
                    <span><strong>Insurance & Banking Litigation (2013):</strong> Handled professional indemnity insurance, bank litigation, and performance bonds with <em>Azim, Tunku Farik & Wong</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brass mt-2 shrink-0" />
                    <span><strong>Medical Negligence & Tort Claims (2015):</strong> Managed complex personal injury, medical negligence, and non-motor insurance claims with <em>Murali B. Pillai & Associates</em> and <em>K.S. Ong</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brass mt-2 shrink-0" />
                    <span><strong>In-House Corporate Risk Management (2016):</strong> Handled engineering contracts, procurement, and risk management with public listed company <em>KNM Group Berhad</em>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brass mt-2 shrink-0" />
                    <span><strong>Litigation Partnership (2017–2020):</strong> Served as partner with <em>Serena Paul Naveen & Associates</em> and senior counsel with <em>Burton Tan, Syazwan & Co.</em> in Johor.</span>
                  </li>
                </ul>
              </div>

                <div className="p-6 bg-[#0F1F3D] text-white rounded-2xl border border-[#B8935A]/40 my-6 shadow-xl">
                  <div className="flex items-center gap-2 text-[#CFA76F] text-xs font-bold uppercase tracking-wider mb-2">
                    <Globe2 className="w-4 h-4" />
                    <span>Mengenai Firma (Bahasa Melayu)</span>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed italic mb-3">
                    &ldquo;Tetuan Low Wah Chin & Co. Peguambela & Peguamcara LWCCO yang berada di Kuala Lumpur Malaysia diasaskan oleh peguam Low Wah Chin (Ava Rachel). Ava Rachel Low membumikan amalannya dalam Litigasi Sivil dan Komersial dengan firma-firma yang ditubuhkan di kawasan Kuala Lumpur.&rdquo;
                  </p>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Matlamat firma adalah untuk berkhidmat kepada masyarakat dan menyediakan perkhidmatan yang paling waras dalam bidang nilai kemanusiaan, memastikan setiap lapisan komuniti dilayani dengan integriti dan kecemerlangan yang mendalam.
                  </p>
                </div>

                <div className="pt-6 border-t border-cream-dark flex flex-wrap gap-4">
                  <Link
                    href="/our-team"
                    className="btn-brass px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md"
                  >
                    <span>View Detailed Team Profile & Appellate Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <WhatsAppButton variant="compact" label="Chat with Ava Rachel Low" />
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* 4 Core Pillars of Practice */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Guiding Values"
            title="The Four Cornerstones of LWCCO"
            subtitle="How we maintain our reputation as a trusted legal partner across Kuala Lumpur."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-charcoal-light/40 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-3">
                Uncompromising Integrity
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Absolute transparency regarding legal merits, risks, and fee structures. We give clients realistic assessments rather than false promises.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-charcoal-light/40 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-3">
                Humanity Values
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Legal problems happen to real people. We approach every brief with empathy, patient listening, and deep respect for our clients&apos; emotional wellbeing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-charcoal-light/40 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center mb-6">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-3">
                Appellate Tenacity
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Rigorous preparation and fearless courtroom advocacy extending to the highest Appellate Courts of Malaysia for complex civil and commercial briefs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-charcoal-light/40 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-3">
                Commercial Acumen
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Informed by in-house corporate experience with public listed entities, allowing us to safeguard balance sheets, enforce debts, and craft watertight contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Callout */}
      <section className="py-20 md:py-28 bg-navy text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream tracking-tight">
                Speak Confidentially With Ms. Ava Rachel Low
              </h2>
              <p className="text-cream/80 text-base leading-relaxed font-light">
                Schedule a private consultation at our KLCC offices or via secure video call. Receive partner-level analysis and clear next steps for your legal situation.
              </p>
              <div className="pt-2">
                <WhatsAppButton
                  variant="inline"
                  label="Instant WhatsApp Booking"
                  message="Hello Ms. Ava Rachel Low, I would like to schedule a confidential legal consultation with you."
                />
              </div>
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
