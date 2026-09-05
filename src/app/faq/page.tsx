import React from 'react';
import Image from 'next/image';
import { GENERAL_FAQS } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, getFaqSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import FaqAccordion from '@/components/common/FaqAccordion';
import ConsultationForm from '@/components/forms/ConsultationForm';
import TrustBar from '@/components/common/TrustBar';
import { HelpCircle, Scale, Shield, Phone } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions (FAQ) | Low, Wah Chin & Co.',
  description: 'Find answers to common legal questions regarding consultations, fees, court proceedings, personal injury claims, property conveyancing, and divorce law in Malaysia.',
  canonicalUrl: `${SITE_CONFIG.url}/faq`,
});

export default function FaqPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Frequently Asked Questions', url: `${SITE_CONFIG.url}/faq` },
  ]);

  const faqSchema = getFaqSchema(GENERAL_FAQS);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />

      {/* Hero Header */}
      <section className="relative bg-[#170b1e] text-[#faf9f6] py-20 sm:py-28 overflow-hidden border-b border-[#c6a052]/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85"
            alt="Messrs. Low, Wah Chin & Co. Legal FAQs"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65 brightness-95 contrast-105 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/40 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Client Guidance & Clarity</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf9f6] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-serif italic text-[#e5c777] text-lg sm:text-xl mb-4">
            &ldquo;Clear Answers to Your Common Legal Inquiries&rdquo;
          </p>
          <p className="text-[#faf9f6]/85 text-base sm:text-lg leading-relaxed font-light">
            We believe in complete transparency. Below are detailed answers regarding our consultation process, legal fees, court representation, and case management under Malaysian law.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Main FAQ Section */}
      <section className="py-20 md:py-28 bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="General Legal FAQ"
            title="Answers to Your Legal Inquiries"
            subtitle="Click on any question below to expand the full legal explanation."
          />

          <FaqAccordion items={GENERAL_FAQS} />

          <div className="mt-16 p-8 rounded-2xl bg-white border border-[#c6a052]/30 shadow-md text-center">
            <h3 className="font-serif text-2xl font-bold text-[#22122b] mb-2">
              Have a Specific Legal Question Not Listed Here?
            </h3>
            <p className="text-[#595355] text-sm sm:text-base mb-6 max-w-lg mx-auto">
              Every legal circumstance has unique facts. Speak directly with Ms. Ava Rachel Low for tailored advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WhatsAppButton
                variant="inline"
                label="Ask Counsel via WhatsApp"
                message="Hello Messrs. Low, Wah Chin & Co., I have a specific legal question not covered in your FAQ."
              />
              <a
                href="tel:+60175483157"
                className="btn-gold px-6 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4 text-[#170b1e]" />
                <span>Call +60 17-548 3157</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#170b1e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
