import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

export function createWhatsAppLink(message?: string): string {
  const phone = '60175483157';
  const defaultMsg = message || "Hello Low Wah Chin & Co., I would like to inquire about legal consultation services.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;
}
