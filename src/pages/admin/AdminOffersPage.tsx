import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  AdminPageHeader, AdminTable, Modal, InputField, TextareaField,
  SelectField, ConfirmDialog, Spinner, ErrorBox, EmptyState, Pagination
} from '../../components/ui/index';
import { useAdminOffers } from '../../hooks/useOffers';
import { useToast } from '../../context/ToastContext';
import { CreateOfferRequest, Offer, OfferType } from '../../types';
import { extractApiError } from '../../services/api';

const EMPTY: CreateOfferRequest = {
  title: '', type: OfferType.Percentage, value: 0,
  description: '', startDate: '', endDate: '', isActive: true,
};

const typeOptions = [
  { value: OfferType.Percentage, label: 'خصم نسبي (%)' },
  { value: OfferType.Fixed, label: 'خصم ثابت (ج.م)' },
  { value: OfferType.Bundle, label: 'باقة خاصة' },
];

const AdminOffersPage: React.FC = () => {
  const {
    offers, loading, error, create, update, remove,
    pageNumber, totalPages, totalCount, hasPreviousPage, hasNextPage, goToPage,
  } = useAdminOffers();
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [form, setForm] = useState<CreateOfferRequest>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const toDateInput = (iso: string) => iso ? iso.split('T')[0] : '';

  const openCreate = () => {
    setEditing(null);
    const today = new Date().toISOString().split('T')[0];
    setForm({ ...EMPTY, startDate: today + 'T00:00:00Z', endDate: today + 'T23:59:59Z' });
    setModalOpen(true);
  };

  const openEdit = (o: Offer) => {
    setEditing(o);
    setForm({
      title: o.title, type: o.type, value: o.value,
      description: o.description, startDate: o.startDate,
      endDate: o.endDate, isActive: o.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await update(editing.id, form);
        toast.success('تم تعديل العرض بنجاح');
      } else {
        await create(form);
        toast.success('تمت إضافة العرض بنجاح');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(extractApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await remove(deleteId);
      toast.success('تم حذف العرض');
    } catch (err) {
      toast.error(extractApiError(err));
    }
    setDeleteId(null);
  };

  const handleToggleActive = async (o: Offer) => {
    try {
      await update(o.id, { isActive: !o.isActive });
      toast.success(o.isActive ? 'تم تعطيل العرض' : 'تم تفعيل العرض');
    } catch (err) {
      toast.error(extractApiError(err));
    }
  };

  const typeLabel = (t: OfferType) => typeOptions.find(o => Number(o.value) === Number(t))?.label || '—';

  return (
    <AdminLayout>
      <div dir="rtl">
        <AdminPageHeader
          title="إدارة العروض"
          subtitle={`${totalCount} عرض — ${offers.filter(o => o.isActive).length} نشط`}
          action={
            <button onClick={openCreate} className="btn-primary flex items-center gap-2 py-2.5 px-5">
              <Plus className="w-4 h-4" /> إضافة عرض
            </button>
          }
        />

        {loading ? <Spinner /> : error ? <ErrorBox message={error} /> : offers.length === 0 ? (
          <EmptyState message="لا توجد عروض بعد" icon={<Tag className="w-10 h-10" />} />
        ) : (
          <>
            <AdminTable headers={['العرض', 'النوع', 'القيمة', 'تاريخ الانتهاء', 'الحالة', 'إجراءات']}>
              {offers.map(o => (
                <tr key={o.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="font-sans text-white text-sm font-medium">{o.title}</span>
                  </td>
                  <td className="px-4 py-3.5 font-sans text-white/50 text-xs">{typeLabel(o.type)}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-display text-sand-400 font-bold text-base">
                      {o.type === OfferType.Percentage ? `${o.value}٪` : `${o.value.toLocaleString('ar-EG')} ج.م`}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-sans text-white/40 text-xs">
                    {new Date(o.endDate).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => handleToggleActive(o)}
                      className="flex items-center gap-1.5 transition-colors"
                    >
                      {o.isActive
                        ? <><ToggleRight className="w-5 h-5 text-green-400" /><span className="font-sans text-xs text-green-400">نشط</span></>
                        : <><ToggleLeft className="w-5 h-5 text-white/20" /><span className="font-sans text-xs text-white/30">معطل</span></>
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(o)} className="p-1.5 text-white/30 hover:text-sand-400 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(o.id)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </AdminTable>
            <Pagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              onPageChange={goToPage}
            />
          </>
        )}

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'تعديل العرض' : 'إضافة عرض جديد'}>
          <form onSubmit={handleSave} className="space-y-4">
            <InputField label="عنوان العرض *" required value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="خصم موسم الصيف" />
            <SelectField label="نوع العرض *" options={typeOptions} value={form.type}
              onChange={e => setForm({ ...form, type: Number(e.target.value) as OfferType })} />
            <InputField
              label={form.type === OfferType.Percentage ? 'قيمة الخصم (%)' : 'قيمة الخصم (ج.م)'}
              type="number" required value={form.value}
              onChange={e => setForm({ ...form, value: Number(e.target.value) })}
            />
            <TextareaField label="وصف العرض" rows={3} value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="تفاصيل العرض..." />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="تاريخ البداية *" type="date" required
                value={toDateInput(form.startDate)}
                onChange={e => setForm({ ...form, startDate: e.target.value + 'T00:00:00Z' })} />
              <InputField label="تاريخ الانتهاء *" type="date" required
                value={toDateInput(form.endDate)}
                onChange={e => setForm({ ...form, endDate: e.target.value + 'T23:59:59Z' })} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-sand-500" />
              <span className="font-sans text-white/60 text-sm">تفعيل العرض فوراً</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 py-3">
                {saving ? 'جاري الحفظ...' : editing ? 'حفظ التعديلات' : 'إضافة العرض'}
              </button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 py-3">إلغاء</button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} message="هل أنت متأكد من حذف هذا العرض؟" />
      </div>
    </AdminLayout>
  );
};

export default AdminOffersPage;
