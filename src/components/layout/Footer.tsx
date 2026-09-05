import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Scale, ShieldCheck } from 'lucide-react';
import WhatsAppButton from '../common/WhatsAppButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const practiceLinks = [
    { href: '/practices/legal-advice-consultation', label: 'Legal Advice & General Consultation' },
    { href: '/practices/property-conveyancing', label: 'Property & Conveyancing Law' },
    { href: '/practices/family-divorce', label: 'Family & Divorce Matters' },
    { href: '/practices/dispute-resolution-claims', label: 'Dispute Resolution & Bodily Injury' },
    { href: '/practices/will-estate-distribution', label: 'Will Writing & Estate Distribution' },
    { href: '/practices/company-matters-agreements', label: 'Company Matters & Commercial Law' },
  ];

  const serviceOfferings = [
    'Bodily Injury Claims',
    'Medical Negligence Claims',
    'Letter Writing & LODs',
    'Employment & Labour Claims',
    'Defamation Claims & Justification',
    'Will Writing & Probate Advice',
    'Tenancy Agreement Disputes',
    'Business Negotiations',
    'Small Claims Assistance',
    'Professional Negligence',
    'Contractor Negligence Claims',
    'Debt Recovery & Winding Up',
  ];

  return (
    <footer className="bg-[#0A1529] text-white border-t-2 border-[#B8935A]/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#B8935A]/20">
          {/* Column 1: Firm Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#B8935A] p-0.5 flex items-center justify-center text-[#0F1F3D] font-bold">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block leading-tight">
                  Messrs. Low Wah Chin & Co.
                </span>
                <span className="text-[10px] tracking-widest text-[#CFA76F] uppercase block mt-0.5 font-semibold">
                  Advocates & Solicitors • LWCCO
                </span>
              </div>
            </div>

            <p className="text-[#CFA76F] font-serif italic text-sm">
              &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
            </p>

            <p className="text-xs text-white/80 leading-relaxed">
              Established in Kuala Lumpur, Malaysia. Fully registered with the Malaysian Bar and admitted to the High Court of Malaya. Dedicated to fearless advocacy and compassionate legal counsel for all members of the community.
            </p>

            <div className="pt-2">
              <WhatsAppButton
                variant="compact"
                label="WhatsApp Senior Counsel"
                className="text-xs shadow-md"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#CFA76F] uppercase tracking-wider border-b border-[#B8935A]/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              <li>
                <Link href="/" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>About the Firm</span>
                </Link>
              </li>
              <li>
                <Link href="/practices" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>Practice Areas</span>
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>Our Team & Founder</span>
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>Legal Insights & Articles</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>General Legal FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#CFA76F] transition-colors flex items-center gap-1">
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#CFA76F] uppercase tracking-wider border-b border-[#B8935A]/20 pb-2">
              Practice Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              {practiceLinks.map((p, idx) => (
                <li key={idx}>
                  <Link href={p.href} className="hover:text-[#CFA76F] transition-colors block line-clamp-1">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#CFA76F] uppercase tracking-wider border-b border-[#B8935A]/20 pb-2">
              Head Office (KLCC)
            </h4>
            <div className="space-y-3 text-xs text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Colony @ KLCC</strong><br />
                  Level 1, Vipod Residences<br />
                  6 Jalan Kia Peng, 50450 Kuala Lumpur,<br />
                  Wilayah Persekutuan Kuala Lumpur, Malaysia.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brass shrink-0" />
                <a href="tel:+60175483157" className="hover:text-[#CFA76F] font-semibold text-white">
                  +60 17-548 3157
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brass shrink-0" />
                <a href="mailto:lwclegal5@gmail.com" className="hover:text-[#CFA76F] text-white">
                  lwclegal5@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <p>
                  <strong>Mon – Fri:</strong> 9:00 AM – 5:30 PM<br />
                  <strong>Sat & Sun:</strong> Closed (Urgent WhatsApp Only)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Offerings Directory Bar */}
        <div className="py-6 border-b border-[#B8935A]/15">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#CFA76F] block mb-3">
            Service Offerings & Areas of Scope:
          </span>
          <div className="flex flex-wrap gap-2 text-xs text-white/80">
            {serviceOfferings.map((svc, i) => (
              <span
                key={i}
                className="bg-[#0F1F3D] px-2.5 py-1 rounded-md border border-[#B8935A]/20 hover:border-[#B8935A]/50 transition-colors"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brass" />
            <span>
              Admitted to the Roll of Advocates & Solicitors of the High Court of Malaya • Lincoln’s Inn Barrister
            </span>
          </div>

          <p className="text-center md:text-right">
            &copy; {currentYear} Messrs. Low Wah Chin & Co. (LWCCO). All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
