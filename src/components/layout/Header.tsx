'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Clock, MapPin, Menu, X, ChevronDown, Scale } from 'lucide-react';
import WhatsAppButton from '../common/WhatsAppButton';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    href: '/practices',
    label: 'Practice Areas',
    hasDropdown: true,
    subLinks: [
      { href: '/practices/bodily-injury-claims', label: 'Bodily Injury Claims' },
      { href: '/practices/medical-negligence-claims', label: 'Medical Negligence Claims' },
      { href: '/practices/letter-writing-lods', label: 'Letter Writing & LODs' },
      { href: '/practices/employment-labour-claims', label: 'Employment & Labour Claims' },
      { href: '/practices/defamation-claims-justification', label: 'Defamation & Justification' },
      { href: '/practices/will-writing-probate-advice', label: 'Will Writing & Probate' },
      { href: '/practices/tenancy-agreement-disputes', label: 'Tenancy Agreement Disputes' },
      { href: '/practices/business-negotiations', label: 'Business Negotiations' },
      { href: '/practices/small-claims-assistance', label: 'Small Claims Assistance' },
      { href: '/practices/professional-negligence', label: 'Professional Negligence' },
      { href: '/practices/contractor-negligence-claims', label: 'Contractor Negligence' },
      { href: '/practices/debt-recovery-winding-up', label: 'Debt Recovery & Winding Up' },
    ],
  },
  { href: '/our-team', label: 'Our Team' },
  { href: '/articles', label: 'Articles' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPracticesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0A1529] text-cream/90 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#B8935A]/25 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+60175483157"
              className="flex items-center gap-1.5 text-white/90 hover:text-brass-light transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brass" />
              <span>+60 17-548 3157</span>
            </a>
            <a
              href="mailto:lwclegal5@gmail.com"
              className="flex items-center gap-1.5 text-white/90 hover:text-brass-light transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brass" />
              <span>lwclegal5@gmail.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-white/75">
              <Clock className="w-3.5 h-3.5 text-brass" />
              <span>Mon – Fri: 9:00 AM – 5:30 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-brass" />
              <span>Colony @ KLCC, Vipod Residences, KL</span>
            </span>
            <span className="text-brass/60">|</span>
            <span className="text-brass-light font-semibold">Advocates & Solicitors</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-[#0F1F3D] text-white transition-all duration-300 border-b border-[#B8935A]/25 ${
          isScrolled ? 'py-3 shadow-2xl' : 'py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#CFA76F] to-[#967440] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0F1F3D] rounded-[7px] flex items-center justify-center text-brass-light group-hover:bg-[#1B2F57] transition-colors">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#CFA76F]" />
              </div>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-brass-light transition-colors block leading-tight">
                Messrs. Low Wah Chin & Co.
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-widest text-[#CFA76F] font-semibold uppercase block leading-none mt-0.5">
                Advocates & Solicitors • LWCCO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href || (link.subLinks && pathname.startsWith('/practices'));

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
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-[#CFA76F] font-bold'
                          : 'text-white/90 hover:text-[#CFA76F]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#CFA76F] transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 w-[540px] bg-[#0A1529] border border-[#B8935A]/35 rounded-xl shadow-2xl p-3 transition-all duration-200 z-50 ${
                        practicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="px-3 py-1.5 border-b border-[#B8935A]/15 mb-2 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#CFA76F]">
                          Service Offerings & Areas of Scope
                        </span>
                        <Link
                          href="/practices"
                          className="text-[11px] text-[#B8935A] hover:text-[#CFA76F] font-semibold hover:underline"
                        >
                          All Practices →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {link.subLinks?.map((sub, sIndex) => (
                          <Link
                            key={sIndex}
                            href={sub.href}
                            className="block px-3 py-2 rounded-lg text-xs text-white/90 hover:text-[#CFA76F] hover:bg-[#1B2F57]/80 transition-colors font-medium truncate"
                          >
                            • {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#CFA76F] font-bold'
                      : 'text-white/90 hover:text-[#CFA76F]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-brass px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:+60175483157"
              aria-label="Call LWCCO"
              className="p-2 rounded-lg bg-[#1B2F57] text-[#CFA76F] hover:bg-[#1B2F57]/80 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-[#1B2F57] text-white hover:text-[#CFA76F] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#CFA76F]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1529] border-t border-[#B8935A]/25 px-4 pt-4 pb-8 space-y-3 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <div key={index} className="py-1">
                      <div className="flex items-center justify-between px-3 py-2 text-white font-medium">
                        <Link href={link.href} className="text-base">
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPracticesDropdownOpen(!practicesDropdownOpen)}
                          className="p-1 text-[#CFA76F]"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${practicesDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {practicesDropdownOpen && (
                        <div className="pl-6 pr-2 py-1 space-y-1 bg-[#0F1F3D]/80 rounded-lg border-l-2 border-[#B8935A] ml-3">
                          {link.subLinks?.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              className="block py-2 text-xs text-white/90 hover:text-[#CFA76F]"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                      isActive ? 'bg-[#B8935A]/25 text-[#CFA76F] font-bold' : 'text-white hover:bg-[#1B2F57]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#B8935A]/25 space-y-3">
              <Link
                href="/contact"
                className="btn-brass w-full py-3 rounded-lg text-center block text-sm font-bold shadow-md"
              >
                Book a Free Consultation
              </Link>
              <WhatsAppButton
                variant="inline"
                label="Direct WhatsApp Consultation"
                className="w-full text-center justify-center text-sm"
              />
            </div>

            <div className="pt-3 text-xs text-white/80 space-y-1.5">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brass" />
                <a href="tel:+60175483157" className="hover:text-brass-light">+60 17-548 3157</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brass" />
                <a href="mailto:lwclegal5@gmail.com" className="hover:text-brass-light">lwclegal5@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brass" />
                <span>Mon – Fri: 9:00 AM – 5:30 PM</span>
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
