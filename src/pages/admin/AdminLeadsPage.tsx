import React, { useState } from 'react';
import { Users, Eye, Phone, MapPin, Calendar, Clock, User } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  AdminPageHeader,
  AdminTable,
  Modal,
  Spinner,
  ErrorBox,
  EmptyState,
  Badge,
  Pagination
} from '../../components/ui/index';

import { useAdminLeads } from '../../hooks/useOffers';
import { useToast } from '../../context/ToastContext';
import { BookingStatus, Lead } from '../../types';
import { extractApiError } from '../../services/api';

const statusOptions = [
  { value: BookingStatus.Pending, label: 'معلق' },
  { value: BookingStatus.Confirmed, label: 'مؤكد' },
  { value: BookingStatus.Cancelled, label: 'ملغي' },
];

const statusBadge = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.Confirmed:
      return <Badge label="مؤكد" color="green" />;
    case BookingStatus.Cancelled:
      return <Badge label="ملغي" color="red" />;
    default:
      return <Badge label="معلق" color="gold" />;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const AdminLeadsPage: React.FC = () => {
  const {
    leads,
    loading,
    error,
    updateStatus,
    pageNumber,
    totalPages,
    totalCount,
    hasPreviousPage,
    hasNextPage,
    goToPage,
  } = useAdminLeads();

  const toast = useToast();
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // ===== فلترة =====
  const filtered =
    filterStatus === 'all'
      ? leads
      : leads.filter(l => l.status === Number(filterStatus));

  // ===== counts (من البيانات الحالية) =====
  const counts = {
    all: leads.length,
    pending: leads.filter(l => l.status === BookingStatus.Pending).length,
    confirmed: leads.filter(l => l.status === BookingStatus.Confirmed).length,
    cancelled: leads.filter(l => l.status === BookingStatus.Cancelled).length,
  };

  const handleStatusChange = async (id: string, status: BookingStatus) => {
    try {
      await updateStatus(id, status);
      toast.success('تم تحديث حالة الطلب');

      if (viewLead?.id === id) {
        setViewLead(prev => (prev ? { ...prev, status } : null));
      }
    } catch (err) {
      toast.error(extractApiError(err));
    }
  };

  return (
    <AdminLayout>
      <div dir="rtl">

        <AdminPageHeader
          title="إدارة الطلبات"
          subtitle={`${totalCount} طلب — ${counts.pending} معلق`}
        />

        {/* ===== Filters ===== */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { key: 'all', label: `الكل (${counts.all})` },
            { key: String(BookingStatus.Pending), label: `معلق (${counts.pending})` },
            { key: String(BookingStatus.Confirmed), label: `مؤكد (${counts.confirmed})` },
            { key: String(BookingStatus.Cancelled), label: `ملغي (${counts.cancelled})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`font-sans text-xs px-4 py-2 rounded-full border transition-all ${
                filterStatus === tab.key
                  ? 'bg-sand-500/15 border-sand-500/40 text-sand-400'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== States ===== */}
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorBox message={error} />
        ) : filtered.length === 0 ? (
          <EmptyState
            message="لا توجد طلبات"
            icon={<Users className="w-10 h-10" />}
          />
        ) : (
          <>
            <AdminTable headers={['العميل', 'الهاتف', 'المسافرون', 'الوجهة', 'المغادرة', 'تاريخ السفر', 'المدة', 'الحالة', 'الإنشاء', 'الإجراءات']}>

              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-white/2 transition-colors">

                  {/* Name */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sand-500/15 flex items-center justify-center">
                        <span className="text-sand-400 font-bold">
                          {lead.name?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-white text-sm">{lead.name}</span>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-3.5 text-white/60 text-sm">
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </a>
                  </td>

                  {/* Travelers Count */}
                  <td className="px-4 py-3.5 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {lead.travelersCount}
                    </div>
                  </td>

                  {/* Destination Name */}
                  <td className="px-4 py-3.5 text-white/60 text-sm">
                    {lead.destinationName || '—'}
                  </td>

                  {/* Departure City */}
                  <td className="px-4 py-3.5 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {lead.departureCity}
                    </div>
                  </td>

                  {/* Travel Date */}
                  <td className="px-4 py-3.5 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(lead.travelDate)}
                    </div>
                  </td>

                  {/* Duration Days */}
                  <td className="px-4 py-3.5 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lead.durationDays} يوم
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    {statusBadge(lead.status)}
                  </td>

                  {/* Created At */}
                  <td className="px-4 py-3.5 text-white/60 text-xs">
                    {formatDate(lead.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(
                            lead.id,
                            Number(e.target.value) as BookingStatus
                          )
                        }
                        className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
                      >
                        {statusOptions.map(s => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setViewLead(lead)}
                        className="text-white/40 hover:text-sand-400"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </AdminTable>

            {/* ===== Pagination ===== */}
            <Pagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              onPageChange={goToPage}
            />
          </>
        )}

        {/* ===== Modal ===== */}
        <Modal
          open={!!viewLead}
          onClose={() => setViewLead(null)}
          title="تفاصيل الطلب"
        >
          {viewLead && (
            <div className="space-y-6" dir="rtl">

              <div className="border-b border-white/10 pb-4">
                <h3 className="text-white text-lg font-bold">
                  {viewLead.name}
                </h3>
                {statusBadge(viewLead.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-white/70 text-sm">
                  <Phone className="inline w-4 h-4 mr-1" />
                  الهاتف: {viewLead.phone}
                </div>

                <div className="text-white/70 text-sm">
                  <User className="inline w-4 h-4 mr-1" />
                  عدد المسافرين: {viewLead.travelersCount}
                </div>

                <div className="text-white/70 text-sm">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  الوجهة: {viewLead.destinationName || '—'}
                </div>

                <div className="text-white/70 text-sm">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  مدينة المغادرة: {viewLead.departureCity}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-white text-md font-semibold mb-3">معلومات السفر</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-white/70 text-sm">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    تاريخ السفر: {formatDate(viewLead.travelDate)}
                  </div>

                  <div className="text-white/70 text-sm">
                    <Clock className="inline w-4 h-4 mr-1" />
                    المدة: {viewLead.durationDays} يوم
                  </div>

                  <div className="text-white/70 text-sm">
                    تاريخ الإنشاء: {formatDate(viewLead.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </AdminLayout>
  );
};

export default AdminLeadsPage;