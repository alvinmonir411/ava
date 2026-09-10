'use server';

import cloudinary from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function uploadImageAction(formData: FormData): Promise<{
  success: boolean;
  url?: string;
  public_id?: string;
  error?: string;
}> {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return { success: false, error: 'Unauthorized: Please log in to upload images.' };
    }

    const file = formData.get('file') as File | null;
    if (!file) {
      return { success: false, error: 'No file was provided for upload.' };
    }

    // Check size limit: 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { success: false, error: 'File exceeds maximum limit of 10MB.' };
    }

    // Convert file to base64 Data URI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    // Upload directly to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'lwcco_law_firm',
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err: unknown) {
    console.error('Cloudinary upload error:', err);
    const msg = err instanceof Error ? err.message : 'Unknown upload error occurred.';
    return { success: false, error: `Upload failed: ${msg}` };
  }
}
