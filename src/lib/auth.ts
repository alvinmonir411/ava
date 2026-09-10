import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_COOKIE_NAME = 'lwcco_admin_secure_session';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '13663';
const SESSION_SECRET = process.env.SESSION_SECRET || 'lwcco_secure_hmac_secret_key_2026_9837194721934_auth_guard';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// In-memory rate limiting against brute force attacks
interface AttemptRecord {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const failedAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function generateSignedToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(`admin:${timestamp}`)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

function verifySignedToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration
  const now = Date.now();
  if (now - timestamp > SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  // Verify signature using timing-safe comparison
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(`admin:${timestampStr}`)
    .digest('hex');

  try {
    const a = Buffer.from(signature, 'hex');
    const b = Buffer.from(expectedSignature, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function checkRateLimit(identifier: string = 'global'): { allowed: boolean; waitSeconds?: number } {
  const record = failedAttempts.get(identifier);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil && now < record.lockedUntil) {
    const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  if (record.lockedUntil && now >= record.lockedUntil) {
    failedAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(identifier: string = 'global'): void {
  const now = Date.now();
  const record = failedAttempts.get(identifier) || { count: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }

  failedAttempts.set(identifier, record);
}

export function recordSuccessfulAttempt(identifier: string = 'global'): void {
  failedAttempts.delete(identifier);
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!session?.value) return false;
    return verifySignedToken(session.value);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = generateSignedToken();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });
}

export async function clearAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
  } catch {
    // ignore
  }
}

export function verifyPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;

  try {
    const a = Buffer.from(password.normalize('NFC'));
    const b = Buffer.from(ADMIN_PASSWORD.normalize('NFC'));
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

