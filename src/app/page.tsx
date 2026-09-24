import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutPrincipal from '@/components/sections/AboutPrincipal';
import PracticeAreasDark from '@/components/sections/PracticeAreasDark';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import GoogleReviewsSection from '@/components/sections/GoogleReviewsSection';
import RecognitionSection from '@/components/sections/RecognitionSection';
import PartnerGallery from '@/components/common/PartnerGallery';
import FirmOverview from '@/components/sections/FirmOverview';
import HomeArticlesSection from '@/components/sections/HomeArticlesSection';
import ContactSection from '@/components/sections/ContactSection';
import JsonLd from '@/components/common/JsonLd';
import { getLegalServiceSchema } from '@/lib/metadata';
import { getFirmSettings } from '@/actions/settingsActions';
import { getArticles } from '@/db';

export default async function HomePage() {
  const legalServiceSchema = getLegalServiceSchema();
  const settings = await getFirmSettings();
  const articles = await getArticles();

  const showWhyChooseUs = settings.sections?.showWhyChooseUs ?? true;
  const showRecognition = settings.sections?.showRecognition ?? false;
  const showGallery = settings.sections?.showGallery ?? false;
  const showFirmOverview = settings.sections?.showFirmOverview ?? false;
  const showArticles = settings.sections?.showArticles ?? false;

  return (
    <>
      <JsonLd data={legalServiceSchema} />

      {/* 1. Hero Section (Ivory background, client-specified palette) */}
      <Hero bgImage={settings.heroImages?.homeHeroImage} content={settings.heroContent} />

      {/* 2. About the Principal Lawyer */}
      <AboutPrincipal content={settings.aboutPrincipal} />

      {/* 3. Practice Areas Section */}
      <PracticeAreasDark />

      {/* 4. Why Choose Us Section */}
      {showWhyChooseUs && (
        <WhyChooseUs content={settings.whyChooseUs} />
      )}

      {/* 5. Testimonials (Compact Google Reviews & Client Trust) */}
      <GoogleReviewsSection />

      {/* Dashboard Toggleable Section: "Best Law Firms" Feature (Hidden by default) */}
      {showRecognition && (
        <RecognitionSection content={settings.recognition} />
      )}

      {/* Dashboard Toggleable Section: Portraits & Leadership Gallery (Hidden by default) */}
      {showGallery && (
        <PartnerGallery gallery={settings.gallery} isDark={false} />
      )}

      {/* Dashboard Toggleable Section: Firm Overview & Quick Facts (Hidden by default) */}
      {showFirmOverview && (
        <FirmOverview />
      )}

      {/* Dashboard Toggleable Section: Latest Legal Articles (Hidden by default) */}
      {showArticles && (
        <HomeArticlesSection articles={articles} />
      )}

      {/* 5. Contact Section */}
      <ContactSection />
    </>
  );
}

