import React from 'react';
import { GENERAL_FAQS } from '@/db/seedData';
import { constructMetadata, getBreadcrumbSchema, getFaqSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import FaqAccordion from '@/components/common/FaqAccordion';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { HelpCircle, Phone } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

import { getFirmSettings } from '@/actions/settingsActions';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions (FAQ) | Messrs. Low Wah Chin & Co.',
  description: 'Find answers to common legal questions regarding consultations, fees, court proceedings, personal injury claims, property conveyancing, and divorce law in Malaysia.',
  canonicalUrl: `${SITE_CONFIG.url}/faq`,
});

export default async function FaqPage() {
  const settings = await getFirmSettings();

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
        bgImage={settings.heroImages?.faqHeroImage || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85"}
      />

      {/* Main FAQ Section (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2D33]">
              General Legal FAQ
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2D33]/75 mt-2 font-light">
              Click on any question below to view the detailed explanation under Malaysian statutory law.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5DFD3] shadow-xs">
            <FaqAccordion items={GENERAL_FAQS} />
          </div>

          {/* Inquiry Callout Card */}
          <div className="mt-12 p-8 rounded-xl bg-white border border-[#E5DFD3] shadow-xs text-center">
            <h3 className="font-serif text-xl font-bold text-[#2B2D33] mb-2">
              Have a Specific Legal Question Not Listed Here?
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2D33]/80 mb-6 max-w-lg mx-auto">
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
                className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +60 17-548 3157</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20 bg-[#FAF8F2] text-[#2B2D33] border-t border-[#E5DFD3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2D33] mb-2">
              Request a Legal Consultation
            </h3>
            <p className="text-xs text-[#2B2D33]/80">
              Strictly confidential communications protected by Legal Professional Privilege.
            </p>
          </div>
          <div className="bg-white text-[#2B2D33] p-6 sm:p-8 rounded-xl shadow-xl border border-[#E5DFD3]">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
