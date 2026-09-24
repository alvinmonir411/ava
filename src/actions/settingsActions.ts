'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import {
  FirmSettings,
  HeroImagesSettings,
  HeroContentSettings,
  AboutPrincipalSettings,
  WhyChooseUsSettings,
  WhyChooseUsItem,
  RecognitionContentSettings,
  GallerySectionSettings,
  GalleryItem,
  DEFAULT_FIRM_SETTINGS,
  DEFAULT_CAREER_HISTORY,
  DEFAULT_WHY_CHOOSE_US_SETTINGS,
} from '@/types/settings';
import { CareerHistoryItem } from '@/types';
import { isAuthenticated } from '@/lib/auth';

export type {
  FirmSettings,
  HeroImagesSettings,
  HeroContentSettings,
  AboutPrincipalSettings,
  WhyChooseUsSettings,
  WhyChooseUsItem,
  CareerHistoryItem,
  RecognitionContentSettings,
  GallerySectionSettings,
  GalleryItem,
};

// In-memory fallback for serverless cold starts
let memorySettings: FirmSettings | null = null;

function getSettingsFilePath(): string {
  return path.join(process.cwd(), 'src', 'data', 'firmSettings.json');
}

function mergeSettingsWithDefaults(data: Partial<FirmSettings>): FirmSettings {
  return {
    ...DEFAULT_FIRM_SETTINGS,
    ...data,
    heroImages: {
      ...DEFAULT_FIRM_SETTINGS.heroImages,
      ...(data.heroImages || {}),
    },
    heroContent: {
      ...DEFAULT_FIRM_SETTINGS.heroContent,
      ...(data.heroContent || {}),
    },
    aboutPrincipal: {
      ...DEFAULT_FIRM_SETTINGS.aboutPrincipal,
      ...(data.aboutPrincipal || {}),
      pastExperienceHighlights:
        data.aboutPrincipal?.pastExperienceHighlights &&
        Array.isArray(data.aboutPrincipal.pastExperienceHighlights) &&
        data.aboutPrincipal.pastExperienceHighlights.length > 0
          ? data.aboutPrincipal.pastExperienceHighlights
          : DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights,
    },
    whyChooseUs: {
      ...DEFAULT_WHY_CHOOSE_US_SETTINGS,
      ...(data.whyChooseUs || {}),
      items:
        data.whyChooseUs?.items && Array.isArray(data.whyChooseUs.items) && data.whyChooseUs.items.length > 0
          ? data.whyChooseUs.items
          : DEFAULT_WHY_CHOOSE_US_SETTINGS.items,
    },
    careerHistory:
      data.careerHistory && Array.isArray(data.careerHistory) && data.careerHistory.length > 0
        ? data.careerHistory
        : DEFAULT_FIRM_SETTINGS.careerHistory || [],
    recognition: {
      ...DEFAULT_FIRM_SETTINGS.recognition,
      ...(data.recognition || {}),
    },
    gallery: {
      ...DEFAULT_FIRM_SETTINGS.gallery,
      ...(data.gallery || {}),
      items:
        data.gallery?.items && Array.isArray(data.gallery.items) && data.gallery.items.length > 0
          ? data.gallery.items
          : DEFAULT_FIRM_SETTINGS.gallery.items,
    },
    sections: {
      ...DEFAULT_FIRM_SETTINGS.sections,
      ...(data.sections || {}),
    },
  };
}

// â”€â”€â”€ Raw DB/file fetch (no cache) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function fetchSettingsRaw(): Promise<FirmSettings> {
  // 1. Prioritize Neon DB
  if (db) {
    try {
      const records = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, 'firm_settings'))
        .limit(1);

      if (records.length > 0 && records[0].value) {
        const merged = mergeSettingsWithDefaults(records[0].value as Partial<FirmSettings>);
        memorySettings = merged;
        return merged;
      }
    } catch (err) {
      console.warn('Neon DB settings query failed, falling back to firmSettings.json:', err);
    }
  }

  // 2. Fallback to read-only firmSettings.json
  try {
    const filePath = getSettingsFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileData);
      const merged = mergeSettingsWithDefaults(parsed);
      memorySettings = merged;
      return merged;
    }
  } catch (err) {
    console.error('Error reading fallback firmSettings.json:', err);
  }

  memorySettings = DEFAULT_FIRM_SETTINGS;
  return memorySettings;
}

// â”€â”€â”€ Cached version with tag 'firm-settings' â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// revalidateTag('firm-settings', 'max') instantly invalidates this on save
const getCachedSettings = unstable_cache(
  async () => fetchSettingsRaw(),
  ['firm-settings'],
  {
    tags: ['firm-settings'],
    revalidate: 3600, // fallback: max 1 hour stale even if tag not busted
  }
);

// â”€â”€â”€ Public API used by all pages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function getFirmSettings(): Promise<FirmSettings> {
  return getCachedSettings();
}

export async function getAdminSettingsAction(): Promise<FirmSettings> {
  // Admin panel always reads fresh from DB (no cache)
  return fetchSettingsRaw();
}

// â”€â”€â”€ Save + instant revalidate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function updateAdminSettingsAction(
  newSettings: Partial<FirmSettings>
): Promise<{ success: boolean; settings: FirmSettings; message?: string }> {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return {
        success: false,
        settings: memorySettings || DEFAULT_FIRM_SETTINGS,
        message: 'Unauthorized. Please sign in to save changes.',
      };
    }

    const current = await fetchSettingsRaw();
    const updated: FirmSettings = {
      ...current,
      ...newSettings,
      heroImages: {
        ...current.heroImages,
        ...(newSettings.heroImages || {}),
      },
      heroContent: {
        ...current.heroContent,
        ...(newSettings.heroContent || {}),
      },
      aboutPrincipal: {
        ...current.aboutPrincipal,
        ...(newSettings.aboutPrincipal || {}),
        pastExperienceHighlights:
          newSettings.aboutPrincipal?.pastExperienceHighlights ??
          current.aboutPrincipal?.pastExperienceHighlights ??
          DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights,
      },
      whyChooseUs: {
        ...DEFAULT_WHY_CHOOSE_US_SETTINGS,
        ...(current.whyChooseUs || {}),
        ...(newSettings.whyChooseUs || {}),
        items:
          newSettings.whyChooseUs?.items ??
          current.whyChooseUs?.items ??
          DEFAULT_WHY_CHOOSE_US_SETTINGS.items,
      },
      careerHistory:
        newSettings.careerHistory ??
        current.careerHistory ??
        DEFAULT_FIRM_SETTINGS.careerHistory ??
        [],
      recognition: {
        ...current.recognition,
        ...(newSettings.recognition || {}),
      },
      gallery: {
        ...current.gallery,
        ...(newSettings.gallery || {}),
        items: newSettings.gallery?.items ?? current.gallery.items,
      },
      sections: {
        ...DEFAULT_FIRM_SETTINGS.sections,
        ...(current.sections || {}),
        ...(newSettings.sections || {}),
      },
    };

    memorySettings = updated;

    // â”€â”€ Persist to Neon DB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (db) {
      try {
        await db
          .insert(siteSettings)
          .values({
            key: 'firm_settings',
            value: updated,
            updated_at: new Date(),
          })
          .onConflictDoUpdate({
            target: siteSettings.key,
            set: {
              value: updated,
              updated_at: new Date(),
            },
          });
      } catch (dbErr) {
        console.error('Failed to persist settings to Neon DB:', dbErr);
        return {
          success: false,
          settings: updated,
          message: 'Failed to persist settings to database. Please verify database connection.',
        };
      }
    } else {
      console.warn('DATABASE_URL not configured. Settings updated in memory only.');
    }

    // â”€â”€ Instantly bust the cache so all public pages get fresh data â”€â”€â”€â”€â”€â”€â”€â”€â”€
    revalidateTag('firm-settings', 'max');

    // â”€â”€ Also revalidate every public route so Next.js re-renders them â”€â”€â”€â”€â”€â”€â”€
    revalidatePath('/', 'layout');   // bust shared layout (header, footer)
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/our-team');
    revalidatePath('/contact');
    revalidatePath('/faq');
    revalidatePath('/articles');
    revalidatePath('/practices');
    revalidatePath('/practices/legal-advice-consultation');
    revalidatePath('/practices/property-conveyancing');
    revalidatePath('/practices/family-divorce');
    revalidatePath('/practices/dispute-resolution-claims');
    revalidatePath('/practices/will-estate-distribution');
    revalidatePath('/practices/company-matters-agreements');
    revalidatePath('/practices/bodily-injury-claims');
    revalidatePath('/practices/medical-negligence-claims');
    revalidatePath('/practices/letter-writing-lods');
    revalidatePath('/practices/employment-labour-claims');
    revalidatePath('/practices/defamation-claims-justification');
    revalidatePath('/practices/contractor-negligence-claims');
    revalidatePath('/practices/small-claims-assistance');
    revalidatePath('/practices/tenancy-agreement-disputes');
    revalidatePath('/practices/debt-recovery-winding-up');
    revalidatePath('/practices/real-estate-conveyancing');
    revalidatePath('/admin/settings');

    return { success: true, settings: updated, message: 'All website settings and content updated successfully!' };
  } catch (err) {
    console.error('Error updating admin settings:', err);
    return { success: false, settings: memorySettings || DEFAULT_FIRM_SETTINGS, message: 'Failed to update settings.' };
  }
}

