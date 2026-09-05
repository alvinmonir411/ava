'use server';

import { PRACTICE_AREAS } from '@/db/seedData';
import { PracticeArea } from '@/types';
import { revalidatePath } from 'next/cache';

// In-memory mutable store for practice areas modifications
let runtimePractices: PracticeArea[] = [...PRACTICE_AREAS];

export async function getAdminPracticesAction(): Promise<PracticeArea[]> {
  return runtimePractices;
}

export async function updatePracticeAreaAction(
  slug: string,
  updatedData: Partial<PracticeArea>
): Promise<{ success: boolean; practice?: PracticeArea }> {
  const index = runtimePractices.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { success: false };
  }

  runtimePractices[index] = {
    ...runtimePractices[index],
    ...updatedData,
  };

  revalidatePath('/practices');
  revalidatePath(`/practices/${slug}`);
  revalidatePath('/admin/practices');
  return { success: true, practice: runtimePractices[index] };
}
