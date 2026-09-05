'use server';

import { db } from '@/db';
import { inquiries } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface InquiryItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  practice_area: string;
  preferred_date?: string | null;
  message: string;
  status: string;
  created_at: string;
}

// In-memory runtime fallback for inquiries received during session
let runtimeInquiries: InquiryItem[] = [];

export async function getInquiriesAction(): Promise<InquiryItem[]> {
  if (db) {
    try {
      const rows = await db.select().from(inquiries).orderBy(desc(inquiries.created_at));
      if (rows) {
        return rows.map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          practice_area: r.practice_area,
          preferred_date: r.preferred_date,
          message: r.message,
          status: r.status,
          created_at: r.created_at.toISOString(),
        }));
      }
    } catch (e) {
      console.warn('[DB Error] Could not query inquiries from Neon DB:', e);
    }
  }
  return runtimeInquiries;
}

export async function updateInquiryStatusAction(id: number, newStatus: string): Promise<{ success: boolean }> {
  if (db) {
    try {
      await db.update(inquiries).set({ status: newStatus }).where(eq(inquiries.id, id));
    } catch (e) {
      console.error('[DB Error] Failed to update inquiry status in DB:', e);
    }
  }

  runtimeInquiries = runtimeInquiries.map((item) =>
    item.id === id ? { ...item, status: newStatus } : item
  );

  revalidatePath('/admin');
  revalidatePath('/admin/inquiries');
  return { success: true };
}

export async function deleteInquiryAction(id: number): Promise<{ success: boolean }> {
  if (db) {
    try {
      await db.delete(inquiries).where(eq(inquiries.id, id));
    } catch (e) {
      console.error('[DB Error] Failed to delete inquiry from DB:', e);
    }
  }

  runtimeInquiries = runtimeInquiries.filter((item) => item.id !== id);

  revalidatePath('/admin');
  revalidatePath('/admin/inquiries');
  return { success: true };
}
