'use server';

import { TESTIMONIALS_DATA } from '@/db/seedData';
import { Testimonial } from '@/types';
import { revalidatePath } from 'next/cache';

let runtimeTestimonials: Testimonial[] = [...TESTIMONIALS_DATA];

export async function getAdminTestimonialsAction(): Promise<Testimonial[]> {
  return runtimeTestimonials;
}

export async function saveTestimonialAction(item: Partial<Testimonial>): Promise<{ success: boolean; testimonial?: Testimonial }> {
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
  runtimeTestimonials = runtimeTestimonials.filter((t) => String(t.id) !== String(id));
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true };
}
