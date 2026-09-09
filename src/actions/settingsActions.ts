'use server';

import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { FirmSettings, HeroImagesSettings, DEFAULT_FIRM_SETTINGS } from '@/types/settings';

export type { FirmSettings, HeroImagesSettings };

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
    const current = await getFirmSettings();
    const updated: FirmSettings = {
      ...current,
      ...newSettings,
      heroImages: {
        ...current.heroImages,
        ...(newSettings.heroImages || {}),
      },
    };

    memorySettings = updated;

    try {
      const filePath = getSettingsFilePath();
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Could not persist settings to file (read-only environment), keeping in memory:', fsErr);
    }

    // Revalidate all pages so the hero image and contact details immediately update
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/our-team');
    revalidatePath('/practices');
    revalidatePath('/articles');
    revalidatePath('/faq');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');

    return { success: true, settings: updated, message: 'Settings & Hero images updated successfully!' };
  } catch (err) {
    console.error('Error updating admin settings:', err);
    return { success: false, settings: memorySettings || DEFAULT_FIRM_SETTINGS, message: 'Failed to update settings.' };
  }
}
