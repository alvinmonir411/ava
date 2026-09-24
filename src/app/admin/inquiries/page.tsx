'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  getInquiriesAction,
  updateInquiryStatusAction,
  deleteInquiryAction,
  InquiryItem,
} from '@/actions/inquiryActions';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';
import {
  Inbox,
  Search,
  Download,
  Phone,
  MessageCircle,
  Trash2,
  Calendar,
  Eye,
  X,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  new: { label: 'New Lead', bg: 'bg-rose-950/60', text: 'text-rose-300', border: 'border-rose-500/40' },
  in_review: { label: 'In Review', bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-500/40' },
  scheduled: { label: 'Scheduled', bg: 'bg-sky-950/60', text: 'text-sky-300', border: 'border-sky-500/40' },
  contacted: { label: 'Contacted', bg: 'bg-purple-950/60', text: 'text-purple-300', border: 'border-purple-500/40' },
  completed: { label: 'Completed', bg: 'bg-emerald-950/60', text: 'text-emerald-300', border: 'border-emerald-500/40' },
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<InquiryItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadInquiries = () => {
    startTransition(async () => {
      const data = await getInquiriesAction();
      setInquiries(data);
    });
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    startTransition(async () => {
      await updateInquiryStatusAction(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      const label = STATUS_CONFIG[newStatus]?.label || newStatus;
      toast.success(`Inquiry status updated to "${label}"`);
    });
  };

  const confirmDelete = () => {
    if (!inquiryToDelete) return;
    const id = inquiryToDelete.id;
    const clientName = inquiryToDelete.name;

    startTransition(async () => {
      await deleteInquiryAction(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      setInquiryToDelete(null);
      toast.success(`Deleted consultation inquiry for ${clientName}`);
    });
  };

  const exportToCSV = () => {
    if (filteredInquiries.length === 0) {
      toast.info('No inquiries to export.');
      return;
    }

    const headers = ['ID', 'Client Name', 'Email', 'Phone', 'Practice Area', 'Preferred Date', 'Status', 'Date Submitted', 'Message'];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.practice_area.replace(/"/g, '""')}"`,
      `"${(i.preferred_date || '').replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${new Date(i.created_at).toLocaleString('en-MY')}"`,
      `"${i.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LWCCO_Consultation_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredInquiries.length} inquiries to CSV`);
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.practice_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Consultation Inquiries & Leads CRM"
        subtitle="Track incoming client booking requests, update case statuses, and communicate directly via WhatsApp."
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadInquiries();
                toast.info('Refreshed leads from Neon database');
              }}
              className="p-2 rounded-lg bg-white text-[#4B2A7B] border border-[#E5DFD3] hover:bg-[#FAF8F2] transition-colors shadow-xs"
              title="Refresh Database"
            >
              <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportToCSV}
              className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1800px] w-full mx-auto space-y-6">
        {/* Controls Bar: Search & Status Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DFD3] flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4B2A7B]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by client name, phone, email, or practice area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#2B2D33] placeholder-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 md:pb-0 scroll-smooth">
            {[
              { key: 'all', label: `All (${inquiries.length})` },
              { key: 'new', label: `New (${inquiries.filter((i) => i.status === 'new').length})` },
              { key: 'in_review', label: 'In Review' },
              { key: 'scheduled', label: 'Scheduled' },
              { key: 'contacted', label: 'Contacted' },
              { key: 'completed', label: 'Completed' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                  statusFilter === tab.key
                    ? 'bg-[#4B2A7B] text-white font-bold shadow-xs'
                    : 'bg-[#FAF8F2] text-[#2B2D33]/70 hover:text-[#2B2D33] border border-[#E5DFD3] hover:border-[#4B2A7B]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table Card */}
        <div className="bg-white border border-[#E5DFD3] rounded-3xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8F2] text-[#4B2A7B] border-b border-[#E5DFD3] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Client Name & Details</th>
                  <th className="py-3.5 px-4">Practice Discipline</th>
                  <th className="py-3.5 px-4">Preferred Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3] text-xs text-[#2B2D33]">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-[#2B2D33]/50">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] text-[#4B2A7B] mx-auto flex items-center justify-center mb-3">
                        <Inbox className="w-6 h-6" />
                      </div>
                      <strong className="text-sm font-bold text-[#2B2D33] block mb-1">
                        No Consultation Inquiries Found
                      </strong>
                      <p className="text-xs text-[#2B2D33]/50 max-w-sm mx-auto">
                        New client consultation requests from your booking forms will appear here live.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => {
                    const statusCfg = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.new;
                    const cleanPhone = inquiry.phone.replace(/[^0-9+]/g, '');
                    const waLink = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                      `Hello ${inquiry.name}, this is Low Wah Chin & Co. regarding your legal consultation request on ${inquiry.practice_area}.`
                    )}`;

                    return (
                      <tr
                        key={inquiry.id}
                        className="hover:bg-[#FAF8F2]/70 transition-colors"
                      >
                        {/* Name & Contact */}
                        <td className="py-3.5 px-4">
                          <strong className="text-sm font-bold text-[#2B2D33] block">
                            {inquiry.name}
                          </strong>
                          <div className="text-[11px] text-[#2B2D33]/60 space-y-0.5 mt-0.5">
                            <span>{inquiry.phone}</span> â€¢ <span>{inquiry.email}</span>
                          </div>
                        </td>

                        {/* Practice */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#4B2A7B]">
                            {inquiry.practice_area}
                          </span>
                        </td>

                        {/* Preferred Date */}
                        <td className="py-3.5 px-4 text-[#2B2D33]/70">
                          {inquiry.preferred_date || 'Flexible / ASAP'}
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4">
                          <select
                            value={inquiry.status}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-[#E5DFD3] bg-white text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B] cursor-pointer"
                          >
                            <option value="new">New Lead</option>
                            <option value="in_review">In Review</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-[#2B2D33]/60 text-[11px]">
                          {new Date(inquiry.created_at).toLocaleDateString('en-MY')}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="p-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5DFD3] text-[#4B2A7B] hover:bg-[#4B2A7B] hover:text-white transition-colors"
                              title="View Full Brief"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                              title="Direct WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            <a
                              href={`tel:${inquiry.phone}`}
                              className="p-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5DFD3] text-[#4B2A7B] hover:bg-[#4B2A7B] hover:text-white transition-colors"
                              title="Call Client"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => setInquiryToDelete(inquiry)}
                              className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sleek Delete Confirmation Modal */}
      {inquiryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2D33]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2B2D33]">
                  Delete Consultation Record
                </h3>
                <p className="text-xs text-[#2B2D33]/60">
                  This action permanently removes the record from Neon database.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs space-y-1">
              <p className="text-[#2B2D33] font-bold">{inquiryToDelete.name}</p>
              <p className="text-[#4B2A7B] font-semibold">{inquiryToDelete.practice_area}</p>
              <p className="text-[#2B2D33]/60">{inquiryToDelete.phone} â€¢ {inquiryToDelete.email}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setInquiryToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#FAF8F2] text-[#2B2D33] border border-[#E5DFD3] text-xs font-semibold hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isPending ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2B2D33]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white border border-[#E5DFD3] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5DFD3] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#4B2A7B] block">
                  Consultation Brief Record #{selectedInquiry.id}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33] mt-1">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-[#2B2D33]/60 hover:text-[#2B2D33] hover:bg-[#FAF8F2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3]">
                <span className="text-[#2B2D33]/50 block font-semibold mb-1">Phone Number:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="text-sm font-bold text-[#2B2D33] hover:text-[#4B2A7B]">
                  {selectedInquiry.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3]">
                <span className="text-[#2B2D33]/50 block font-semibold mb-1">Email Address:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-bold text-[#2B2D33] hover:text-[#4B2A7B] truncate block">
                  {selectedInquiry.email}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3]">
                <span className="text-[#2B2D33]/50 block font-semibold mb-1">Practice Area:</span>
                <span className="text-sm font-bold text-[#4B2A7B] block">
                  {selectedInquiry.practice_area}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3]">
                <span className="text-[#2B2D33]/50 block font-semibold mb-1">Preferred Time:</span>
                <span className="text-sm font-semibold text-[#2B2D33] block">
                  {selectedInquiry.preferred_date || 'Flexible / ASAP'}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2B2D33]/70 block mb-2">
                Client Description / Matter Specifics:
              </span>
              <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs sm:text-sm text-[#2B2D33] whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5DFD3]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#2B2D33]/60">Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="px-3 py-1.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-xs font-bold text-[#4B2A7B] focus:outline-none focus:border-[#4B2A7B]"
                >
                  <option value="new">New Lead</option>
                  <option value="in_review">In Review</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedInquiry.name}, this is Low Wah Chin & Co. regarding your consultation inquiry.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F2] text-[#2B2D33] border border-[#E5DFD3] text-xs font-semibold hover:bg-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

