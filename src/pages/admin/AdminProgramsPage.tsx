import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  AdminPageHeader,
  AdminTable,
  Modal,
  InputField,
  TextareaField,
  SelectField,
  ConfirmDialog,
  Spinner,
  ErrorBox,
  EmptyState,
  Badge,
  Pagination,
} from '../../components/ui/index';
import GalleryUploadField from '../../components/ui/GalleryUploadField';
import { useAdminPrograms } from '../../hooks/usePrograms';
import { useAdminDestinations } from '../../hooks/useDestinations';
import { useToast } from '../../context/ToastContext';
import { Program } from '../../types';
import { extractApiError } from '../../services/api';

interface ProgramFormData {
  destinationId: string;
  title: string;
  slug: string;
  price: number;
  durationDays: number;
  maxPeople: number;
  includes: string;
  excludes: string;
  itineraryJson: string;
  galleryJson: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  active: boolean;
}

type ProgramApi = Program & {
  isActive?: boolean;
};

const EMPTY: ProgramFormData = {
  destinationId: '',
  title: '',
  slug: '',
  price: 0,
  durationDays: 1,
  maxPeople: 10,
  includes: '',
  excludes: '',
  itineraryJson: '[]',
  galleryJson: '[]',
  seoTitle: '',
  seoDescription: '',
  featured: false,
  active: true,
};

const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

const getProgramActive = (p: ProgramApi) => {
  if (typeof p.active === 'boolean') return p.active;
  if (typeof p.isActive === 'boolean') return p.isActive;
  return true;
};

const AdminProgramsPage: React.FC = () => {
  const {
    programs,
    loading,
    error,
    create,
    update,
    remove,
    pageNumber,
    totalPages,
    totalCount,
    hasPreviousPage,
    hasNextPage,
    goToPage,
  } = useAdminPrograms();

  const { destinations } = useAdminDestinations(100);
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProgramApi | null>(null);
  const [form, setForm] = useState<ProgramFormData>(EMPTY);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProgramFormData, string>>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (p: Program) => {
    const program = p as ProgramApi;

    setEditing(program);
    setForm({
      destinationId: program.destinationId,
      title: program.title,
      slug: program.slug,
      price: program.price,
      durationDays: program.durationDays,
      maxPeople: program.maxPeople,
      includes: program.includes || '',
      excludes: program.excludes || '',
      itineraryJson: (program as any).itineraryJson || '[]',
      galleryJson: (program as any).galleryJson || '[]',
      seoTitle: program.seoTitle || '',
      seoDescription: program.seoDescription || '',
      featured: program.featured ?? false,
      active: getProgramActive(program),
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ProgramFormData, string>> = {};

    if (!form.destinationId) errs.destinationId = 'اختر الوجهة';
    if (!form.title.trim()) errs.title = 'عنوان البرنامج مطلوب';
    if (!form.slug.trim()) errs.slug = 'الرابط مطلوب';
    if (form.price < 0) errs.price = 'السعر يجب أن يكون أكبر من أو يساوي صفر';
    if (form.durationDays < 1) errs.durationDays = 'المدة يجب أن تكون يوم على الأقل';
    if (form.maxPeople < 1) errs.maxPeople = 'يجب تحديد عدد الأشخاص';
    if (form.itineraryJson && !isValidJson(form.itineraryJson)) errs.itineraryJson = 'صيغة JSON غير صحيحة';
    if (form.galleryJson && !isValidJson(form.galleryJson)) errs.galleryJson = 'صيغة JSON غير صحيحة';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      const payload = {
        destinationId: form.destinationId,
        title: form.title.trim(),
        slug: form.slug.trim(),
        price: Number(form.price),
        durationDays: Number(form.durationDays),
        maxPeople: Number(form.maxPeople),
        includes: form.includes.trim(),
        excludes: form.excludes.trim(),
        itineraryJson: form.itineraryJson.trim() || '[]',
        galleryJson: form.galleryJson.trim() || '[]',
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
        featured: form.featured,
        active: form.active,
        isActive: form.active,
      };

      if (editing) {
        await update(editing.id, payload as any);
        toast.success('تم تعديل البرنامج بنجاح');
      } else {
        await create(payload as any);
        toast.success('تمت إضافة البرنامج بنجاح');
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
      toast.success('تم حذف البرنامج');
    } catch (err) {
      toast.error(extractApiError(err));
    }

    setDeleteId(null);
  };

  const destOptions = [
    { value: '', label: '-- اختر الوجهة --' },
    ...destinations.map((d) => ({ value: d.id, label: d.name })),
  ];

  return (
    <AdminLayout>
      <div dir="rtl">
        <AdminPageHeader
          title="إدارة البرامج"
          subtitle={`${totalCount} برنامج`}
          action={
            <button onClick={openCreate} className="btn-primary flex items-center gap-2 py-2.5 px-5">
              <Plus className="w-4 h-4" /> إضافة برنامج
            </button>
          }
        />

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorBox message={error} />
        ) : programs.length === 0 ? (
          <EmptyState message="لا توجد برامج بعد" icon={<Package className="w-10 h-10" />} />
        ) : (
          <>
            <AdminTable headers={['البرنامج', 'الوجهة', 'السعر', 'المدة', 'الحالة', 'مميز', 'إجراءات']}>
              {programs.map((p) => {
                const program = p as ProgramApi;
                const isActive = getProgramActive(program);

                return (
                  <tr key={program.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-sans text-white text-sm font-medium">{program.title}</span>
                    </td>
                    <td className="px-4 py-3.5 font-sans text-white/40 text-xs">
                      {destinations.find((d) => d.id === program.destinationId)?.name || '—'}
                    </td>
                    <td className="px-4 py-3.5 font-sans text-sand-400 text-sm font-semibold">
                      {Number(program.price || 0).toLocaleString('ar-EG')} ج.م
                    </td>
                    <td className="px-4 py-3.5 font-sans text-white/50 text-sm">
                      {program.durationDays} يوم
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge label={isActive ? 'نشط' : 'معطل'} color={isActive ? 'green' : 'red'} />
                    </td>
                    <td className="px-4 py-3.5">
                      {program.featured ? (
                        <Badge label="مميز" color="gold" />
                      ) : (
                        <span className="text-white/20 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(program)}
                          className="p-1.5 text-white/30 hover:text-sand-400 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(program.id)}
                          className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editing ? 'تعديل البرنامج' : 'إضافة برنامج جديد'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <SelectField
              label="الوجهة *"
              options={destOptions}
              value={form.destinationId}
              onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
              required
              error={formErrors.destinationId}
            />

            <InputField
              label="عنوان البرنامج *"
              required
              value={form.title}
              error={formErrors.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: editing ? form.slug : slugify(e.target.value),
                })
              }
              placeholder="رحلة باريس الرومانسية"
            />

            <InputField
              label="الرابط (Slug) *"
              required
              value={form.slug}
              error={formErrors.slug}
              onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              placeholder="paris-romantic-trip"
            />

            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="السعر (ج.م) *"
                type="number"
                required
                min={0}
                value={form.price}
                error={formErrors.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
              <InputField
                label="المدة (أيام) *"
                type="number"
                required
                min={1}
                value={form.durationDays}
                error={formErrors.durationDays}
                onChange={(e) => setForm({ ...form, durationDays: Math.max(1, Number(e.target.value)) })}
              />
              <InputField
                label="الحد الأقصى للأشخاص"
                type="number"
                min={1}
                value={form.maxPeople}
                error={formErrors.maxPeople}
                onChange={(e) => setForm({ ...form, maxPeople: Math.max(1, Number(e.target.value)) })}
              />
            </div>

            <TextareaField
              label="يشمل البرنامج"
              rows={3}
              value={form.includes}
              onChange={(e) => setForm({ ...form, includes: e.target.value })}
              placeholder="كل سطر = بند واحد"
            />

            <TextareaField
              label="لا يشمل البرنامج"
              rows={3}
              value={form.excludes}
              onChange={(e) => setForm({ ...form, excludes: e.target.value })}
              placeholder="كل سطر = بند واحد"
            />

            <GalleryUploadField
              label="صور الرحلة"
              value={form.galleryJson}
              error={formErrors.galleryJson}
              onChange={(val) => setForm({ ...form, galleryJson: val })}
            />

            <InputField
              label="البرنامج التفصيلي (JSON)"
              value={form.itineraryJson}
              error={formErrors.itineraryJson}
              onChange={(e) => setForm({ ...form, itineraryJson: e.target.value })}
              placeholder='[{"day":1,"title":"اليوم الأول","description":"..."}]'
            />

            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="عنوان SEO"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                placeholder="عنوان للمحركات البحثية"
              />
              <InputField
                label="وصف SEO"
                value={form.seoDescription}
                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                placeholder="وصف مختصر للمحركات البحثية"
              />
            </div>

            <div className="flex gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 accent-sand-500"
                />
                <span className="font-sans text-white/60 text-sm">نشط</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-sand-500"
                />
                <span className="font-sans text-white/60 text-sm">مميز</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? 'جاري الحفظ...' : editing ? 'حفظ التعديلات' : 'إضافة البرنامج'}
              </button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 py-3">
                إلغاء
              </button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          open={!!deleteId}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          message="هل أنت متأكد من حذف هذا البرنامج؟ لا يمكن التراجع عن هذه العملية."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProgramsPage;