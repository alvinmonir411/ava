'use server';

import { z } from 'zod';
import { db } from '@/db';
import { inquiries } from '@/db/schema';
import nodemailer from 'nodemailer';

const InquirySchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number (min 8 digits)'),
  practiceArea: z.string().min(1, 'Please select a practice area'),
  preferredDate: z.string().optional(),
  message: z.string().min(10, 'Please describe your legal matter (minimum 10 characters)'),
});

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitInquiry(prevState: unknown, formData: FormData): Promise<ActionResponse> {
  try {
    const rawData = {
      firstName: formData.get('firstName')?.toString().trim() || '',
      lastName: formData.get('lastName')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      practiceArea: formData.get('practiceArea')?.toString().trim() || '',
      preferredDate: formData.get('preferredDate')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
    };

    const validation = InquirySchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: 'Please correct the errors in the form.',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const data = validation.data;
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    // 1. Insert into Neon DB if configured
    if (db) {
      try {
        await db.insert(inquiries).values({
          name: fullName,
          email: data.email,
          phone: data.phone,
          practice_area: data.practiceArea,
          preferred_date: data.preferredDate || null,
          message: data.message,
          status: 'new',
        });
        console.log(`[DB] Inquiry saved for: ${fullName} (${data.email})`);
      } catch (dbErr) {
        console.error('[DB Error] Failed to save inquiry to database:', dbErr);
      }
    } else {
      console.log(`[Inquiry Received - DB connection pending] Name: ${fullName}, Practice: ${data.practiceArea}`);
    }

    // 2. Send email notification via Nodemailer
    const gmailUser = process.env.GMAIL_USER || 'lwclegal5@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const mailOptions = {
          from: `"LWCCO Website Inquiry" <${gmailUser}>`,
          to: 'lwclegal5@gmail.com',
          replyTo: data.email,
          subject: `[New Legal Consultation Request] ${data.practiceArea} - ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5DFD3; border-radius: 8px; background-color: #FFFFFF;">
              <h2 style="color: #4B2A7B; border-bottom: 2px solid #4B2A7B; padding-bottom: 8px;">New Consultation Request — LWCCO</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px; font-weight: bold; color: #2B2D33; width: 35%;">Client Name:</td><td style="padding: 8px; color: #2B2D33;">${fullName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #2B2D33;">Email:</td><td style="padding: 8px;"><a href="mailto:${data.email}" style="color: #4B2A7B;">${data.email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #2B2D33;">Phone:</td><td style="padding: 8px;"><a href="tel:${data.phone}" style="color: #4B2A7B;">${data.phone}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #2B2D33;">Practice Area:</td><td style="padding: 8px; color: #4B2A7B; font-weight: bold;">${data.practiceArea}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #2B2D33;">Preferred Date:</td><td style="padding: 8px; color: #2B2D33;">${data.preferredDate || 'Not specified'}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #FAF8F2; border-left: 4px solid #4B2A7B; border-radius: 4px;">
                <h4 style="margin: 0 0 8px 0; color: #2B2D33;">Client Message / Details:</h4>
                <p style="margin: 0; white-space: pre-wrap; color: #2B2D33;">${data.message}</p>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">Received via Messrs. Low Wah Chin & Co. (LWCCO) Law Firm Website.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Email Sent] Consultation alert delivered to lwclegal5@gmail.com`);
      } catch (mailErr) {
        console.error('[Email Error] Failed to send email alert:', mailErr);
      }
    }

    return {
      success: true,
      message: 'Your consultation request has been received. Our senior legal team will contact you within one business day.',
    };
  } catch (error) {
    console.error('[Server Action Error] submitInquiry:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while processing your request. Please try contacting us directly via WhatsApp or phone.',
    };
  }
}
