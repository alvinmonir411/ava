import { Metadata } from 'next';

export const SITE_CONFIG = {
  companyName: 'Low Wah Chin & Co.',
  qualificationTitle: 'Advocates & Solicitors',
  name: 'Low Wah Chin & Co. | Advocates & Solicitors',
  shortName: 'Low Wah Chin & Co.',
  description: 'Premier law firm in Kuala Lumpur, Malaysia. Low Wah Chin & Co. (Advocates & Solicitors), led by Lincoln’s Inn Barrister & High Court Advocate Low Wah Chin (Ava Rachel). Personal Injury, Property Conveyancing, Family Divorce, Corporate Law & Commercial Litigation.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://lowwahchin-co.vercel.app', // Production URL
  telephone: '+60175483157',
  email: 'lwclegal5@gmail.com',
  address: {
    streetAddress: 'Colony @ KLCC, Level 1, Vipod Residences, 6 Jalan Kia Peng',
    addressLocality: 'Kuala Lumpur',
    addressRegion: 'Wilayah Persekutuan Kuala Lumpur',
    postalCode: '50450',
    addressCountry: 'MY',
  },
  geo: {
    latitude: 3.1528,
    longitude: 101.7142,
  },
  openingHours: 'Mo-Fr 09:00-17:30',
  priceRange: '$$',
};

export function constructMetadata({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
}: {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl || SITE_CONFIG.url,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl || SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_MY',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// JSON-LD Schema Generators
export function getLegalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney', 'LocalBusiness'],
    name: 'Low Wah Chin & Co. (Advocates & Solicitors)',
    alternateName: 'Low Wah Chin & Co.',
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.email,
    priceRange: SITE_CONFIG.priceRange,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Low Wah Chin (Ava Rachel)',
      jobTitle: 'Principal Advocate & Solicitor, Barrister-at-Law (Lincoln’s Inn)',
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'University of Reading, UK',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'City University London, UK',
        },
      ],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'Malaysian Bar',
        },
        {
          '@type': 'Organization',
          name: 'The Honourable Society of Lincoln’s Inn, London',
        },
      ],
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Kuala Lumpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Selangor',
      },
      {
        '@type': 'Country',
        name: 'Malaysia',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services Offered',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Injury & Motor Accident Claims',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Property Conveyancing & Sale and Purchase Agreements',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Family & Divorce Law (Joint & Single Petitions)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Contracts & Commercial Dispute Litigation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Will Writing, Grant of Probate & Estate Distribution',
          },
        },
      ],
    },
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  author: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: article.url,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: article.imageUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}
