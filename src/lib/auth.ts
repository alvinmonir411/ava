import { cookies } from 'next/headers';
import crypto from 'crypto';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_COOKIE_NAME = 'lwcco_admin_secure_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'lwcco_secure_hmac_secret_key_2026_9837194721934_auth_guard';
const ENV_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '136633';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// ─── Rate Limiting ────────────────────────────────────────────────────────────
interface AttemptRecord {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const failedAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

// ─── Session Token ────────────────────────────────────────────────────────────
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
  if (now - timestamp > SESSION_MAX_AGE_SECONDS * 1000) return false;

  // Timing-safe HMAC verify
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

// ─── Password Hashing (SHA-256 + HMAC, no bcrypt needed) ─────────────────────
// We use HMAC-SHA256 with SESSION_SECRET so even if DB leaks, hashes are useless
function hashPassword(plain: string): string {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(plain.normalize('NFC'))
    .digest('hex');
}

function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');
    if (bufA.length !== bufB.length) {
      // Still do a comparison to prevent timing side-channels
      crypto.timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// ─── Get stored password hash from DB (falls back to env var) ────────────────
async function getStoredPasswordHash(): Promise<{ hash: string; isHashed: boolean }> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, 'admin_password_hash'))
        .limit(1);

      if (rows.length > 0 && rows[0].value) {
        const val = rows[0].value as { hash: string };
        if (val.hash) return { hash: val.hash, isHashed: true };
      }
    } catch {
      // Fall through to env fallback
    }
  }

  // Fallback: env var (treat as plain, hash it on the fly)
  return { hash: ENV_ADMIN_PASSWORD, isHashed: false };
}

// ─── Rate Limiting API ────────────────────────────────────────────────────────
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
  if (record.count >= MAX_ATTEMPTS) record.lockedUntil = now + LOCKOUT_MS;
  failedAttempts.set(identifier, record);
}

export function recordSuccessfulAttempt(identifier: string = 'global'): void {
  failedAttempts.delete(identifier);
}

// ─── Session Management ───────────────────────────────────────────────────────
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
    sameSite: 'strict',
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

// ─── Password Verification ────────────────────────────────────────────────────
export async function verifyPassword(password: string): Promise<boolean> {
  if (!password || typeof password !== 'string') return false;

  try {
    const { hash, isHashed } = await getStoredPasswordHash();

    if (isHashed) {
      // DB-stored HMAC hash — compare hash of input with stored hash
      const inputHash = hashPassword(password);
      return timingSafeCompare(inputHash, hash);
    } else {
      // Env var plain text — compare directly (timing-safe)
      const a = Buffer.from(password.normalize('NFC'));
      const b = Buffer.from(hash.normalize('NFC'));
      if (a.length !== b.length) {
        crypto.timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
        return false;
      }
      return crypto.timingSafeEqual(a, b);
    }
  } catch {
    return false;
  }
}

// ─── Change Password (saves hashed to DB) ────────────────────────────────────
export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  // Validate new password
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }
  if (newPassword.length > 128) {
    return { success: false, message: 'Password is too long (max 128 characters).' };
  }

  // Verify current password first
  const isValid = await verifyPassword(currentPassword);
  if (!isValid) {
    return { success: false, message: 'Current password is incorrect.' };
  }

  // Hash new password and store in DB
  const newHash = hashPassword(newPassword);

  if (db) {
    try {
      await db
        .insert(siteSettings)
        .values({
          key: 'admin_password_hash',
          value: { hash: newHash } as unknown as Record<string, unknown>,
          updated_at: new Date(),
        })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: {
            value: { hash: newHash } as unknown as Record<string, unknown>,
            updated_at: new Date(),
          },
        });

      return { success: true, message: 'Password changed successfully. You will need to use the new password on next login.' };
    } catch (err) {
      console.error('[Auth] Failed to save new password hash to DB:', err);
      return { success: false, message: 'Failed to save new password to database. Please try again.' };
    }
  }

  return { success: false, message: 'Database not configured. Cannot change password.' };
}
