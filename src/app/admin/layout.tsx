import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Note: /admin/login handles its own layout and redirects if already authenticated
  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col lg:flex-row text-white font-sans antialiased">
      <AdminSidebar />
      <main className="flex-1 min-w-0 flex flex-col bg-[#070D18] overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
