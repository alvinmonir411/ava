import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Scale, ShieldCheck, Landmark, CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '../common/WhatsAppButton';
import BrandMonogram from '../common/BrandMonogram';

export default function Footer() {
  const currentYear = 2026;

  const practiceLinks = [
    { href: '/practices/contract-drafting-commercial-advisory', label: 'Contract Drafting & Commercial Advisory' },
    { href: '/practices/contractual-dispute-claims', label: 'Contractual Dispute Claims' },
    { href: '/practices/debt-recovery-claims', label: 'Debt Recovery Claims & Insolvency' },
    { href: '/practices/tort-claims-civil-liabilities', label: 'Tort Claims & Civil Liabilities' },
    { href: '/practices/corporate-commercial', label: 'Corporate & Commercial Law' },
    { href: '/practices/real-estate-conveyancing', label: 'Real Estate & Conveyancing' },
    { href: '/practices/civil-commercial-litigation', label: 'Civil, Commercial & Appellate Litigation' },
    { href: '/practices/family-probate-estate', label: 'Family, Probate & Estate Administration' },
    { href: '/practices/employment-industrial-relations', label: 'Employment & Industrial Relations' },
  ];

  const serviceOfferings = [
    { label: 'Bodily Injury Claims', slug: 'bodily-injury-claims' },
    { label: 'Medical Negligence Claims', slug: 'medical-negligence-claims' },
    { label: 'Letter Writing & LODs', slug: 'letter-writing-lods' },
    { label: 'Employment & Labour Claims', slug: 'employment-labour-claims' },
    { label: 'Defamation Claims & Justification', slug: 'defamation-claims-justification' },
    { label: 'Will Writing & Probate Advice', slug: 'will-writing-probate-advice' },
    { label: 'Tenancy Agreement Disputes', slug: 'tenancy-agreement-disputes' },
    { label: 'Business Negotiations', slug: 'business-negotiations' },
    { label: 'Small Claims Assistance', slug: 'small-claims-assistance' },
    { label: 'Professional Negligence', slug: 'professional-negligence' },
    { label: 'Contractor Negligence Claims', slug: 'contractor-negligence-claims' },
    { label: 'Debt Recovery & Winding Up', slug: 'debt-recovery-winding-up' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1b0d25] via-[#140b1e] to-[#0f172a] text-[#faf9f6] border-t-2 border-[#c6a052]/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#c6a052]/20">
          {/* Column 1: Firm Identity & Founder Heritage (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandMonogram variant="hero" />

            <p className="text-[#e5c777] font-serif italic text-sm pt-2">
              &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
            </p>

            <p className="text-xs text-[#faf9f6]/80 leading-relaxed">
              Boutique Malaysian law firm led by principal lawyer Ava Rachel Low (刘华律师). Admitted to the High Court of Malaya and Lincoln’s Inn Barrister (UK). Delivering strategic counsel, fearless trial advocacy, and compassionate representation across Malaysia.
            </p>

            <div className="pt-2">
              <WhatsAppButton
                variant="compact"
                label="WhatsApp Senior Counsel"
                className="text-xs shadow-md"
              />
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#e5c777] uppercase tracking-wider border-b border-[#c6a052]/20 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#faf9f6]/85">
              <li>
                <Link href="/" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>About Firm</span>
                </Link>
              </li>
              <li>
                <Link href="/practices" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>Practice Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>Principal Lawyer</span>
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>Legal Insights</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>Legal FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e5c777] transition-colors flex items-center gap-1">
                  <span>Contact & Chambers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#e5c777] uppercase tracking-wider border-b border-[#c6a052]/20 pb-2">
              Core Practice Areas
            </h4>
            <ul className="space-y-2 text-xs text-[#faf9f6]/85">
              {practiceLinks.map((p, idx) => (
                <li key={idx}>
                  <Link href={p.href} className="hover:text-[#e5c777] transition-colors block line-clamp-1">
                    • {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Chambers (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#e5c777] uppercase tracking-wider border-b border-[#c6a052]/20 pb-2">
              Chambers Coordinates
            </h4>
            <div className="space-y-3 text-xs text-[#faf9f6]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Colony @ KLCC</strong><br />
                  Level 1, Vipod Residences,<br />
                  No. 6, Jalan Kia Peng, 50450 Kuala Lumpur,<br />
                  Wilayah Persekutuan Kuala Lumpur, Malaysia.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c6a052] shrink-0" />
                <a href="tel:+60175483157" className="hover:text-[#e5c777] font-semibold text-white">
                  +60 17-548 3157
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c6a052] shrink-0" />
                <a href="mailto:lwclegal5@gmail.com" className="hover:text-[#e5c777] text-white">
                  lwclegal5@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                <p>
                  <strong>Mon – Fri:</strong> 9:00 AM – 5:30 PM MYT<br />
                  <strong>Sat, Sun & Public Holidays:</strong> Closed (Urgent WhatsApp Only)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Offerings Directory Bar */}
        <div className="py-6 border-b border-[#c6a052]/15">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5c777] block mb-3">
            Specialized Practice Scope & Procedures:
          </span>
          <div className="flex flex-wrap gap-2 text-xs text-[#faf9f6]/80">
            {serviceOfferings.map((svc, i) => (
              <Link
                key={i}
                href={`/practices/${svc.slug}`}
                className="bg-[#200f2b] px-2.5 py-1 rounded-lg border border-[#c6a052]/25 hover:border-[#c6a052] hover:text-[#e5c777] transition-colors"
              >
                {svc.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Malaysian Bar Council Compliance Disclaimer (Legal Profession Act 1976) */}
        <div className="py-6 border-b border-[#c6a052]/15 text-[11px] text-[#faf9f6]/60 leading-relaxed">
          <p className="mb-2 font-semibold text-[#e5c777]/80 uppercase tracking-wider flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Malaysian Bar Council Legal Notice & Disclaimer (Legal Profession Act 1976)</span>
          </p>
          <p>
            The information published on this website is for general informational purposes only and does not constitute formal legal advice or legal representation under Malaysian law. Visiting this website or transmitting an inquiry does not establish an advocate-client relationship. Clients should consult Messrs. Low, Wah Chin & Co. directly for tailored advice specific to their legal circumstances.
          </p>
        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#faf9f6]/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c6a052]" />
            <span>
              Admitted to the Roll of Advocates & Solicitors of the High Court of Malaya • Lincoln’s Inn Barrister (UK)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-center md:text-right">
              &copy; {currentYear} Low, Wah Chin & Co. All Rights Reserved.
            </p>
            <span className="text-[#faf9f6]/30">|</span>
            <Link
              href="/admin"
              className="text-[#e5c777]/80 hover:text-[#e5c777] hover:underline font-semibold"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

