import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutPrincipal from '@/components/sections/AboutPrincipal';
import PracticeAreasDark from '@/components/sections/PracticeAreasDark';
import RecognitionSection from '@/components/sections/RecognitionSection';
import PartnerGallery from '@/components/common/PartnerGallery';
import GoogleReviewsSection from '@/components/sections/GoogleReviewsSection';
import FirmOverview from '@/components/sections/FirmOverview';
import ContactSection from '@/components/sections/ContactSection';
import JsonLd from '@/components/common/JsonLd';
import { getLegalServiceSchema } from '@/lib/metadata';
import { getFirmSettings } from '@/actions/settingsActions';

export default async function HomePage() {
  const legalServiceSchema = getLegalServiceSchema();
  const settings = await getFirmSettings();

  return (
    <>
      <JsonLd data={legalServiceSchema} />

      {/* 1. Hero Section (Full-width Dark with dynamic admin-managed background) */}
      <Hero bgImage={settings.heroImages?.homeHeroImage} content={settings.heroContent} />

      {/* 2. About the Principal Lawyer (Light Two-Column) */}
      <AboutPrincipal content={settings.aboutPrincipal} />

      {/* 3. "Tradition of Talent" / Practice Areas Section (Full-width Dark) */}
      <PracticeAreasDark />

      {/* 4. Recognition / Press Mention Section (Light Two-Column) */}
      <RecognitionSection content={settings.recognition} />

      {/* 5. Portrait & Chambers Leadership Gallery (Interactive 5-Photo Showcase) */}
      <PartnerGallery gallery={settings.gallery} isDark={true} />

      {/* 6. Google Reviews & Client Trust (Full-width Dark 5.0 Star Section) */}
      <GoogleReviewsSection />

      {/* 7. Firm Overview / "Grow Your Vision" Style Section (Light Two-Column) */}
      <FirmOverview />

      {/* 8. Contact Section (Light Two-Column with SMTP Form) */}
      <ContactSection />
    </>
  );
}

