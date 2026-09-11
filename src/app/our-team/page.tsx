import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers, getRepresentativeMatters } from '@/db';
import { TEAM_MEMBERS_DATA, REPRESENTATIVE_MATTERS_DATA } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import PartnerGallery from '@/components/common/PartnerGallery';
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
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Languages,
  BookOpen,
  FolderGit2,
  UserCheck,
  Gavel,
  Check,
  Building,
} from 'lucide-react';

import { getFirmSettings } from '@/actions/settingsActions';

export const metadata = constructMetadata({
  title: 'Managing Partner Low Wah Chin (Ava Rachel) 劉華晶 | Messrs. Low Wah Chin & Co.',
  description: 'Meet founder Low Wah Chin (Ava Rachel) 劉華晶, Lincoln’s Inn Barrister & High Court Advocate. 15 years of practice experience across trial, corporate advisory, appellate litigation, and conveyancing.',
  canonicalUrl: `${SITE_CONFIG.url}/our-team`,
});

export default async function OurTeamPage() {
  const settings = await getFirmSettings();
  const team = await getTeamMembers();
  const leader = team[0] || TEAM_MEMBERS_DATA[0];
  const matters = (await getRepresentativeMatters()) || REPRESENTATIVE_MATTERS_DATA;

  const credentials = leader.credentials || TEAM_MEMBERS_DATA[0].credentials;
  const careerHistory = leader.careerHistory || TEAM_MEMBERS_DATA[0].careerHistory || [];
  const detailedCareer = leader.detailedCareerHistory || TEAM_MEMBERS_DATA[0].detailedCareerHistory || [];
  const educationHistory = leader.educationHistory || TEAM_MEMBERS_DATA[0].educationHistory || [];
  const earlyCareer = leader.earlyCareerAndInternships || TEAM_MEMBERS_DATA[0].earlyCareerAndInternships || [];
  const activities = leader.activitiesAndAchievements || TEAM_MEMBERS_DATA[0].activitiesAndAchievements || [];
  const skills = leader.skills || TEAM_MEMBERS_DATA[0].skills || [];
  const languages = leader.languages || TEAM_MEMBERS_DATA[0].languages || [];
  const appellateExperience = leader.appellateExperience || TEAM_MEMBERS_DATA[0].appellateExperience || [];
  const bioParagraphs = Array.isArray(leader.bio) ? leader.bio : [leader.bio];
  const photoUrl: string = leader.photo_url || '/lawyer-portrait-1.jpg';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Our Team', url: `${SITE_CONFIG.url}/our-team` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title="Our Leadership & Principal Counsel"
        subtitle="Where classical British Barrister trial craft meets 15 years of practice experience in Malaysian High Court, corporate, and conveyancing mastery."
        badge="Senior Chambers Leadership • Kuala Lumpur"
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage={settings.heroImages?.ourTeamHeroImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"}
      />

      {/* Main Leader Showcase Profile */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] text-[#0F1F3D] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Sticky Profile Card (5 cols) */}
            <div className="lg:col-span-5 static lg:sticky lg:top-24 space-y-6">
              <div className="relative w-full max-w-[420px] mx-auto p-2 bg-white border border-slate-200 rounded-xl shadow-lg">
                <div className="relative h-[480px] sm:h-[520px] w-full rounded-lg overflow-hidden bg-[#0F1F3D]/10">
                  <Image
                    src={photoUrl}
                    alt="Low Wah Chin (Ava Rachel) 劉華晶 Advocate & Solicitor Messrs. Low Wah Chin & Co."
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e]/95 via-[#070e1e]/20 to-transparent" />
                  
                  {/* Overlay Nameplate */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-gradient-to-r from-[#0F1F3D]/95 via-[#1E1B4B]/95 to-[#2E1065]/95 border border-white/20 text-[#faf7fc] backdrop-blur-md">
                    <div className="flex items-baseline justify-between mb-1">
                      <h2 className="font-serif text-xl font-bold text-white tracking-tight">
                        Low Wah Chin <span className="text-sm font-normal text-purple-200">(Ava Rachel)</span>
                      </h2>
                      <span className="font-serif text-sm font-bold text-purple-200">劉華晶</span>
                    </div>
                    <p className="text-purple-200 text-xs font-semibold">
                      Founder & Principal Legal Practitioner
                    </p>
                    <p className="text-[11px] text-[#faf7fc]/80 mt-1 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                      <span>Lincoln’s Inn Barrister (UK) • High Court of Malaya</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Admissions Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3.5 shadow-sm text-xs">
                <h3 className="font-serif font-bold text-[#0F1F3D] uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-indigo-600" />
                  <span>Statutory Bar Admissions</span>
                </h3>
                <div className="space-y-2.5">
                  <div className="p-3 bg-[#f8fafc] rounded-lg border border-slate-200">
                    <span className="font-mono text-[10px] font-bold text-indigo-600 block mb-0.5">11TH NOVEMBER 2011</span>
                    <strong className="text-[#0F1F3D] block font-serif text-xs">Advocate & Solicitor</strong>
                    <span className="text-slate-600">The High Court of Malaya, Malaysia</span>
                  </div>
                  <div className="p-3 bg-[#f8fafc] rounded-lg border border-slate-200">
                    <span className="font-mono text-[10px] font-bold text-indigo-600 block mb-0.5">14TH OCTOBER 2010</span>
                    <strong className="text-[#0F1F3D] block font-serif text-xs">Barrister-at-Law (Non-Practicing)</strong>
                    <span className="text-slate-600">The Honourable Society of Lincoln’s Inn, London, United Kingdom</span>
                  </div>
                </div>
              </div>

              {/* Direct Contact & Chambers Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3.5 shadow-sm text-xs">
                <h3 className="font-serif font-bold text-[#0F1F3D] uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  <span>Direct Chambers Contact</span>
                </h3>
                <div className="space-y-2 text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <a href="tel:+60175483157" className="font-semibold text-[#0F1F3D] hover:text-indigo-600 transition-colors">
                      +60 17-548 3157
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <a href="mailto:lwc.rachel@gmail.com" className="font-semibold text-[#0F1F3D] hover:text-indigo-600 transition-colors">
                      lwc.rachel@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      Colony @ KLCC, Level 1, Vipod Residences, 6 Jalan Kia Peng, 50450 Kuala Lumpur
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <WhatsAppButton variant="compact" label="Direct WhatsApp Inquiry" />
                  <Link
                    href="/contact"
                    className="btn-gradient-royal w-full text-center py-2.5 rounded-lg font-bold uppercase tracking-wider text-[11px] block transition-all shadow-sm"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>

              {/* Language Proficiencies */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm text-xs">
                <h3 className="font-serif font-bold text-[#1e0d33] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-indigo-600" />
                  <span>Language Capabilities</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#faf7fc] border border-slate-200">
                      <strong className="text-[#1e0d33] block font-serif text-xs">{lang.language}</strong>
                      <span className="text-[10px] text-[#6b587a]">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Skills & Competencies */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm text-xs">
                <h3 className="font-serif font-bold text-[#1e0d33] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Core Legal Competencies</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#faf7fc] border border-slate-200 text-[#4b3d56] text-[11px]"
                    >
                      <Check className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Career History, Education, Cases & Activities (7 cols) */}
            <div className="lg:col-span-7 space-y-12 pt-2 sm:pt-4">
              
              {/* 1. Executive Bio & Judicial Philosophy */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Principal Counsel Profile</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e0d33] leading-tight">
                  Fearless Courtroom Advocacy Grounded in Deliberate Preparation
                </h1>
                <div className="p-4 bg-white border-l-4 border-indigo-600 rounded-r-lg border border-slate-200 text-xs sm:text-sm text-[#1e0d33] font-medium leading-relaxed shadow-xs">
                  <strong>Low Wah Chin (Ava Rachel) 劉華晶</strong> brings Fifteen (15) years of practice experience since her admission in 2011 across civil, insurance, company, family & divorce, medical negligence, personal injury, property conveyancing, and will & estate distribution law practice with established Malaysian benchmark firms, ~9 months as In-House Legal Counsel with listed multinational KNM Group Berhad, and sole proprietorship practice.
                </div>
                <div className="space-y-4 text-sm sm:text-base text-[#4b3d56] leading-relaxed pt-2">
                  {bioParagraphs.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* 2. Detailed Career Trajectory & Law Firm Experience (Full CV Breakdown) */}
              <div id="practice-history" className="scroll-mt-32 p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6 mt-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e0d33] flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <span>Practice History & Institutional Trajectory</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-[#faf7fc] px-2.5 py-1 rounded border border-slate-200">
                    2010 – PRESENT
                  </span>
                </div>

                <div className="space-y-6">
                  {detailedCareer.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-lg bg-[#faf7fc] border border-slate-200 hover:border-indigo-300 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 pb-2 border-b border-slate-200">
                        <div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-[#1e0d33]">
                            {item.firm}
                          </h4>
                          <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                            {item.role} {item.department && `• ${item.department}`}
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#6b587a] shrink-0 bg-white px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
                          {item.period}
                        </span>
                      </div>

                      {item.principal && (
                        <p className="text-xs text-[#6b587a] italic">
                          Principal: <strong className="text-[#374151] font-medium">{item.principal}</strong>
                        </p>
                      )}

                      {item.supervisor && (
                        <p className="text-xs text-[#6b587a] italic">
                          Supervised by: <strong className="text-[#374151] font-medium">{item.supervisor}</strong>
                        </p>
                      )}

                      {item.keyResponsibilities && item.keyResponsibilities.length > 0 && (
                        <ul className="space-y-1.5 text-xs text-[#594d63] pt-1">
                          {item.keyResponsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.notableMatters && item.notableMatters.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 mt-2">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-2">
                            Key Matters & Experience Handled:
                          </p>
                          <ul className="space-y-1.5 text-xs text-[#374151]">
                            {item.notableMatters.slice(0, 8).map((matter, mIdx) => (
                              <li key={mIdx} className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">•</span>
                                <span>{matter}</span>
                              </li>
                            ))}
                            {item.notableMatters.length > 8 && (
                              <li className="text-[11px] text-[#6b587a] italic pl-4">
                                + {item.notableMatters.length - 8} additional corporate, litigation & conveyancing briefs successfully executed.
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Education & Academic Background */}
              <div className="p-5 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e0d33] flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-indigo-600 shrink-0" />
                    <span>Academic Education & Distinctions</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-[#faf7fc] px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
                    UK & MALAYSIA
                  </span>
                </div>

                <div className="space-y-4">
                  {educationHistory.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-lg bg-[#faf7fc] border border-slate-200 hover:border-indigo-300 transition-colors space-y-2.5 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200 self-start">
                          {edu.level}
                        </span>
                        <span className="font-mono font-bold text-[#6b587a] text-[11px]">
                          {edu.period}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#1e0d33] leading-snug">
                          {edu.qualification}
                        </h4>
                        <p className="text-[#594d63] font-medium text-xs">
                          {edu.institution} {edu.location && `· ${edu.location}`}
                        </p>
                      </div>

                      {edu.gradeOrDetails && (
                        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                            Results / Distinctions:
                          </span>
                          <span className="inline-block px-2.5 py-1 bg-white border border-indigo-200 text-[#1e0d33] font-semibold text-[11.5px] rounded-md shadow-2xs">
                            {edu.gradeOrDetails}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Early Career, Pupillage & Legal Internships */}
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1e0d33] flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-indigo-600" />
                    <span>Pupillage, Legal Internships & Academic Research</span>
                  </h3>
                  <p className="text-xs text-[#6b587a] mt-1">
                    Formative professional training under respected senior legal practitioners and deans.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {earlyCareer.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#faf7fc] border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase">
                          {item.period}
                        </span>
                        <span className="text-[10px] text-[#6b587a] font-medium">{item.role}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#1e0d33]">
                        {item.firm}
                      </h4>
                      {item.supervisor && (
                        <p className="text-[11px] text-[#6b587a]">
                          Supervised by: <strong className="text-[#374151]">{item.supervisor}</strong>
                        </p>
                      )}
                      {item.details && (
                        <p className="text-[#594d63] text-[11.5px] leading-relaxed pt-1">
                          {item.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Pro Bono & Student Leadership Achievements */}
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1e0d33] flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-indigo-600" />
                    <span>Pro Bono Work & Student Union Leadership</span>
                  </h3>
                  <p className="text-xs text-[#6b587a] mt-1">
                    Commitment to community service and international Malaysian student advocacy.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {activities.map((act, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[#faf7fc] border border-slate-200 text-xs space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase bg-white px-2 py-0.5 rounded border border-slate-200 self-start sm:self-auto">
                          {act.date}
                        </span>
                        <span className="text-[10px] text-[#6b587a] font-semibold">{act.role}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#1e0d33]">
                        {act.title}
                      </h4>
                      <p className="text-indigo-600 font-medium text-xs">
                        {act.organization}
                      </p>
                      {act.details && (
                        <p className="text-[#594d63] text-[11.5px] leading-relaxed pt-1">
                          {act.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Selected Representative Matters & Courtroom Highlights */}
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e0d33] flex items-center gap-2.5">
                    <Gavel className="w-5 h-5 text-indigo-600" />
                    <span>Verified Representative Case Matters</span>
                  </h3>
                  <Link href="/contact" className="text-xs font-semibold text-indigo-600 hover:underline">
                    Inquire on Case Merits →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matters.slice(0, 6).map((m, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[#faf7fc] border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {m.category}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#1e0d33] leading-snug">
                        {m.title}
                      </h4>
                      <p className="text-[#594d63] text-[11.5px] line-clamp-3 leading-relaxed">
                        {m.background}
                      </p>
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-[#6b587a]">
                        <span className="font-medium text-[#1e0d33]">{m.forum}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Actions & Consultation Card */}
              <div className="p-8 rounded-xl bg-gradient-to-br from-[#070e1e] via-[#0d1738] to-[#1c0c30] text-white border border-white/15 shadow-lg space-y-4">
                <div className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] badge-gradient-royal px-3 py-1 rounded-full">
                  <Scale className="w-3.5 h-3.5 text-purple-300" />
                  <span>Direct Partner Access</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Schedule Direct Legal Consultation with Principal Counsel
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-light">
                  Whether structuring cross-border corporate contracts, managing high-value real estate conveyancing, or prosecuting commercial and estate disputes in the High Court, receive seasoned, partner-led counsel without intermediaries.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="btn-gradient-royal px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Request Legal Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <WhatsAppButton variant="compact" label="Direct WhatsApp Briefing" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Portrait Gallery Section */}
      <PartnerGallery
        gallery={settings.gallery}
        title="Principal Counsel Photo Showcase"
        subtitle="Courtroom Advocacy, Lincoln’s Inn Barrister & Chambers Consultation"
        badge="Accreditations & Portraits"
        isDark={true}
      />
    </>
  );
}
