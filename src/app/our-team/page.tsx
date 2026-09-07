import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers, getRepresentativeMatters } from '@/db';
import { TEAM_MEMBERS_DATA } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
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
  Sparkles,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Managing Partner Ava Rachel Low (刘华律师) | Messrs. Low Wah Chin & Co.',
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
    { name: 'Our Team', url: `${SITE_CONFIG.url}/our-team` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title="Our Leadership & Principal Counsel"
        subtitle="Where legal mastery meets the art of strategy—navigating complexity with poise, discretion, and unwavering clarity."
        badge="Senior Chambers Leadership • Kuala Lumpur"
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
      />

      {/* 1. Leader Bio Profile (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Bar Badges (5 cols) */}
            <div className="lg:col-span-5 static lg:sticky lg:top-28 space-y-6">
              <div className="relative w-full max-w-[400px] mx-auto p-2 bg-white border border-[#c6a052]/40 rounded-lg shadow-md">
                <div className="relative h-[480px] w-full rounded overflow-hidden bg-gray-100">
                  <Image
                    src={photoUrl}
                    alt="Ava Rachel Low (刘华律师) Advocate & Solicitor"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101826]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded bg-[#1a2332]/95 border border-[#c6a052]/40 text-[#faf9f6]">
                    <div className="flex items-center justify-between mb-0.5">
                      <h2 className="font-serif text-lg font-bold text-white">
                        {leader.name}
                      </h2>
                      <span className="font-serif text-xs text-[#dcc280]">刘华律师</span>
                    </div>
                    <p className="text-[#dcc280] text-[11px] font-semibold">
                      Founder & Principal Counsel
                    </p>
                    <p className="text-[10px] text-[#faf9f6]/70 mt-0.5">
                      Lincoln’s Inn Barrister (UK) • High Court of Malaya (BC/L/2019)
                    </p>
                  </div>
                </div>
              </div>

              {/* Admissions & Academic Degrees */}
              <div className="bg-white p-5 rounded-lg border border-[#e8e1d5] space-y-3 shadow-xs text-xs">
                <h3 className="font-serif font-bold text-[#1a2332] uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#c6a052]" />
                  <span>Academic Qualifications & Admissions</span>
                </h3>
                <ul className="space-y-2 text-[#4b5563]">
                  {credentials.map((cred: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] mt-0.5 shrink-0" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Bio Narrative, Career History & Appellate Record (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Leader Narrative */}
              <div>
                <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  <Award className="w-3.5 h-3.5 text-[#c6a052]" />
                  <span>Chambers Leadership</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1a2332] leading-tight mb-4">
                  Fearless Advocacy Grounded in Meticulous Preparation
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
                  {bioParagraphs.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Appellate Record & Practical Practice Areas */}
              {appellateExperience && appellateExperience.length > 0 && (
                <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#e8e1d5] shadow-xs space-y-5">
                  <h4 className="font-serif text-xl font-bold text-[#1a2332] flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Landmark className="w-5 h-5 text-[#c6a052]" />
                    <span>Appellate & Trial Practice Record</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {appellateExperience.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded bg-[#faf9f6] border border-[#e8e1d5] text-xs">
                        <span className="font-mono text-[10px] font-bold text-[#9d7835] uppercase block mb-1">
                          Branch {item.code || idx + 1}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#1a2332] mb-1">
                          {item.title}
                        </h5>
                        <p className="text-[#4b5563] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Milestone History */}
              {careerHistory && careerHistory.length > 0 && (
                <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#e8e1d5] shadow-xs space-y-5">
                  <h4 className="font-serif text-xl font-bold text-[#1a2332] flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Briefcase className="w-5 h-5 text-[#c6a052]" />
                    <span>Practice History & Institutional Trajectory</span>
                  </h4>
                  <div className="space-y-3">
                    {careerHistory.map((hist, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-3.5 p-3 rounded bg-[#faf9f6] border border-[#e8e1d5] text-xs"
                      >
                        <span className="font-mono font-bold text-[#9d7835] shrink-0 w-24">
                          {hist.period}
                        </span>
                        <div className="flex-1">
                          <strong className="text-[#1a2332] block font-serif text-xs sm:text-sm">
                            {hist.firm}
                          </strong>
                          <span className="text-[#6b7280]">{hist.role}</span>
                        </div>
                      </div>
                    ))}
                    {/* TODO: insert verified prior firm experience from client CV */}
                  </div>
                </div>
              )}

              {/* Direct Actions */}
              <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-gold px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <WhatsAppButton variant="compact" label="Direct WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
