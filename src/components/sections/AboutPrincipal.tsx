import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, GraduationCap, ArrowRight, Phone, Mail, CheckCircle2, Globe } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function AboutPrincipal() {
  return (
    <section className="py-20 lg:py-28 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Professional Portrait Photo in a Thin Bordered Frame/Box (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] p-2 bg-white border border-[#c6a052]/40 rounded-lg shadow-md">
              <div className="relative h-[380px] sm:h-[440px] md:h-[480px] w-full rounded overflow-hidden bg-gray-100">
                <Image
                  src="/lawyer-portrait-1.jpg"
                  alt="Ava Rachel Low (劉華晶) — Principal Counsel at Messrs. Low Wah Chin & Co."
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-3 text-center px-2 py-1">
                <p className="font-serif text-base font-bold text-[#1a2332]">
                  Low Wah Chin (Ava Rachel)
                  <span className="text-sm font-normal text-[#9d7835] ml-1.5">劉華晶</span>
                </p>
                <p className="text-xs text-[#4b5563] font-medium mt-0.5">
                  Founder & Principal Counsel
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: "About Us" Heading, Credentials, Experience & Bio (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <Award className="w-3.5 h-3.5 text-[#c6a052]" />
                <span>About Us</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a2332] leading-tight">
                Senior Legal Counsel Anchored in Humanity & Excellence
              </h2>
            </div>

            {/* Credentials Line */}
            <div className="p-3.5 bg-white border-l-4 border-[#c6a052] rounded-r-md border border-gray-200 text-xs sm:text-sm text-[#1a2332] font-medium leading-relaxed shadow-xs">
              <strong>Low Wah Chin (Ava Rachel)</strong> · Advocate & Solicitor of the High Court of Malaya · Barrister-at-Law, The Honourable Society of Lincoln’s Inn, London (UK).
            </div>

            {/* Paragraphs about experience & practice areas */}
            <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
              <p>
                Ms. Low Wah Chin (Ava Rachel) founded Messrs. Low Wah Chin & Co. (LWCCO) in 2020 after distinguished legal practice in top-tier litigation and commercial law firms in Kuala Lumpur. Admitted to the Malaysian Bar in November 2011 and called to the English Bar at Lincoln’s Inn in 2010, she delivers fearless courtroom advocacy, meticulous contract drafting, and strategic corporate risk guidance.
              </p>
              <p>
                With 13+ years of post-qualification practice at benchmark institutions including <em>Shook Lin & Bok</em>, <em>Azim, Tunku Farik & Wong</em>, <em>Murali B. Pillai & Associates</em>, and listed engineering group <em>KNM Group Berhad</em>, Ms. Low provides commanding trial representation and strategic corporate counsel.
              </p>
              <p>
                Her founding philosophy is straightforward: provide high-calibre, to-the-point legal counsel anchored in deep ethical values—ensuring every client receives responsive, transparent, and unwavering representation.
              </p>
            </div>

            {/* Contact Line & Read More Button */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-[#4b5563] flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Direct Inquiries: </span>
                <a href="tel:+60175483157" className="font-semibold text-[#1a2332] hover:text-[#9d7835] transition-colors">
                  +60 17-548 3157
                </a>
                <span>•</span>
                <a href="mailto:lwc.rachel@gmail.com" className="font-semibold text-[#1a2332] hover:text-[#9d7835] transition-colors">
                  lwc.rachel@gmail.com
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/our-team"
                  className="btn-gold px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <WhatsAppButton variant="compact" label="WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
