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

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  title?: string;
  credentials: string[];
  admissions?: string[];
  education?: string[];
  careerHistory?: { period: string; firm: string; role: string }[];
  appellateExperience?: { code: string; title: string; description: string }[];
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
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  iconName: string;
  whatWeHandle: string[];
  keyBenefits: string[];
  faqs: { question: string; answer: string }[];
  caseStudy?: {
    scenario: string;
    outcome: string;
  };
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
