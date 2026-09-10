'use server';

import {
  verifyPassword,
  setAdminSession,
  clearAdminSession,
  checkRateLimit,
  recordFailedAttempt,
  recordSuccessfulAttempt,
} from '@/lib/auth';
import { redirect } from 'next/navigation';

export type LoginResult = {
  success: boolean;
  error?: string;
};

export async function loginAdminAction(prevState: unknown, formData: FormData): Promise<LoginResult> {
  const password = formData.get('password')?.toString() || '';

  // Check brute force rate limit
  const rateLimit = checkRateLimit('admin_login');
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Too many failed attempts. Access locked for ${Math.ceil((rateLimit.waitSeconds || 60) / 60)} minutes for security.`,
    };
  }

  if (!password) {
    return { success: false, error: 'Admin password is required.' };
  }

  if (!verifyPassword(password)) {
    recordFailedAttempt('admin_login');
    return { success: false, error: 'Invalid admin credentials. Please try again.' };
  }

  // Clear failed attempts counter on success
  recordSuccessfulAttempt('admin_login');
  await setAdminSession();
  redirect('/admin');
}

export async function logoutAdminAction(): Promise<void> {
  await clearAdminSession();
  redirect('/admin/login');
}

