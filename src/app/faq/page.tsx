import React from 'react';
import { GENERAL_FAQS } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, getFaqSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import FaqAccordion from '@/components/common/FaqAccordion';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { HelpCircle, Phone } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions (FAQ) | Messrs. Low Wah Chin & Co.',
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

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear Answers to Your Common Legal Inquiries"
        badge="Client Guidance & Clarity"
        badgeIcon={HelpCircle}
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85"
      />

      {/* Main FAQ Section (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2332]">
              General Legal FAQ
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-2 font-light">
              Click on any question below to view the detailed explanation under Malaysian statutory law.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#e8e1d5] shadow-xs">
            <FaqAccordion items={GENERAL_FAQS} />
          </div>

          {/* Inquiry Callout Card */}
          <div className="mt-12 p-8 rounded-lg bg-white border border-[#c6a052]/40 shadow-xs text-center">
            <h3 className="font-serif text-xl font-bold text-[#1a2332] mb-2">
              Have a Specific Legal Question Not Listed Here?
            </h3>
            <p className="text-xs sm:text-sm text-[#4b5563] mb-6 max-w-lg mx-auto">
              Every legal circumstance has unique facts. Connect directly with Ms. Ava Rachel Low for tailored advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WhatsAppButton
                variant="inline"
                label="Ask Counsel via WhatsApp"
                message="Hello Messrs. Low, Wah Chin & Co., I have a specific legal question not covered in your FAQ."
              />
              <a
                href="tel:+60175483157"
                className="btn-gold px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +60 17-548 3157</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form (Dark Section) */}
      <section className="py-20 bg-[#1a2332] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Request a Legal Consultation
            </h3>
            <p className="text-xs text-[#faf9f6]/75">
              Strictly confidential communications protected by Legal Professional Privilege.
            </p>
          </div>
          <div className="bg-white text-[#231f20] p-6 sm:p-8 rounded-lg shadow-xl">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
