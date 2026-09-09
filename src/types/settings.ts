export interface HeroImagesSettings {
  homeHeroImage: string;
  aboutHeroImage: string;
  ourTeamHeroImage: string;
  practicesHeroImage: string;
  articlesHeroImage: string;
  faqHeroImage: string;
  contactHeroImage: string;
}

export interface FirmSettings {
  companyName: string;
  qualificationTitle: string;
  barCouncilNumber: string;
  phone: string;
  email: string;
  streetAddress: string;
  operatingHours: string;
  googleMapsUrl: string;
  heroImages: HeroImagesSettings;
}

export const DEFAULT_FIRM_SETTINGS: FirmSettings = {
  companyName: 'Low Wah Chin & Co.',
  qualificationTitle: 'Advocates & Solicitors',
  barCouncilNumber: 'Member of the Malaysian Bar Council No. BC/L/2019',
  phone: '+60 17-548 3157',
  email: 'lwclegal5@gmail.com',
  streetAddress: 'Colony @ KLCC, Level 1, Vipod Residences, 6 Jalan Kia Peng, 50450 Kuala Lumpur',
  operatingHours: 'Monday – Friday: 9:00 AM – 5:30 PM (Sat & Sun Closed)',
  googleMapsUrl: 'https://maps.google.com/?q=Colony+at+KLCC+Vipod+Residences',
  heroImages: {
    homeHeroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85',
    aboutHeroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85',
    ourTeamHeroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    practicesHeroImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85',
    articlesHeroImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=85',
    faqHeroImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85',
    contactHeroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
  },
};
