import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutPrincipal from '@/components/sections/AboutPrincipal';
import PracticeAreasDark from '@/components/sections/PracticeAreasDark';
import RecognitionSection from '@/components/sections/RecognitionSection';
import GoogleReviewsSection from '@/components/sections/GoogleReviewsSection';
import FirmOverview from '@/components/sections/FirmOverview';
import ContactSection from '@/components/sections/ContactSection';
import JsonLd from '@/components/common/JsonLd';
import { getLegalServiceSchema } from '@/lib/metadata';

export default async function HomePage() {
  const legalServiceSchema = getLegalServiceSchema();

  return (
    <>
      <JsonLd data={legalServiceSchema} />

      {/* 1. Hero Section (Full-width Dark) */}
      <Hero />

      {/* 2. About the Principal Lawyer (Light Two-Column) */}
      <AboutPrincipal />

      {/* 3. "Tradition of Talent" / Practice Areas Section (Full-width Dark) */}
      <PracticeAreasDark />

      {/* 4. Recognition / Press Mention Section (Light Two-Column) */}
      <RecognitionSection />

      {/* 5. Google Reviews & Client Trust (Full-width Dark 5.0 Star Section) */}
      <GoogleReviewsSection />

      {/* 6. Firm Overview / "Grow Your Vision" Style Section (Light Two-Column) */}
      <FirmOverview />

      {/* 7. Contact Section (Light Two-Column with SMTP Form) */}
      <ContactSection />
    </>
  );
}

