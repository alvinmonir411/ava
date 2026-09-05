import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { Toaster } from 'sonner';
import { SITE_CONFIG, getLegalServiceSchema } from '@/lib/metadata';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Messrs. Low Wah Chin & Co. Advocates & Solicitors (LWCCO) | Kuala Lumpur Law Firm',
    template: '%s | LWCCO',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'law firm kuala lumpur',
    'advocates and solicitors malaysia',
    'low wah chin co',
    'lwcco',
    'personal injury lawyer kl',
    'property conveyancing lawyer kuala lumpur',
    'divorce lawyer malaysia',
    'will writing probate lawyer kl',
    'commercial dispute resolution kuala lumpur',
    'ava rachel low lawyer',
    'malaysian bar registered advocate'
  ],
  authors: [{ name: 'Low Wah Chin (Ava Rachel)' }],
  creator: 'Messrs. Low Wah Chin & Co.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLegalServiceSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#faf9f6] text-[#231f20] flex flex-col font-sans selection:bg-[#c6a052] selection:text-[#170b1e]">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton variant="floating" label="WhatsApp Us" />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#170b1e',
              color: '#faf9f6',
              border: '1px solid #c6a052',
              borderRadius: '12px',
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  );
}

