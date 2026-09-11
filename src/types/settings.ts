export interface HeroImagesSettings {
  homeHeroImage: string;
  aboutHeroImage: string;
  ourTeamHeroImage: string;
  practicesHeroImage: string;
  articlesHeroImage: string;
  faqHeroImage: string;
  contactHeroImage: string;
}

export interface HeroContentSettings {
  firmName: string;
  firmSubtitle: string;
  motto: string;
  establishedBadge: string;
  heroLawyerPhoto: string;
  heroLawyerName: string;
  heroLawyerChinese: string;
  heroLawyerTitle: string;
  heroLawyerSub: string;
}

export interface AboutPrincipalSettings {
  sectionTag: string;
  sectionTitle: string;
  lawyerPhoto: string;
  lawyerName: string;
  lawyerChinese: string;
  quote: string;
  bioParagraph1: string;
  bioParagraph2: string;
  corePractices: string;
}

export interface RecognitionContentSettings {
  badgeLabel: string;
  ratingText: string;
  title: string;
  quote: string;
  paragraph1: string;
  paragraph2: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  badge: string;
  description?: string;
}

export interface GallerySectionSettings {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionBadge: string;
  items: GalleryItem[];
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
  heroContent: HeroContentSettings;
  aboutPrincipal: AboutPrincipalSettings;
  recognition: RecognitionContentSettings;
  gallery: GallerySectionSettings;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    src: '/hero_image.jpeg',
    alt: 'Ava Rachel Low - High Court of Malaya Advocate & Solicitor',
    title: 'High Court Advocate & Solicitor',
    subtitle: 'High Court of Malaya (Admitted 2011)',
    badge: 'Senior Trial Counsel',
    description: 'Admitted to the High Court of Malaya on 11th November 2011 with 15 years of courtroom practice experience across trial advocacy, corporate litigation, and dispute resolution.',
  },
  {
    id: '2',
    src: '/lawyer-portrait-1.jpg',
    alt: 'Ava Rachel Low - Lincoln’s Inn Barrister London',
    title: 'Barrister-at-Law (Lincoln’s Inn)',
    subtitle: 'The Honourable Society of Lincoln’s Inn, London, UK',
    badge: 'English Bar 2010',
    description: 'Called to the English Bar at Lincoln’s Inn following postgraduate Bar Vocational Course (BVC) in London, upholding classic British common law advocacy traditions.',
  },
  {
    id: '3',
    src: '/lawyer-portrait-4.jpg',
    alt: 'Ava Rachel Low - Managing Partner in Court Dress',
    title: 'Managing Partner & Principal',
    subtitle: 'Messrs. Low Wah Chin & Co. Advocates & Solicitors',
    badge: 'Chambers Leadership',
    description: 'Founding principal directing commercial advisory, corporate contracts, land conveyancing, and strategic dispute resolution with transparent client commitment.',
  },
  {
    id: '4',
    src: '/lawyer-hero.jpg',
    alt: 'Ava Rachel Low Chambers Portrait - Kuala Lumpur Legal Practice',
    title: 'Senior Chambers Counsel',
    subtitle: 'Colony @ KLCC Chambers, Vipod Residences, KL',
    badge: 'Colony @ KLCC',
    description: 'Providing partner-led, meticulous legal counsel in our central Kuala Lumpur chambers at Colony @ KLCC, Vipod Residences.',
  },
  {
    id: '5',
    src: '/lawyer-portrait-2.jpg',
    alt: 'Ava Rachel Low - Client Consultation & Legal Diligence',
    title: 'Client Advocacy & Diligence',
    subtitle: 'Compassionate & Humanity-Centric Legal Diligence',
    badge: 'Dedicated Counsel',
    description: 'Rooted in our core motto: Passion & Duty, Integrity & Care — To the Point. Providing accessible and decisive legal roadmaps for individuals and enterprises.',
  },
];

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
  heroContent: {
    firmName: 'Messrs. Low Wah Chin & Co.',
    firmSubtitle: 'Advocates & Solicitors',
    motto: '“Passion & Duty, Integrity & Care — To the Point.”',
    establishedBadge: 'Advocates & Solicitors • High Court of Malaya',
    heroLawyerPhoto: '/hero_image.jpeg',
    heroLawyerName: 'Low Wah Chin (Ava Rachel)',
    heroLawyerChinese: '劉華晶',
    heroLawyerTitle: 'Managing Partner & Principal Legal Practitioner',
    heroLawyerSub: 'Lincoln’s Inn Barrister (London) • Malayan Bar (2011)',
  },
  aboutPrincipal: {
    sectionTag: 'Principal Counsel',
    sectionTitle: 'About',
    lawyerPhoto: '/lawyer-portrait-4.jpg',
    lawyerName: 'Low Wah Chin (Ava Rachel)',
    lawyerChinese: '劉華晶',
    quote: '“I am an Advocate & Solicitor Malaysia of 15 years in practice since 11th November 2011.”',
    bioParagraph1: 'Founded by senior advocate Low Wah Chin (Ava Rachel) 劉華晶, Messrs. Low Wah Chin & Co. provides commanding courtroom advocacy, precise contract drafting, and strategic corporate risk guidance. Her legal foundation was honed across premier Malaysian institutions including Shook Lin & Bok, Azim, Tunku Farik & Wong, and Murali B. Pillai & Associates.',
    bioParagraph2: 'In addition to private trial practice, Ms. Low served ~9 months at KNM Group Berhad as In-House Legal Counsel, managing corporate risk, cross-border engineering, procurement, and construction (EPC) agreements, and international commercial transactions.',
    corePractices: 'Laws of Contract · Commercial Disputes · Tort & Negligence · Family & Divorce · Property Conveyancing · Corporate Advisory & MOUs · Wills & Estate Distribution · High Court Litigation',
  },
  recognition: {
    badgeLabel: 'Official Editorial Selection',
    ratingText: '5.0 Star Commendation',
    title: 'Best Law Firms in Kuala Lumpur',
    quote: '“Thank You Trusted Malaysia. We are honored to be recommended on your site.”',
    paragraph1: 'Messrs. Low Wah Chin & Co. Advocates & Solicitors is a firm that provides high-quality legal services which exude passion, duty, integrity, and care for you as their client. They aim to work closely with you in order to thoroughly understand your case and be able to address your individual needs and the reason why you availed of their services.',
    paragraph2: 'They are highly commended to be professional and thorough in every case that they take up in which all of their staff are equally competent as well. Rest assured that each of them is a Registered Member of the Malaysian Bar which ensures that you are in good hands.',
    stat1Value: '100%',
    stat1Label: 'Bar Certified',
    stat2Value: 'Top 10',
    stat2Label: 'KL Law Firms',
    stat3Value: '15 Yrs',
    stat3Label: 'Practice Experience',
  },
  gallery: {
    sectionTitle: 'Portraits & Chambers Leadership Gallery',
    sectionSubtitle: 'Principal Counsel Low Wah Chin (Ava Rachel) 劉華晶',
    sectionBadge: 'Advocate & Solicitor • Lincoln’s Inn Barrister',
    items: DEFAULT_GALLERY_ITEMS,
  },
};


