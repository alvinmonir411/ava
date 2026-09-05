import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { PRACTICE_AREAS, ARTICLES_DATA, TEAM_MEMBERS_DATA, TESTIMONIALS_DATA, REPRESENTATIVE_MATTERS_DATA } from './seedData';
import { Article, TeamMember, Testimonial, PracticeArea, RepresentativeMatter } from '@/types';

const connectionString = process.env.DATABASE_URL;

export const db = connectionString ? drizzle(neon(connectionString), { schema }) : null;

// Dynamic or fallback data access helpers
export async function getRepresentativeMatters(): Promise<RepresentativeMatter[]> {
  return REPRESENTATIVE_MATTERS_DATA;
}

export async function getArticles(): Promise<Article[]> {
  if (db) {
    try {
      const result = await db.select().from(schema.articles);
      if (result && result.length > 0) {
        return result.map((r) => ({
          ...r,
          published_at: r.published_at.toISOString(),
        }));
      }
    } catch (e) {
      console.warn('Neon DB not reached, using static articles data:', e);
    }
  }
  return ARTICLES_DATA;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) || null;
}

export async function getPracticeAreas(): Promise<PracticeArea[]> {
  return PRACTICE_AREAS;
}

const SLUG_ALIASES: Record<string, string> = {
  'corporate-commercial': 'company-matters-agreements',
  'civil-commercial-litigation': 'dispute-resolution-claims',
  'family-probate-estate': 'family-divorce',
  'employment-industrial-relations': 'employment-labour-claims',
  'employment-dispute-resolution': 'employment-labour-claims',
  'personal-injury-medical-negligence': 'dispute-resolution-claims',
  'real-estate-conveyancing': 'property-conveyancing',
  'conveyancing-property': 'property-conveyancing',
  'conveyancing-property-transactions': 'property-conveyancing',
  'wills-probate-estate': 'wills-probate-estate-planning',
  'wills-probate-estate-administration': 'wills-probate-estate-planning',
  'civil-commercial-appellate-litigation': 'dispute-resolution-claims',
};

export async function getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
  const exact = PRACTICE_AREAS.find((p) => p.slug === slug);
  if (exact) return exact;

  const targetSlug = SLUG_ALIASES[slug];
  if (targetSlug) {
    const aliased = PRACTICE_AREAS.find((p) => p.slug === targetSlug);
    if (aliased) return aliased;
  }

  return PRACTICE_AREAS.find((p) => p.slug.includes(slug) || slug.includes(p.slug)) || PRACTICE_AREAS[0] || null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (db) {
    try {
      const result = await db.select().from(schema.teamMembers);
      if (result && result.length > 0) {
        return result.map((r) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          credentials: [
            'Advocate & Solicitor of the High Court of Malaya',
            'Barrister-at-Law, Lincoln’s Inn, London',
          ],
          bio: r.bio,
          photo_url: r.photo_url || TEAM_MEMBERS_DATA[0].photo_url,
          display_order: r.display_order,
        }));
      }
    } catch (e) {
      console.warn('Neon DB not reached, using static team data:', e);
    }
  }
  return TEAM_MEMBERS_DATA;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (db) {
    try {
      const result = await db.select().from(schema.testimonials);
      if (result && result.length > 0) {
        return result.map((t) => ({
          ...t,
          published_at: t.published_at.toISOString(),
        }));
      }
    } catch (e) {
      console.warn('Neon DB not reached, using static testimonials data:', e);
    }
  }
  return TESTIMONIALS_DATA;
}
