'use server';

import { verifyPassword, setAdminSession, clearAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export type LoginResult = {
  success: boolean;
  error?: string;
};

export async function loginAdminAction(prevState: unknown, formData: FormData): Promise<LoginResult> {
  const password = formData.get('password')?.toString() || '';

  if (!password) {
    return { success: false, error: 'Password is required' };
  }

  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid admin credentials. Please try again.' };
  }

  await setAdminSession();
  redirect('/admin');
}

export async function logoutAdminAction(): Promise<void> {
  await clearAdminSession();
  redirect('/admin/login');
}
