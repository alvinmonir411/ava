'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Scale, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import WhatsAppButton from '../common/WhatsAppButton';
import BrandMonogram from '../common/BrandMonogram';

const PRIMARY_PRACTICES = [
  { href: '/practices/contract-drafting-commercial-advisory', label: 'Contract Drafting & Advisory' },
  { href: '/practices/contractual-dispute-claims', label: 'Contractual Dispute Claims' },
  { href: '/practices/debt-recovery-claims', label: 'Debt Recovery Claims' },
  { href: '/practices/tort-claims-civil-liabilities', label: 'Tort & Civil Liabilities' },
  { href: '/practices/corporate-commercial', label: 'Corporate & Commercial' },
  { href: '/practices/real-estate-conveyancing', label: 'Real Estate & Conveyancing' },
  { href: '/practices/civil-commercial-litigation', label: 'Appellate & Civil Litigation' },
  { href: '/practices/family-probate-estate', label: 'Wills, Probate & Estate' },
  { href: '/practices/employment-industrial-relations', label: 'Employment & Industrial' },
];

const SERVICE_OFFERINGS = [
  { href: '/practices/bodily-injury-claims', label: 'Bodily Injury Claims' },
  { href: '/practices/medical-negligence-claims', label: 'Medical Negligence' },
  { href: '/practices/letter-writing-lods', label: 'Letters of Demand (LOD)' },
  { href: '/practices/employment-labour-claims', label: 'Labour Disputes' },
  { href: '/practices/defamation-claims-justification', label: 'Defamation & Reputation' },
  { href: '/practices/will-writing-probate-advice', label: 'Will Writing & Grants' },
  { href: '/practices/tenancy-agreement-disputes', label: 'Tenancy Disputes' },
  { href: '/practices/debt-recovery-winding-up', label: 'Debt Recovery & Winding Up' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/practices',
    label: 'Practices',
    hasDropdown: true,
  },
  { href: '/our-team', label: 'Our Team' },
  { href: '/articles', label: 'Articles' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practicesDropdownOpen, setPracticesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setPracticesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Malaysian Legal Utility Bar - Clean, Minimalist & Elite */}
      <div className="bg-[#0e0513] text-[#faf9f6]/75 text-[11.5px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#c6a052]/15 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+60175483157"
              className="flex items-center gap-1.5 hover:text-[#e5c777] transition-colors group"
            >
              <Phone className="w-3 h-3 text-[#c6a052] group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">+60 17-548 3157</span>
            </a>
            <a
              href="mailto:lwclegal5@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#e5c777] transition-colors group"
            >
              <Mail className="w-3 h-3 text-[#c6a052] group-hover:scale-110 transition-transform" />
              <span>lwclegal5@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#faf9f6]/70">
              <MapPin className="w-3 h-3 text-[#c6a052]" />
              <span>Colony @ KLCC, Kuala Lumpur</span>
            </span>
            <span className="text-[#c6a052]/30">•</span>
            <span className="text-[#e5c777] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#c6a052]" />
              <span>Malaysian Bar BC/L/2019</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Spacious, Balanced & Prestigious */}
      <nav
        className={`w-full bg-[#14081c]/95 backdrop-blur-md text-white transition-all duration-300 border-b border-[#c6a052]/20 ${
          isScrolled ? 'py-3 shadow-2xl' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram & Firm Name */}
          <BrandMonogram variant="header" />

          {/* Desktop Navigation Links - Clean, uncluttered typography with ample breathing room */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith('/practices'));

              if (link.hasDropdown) {
                return (
                  <div
                    key={index}
                    className="relative group py-2"
                    onMouseEnter={() => setPracticesDropdownOpen(true)}
                    onMouseLeave={() => setPracticesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`relative py-1.5 text-[13.5px] font-medium tracking-wide transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-[#e5c777] font-bold'
                          : 'text-[#faf9f6]/85 hover:text-[#e5c777]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#c6a052] transition-transform duration-200 group-hover:rotate-180 opacity-80" />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c6a052] rounded-full shadow-[0_0_8px_rgba(198,160,82,0.6)]" />
                      )}
                    </Link>

                    {/* Clean Mega Dropdown Menu */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-[#14081c] border border-[#c6a052]/35 rounded-2xl shadow-2xl p-5 transition-all duration-200 z-50 ${
                        practicesDropdownOpen ? 'opacity-100 visible translate-y-1' : 'opacity-0 invisible -translate-y-2'
                      }`}
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(14, 5, 19, 0.95), 0 0 0 1px rgba(198, 160, 82, 0.25)',
                      }}
                    >
                      {/* Top Bar */}
                      <div className="px-2 py-1 border-b border-[#c6a052]/20 mb-3.5 flex items-center justify-between">
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#e5c777] flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
                          <span>Legal Disciplines & Practice Directory</span>
                        </span>
                        <Link
                          href="/practices"
                          className="text-xs text-[#c6a052] hover:text-[#e5c777] font-semibold hover:underline"
                        >
                          View All 18 Scopes →
                        </Link>
                      </div>

                      {/* 1. Core Practice Disciplines */}
                      <div className="mb-3.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#faf9f6]/50 block px-2 mb-2">
                          Core Practice Areas
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {PRIMARY_PRACTICES.map((p, pIdx) => (
                            <Link
                              key={pIdx}
                              href={p.href}
                              className="px-3 py-2 rounded-xl text-xs text-[#faf9f6] font-medium hover:text-[#e5c777] bg-[#1d0f24] hover:bg-[#281433] border border-[#c6a052]/15 hover:border-[#c6a052]/50 transition-all flex items-center justify-between"
                            >
                              <span>{p.label}</span>
                              <span className="text-[#c6a052] text-xs">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* 2. Specialized Service Offerings & Scope */}
                      <div className="pt-2.5 border-t border-[#c6a052]/20">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#faf9f6]/50 block px-2 mb-1.5">
                          Specialized Practice Scope
                        </span>
                        <div className="grid grid-cols-2 gap-1">
                          {SERVICE_OFFERINGS.map((sub, sIndex) => (
                            <Link
                              key={sIndex}
                              href={sub.href}
                              className="block px-2.5 py-1.5 rounded-lg text-xs text-[#faf9f6]/75 hover:text-[#e5c777] hover:bg-[#1d0f24] transition-colors truncate"
                            >
                              • {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`relative py-1.5 text-[13.5px] font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#e5c777] font-bold'
                      : 'text-[#faf9f6]/85 hover:text-[#e5c777]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c6a052] rounded-full shadow-[0_0_8px_rgba(198,160,82,0.6)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Gold Consultation CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-gold px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase shadow-md hover:scale-105 transition-all"
            >
              Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:+60175483157"
              aria-label="Call LWCCO"
              className="p-2 rounded-lg bg-[#1d0f24] text-[#e5c777] border border-[#c6a052]/30 hover:bg-[#281433] transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-[#1d0f24] text-white border border-[#c6a052]/30 hover:text-[#e5c777] transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#e5c777]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Menu Drawer - Ultra Clean & Elegant */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#120718]/98 backdrop-blur-2xl border-t border-[#c6a052]/30 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-3 duration-250 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto">
            <div className="space-y-1">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith('/practices'));

                if (link.hasDropdown) {
                  return (
                    <div key={index} className="rounded-xl border border-[#c6a052]/15 bg-[#1a0c20]/60 overflow-hidden my-1">
                      <div className="flex items-center justify-between px-3.5 py-2.5">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-sm font-serif font-bold tracking-wide flex items-center gap-2 ${
                            isActive ? 'text-[#e5c777]' : 'text-[#faf9f6]'
                          }`}
                        >
                          <Scale className="w-4 h-4 text-[#c6a052]" />
                          <span>{link.label}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPracticesDropdownOpen(!practicesDropdownOpen)}
                          aria-label="Toggle Practice Disciplines"
                          className="p-1.5 rounded-lg bg-[#241133] text-[#e5c777] border border-[#c6a052]/30 cursor-pointer"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${practicesDropdownOpen ? 'rotate-180 text-[#e5c777]' : ''}`} />
                        </button>
                      </div>

                      {practicesDropdownOpen && (
                        <div className="px-3 pb-3 pt-1 space-y-3 bg-[#15091b] border-t border-[#c6a052]/20">
                          <div>
                            <div className="flex items-center justify-between mb-1.5 pt-1">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#e5c777]">
                                Core Practice Disciplines (9)
                              </span>
                              <Link
                                href="/practices"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[10px] text-[#c6a052] font-semibold hover:underline"
                              >
                                View All →
                              </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                              {PRIMARY_PRACTICES.map((p, pIdx) => (
                                <Link
                                  key={pIdx}
                                  href={p.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg text-xs font-medium text-[#faf9f6]/90 hover:text-[#e5c777] hover:bg-[#241133] transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052] shrink-0" />
                                  <span className="truncate">{p.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#c6a052]/15">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#e5c777] block mb-1.5">
                              Specialized Scopes & Advisory
                            </span>
                            <div className="grid grid-cols-2 gap-1">
                              {SERVICE_OFFERINGS.slice(0, 6).map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="py-1 px-2 rounded text-[11px] text-[#faf9f6]/75 hover:text-[#e5c777] hover:bg-[#241133] transition-colors truncate"
                                >
                                  • {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#281433] text-[#e5c777] font-bold border border-[#c6a052]/40 shadow-sm'
                        : 'text-[#faf9f6]/90 hover:bg-[#200f2b] hover:text-[#e5c777]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <ArrowRight className="w-3.5 h-3.5 text-[#e5c777]" />}
                  </Link>
                );
              })}
            </div>

            {/* Direct Mobile Quick Actions */}
            <div className="pt-3 border-t border-[#c6a052]/25 space-y-2.5">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full py-3 rounded-xl text-center block text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Schedule Legal Consultation
              </Link>
              <WhatsAppButton
                variant="inline"
                label="Direct WhatsApp Counsel"
                className="w-full text-center justify-center text-xs py-2.5"
              />
            </div>

            {/* Quick Contact Info Strip */}
            <div className="pt-2 text-center text-[11px] text-[#faf9f6]/60 space-y-1">
              <p>Colony @ KLCC • Vipod Residences, Kuala Lumpur</p>
              <p className="text-[#e5c777] font-semibold">Direct Tel: +60 17-548 3157</p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


