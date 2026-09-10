'use server';

import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import {
  FirmSettings,
  HeroImagesSettings,
  HeroContentSettings,
  AboutPrincipalSettings,
  RecognitionContentSettings,
  GallerySectionSettings,
  GalleryItem,
  DEFAULT_FIRM_SETTINGS,
} from '@/types/settings';
import { isAuthenticated } from '@/lib/auth';

export type {
  FirmSettings,
  HeroImagesSettings,
  HeroContentSettings,
  AboutPrincipalSettings,
  RecognitionContentSettings,
  GallerySectionSettings,
  GalleryItem,
};

let memorySettings: FirmSettings | null = null;

function getSettingsFilePath(): string {
  return path.join(process.cwd(), 'src', 'data', 'firmSettings.json');
}

export async function getFirmSettings(): Promise<FirmSettings> {
  if (memorySettings) {
    return memorySettings;
  }

  try {
    const filePath = getSettingsFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileData);
      memorySettings = {
        ...DEFAULT_FIRM_SETTINGS,
        ...parsed,
        heroImages: {
          ...DEFAULT_FIRM_SETTINGS.heroImages,
          ...(parsed.heroImages || {}),
        },
        heroContent: {
          ...DEFAULT_FIRM_SETTINGS.heroContent,
          ...(parsed.heroContent || {}),
        },
        aboutPrincipal: {
          ...DEFAULT_FIRM_SETTINGS.aboutPrincipal,
          ...(parsed.aboutPrincipal || {}),
        },
        recognition: {
          ...DEFAULT_FIRM_SETTINGS.recognition,
          ...(parsed.recognition || {}),
        },
        gallery: {
          ...DEFAULT_FIRM_SETTINGS.gallery,
          ...(parsed.gallery || {}),
          items:
            parsed.gallery?.items && Array.isArray(parsed.gallery.items) && parsed.gallery.items.length > 0
              ? parsed.gallery.items
              : DEFAULT_FIRM_SETTINGS.gallery.items,
        },
      };
      return memorySettings as FirmSettings;
    }
  } catch (err) {
    console.error('Error reading firmSettings.json:', err);
  }

  memorySettings = DEFAULT_FIRM_SETTINGS;
  return memorySettings;
}

export async function getAdminSettingsAction(): Promise<FirmSettings> {
  return getFirmSettings();
}

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

    const current = await getFirmSettings();
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
      },
      recognition: {
        ...current.recognition,
        ...(newSettings.recognition || {}),
      },
      gallery: {
        ...current.gallery,
        ...(newSettings.gallery || {}),
        items: newSettings.gallery?.items ?? current.gallery.items,
      },
    };

    memorySettings = updated;

    try {
      const filePath = getSettingsFilePath();
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Could not persist settings to file (read-only environment), keeping in memory:', fsErr);
    }

    // Revalidate all pages so updates are immediately visible live
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/our-team');
    revalidatePath('/practices');
    revalidatePath('/articles');
    revalidatePath('/faq');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');

    return { success: true, settings: updated, message: 'All website settings and content updated successfully!' };
  } catch (err) {
    console.error('Error updating admin settings:', err);
    return { success: false, settings: memorySettings || DEFAULT_FIRM_SETTINGS, message: 'Failed to update settings.' };
  }
}


