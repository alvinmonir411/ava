import React from 'react';
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
  title: 'Frequently Asked Questions (FAQ) | LWCCO Kuala Lumpur',
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
      <section className="relative bg-navy text-cream py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Client Guidance & Clarity</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-serif italic text-brass-light text-lg sm:text-xl mb-4">
            &ldquo;Clear Answers to Your Common Legal Inquiries&rdquo;
          </p>
          <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
            We believe in complete transparency. Below are detailed answers regarding our consultation process, legal fees, court representation, and case management.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Main FAQ Section */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="General Legal FAQ"
            title="Answers to Your Legal Inquiries"
            subtitle="Click on any question below to expand the full legal explanation."
          />

          <FaqAccordion items={GENERAL_FAQS} />

          <div className="mt-16 p-8 rounded-2xl bg-white border border-brass/30 shadow-md text-center">
            <h3 className="font-serif text-2xl font-bold text-navy mb-2">
              Have a Specific Legal Question Not Listed Here?
            </h3>
            <p className="text-charcoal-muted text-sm sm:text-base mb-6 max-w-lg mx-auto">
              Every legal circumstance has unique facts. Speak directly with Ms. Ava Rachel Low for tailored advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WhatsAppButton
                variant="inline"
                label="Ask Counsel via WhatsApp"
                message="Hello LWCCO, I have a specific legal question not covered in your FAQ."
              />
              <a
                href="tel:+60175483157"
                className="btn-navy px-6 py-3.5 rounded-lg text-sm font-bold inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brass" />
                <span>Call +60 17-548 3157</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-navy text-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-cream">
              Book a Confidential Consultation
            </h2>
            <p className="text-cream/80 text-sm mt-2">
              Our advocates will review your documents and provide actionable legal next steps.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
