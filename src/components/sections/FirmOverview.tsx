import React from 'react';
import Link from 'next/link';
import { Building2, Clock, Phone, Mail, MapPin, Globe, ArrowRight, BookOpen, FileText } from 'lucide-react';

export default function FirmOverview() {
  return (
    <section className="py-20 lg:py-28 bg-[#faf7fc] text-[#261833] border-b border-[#e7dbf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Quick Facts (5 cols) */}
          <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-lg border border-[#e7dbf2] shadow-sm space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-1">
                <Building2 className="w-3.5 h-3.5 text-[#c6a052]" />
                <span>Chambers Quick Facts</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1e0d33]">
                Messrs. Low Wah Chin & Co.
              </h3>
              <p className="text-xs text-[#564566] mt-0.5 font-medium">
                Advocates & Solicitors (LWCCO)
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Operating Hours</strong>
                  <span className="text-[#564566]">Monday to Friday · 9:00am – 5:30pm</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Direct Telephone</strong>
                  <a href="tel:+60175483157" className="text-[#9d7835] hover:underline font-medium">
                    +60 17-548 3157
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Official Email</strong>
                  <a href="mailto:lwclegal5@gmail.com" className="text-[#9d7835] hover:underline font-medium">
                    lwclegal5@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Full Chambers Address</strong>
                  <span className="text-[#564566] leading-relaxed block">
                    Colony @ KLCC, Level 1, Vipod Residences,<br />
                    6 Jalan Kia Peng, 50450 Kuala Lumpur, Malaysia
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Bar Membership & Jurisdiction</strong>
                  <span className="text-[#564566]">High Court of Malaya • Bar No. BC/L/2019</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/contact"
                className="text-xs font-bold text-[#9d7835] hover:text-[#1e0d33] inline-flex items-center gap-1.5"
              >
                <span>Get Directions & Chambers Access Info</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Firm Overview Narrative & Featured Articles Strip (7 cols) */}
          <div className="md:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#c6a052]" />
                <span>Firm Overview & Perspective</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e0d33] leading-tight">
                Grow Your Vision with Clear Legal Architecture
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#3c2a4f] leading-relaxed">
              <p>
                At Messrs. Low Wah Chin & Co., we view legal counsel as a foundational enabler rather than an administrative roadblock. Whether structuring a high-value commercial acquisition, drafting commercial agreements, resolving protracted shareholder disputes, or protecting family interests during sensitive matrimonial matters, our focus remains on decisive clarity and commercial pragmatism.
              </p>
              <p>
                Our clients benefit from direct, partner-led counsel at every stage. We pride ourselves on eliminating unnecessary legal jargon, transparently forecasting potential outcomes and costs, and prosecuting our clients’ rights with unwavering tenacity in the courts of Malaysia.
              </p>
              <div>
                <Link
                  href="/about"
                  className="font-serif text-sm font-bold text-[#9d7835] hover:text-[#1e0d33] inline-flex items-center gap-1.5 group"
                >
                  <span>Read more about our firm history and core values</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Featured Articles Strip */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-[#1e0d33]">
                  Featured Legal Articles & Commendations
                </h4>
                <Link href="/articles" className="text-xs text-[#9d7835] hover:underline font-semibold">
                  All Articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Article 1 */}
                <Link
                  href="/articles/10-best-law-firms-in-kuala-lumpur-by-mohammad-bin-amir-last-updated-july-1-2023"
                  className="p-4 bg-white rounded-lg border border-[#e7dbf2] hover:border-[#c6a052] transition-colors group block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9d7835] block mb-1">
                    Industry Review
                  </span>
                  <h5 className="font-serif text-sm font-bold text-[#1e0d33] group-hover:text-[#9d7835] transition-colors leading-snug">
                    10 Best Law Firms in Kuala Lumpur
                  </h5>
                  <p className="text-xs text-[#776487] line-clamp-2 mt-1.5">
                    Messrs. Low Wah Chin & Co. recognized for excellence, integrity, and client dedication.
                  </p>
                  <span className="text-[11px] font-semibold text-[#9d7835] mt-2 inline-flex items-center gap-1">
                    <span>Read Article</span>
                    <span>→</span>
                  </span>
                </Link>

                {/* Article 2 */}
                <Link
                  href="/articles/6-best-personal-injury-lawyers-in-kl-selangor-2023"
                  className="p-4 bg-white rounded-lg border border-[#e7dbf2] hover:border-[#c6a052] transition-colors group block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9d7835] block mb-1">
                    Accolade Feature
                  </span>
                  <h5 className="font-serif text-sm font-bold text-[#1e0d33] group-hover:text-[#9d7835] transition-colors leading-snug">
                    6 Best Personal Injury Lawyers in KL & Selangor
                  </h5>
                  <p className="text-xs text-[#776487] line-clamp-2 mt-1.5">
                    Trusted Malaysia honors LWCCO for tort litigation competence and claim recovery.
                  </p>
                  <span className="text-[11px] font-semibold text-[#9d7835] mt-2 inline-flex items-center gap-1">
                    <span>Read Article</span>
                    <span>→</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
