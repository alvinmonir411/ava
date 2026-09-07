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
    <footer className="bg-[#101826] text-[#faf9f6] border-t-2 border-[#c6a052]/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#c6a052]/20">
          {/* Column 1: Firm Name + Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="block">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] text-white">
                  LWCCO
                </span>
                <span className="text-xs font-serif italic text-[#dcc280]">
                  刘华律师
                </span>
              </div>
              <p className="font-serif text-sm font-semibold text-white/90 mt-1">
                Messrs. Low Wah Chin & Co.
              </p>
              <p className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#c6a052] font-semibold mt-0.5">
                Advocates & Solicitors • High Court of Malaya
              </p>
            </Link>

            <p className="font-serif italic text-[#dcc280] text-xs pt-1">
              &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
            </p>

            <p className="text-xs text-[#faf9f6]/75 leading-relaxed font-light">
              Boutique Malaysian law firm led by principal lawyer Ava Rachel Low (刘华律师). Lincoln’s Inn Barrister (London) and Advocate & Solicitor of the High Court of Malaya. Providing seasoned corporate advisory and fearless trial advocacy across Malaysia.
            </p>

            {/* Google Rating Badge */}
            <a
              href="https://share.google/4f6BOdPxefdpTafG3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-2.5 bg-[#1a2332] rounded border border-[#c6a052]/30 hover:border-[#c6a052] transition-colors group"
            >
              <span className="text-[#dcc280] font-bold text-xs">★ 5.0 Rating</span>
              <span className="text-[#c6a052]/40">•</span>
              <span className="text-[11px] text-[#faf9f6]/80 group-hover:text-white underline">
                34 Verified Google Reviews
              </span>
            </a>

            <div className="pt-1">
              <WhatsAppButton variant="compact" label="Direct WhatsApp Counsel" />
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#dcc280] uppercase tracking-wider border-b border-[#c6a052]/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#faf9f6]/80 font-light">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#dcc280] transition-colors flex items-center gap-1">
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Offerings (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#dcc280] uppercase tracking-wider border-b border-[#c6a052]/20 pb-2">
              Service Offerings
            </h4>
            <ul className="space-y-1.5 text-xs text-[#faf9f6]/80 font-light">
              {SERVICE_OFFERINGS.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-[#dcc280] transition-colors block line-clamp-1">
                    • {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Head Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#dcc280] uppercase tracking-wider border-b border-[#c6a052]/20 pb-2">
              Head Office
            </h4>
            <div className="space-y-3 text-xs text-[#faf9f6]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#c6a052] mt-0.5 shrink-0" />
                <span>
                  Colony @ KLCC, Level 1, Vipod Residences, 6 Jalan Kia Peng, 50450 Kuala Lumpur
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                <a href="tel:+60175483157" className="hover:text-[#dcc280] transition-colors">
                  +60 17-548 3157
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                <a href="mailto:lwclegal5@gmail.com" className="hover:text-[#dcc280] transition-colors">
                  lwclegal5@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                <span>Mon – Fri: 9:00 AM – 5:30 PM</span>
              </div>

              <div className="flex items-center gap-2.5 text-[#dcc280] font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                <span>Malaysian Bar BC/L/2019</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#faf9f6]/60 font-light">
          <p>© {currentYear} Messrs. Low Wah Chin & Co. (LWCCO) Advocates & Solicitors. All rights reserved.</p>
          <p className="text-[11px] text-[#faf9f6]/50">
            Regulated by the Bar Council of Malaysia under the Legal Profession Act 1976.
          </p>
        </div>
      </div>
    </footer>
  );
}
