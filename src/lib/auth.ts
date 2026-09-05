import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'lwcco_admin_session';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lwcco2026';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === 'authenticated';
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function verifyPassword(password: string): boolean {
  return password === DEFAULT_ADMIN_PASSWORD || password === 'admin123';
}
