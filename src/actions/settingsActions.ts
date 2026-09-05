'use server';

import { SITE_CONFIG } from '@/lib/metadata';
import { revalidatePath } from 'next/cache';

export interface FirmSettings {
  companyName: string;
  qualificationTitle: string;
  barCouncilNumber: string;
  phone: string;
  email: string;
  streetAddress: string;
  operatingHours: string;
  googleMapsUrl: string;
}

let runtimeSettings: FirmSettings = {
  companyName: 'Low Wah Chin & Co.',
  qualificationTitle: 'Advocates & Solicitors',
  barCouncilNumber: 'Member of the Malaysian Bar Council No. BC/L/2019',
  phone: '+60 17-548 3157',
  email: 'lwclegal5@gmail.com',
  streetAddress: 'Colony @ KLCC, Level 1, Vipod Residences, 6 Jalan Kia Peng, 50450 Kuala Lumpur',
  operatingHours: 'Monday – Friday: 9:00 AM – 5:30 PM (Sat & Sun Closed)',
  googleMapsUrl: 'https://maps.google.com/?q=Colony+at+KLCC+Vipod+Residences',
};

export async function getAdminSettingsAction(): Promise<FirmSettings> {
  return runtimeSettings;
}

export async function updateAdminSettingsAction(newSettings: Partial<FirmSettings>): Promise<{ success: boolean; settings: FirmSettings }> {
  runtimeSettings = {
    ...runtimeSettings,
    ...newSettings,
  };

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/admin/settings');
  return { success: true, settings: runtimeSettings };
}
