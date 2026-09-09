'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Clock, Menu, X, ChevronDown, Scale, ShieldCheck, ArrowRight } from 'lucide-react';

import TopUtilityBar from './TopUtilityBar';

const PRIMARY_PRACTICES = [
  { href: '/practices/legal-advice-consultation', label: 'Legal Advice & Consultation' },
  { href: '/practices/property-conveyancing', label: 'Property & Conveyancing' },
  { href: '/practices/family-divorce', label: 'Family & Divorce Matters' },
  { href: '/practices/dispute-resolution-claims', label: 'Dispute Resolution & Claims' },
  { href: '/practices/will-estate-distribution', label: 'Wills & Estate Distribution' },
  { href: '/practices/company-matters-agreements', label: 'Company Matters & Agreements' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/practices', label: 'Practices', hasDropdown: true },
  { href: '/our-team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
  { href: '/articles', label: 'Articles' },
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
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* 1. Top Utility Bar: Thin, Dark Navy (#1a2332), Small Text */}
      <TopUtilityBar />

      {/* 2. Main Nav: White Background, Sits Below Utility Bar */}
      <nav
        className={`w-full bg-white text-[#1a2332] transition-all duration-200 border-b border-[#e5e7eb] ${
          isScrolled ? 'py-3 shadow-md' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Firm Name / Logo as Text Wordmark (Serif, Letter-spaced) */}
          <Link href="/" className="flex flex-col group">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-[#1a2332] group-hover:text-[#9d7835] transition-colors">
                LWCCO
              </span>
              <span className="text-xs font-serif italic text-[#9d7835] font-medium hidden sm:inline">
                Messrs. Low Wah Chin & Co.
              </span>
            </div>
            <span className="text-[8.5px] sm:text-[10px] uppercase font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[#4b5563] font-medium -mt-0.5">
              Advocates & Solicitors
            </span>
          </Link>

          {/* Right: Horizontal Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_LINKS.map((link, index) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

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
                      className={`relative py-1 text-sm font-medium tracking-wide transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-[#1a2332] font-bold'
                          : 'text-[#374151] hover:text-[#9d7835]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#9d7835] transition-transform duration-200 group-hover:rotate-180" />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c6a052] rounded-full" />
                      )}
                    </Link>

                    {/* Practices Dropdown */}
                    <div
                      className={`absolute top-full left-0 w-80 bg-white border border-[#e5e7eb] rounded-xl shadow-xl p-3 transition-all duration-200 z-50 ${
                        practicesDropdownOpen
                          ? 'opacity-100 visible translate-y-1'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#9d7835] px-3 py-1.5 border-b border-gray-100 mb-2">
                        Core Practice Areas
                      </div>
                      <div className="space-y-1">
                        {PRIMARY_PRACTICES.map((p, pIdx) => (
                          <Link
                            key={pIdx}
                            href={p.href}
                            className="block px-3 py-2 rounded-lg text-xs font-medium text-[#1a2332] hover:bg-[#faf9f6] hover:text-[#9d7835] transition-colors"
                          >
                            {p.label}
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t border-gray-100 px-3">
                        <Link
                          href="/practices"
                          className="text-xs text-[#9d7835] hover:text-[#1a2332] font-semibold flex items-center justify-between"
                        >
                          <span>View All Practice Disciplines</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#1a2332] font-bold'
                      : 'text-[#374151] hover:text-[#9d7835]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c6a052] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Outlined / Ghost Contact Us button in Nav */}
            <Link
              href="/contact"
              className="btn-gold px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="tel:+60175483157"
              aria-label="Call LWCCO"
              className="p-2 rounded-lg bg-[#faf9f6] text-[#1a2332] border border-gray-200"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-[#faf9f6] text-[#1a2332] border border-gray-200 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="space-y-1">
              {NAV_LINKS.map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  return (
                    <div key={index} className="rounded-lg border border-gray-100 bg-gray-50/70 overflow-hidden my-1">
                      <div className="flex items-center justify-between px-3 py-2.5">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-sm font-serif font-bold ${
                            isActive ? 'text-[#9d7835]' : 'text-[#1a2332]'
                          }`}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPracticesDropdownOpen(!practicesDropdownOpen)}
                          className="p-1 rounded bg-white text-[#1a2332] border border-gray-200 text-xs"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${practicesDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {practicesDropdownOpen && (
                        <div className="px-3 pb-3 pt-1 space-y-1.5 bg-white border-t border-gray-100">
                          {PRIMARY_PRACTICES.map((p, pIdx) => (
                            <Link
                              key={pIdx}
                              href={p.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 px-2 text-xs text-[#374151] hover:text-[#9d7835]"
                            >
                              • {p.label}
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
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#1a2332] text-[#faf9f6] font-bold'
                        : 'text-[#1a2332] hover:bg-gray-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <ArrowRight className="w-4 h-4 text-[#dcc280]" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full py-3 rounded-lg text-center block text-xs font-bold uppercase tracking-wider"
              >
                Request Legal Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


