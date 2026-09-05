import React from 'react';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import TrustBar from '@/components/common/TrustBar';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle2,
  Navigation,
  MessageCircle,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Contact Us & Schedule Consultation | LWCCO Kuala Lumpur',
  description: 'Contact Messrs. Low Wah Chin & Co. Advocates & Solicitors. Located at Colony @ KLCC, Vipod Residences, Jalan Kia Peng, Kuala Lumpur. Call +60 17-548 3157.',
  canonicalUrl: `${SITE_CONFIG.url}/contact`,
});

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Contact Us', url: `${SITE_CONFIG.url}/contact` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header */}
      <section className="relative bg-navy text-cream py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>Kuala Lumpur Law Office</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4">
            Contact Messrs. Low Wah Chin & Co.
          </h1>
          <p className="font-serif italic text-brass-light text-lg sm:text-xl mb-4">
            &ldquo;Prompt, Confidential & Accessible Legal Advice&rdquo;
          </p>
          <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
            We provide flexible support via live consultation, phone, WhatsApp, and email. Every inquiry is reviewed confidentially by senior counsel with a 24-hour response guarantee.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Contact Cards & Form Grid */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Office Information & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/10 border border-brass/30 text-brass-dark text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Direct Communication Channels</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy tracking-tight">
                  Reach Our Legal Team
                </h2>
                <p className="text-charcoal-muted text-sm sm:text-base mt-2">
                  Choose the most convenient way to connect with our advocates.
                </p>
              </div>

              {/* Contact Detail Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="p-5 rounded-2xl bg-white border border-charcoal-light/40 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark block">
                      Telephone / WhatsApp
                    </span>
                    <a
                      href="tel:+60175483157"
                      className="font-serif text-lg font-bold text-navy hover:text-brass transition-colors block mt-0.5"
                    >
                      +60 17-548 3157
                    </a>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Direct line to firm coordination
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-2xl bg-white border border-charcoal-light/40 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark block">
                      Official Email
                    </span>
                    <a
                      href="mailto:lwclegal5@gmail.com"
                      className="font-serif text-lg font-bold text-navy hover:text-brass transition-colors block mt-0.5"
                    >
                      lwclegal5@gmail.com
                    </a>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Send document briefs and formal inquiries
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="p-5 rounded-2xl bg-white border border-charcoal-light/40 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark block">
                      Head Office Address
                    </span>
                    <p className="text-sm font-semibold text-navy mt-0.5 leading-relaxed">
                      Colony @ KLCC, Level 1, Vipod Residences,<br />
                      6, Jalan Kia Peng, 50450 Kuala Lumpur,<br />
                      Wilayah Persekutuan Kuala Lumpur, Malaysia.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="p-5 rounded-2xl bg-white border border-charcoal-light/40 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy text-brass flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark block">
                      Operating Hours
                    </span>
                    <p className="text-sm text-navy mt-0.5 font-medium">
                      <strong>Monday – Friday:</strong> 9:00 AM – 5:30 PM
                    </p>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Saturday & Sunday: Closed (Urgent WhatsApp Only)
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-[#25D366] shrink-0" />
                  <div>
                    <h4 className="font-bold text-navy text-sm">Instant WhatsApp Consultation</h4>
                    <p className="text-xs text-charcoal-muted">Direct messaging with counsel</p>
                  </div>
                </div>
                <WhatsAppButton variant="compact" label="Chat Now" />
              </div>

              {/* Google Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-charcoal-light/40 shadow-md h-64 relative bg-navy/10">
                <iframe
                  title="Messrs. Low Wah Chin & Co. Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7844237885444!2d101.71165087570889!3d3.1514332968239744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d383b10b7f%3A0x6a08ec9ad06e40b3!2sColony%20%40%20KLCC!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Booking Form (7 cols) */}
            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
