import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers } from '@/db';
import { TEAM_MEMBERS_DATA } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import TrustBar from '@/components/common/TrustBar';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
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
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Our Team & Founder Ava Rachel Low | LWCCO Advocates & Solicitors',
  description: 'Meet founder Low Wah Chin (Ava Rachel), Lincoln’s Inn Barrister & High Court Advocate. 15+ years of trial and appellate experience in civil, banking, corporate, and tort litigation.',
  canonicalUrl: `${SITE_CONFIG.url}/our-team`,
});

export default async function OurTeamPage() {
  const team = await getTeamMembers();
  const leader = team[0] || TEAM_MEMBERS_DATA[0];

  const credentials = leader.credentials || TEAM_MEMBERS_DATA[0].credentials;
  const careerHistory = leader.careerHistory || TEAM_MEMBERS_DATA[0].careerHistory || [];
  const appellateExperience = leader.appellateExperience || TEAM_MEMBERS_DATA[0].appellateExperience || [];
  const bioParagraphs = Array.isArray(leader.bio) ? leader.bio : [leader.bio];
  const photoUrl: string = leader.photo_url || TEAM_MEMBERS_DATA[0].photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Our Team', url: `${SITE_CONFIG.url}/our-team` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header */}
      <section className="relative bg-navy text-cream py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Leadership & Advocacy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4">
            Our Legal Team & Founder
          </h1>
          <p className="font-serif italic text-brass-light text-lg sm:text-xl mb-4">
            &ldquo;Excellence Grounded in Humanity Values & Fearless Advocacy&rdquo;
          </p>
          <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
            Led by Ms. Low Wah Chin (Ava Rachel), our team brings 15+ years of multidisciplinary litigation, corporate advisory, and appellate advocacy to every client matter.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Leader Bio Profile */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Bar Badges */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="relative h-[520px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-brass/40 bg-navy">
                <Image
                  src={photoUrl}
                  alt="Low Wah Chin (Ava Rachel) Advocate & Solicitor LWCCO"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-navy/90 backdrop-blur-md border border-brass/30 text-cream">
                  <h2 className="font-serif text-2xl font-bold text-cream">
                    {leader.name}
                  </h2>
                  <p className="text-brass-light text-xs font-semibold">
                    {leader.role}
                  </p>
                  <p className="text-[11px] text-cream/70 mt-1">
                    Lincoln’s Inn Barrister (UK) • Advocate & Solicitor (High Court of Malaya)
                  </p>
                </div>
              </div>

              {/* Admissions & Academic Degrees */}
              <div className="bg-cream p-6 rounded-2xl border border-charcoal-light/40 space-y-4">
                <h3 className="font-serif font-bold text-navy text-sm uppercase tracking-wider border-b border-brass/20 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-brass" />
                  <span>Academic Qualifications & Admissions</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-charcoal">
                  {credentials.map((cred: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Direct */}
              <div className="bg-navy p-6 rounded-2xl text-cream border border-brass/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-brass-light uppercase font-bold tracking-wider block">Direct Line:</span>
                  <a href="tel:+60175483157" className="text-sm font-semibold text-cream hover:text-brass-light">
                    +60 17-548 3157
                  </a>
                </div>
                <WhatsAppButton variant="compact" label="WhatsApp Ava" />
              </div>
            </div>

            {/* Right Column: Narrative & Practice Experience */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/10 border border-brass/30 text-brass-dark text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Biography & Professional Background</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
                  Low Wah Chin (Ava Rachel)
                </h2>
                <p className="font-serif italic text-brass-dark text-base sm:text-lg mt-1">
                  Advocate & Solicitor of the High Court of Malaya • Barrister-at-Law (Lincoln’s Inn, London)
                </p>
              </div>

              <div className="prose prose-lg text-charcoal leading-relaxed space-y-4 font-light">
                {bioParagraphs.map((paragraph: string, bIdx: number) => (
                  <p key={bIdx} className="text-base sm:text-lg leading-relaxed text-charcoal">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Career History & Law Firm Timeline */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-brass" />
                  <span>Career History & Associated Law Firms</span>
                </h3>

                <div className="relative border-l-2 border-brass/40 pl-6 space-y-6 ml-3">
                  {careerHistory.map((item, cIdx: number) => (
                    <div key={cIdx} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brass border-2 border-white shadow-sm" />
                      <div className="bg-cream/70 p-4 rounded-xl border border-charcoal-light/30">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <strong className="text-sm font-bold text-navy">{item.firm}</strong>
                          <span className="text-xs font-semibold text-brass-dark bg-white px-2.5 py-0.5 rounded-md border border-brass/20">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-muted">{item.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appellate & Trial Court Experience */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-3 flex items-center gap-2">
                  <Landmark className="w-6 h-6 text-brass" />
                  <span>Litigation & Appellate Experience (A to G)</span>
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mb-6">
                  Ms. Ava Rachel Low has practiced and attained extensive legal experience in the following litigation matters up to the Appellate Courts:
                </p>

                <div className="space-y-4">
                  {appellateExperience.map((exp, eIdx: number) => (
                    <div
                      key={eIdx}
                      className="p-5 rounded-xl bg-cream border border-charcoal-light/40 flex items-start gap-4 hover:border-brass/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy text-brass font-serif font-bold text-sm flex items-center justify-center shrink-0">
                        {exp.code}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-navy text-base mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-cream-dark flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-brass px-7 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md"
                >
                  <span>Book Consultation with Ava Rachel Low</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/practices"
                  className="px-5 py-3 rounded-lg border border-navy/30 text-navy font-semibold text-sm hover:bg-cream-dark transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Practice Areas</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-20 bg-cream border-t border-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Direct Senior Counsel Review"
            title="Discuss Your Case With Ms. Ava Rachel Low"
            subtitle="Get prompt, confidential, and partner-level advice on your legal brief."
          />
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
