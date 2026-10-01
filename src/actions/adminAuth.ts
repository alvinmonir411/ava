'use server';

import {
  verifyPassword,
  setAdminSession,
  clearAdminSession,
  checkRateLimit,
  recordFailedAttempt,
  recordSuccessfulAttempt,
  changeAdminPassword,
} from '@/lib/auth';
import { isAuthenticated } from '@/lib/auth';
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

  if (!await verifyPassword(password)) {
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

export type ChangePasswordResult = {
  success: boolean;
  message: string;
};

export async function changePasswordAction(
  prevState: unknown,
  formData: FormData
): Promise<ChangePasswordResult> {
  // Must be authenticated to change password
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return { success: false, message: 'Unauthorized. Please log in first.' };
  }

  const currentPassword = formData.get('currentPassword')?.toString() || '';
  const newPassword = formData.get('newPassword')?.toString() || '';
  const confirmPassword = formData.get('confirmPassword')?.toString() || '';

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: 'All three password fields are required.' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: 'New password and confirm password do not match.' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }

  if (newPassword === currentPassword) {
    return { success: false, message: 'New password must be different from the current password.' };
  }

  return changeAdminPassword(currentPassword, newPassword);
}
