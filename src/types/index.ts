export interface Inquiry {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  practice_area: string;
  preferred_date?: string | null;
  message: string;
  status?: string;
  created_at?: string | Date;
}

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  practice_area: string;
  preferred_date?: string;
  message: string;
}

export interface Article {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_role?: string;
  read_time: string;
  published_at: string | Date;
  cover_image_url?: string | null;
  tags?: string[];
}

export interface EducationItem {
  period: string;
  level: string;
  qualification: string;
  institution: string;
  location?: string;
  gradeOrDetails?: string;
}

export interface CareerHistoryItem {
  period: string;
  firm: string;
  role: string;
  department?: string;
  supervisor?: string;
  principal?: string;
  keyResponsibilities?: string[];
  notableMatters?: string[];
}

export interface InternshipItem {
  period: string;
  firm: string;
  role: string;
  supervisor?: string;
  details?: string;
}

export interface ActivityItem {
  date: string;
  title: string;
  organization: string;
  role?: string;
  details?: string;
}

export interface TeamMember {
  id: string | number;
  name: string;
  chineseName?: string;
  nricName?: string;
  role: string;
  title?: string;
  credentials: string[];
  admissions?: string[];
  education?: string[];
  educationHistory?: EducationItem[];
  careerHistory?: { period: string; firm: string; role: string; details?: string }[];
  detailedCareerHistory?: CareerHistoryItem[];
  earlyCareerAndInternships?: InternshipItem[];
  activitiesAndAchievements?: ActivityItem[];
  skills?: string[];
  languages?: { language: string; proficiency: string }[];
  appellateExperience?: { code: string; title: string; description: string }[];
  summaryOfExperience?: {
    establishedFirmsSummary?: string[];
    inHouseSummary?: string[];
    soleProprietorSummary?: string[];
  };
  contactInfo?: {
    phone: string;
    email: string;
    chambersAddress?: string;
  };
  bio: string | string[];
  photo_url?: string | null;
  display_order?: number;
}

export interface Testimonial {
  id: string | number;
  client_name: string;
  title?: string;
  location?: string;
  quote: string;
  practice_area: string;
  rating: number;
  source: string;
  published_at?: string | Date;
}

export interface PracticeArea {
  slug: string;
  title: string;
  chineseTitle?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  iconName: string;
  statutoryFramework?: string[];
  whatWeHandle: string[];
  keyBenefits: string[];
  proceduralTimeline?: {
    step: string;
    title: string;
    duration: string;
    description: string;
  }[];
  preparationChecklist?: string[];
  faqs: { question: string; answer: string }[];
  caseStudy?: {
    scenario: string;
    outcome: string;
  };
}

export interface RepresentativeMatter {
  id: string;
  title: string;
  category: 'Appellate Litigation' | 'Commercial & Corporate' | 'Real Estate & Land' | 'Family & Matrimonial Law' | 'Debt & Insolvency' | 'Tort & Medical Negligence' | 'Employment & Industrial';
  forum: string;
  statutoryFramework: string;
  background: string;
  strategy: string;
  outcome: string;
  highlights: string[];
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
