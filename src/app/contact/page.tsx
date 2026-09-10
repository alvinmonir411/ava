import React from 'react';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import ContactSection from '@/components/sections/ContactSection';
import { Building, MapPin, Phone, Mail, Clock, ShieldCheck, Navigation } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

import { getFirmSettings } from '@/actions/settingsActions';

export const metadata = constructMetadata({
  title: 'Contact Chambers & Schedule Consultation | Messrs. Low Wah Chin & Co.',
  description: 'Contact Messrs. Low Wah Chin & Co. Advocates & Solicitors. Located at Colony @ KLCC, Vipod Residences, Jalan Kia Peng, Kuala Lumpur. Call +60 17-548 3157.',
  canonicalUrl: `${SITE_CONFIG.url}/contact`,
});

export default async function ContactPage() {
  const settings = await getFirmSettings();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Contact Us', url: `${SITE_CONFIG.url}/contact` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title="Contact Our Chambers"
        subtitle="Prompt, Confidential & Accessible Legal Representation"
        badge="Kuala Lumpur Chambers • Colony @ KLCC"
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage={settings.heroImages?.contactHeroImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"}
      />

      {/* Main Contact Section */}
      <ContactSection />

      {/* Chambers Location & Access Details (Light Section) */}
      <section className="py-16 bg-[#faf7fc] text-[#1e0d33] border-b border-[#ebdff5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#ebdff5] rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-[#9d7835] font-serif font-bold text-base mb-2">
                <MapPin className="w-4 h-4 text-[#c6a052]" />
                <span>Prime KLCC Location</span>
              </div>
              <p className="text-xs sm:text-sm text-[#594d63] leading-relaxed">
                Situated at Vipod Residences, adjacent to KLCC, Pavilion Kuala Lumpur, and the Kuala Lumpur High Court complex.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#ebdff5] rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-[#9d7835] font-serif font-bold text-base mb-2">
                <Navigation className="w-4 h-4 text-[#c6a052]" />
                <span>Transit & Parking</span>
              </div>
              <p className="text-xs sm:text-sm text-[#594d63] leading-relaxed">
                5 minutes walk from Raja Chulan Monorail & Conlay MRT stations. Secure visitor basement parking available on site.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#ebdff5] rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-[#9d7835] font-serif font-bold text-base mb-2">
                <ShieldCheck className="w-4 h-4 text-[#c6a052]" />
                <span>Confidential Privilege</span>
              </div>
              <p className="text-xs sm:text-sm text-[#594d63] leading-relaxed">
                Private conference suites designed for sensitive commercial negotiations, arbitration, and confidential family matters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
