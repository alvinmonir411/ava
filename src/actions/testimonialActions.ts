'use server';

import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { TESTIMONIALS_DATA } from '@/db/seedData';
import { Testimonial } from '@/types';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

let runtimeTestimonials: Testimonial[] = [...TESTIMONIALS_DATA];

export async function getAdminTestimonialsAction(): Promise<Testimonial[]> {
  if (db) {
    try {
      const rows = await db.select().from(testimonials).orderBy(desc(testimonials.published_at));
      if (rows && rows.length > 0) {
        return rows.map((t) => ({
          id: t.id,
          client_name: t.client_name,
          title: 'Verified Client',
          location: 'Kuala Lumpur',
          quote: t.quote,
          practice_area: t.practice_area,
          rating: t.rating,
          source: t.source,
          published_at: t.published_at.toISOString(),
        }));
      }
    } catch (e) {
      console.warn('DB read failed for testimonials, fallback:', e);
    }
  }
  return runtimeTestimonials;
}

export async function saveTestimonialAction(item: Partial<Testimonial>): Promise<{ success: boolean; testimonial?: Testimonial }> {
  if (db) {
    try {
      if (item.id && typeof item.id === 'number') {
        await db
          .update(testimonials)
          .set({
            client_name: item.client_name,
            quote: item.quote,
            practice_area: item.practice_area,
            rating: item.rating,
            source: item.source,
          })
          .where(eq(testimonials.id, item.id));

        revalidatePath('/');
        revalidatePath('/admin/testimonials');
        return { success: true, testimonial: item as Testimonial };
      } else {
        const inserted = await db
          .insert(testimonials)
          .values({
            client_name: item.client_name || 'Verified Client',
            quote: item.quote || '',
            practice_area: item.practice_area || 'General Legal Practice',
            rating: item.rating || 5,
            source: item.source || 'Verified Client Review',
          })
          .returning();

        if (inserted && inserted[0]) {
          const t = inserted[0];
          const newT: Testimonial = {
            id: t.id,
            client_name: t.client_name,
            title: 'Verified Client',
            location: 'Kuala Lumpur',
            quote: t.quote,
            practice_area: t.practice_area,
            rating: t.rating,
            source: t.source,
            published_at: t.published_at.toISOString(),
          };
          revalidatePath('/');
          revalidatePath('/admin/testimonials');
          return { success: true, testimonial: newT };
        }
      }
    } catch (e) {
      console.error('DB save failed for testimonial:', e);
    }
  }

  // Fallback in-memory
  if (item.id) {
    const idx = runtimeTestimonials.findIndex((t) => t.id === item.id);
    if (idx !== -1) {
      runtimeTestimonials[idx] = {
        ...runtimeTestimonials[idx],
        ...item,
      } as Testimonial;
      revalidatePath('/');
      revalidatePath('/admin/testimonials');
      return { success: true, testimonial: runtimeTestimonials[idx] };
    }
  }

  const numericIds = runtimeTestimonials.map((t) => Number(t.id)).filter((n) => !isNaN(n));
  const newId = (numericIds.length > 0 ? Math.max(...numericIds) : 0) + 1;
  const newTestimonial: Testimonial = {
    id: newId,
    client_name: item.client_name || 'Anonymous Client',
    title: item.title || 'Client',
    location: item.location || 'Kuala Lumpur',
    quote: item.quote || '',
    practice_area: item.practice_area || 'General Legal Practice',
    rating: item.rating || 5,
    source: item.source || 'Verified Client',
  };

  runtimeTestimonials.unshift(newTestimonial);
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true, testimonial: newTestimonial };
}

export async function deleteTestimonialAction(id: string | number): Promise<{ success: boolean }> {
  if (db && typeof id === 'number') {
    try {
      await db.delete(testimonials).where(eq(testimonials.id, id));
    } catch (e) {
      console.error('DB delete failed for testimonial:', e);
    }
  }
  runtimeTestimonials = runtimeTestimonials.filter((t) => String(t.id) !== String(id));
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true };
}
