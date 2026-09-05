import React from 'react';
import Image from 'next/image';
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
  title: 'Contact Chambers & Schedule Consultation | Low, Wah Chin & Co.',
  description: 'Contact Messrs. Low, Wah Chin & Co. Advocates & Solicitors. Located at Colony @ KLCC, Vipod Residences, Jalan Kia Peng, Kuala Lumpur. Call +60 17-548 3157.',
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
      <section className="relative bg-[#170b1e] text-[#faf9f6] py-20 sm:py-28 overflow-hidden border-b border-[#c6a052]/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Kuala Lumpur City Centre - Low, Wah Chin & Co. Chambers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65 brightness-95 contrast-105 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/40 text-xs font-bold uppercase tracking-wider mb-4">
            <Building className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Kuala Lumpur Chambers</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf9f6] mb-4">
            Contact Ava Rachel Low (刘华律师)
          </h1>
          <p className="font-serif italic text-[#e5c777] text-lg sm:text-xl mb-4">
            &ldquo;Prompt, Confidential & Accessible Legal Advice&rdquo;
          </p>
          <p className="text-[#faf9f6]/85 text-base sm:text-lg leading-relaxed font-light">
            We provide flexible support via live consultation, phone, WhatsApp, and email. Every brief is reviewed confidentially by principal advocate Ava Rachel Low with a 24-hour response guarantee.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Contact Cards & Form Grid */}
      <section className="py-20 md:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Office Information & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Direct Communication Channels</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#22122b] tracking-tight">
                  Reach Ava Rachel Low & Chambers
                </h2>
                <p className="text-[#595355] text-sm sm:text-base mt-2">
                  Choose the most convenient way to connect with our advocates.
                </p>
              </div>

              {/* Contact Detail Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="p-5 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm flex items-start gap-4 hover:border-[#c6a052] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9d7835] block">
                      Telephone / Urgent Inquiries
                    </span>
                    <a
                      href="tel:+60175483157"
                      className="font-serif text-lg font-bold text-[#22122b] hover:text-[#9d7835] transition-colors block mt-0.5"
                    >
                      +60 17-548 3157
                    </a>
                    <p className="text-xs text-[#595355] mt-0.5">
                      Direct line to chambers coordination
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm flex items-start gap-4 hover:border-[#c6a052] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9d7835] block">
                      Official Chambers Email
                    </span>
                    <a
                      href="mailto:lwclegal5@gmail.com"
                      className="font-serif text-lg font-bold text-[#22122b] hover:text-[#9d7835] transition-colors block mt-0.5"
                    >
                      lwclegal5@gmail.com
                    </a>
                    <p className="text-xs text-[#595355] mt-0.5">
                      Send document briefs and formal legal notices
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="p-5 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm flex items-start gap-4 hover:border-[#c6a052] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9d7835] block">
                      Kuala Lumpur Chambers Address
                    </span>
                    <p className="text-sm font-semibold text-[#22122b] mt-0.5 leading-relaxed">
                      Colony @ KLCC, Level 1, Vipod Residences,<br />
                      6, Jalan Kia Peng, 50450 Kuala Lumpur,<br />
                      Wilayah Persekutuan Kuala Lumpur, Malaysia.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="p-5 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm flex items-start gap-4 hover:border-[#c6a052] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9d7835] block">
                      Chambers Operating Hours
                    </span>
                    <p className="text-sm text-[#22122b] mt-0.5 font-medium">
                      <strong>Monday – Friday:</strong> 9:00 AM – 5:30 PM MYT
                    </p>
                    <p className="text-xs text-[#595355] mt-0.5">
                      Saturday, Sunday & Public Holidays: Closed (Urgent WhatsApp Only)
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-[#25D366] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#22122b] text-sm">Instant WhatsApp Consultation</h4>
                    <p className="text-xs text-[#595355]">Direct confidential messaging with counsel</p>
                  </div>
                </div>
                <WhatsAppButton variant="compact" label="Chat Now" />
              </div>

              {/* Google Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-[#c6a052]/30 shadow-md h-64 relative bg-[#170b1e]/10">
                <iframe
                  title="Messrs. Low, Wah Chin & Co. Office Location"
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
