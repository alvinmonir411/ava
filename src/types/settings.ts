import { CareerHistoryItem } from './index';

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
  ctaButtonText?: string;
  whatsappButtonText?: string;
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
  pastExperienceItem1?: string;
  pastExperienceItem2?: string;
  pastExperienceHighlights?: string[];
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface WhyChooseUsSettings {
  badge: string;
  title: string;
  subtitle: string;
  quote?: string;
  items: WhyChooseUsItem[];
  footerNote?: string;
  ctaText?: string;
  whatsappText?: string;
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

export interface SectionVisibilitySettings {
  showWhyChooseUs?: boolean;
  showGallery?: boolean;
  showRecognition?: boolean;
  showFirmOverview?: boolean;
  showArticles?: boolean;
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
  whyChooseUs?: WhyChooseUsSettings;
  careerHistory?: CareerHistoryItem[];
  recognition: RecognitionContentSettings;
  gallery: GallerySectionSettings;
  sections?: SectionVisibilitySettings;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    src: '/hero_image.jpeg',
    alt: 'Ava Rachel Low - High Court of Malaya Advocate & Solicitor',
    title: 'High Court Advocate & Solicitor',
    subtitle: 'High Court of Malaya (Admitted 2011)',
    badge: 'Senior Trial Counsel',
    description: 'Admitted to the High Court of Malaya on 11th November 2011, practising since 11 November 2011 across courtroom trial advocacy, corporate litigation, and dispute resolution.',
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

export const DEFAULT_CAREER_HISTORY: CareerHistoryItem[] = [
  {
    period: '25th August 2020 – Present',
    firm: 'Messrs. Low Wah Chin & Co.',
    role: 'Principal: Ava Rachel Low Wah Chin',
    department: 'General Practice, Litigation, Conveyancing & Corporate Advisory',
    principal: 'Ava Rachel Low Wah Chin (Sole Proprietor & Principal Legal Practitioner)',
    keyResponsibilities: [
      'Full management and principal advocacy in sole proprietorship establishment providing hands-on client representation.',
      'Attending trials, interlocutory hearings, drafting cause papers, structuring corporate and joint venture transactions, and managing complex estate, family, and conveyancing portfolios.'
    ],
    notableMatters: [
      'Drafted and executed Corporate Share Sale & Purchase Agreement for private limited company at RM6.8 Million.',
      'Motor Insurance Accident Claim with Motor Insurers’ Bureau of West Malaysia (MIB) securing compassionate payment of RM30,000 to widow.',
      'Family Law & Matrimonial Practice: Joint Petitions for Divorce (Section 52 LRA 1976), Single Divorce Petitions (Section 53/54 LRA 1976), and comprehensive Divorce Settlements covering matrimonial property distribution, child custody under Section 88 LRA 1976, care and control, and spousal maintenance.',
      'Negotiated tenancy terms with YTL Corporation and SME(s) for China Chinese corporate client.',
      'Crafted bespoke Business and Joint Venture Agreements and Tenancy Agreements for China Chinese cross-border clients.',
      'Attended to high-value conveyancing matters valued between RM1.65 Million to RM4.3 Million from Malaysian local clients to European clients.',
      'High Court estate property litigation on the validity of last will and testament of deceased suffering from dementia.',
      'Grant of Probate extraction and conveyancing sale of dual estate properties valued at RM7.5 Million.',
      'Directors’ Dispute Discovery Application for Accounting Records under Section 245 Companies Act 2016 and High Court hearings.',
      'High Court Kuala Lumpur Medical Negligence Discovery Application for medical records over complaint of wrongful leg amputation.',
      'Medical Negligence advisory and medical expert correspondence regarding urinary retention complications resulting from negligent treatment.',
      'Tenancy agreements drafting, stamping, and tenancy dispute proceedings for pet policy breach and rental arrears default.',
      'Estate administration involving Letters of Administration (< RM2 Million), replacement of lost Master Title Grants following developer liquidation, Discharge of Charge, and High Court transfer vesting orders.',
      'Sub-sale conveyancing, strata and landed property transactions, and discharge of charges.',
      'Property dispute with property developer regarding lawful termination of Sale and Purchase Agreement (SPA).',
      'Legal Opinion writing on the statutory interpretation of 3 Wills under the Succession Laws of Western Australia for an Australian client.',
      'Ongoing general advisory across Company Law, Employment Law, Tort Law, Property Law, Family & Divorce Law, and Estate Claims.'
    ]
  },
  {
    period: '1st June 2020 – 31st July 2020',
    firm: 'Messrs. Burton Tan, Syazwan & Co.',
    role: 'Legal Assistant',
    department: 'General Litigation & Conveyancing',
    supervisor: 'Burton Tan',
    keyResponsibilities: [
      'Drafted pleadings and cause papers including Writs of Summons & Statements of Claim on land trespass and corporate professional legal fee recovery.',
      'Prepared Agreed Facts to be Tried, Issues to be Tried, Summaries of Facts, and compiled Bundles of Documents for trial.',
      'Handled conveyancing files for property sale, purchase, and title transfers.',
      'Drafted investment agreements, attended will and estate distribution meetings, rendered public calling advice, and led client consultations.'
    ]
  },
  {
    period: '26th January 2018 – 31st May 2020',
    firm: 'Messrs. Low Wah Chin',
    role: 'Sole Proprietor',
    department: 'Civil Litigation, Conveyancing & Corporate Practice',
    principal: 'Ava Rachel Low Wah Chin',
    keyResponsibilities: [
      'Established initial sole proprietorship practice delivering hands-on legal counsel directly to private and corporate clients.',
      'Attended civil litigation hearings and urgent criminal bail hearings in the Magistrates’ and Sessions Courts.',
      'Conducted conveyancing files for property transactions and title transfers.',
      'Drafted corporate agreements including Shareholders’ Agreements and Share Purchase Agreements.'
    ]
  },
  {
    period: '1st June 2017 – 5th December 2017',
    firm: 'Messrs. Serena Paul Naveen',
    role: 'Partner (Salary Partnership)',
    department: 'General Litigation Practice',
    supervisor: 'Serena Paul Naveen',
    keyResponsibilities: [
      'Managed the firm’s general litigation department and supervised junior legal staff.',
      'Drafted cause papers, handled case managements, and conducted court trials and hearings.'
    ]
  },
  {
    period: '9th August 2016 – 13th April 2017 (~9 Months)',
    firm: 'KNM Group Berhad (Public Listed Company)',
    role: 'In-House Legal Counsel (Legal & Risk Management Department)',
    department: 'Legal & Risk Management Department',
    supervisor: 'Flavio Porro (Head of Legal & Risk Management) & Dalton Wen (Legal Manager)',
    keyResponsibilities: [
      'In-house legal advisory, risk mitigation, and corporate regulatory governance across international engineering and construction projects (~9-month tenure).',
      'Monitored company litigation, liaised with external solicitors, attended court hearings, and prepared executive staff and trial documentation.',
      'Assisted HR Manager with employment law matters and industrial employment hearings.',
      'Drafted cross-border Non-Disclosure Agreements (NDAs) and Confidentiality Agreements for multi-million international tender projects.',
      'Procured and reviewed Insurance Policy Schedules for cross-border engineering projects.',
      'Drafted and commented on General and Special Terms & Conditions for Purchase Orders and corporate services.',
      'Prepared Supplemental Loan Agreements for structured corporate financing.',
      'Drafted Heads of Agreement (HOA) and Memorandum of Understanding (MOU) for cross-border ventures.',
      'Advised on Engineering, Procurement and Construction (EPC) Contracts and prepared comprehensive term comparison tables.',
      'Drafted demand letters, board minutes, cause papers, liaised with external auditors, and conducted statutory research.'
    ]
  },
  {
    period: '1st June 2015 – 17th May 2016',
    firm: 'Messrs. Murali B. Pillai & Associates (Messrs. Murali & Co.)',
    role: 'Legal Assistant',
    department: 'General & Insurance Litigation (Non-Motor Claims Department)',
    supervisor: 'Amuda Jayaratnam and Sreether Sundaram',
    keyResponsibilities: [
      'Conducted own trial matters and assisted Partners with general civil, insurance defense, and medical negligence litigation.',
      'Assisted two Senior Counsels concurrently in defending medical practitioners against alleged medical negligence in diagnosis and surgical treatments.',
      'Assisted Senior Counsel with general insurance claims: recovered theft vehicle, displaced retaining wall during bungalow construction, and Bus accident claims.',
      'Assisted Senior Counsel in High Court matrimonial divorce and child custody hearings.',
      'Conducted full trial involving contractor negligence over a dislodged sprinkler pipe causing water damage to gaming machines.',
      'Conducted Sessions Court summary judgment hearing for payment on demand under contractor performance bond.',
      'Conducted Federal Court hearing against insured’s motion for leave to appeal pursuant to Section 96 Courts of Judicature Act 1964 regarding medical insurance policy terms (motion dismissed with costs).',
      'Independently settled food poisoning claims, fire insurance claims, and bodily injury claims.',
      'Drafted legal opinions on Professional Indemnity Insurance for lawyers, Medical Negligence, and General Insurance.'
    ]
  },
  {
    period: '8th July 2013 – 31st May 2015',
    firm: 'Messrs. Azim, Tunku Farik & Wong',
    role: 'Legal Assistant',
    department: 'General, Insurance & Banking Litigation Department',
    supervisor: 'Wong Hok Mun',
    keyResponsibilities: [
      'Assisted Wong Hok Mun on Professional Indemnity Insurance for lawyers, general commercial disputes, and banking litigation.',
      'Assisted in developer-lawyer conspiracy fraud lawsuit defrauding property purchasers (Sessions Court).',
      'Assisted in 3-day High Court trial involving professional negligence suit against solicitor for loss of chance litigation damages.',
      'Assisted in striking-out and appeal hearings for retailer against oil & gas corporation and Federal Land Commissioner over MRT line compulsory acquisition compensation (High Court).',
      'Successfully argued before High Court Judge to oppose bank’s application for discovery against law firm over conveyancing documents in alleged dishonest assistance (application dismissed with costs).',
      'Conducted Court of Appeal and Federal Court hearings with co-counsels in estate dispute alleging fraud in obtaining Grant of Probate.',
      'Conducted High Court interlocutory hearings for security for costs and discovery applications.'
    ]
  },
  {
    period: 'December 2012 – February 2013',
    firm: 'Messrs. Lai & Associates',
    role: 'Legal Assistant',
    department: 'Civil Litigation Department',
    keyResponsibilities: [
      'Assisted with general civil litigation matters in Sessions Court and High Court.'
    ]
  },
  {
    period: 'June 2012 – November 2012',
    firm: 'Messrs. Raja Eleena Siew Ang & Associates',
    role: 'Legal Assistant',
    department: 'Banking & Conveyancing Department',
    keyResponsibilities: [
      'Assisted with conveyancing project work, Perfection of Transfer (Form 14A), Perfection of Charge (Form 16A), property title transfers, and Land Office auction matters.'
    ]
  },
  {
    period: 'November 2011 – May 2012',
    firm: 'Messrs. Shook Lin & Bok',
    role: 'Legal Associate',
    department: 'Insurance, Shipping, Aviation, General & Civil Litigation Department',
    supervisor: 'Porres P Royan, Sudharsanan Thillainathan, Lau Kee Sern',
    keyResponsibilities: [
      'Assisted in 10-day High Court trial involving fraud, conspiracy, breach of fiduciary duties, and breach of confidentiality.',
      'Assisted in 2-day High Court trial involving breach of Deed of Settlement and Guarantee & Indemnity for RM19 Million debt.',
      'Assisted in arbitration matter regarding Services Agreement Incentive Sum computation.',
      'Assisted in defamation action involving Writ Out of Jurisdiction and renewal of expired writ in High Court.',
      'Rendered advice on Insurance Coverage, Brokering, Breach of Contract, and Insurance Placement Negligence.',
      'Advised on Construction of Wills and Testaments.'
    ]
  }
];

export const DEFAULT_WHY_CHOOSE_US_SETTINGS: WhyChooseUsSettings = {
  badge: 'Why Choose Low Wah Chin & Co.',
  title: 'Commanding Advocacy, Uncompromising Integrity & Direct Counsel',
  subtitle: 'Why corporate leaders, business owners, and private individuals entrust their critical legal, litigation, and conveyancing matters to our chambers.',
  quote: '“Passion & Duty, Integrity & Care — To the Point.”',
  footerNote: 'Confidential Consultation • Direct WhatsApp Access • Member of the Malaysian Bar Council',
  ctaText: 'Schedule Chambers Consultation',
  whatsappText: 'Direct WhatsApp Inquiry',
  items: [
    {
      id: '1',
      title: 'Lincoln’s Inn Barrister & High Court Trial Craft',
      description: 'Admitted to the English Bar at Lincoln’s Inn, London, and Advocate & Solicitor of the High Court of Malaya since 11 November 2011. Seasoned trial and appellate advocacy extending up to the Court of Appeal.',
      icon: 'Scale',
      highlight: 'Lincoln’s Inn & Malayan Bar (2011)',
    },
    {
      id: '2',
      title: 'Rare Dual In-House & Courtroom Litigation Depth',
      description: 'Honed through ~9 months as in-house corporate counsel at listed engineering entity KNM Group Berhad alongside top-tier litigation practice at Shook Lin & Bok and Azim, Tunku Farik & Wong. We understand both commercial balance sheets and courtroom strategy.',
      icon: 'Building2',
      highlight: 'Corporate In-House + Premier Firms',
    },
    {
      id: '3',
      title: 'Direct Principal Attention (Zero Junior Delegation)',
      description: 'Your case is never delegated to junior pupils or callow associates. Every brief, pleading, agreement, and negotiation is personally examined, drafted, and led by Principal Counsel Ava Rachel Low.',
      icon: 'UserCheck',
      highlight: '100% Partner-Led Representation',
    },
    {
      id: '4',
      title: 'Decisive, Pragmatic "To The Point" Guidance',
      description: 'We eliminate legal ambiguity and unnecessary billable delays. You receive candid legal risk assessments, tactical options, and clear roadmaps geared toward commercial settlement or decisive judicial victory.',
      icon: 'Compass',
      highlight: 'Clear Strategic Roadmaps',
    },
    {
      id: '5',
      title: 'Transparent, Agreed Upfront Fee Schedules',
      description: 'No hidden disbursements, vague hourly surprises, or unexpected fees. We provide structured, predictable scopes of work with transparent milestones so you can plan with certainty.',
      icon: 'Banknote',
      highlight: 'Predictable & Transparent Billing',
    },
    {
      id: '6',
      title: 'Trusted Malaysia Honored & Recommended',
      description: 'Honored by Trusted Malaysia as one of the Top 6 Personal Injury Law Firms in Malaysia, with distinguished results across corporate dispute resolution, commercial contracts, family law, and estate matters.',
      icon: 'Award',
      highlight: 'Top 6 Law Firms Commendation',
    },
  ],
};

export const DEFAULT_FIRM_SETTINGS: FirmSettings = {
  companyName: 'Low Wah Chin & Co.',
  qualificationTitle: 'Advocates & Solicitors',
  barCouncilNumber: 'Member of Malaysia Bar Council',
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
    ctaButtonText: 'Schedule Consultation',
    whatsappButtonText: 'Inquire on WhatsApp',
  },
  aboutPrincipal: {
    sectionTag: 'Principal Counsel',
    sectionTitle: 'About',
    lawyerPhoto: '/lawyer-portrait-4.jpg',
    lawyerName: 'Low Wah Chin (Ava Rachel)',
    lawyerChinese: '劉華晶',
    quote: '“I am an Advocate & Solicitor Malaysia. Practising since 11 November 2011.”',
    bioParagraph1: 'Founded by senior advocate Low Wah Chin (Ava Rachel) 劉華晶, Messrs. Low Wah Chin & Co. provides commanding courtroom advocacy, precise contract drafting, and strategic corporate risk guidance. Her legal foundation was honed across premier Malaysian institutions including Shook Lin & Bok, Azim, Tunku Farik & Wong, and Murali B. Pillai & Associates.',
    bioParagraph2: 'In addition to private trial practice, Ms. Low served ~9 months at KNM Group Berhad as In-House Legal Counsel, managing corporate risk, cross-border engineering, procurement, and construction (EPC) agreements, and international commercial transactions.',
    corePractices: 'Laws of Contract · Commercial Disputes · Tort & Negligence · Family & Divorce · Property Conveyancing · Corporate Advisory & MOUs · Wills & Estate Distribution · High Court Litigation',
    pastExperienceItem1: 'Benchmark Practice: Shook Lin & Bok • Azim, Tunku Farik & Wong',
    pastExperienceItem2: 'Corporate In-House: ~9 Months Legal Counsel at KNM Group Berhad',
    pastExperienceHighlights: [
      'Benchmark Practice: Shook Lin & Bok • Azim, Tunku Farik & Wong',
      'Corporate In-House: ~9 Months Legal Counsel at KNM Group Berhad',
      'Sole Proprietorship & Chambers Leadership: Messrs. Low Wah Chin & Co. (2020 – Present)',
    ],
  },
  whyChooseUs: DEFAULT_WHY_CHOOSE_US_SETTINGS,
  careerHistory: DEFAULT_CAREER_HISTORY,
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
    stat3Value: '2011',
    stat3Label: 'Practising Since 11 Nov',
  },
  gallery: {
    sectionTitle: 'Portraits & Chambers Leadership Gallery',
    sectionSubtitle: 'Principal Counsel Low Wah Chin (Ava Rachel) 劉華晶',
    sectionBadge: 'Advocate & Solicitor • Lincoln’s Inn Barrister',
    items: DEFAULT_GALLERY_ITEMS,
  },
  sections: {
    showWhyChooseUs: true,
    showGallery: false,
    showRecognition: false,
    showFirmOverview: false,
    showArticles: false,
  },
};
