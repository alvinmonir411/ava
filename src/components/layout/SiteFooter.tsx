import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight, Scale } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const QUICK_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/practices', label: 'Practices' },
    { href: '/our-team', label: 'Our Team' },
    { href: '/contact', label: 'Contact' },
    { href: '/articles', label: 'Articles & Reviews' },
    { href: '/faq', label: 'FAQ' },
  ];

  const SERVICE_OFFERINGS = [
    { label: 'Bodily Injury Claims', href: '/practices/bodily-injury-claims' },
    { label: 'Medical Negligence Claims', href: '/practices/medical-negligence-claims' },
    { label: 'Letter Writing & LODs', href: '/practices/letter-writing-lods' },
    { label: 'Employment & Labour Claims', href: '/practices/employment-labour-claims' },
    { label: 'Defamation Claims & Justification', href: '/practices/defamation-claims-justification' },
    { label: 'Will Writing & Probate Advice', href: '/practices/will-writing-probate-advice' },
    { label: 'Tenancy Agreement Disputes', href: '/practices/tenancy-agreement-disputes' },
    { label: 'Business Negotiations & Deals', href: '/practices/business-negotiations' },
    { label: 'Small Claims Advice', href: '/practices/small-claims-assistance' },
    { label: 'Contractor Negligence Claims', href: '/practices/contractor-negligence-claims' },
    { label: 'Debt Recovery & Winding Up', href: '/practices/debt-recovery-winding-up' },
    { label: 'Property & Conveyancing (SPA)', href: '/practices/real-estate-conveyancing' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#070e1e] via-[#0d1636] to-[#1a0c2e] text-[#faf9f6] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Firm Name + Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="block">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] text-white">
                  LWCCO
                </span>
                <span className="text-xs font-serif italic text-purple-200">
                  劉華晶
                </span>
              </div>
              <p className="font-serif text-sm font-semibold text-white/90 mt-1">
                Messrs. Low Wah Chin & Co.
              </p>
              <p className="text-[10px] uppercase font-sans tracking-[0.25em] text-indigo-300 font-semibold mt-0.5">
                Advocates & Solicitors • High Court of Malaya
              </p>
            </Link>

            <p className="font-serif italic text-purple-200/90 text-xs pt-1">
              &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
            </p>

            <p className="text-xs text-white/75 leading-relaxed font-light">
              Boutique Malaysian law firm led by principal lawyer Ava Rachel Low (劉華晶). Lincoln’s Inn Barrister (London) and Advocate & Solicitor of the High Court of Malaya. Providing seasoned corporate advisory and fearless trial advocacy across Malaysia.
            </p>

            {/* Google Rating Badge (Stars kept gold per Option 2) */}
            <a
              href="https://share.google/4f6BOdPxefdpTafG3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-2.5 bg-gradient-to-r from-[#0F1F3D]/90 via-[#18183d]/90 to-[#241038]/90 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors group"
            >
              <span className="text-amber-400 font-bold text-xs">★ 5.0 Rating</span>
              <span className="text-white/20">•</span>
              <span className="text-[11px] text-white/85 group-hover:text-white underline">
                34 Verified Google Reviews
              </span>
            </a>

            <div className="pt-1">
              <WhatsAppButton variant="compact" label="Direct WhatsApp Counsel" />
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/75 font-light">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-purple-300 transition-colors flex items-center gap-1">
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Practices Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Practice Disciplines
            </h4>
            <ul className="space-y-1.5 text-xs text-white/75 font-light">
              {SERVICE_OFFERINGS.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-purple-300 transition-colors line-clamp-1">
                    • {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Chambers (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Chambers Access
            </h4>
            <div className="space-y-3 text-white/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>
                  Colony @ KLCC, Level 1, Vipod Residences,<br />
                  6 Jalan Kia Peng, 50450 Kuala Lumpur
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+60175483157" className="text-white hover:text-purple-300 font-medium">
                  +60 17-548 3157
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:lwclegal5@gmail.com" className="text-white hover:text-purple-300 font-medium">
                  lwclegal5@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon – Fri: 9:00 AM – 5:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60 font-light">
          <p>
            © {currentYear} Messrs. Low Wah Chin & Co. (LWCCO). All rights reserved. Bar Council Malaya Registration: BC/L/2019.
          </p>
          <div className="flex items-center gap-4">
            <span>Privileged & Confidential</span>
            <span>•</span>
            <Link href="/admin" className="text-white/40 hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
