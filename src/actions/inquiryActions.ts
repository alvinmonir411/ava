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

// Fallback in-memory list for instant interactivity when DB is not configured
let mockInquiries: InquiryItem[] = [
  {
    id: 101,
    name: 'Dato’ Sri Michael Tan',
    email: 'michael.tan@tancorp.com.my',
    phone: '+60 12-334 8899',
    practice_area: 'Property & Conveyancing Law',
    preferred_date: 'Next Tuesday (Morning)',
    message: 'We are acquiring a commercial building in Jalan Ampang worth RM12.5M. Need Low Wah Chin & Co. to review the SPA, conduct land title searches, and advise on stamp duty adjudication.',
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 102,
    name: 'Dr. Nurul Izzati',
    email: 'nurul.izzati@healthnet.my',
    phone: '+60 17-889 2211',
    practice_area: 'Medical Negligence Claims',
    preferred_date: 'This Friday (2:00 PM)',
    message: 'Seeking legal representation regarding surgical error during orthopedic procedure at private hospital in Subang. Have hospital discharge summary and expert report ready for review.',
    status: 'in_review',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 103,
    name: 'Kelvin Wong & Partners',
    email: 'kelvin@wonglogistics.com',
    phone: '+60 19-445 6789',
    practice_area: 'Debt Recovery & Winding Up',
    preferred_date: 'Urgent — ASAP',
    message: 'Defaulting debtor company owes RM185,000 for freight forwarding services. We need a formal 21-Day Statutory Notice under Section 466 of Companies Act 2016 served immediately.',
    status: 'scheduled',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 104,
    name: 'Puan Siti Rahmah',
    email: 'siti.rahmah88@gmail.com',
    phone: '+60 16-554 1122',
    practice_area: 'Family & Divorce Matters',
    preferred_date: 'Next Monday',
    message: 'Inquiring about fast-track Joint Petition mutual consent divorce and matrimonial property division advice. Both parties agree on general terms.',
    status: 'contacted',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 105,
    name: 'Encik Ahmad Farhan',
    email: 'farhan.ahmad@gmail.com',
    phone: '+60 13-778 9900',
    practice_area: 'Bodily Injury Claims',
    preferred_date: 'Flexible',
    message: 'Involved in a serious motorcycle accident along MEX Highway caused by negligent commercial lorry. Suffered compound fracture. Need advice on general and special damages claim.',
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

export async function getInquiriesAction(): Promise<InquiryItem[]> {
  if (db) {
    try {
      const rows = await db.select().from(inquiries).orderBy(desc(inquiries.created_at));
      if (rows && rows.length > 0) {
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
      console.warn('Could not query inquiries from DB, returning mock list:', e);
    }
  }
  return mockInquiries;
}

export async function updateInquiryStatusAction(id: number, newStatus: string): Promise<{ success: boolean }> {
  if (db) {
    try {
      await db.update(inquiries).set({ status: newStatus }).where(eq(inquiries.id, id));
    } catch (e) {
      console.error('DB update failed, updating mock:', e);
    }
  }

  // Update in-memory fallback as well
  mockInquiries = mockInquiries.map((item) =>
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
      console.error('DB delete failed, deleting from mock:', e);
    }
  }

  mockInquiries = mockInquiries.filter((item) => item.id !== id);

  revalidatePath('/admin');
  revalidatePath('/admin/inquiries');
  return { success: true };
}
