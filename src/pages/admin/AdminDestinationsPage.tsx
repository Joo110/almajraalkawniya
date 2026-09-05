import React, { useState } from 'react';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  AdminPageHeader, AdminTable, Modal, InputField, TextareaField,
  ConfirmDialog, Spinner, ErrorBox, EmptyState, Badge, Pagination
} from '../../components/ui/index';
import ImageUploadField from '../../components/ui/ImageUploadField';
import { useAdminDestinations } from '../../hooks/useDestinations';
import { useToast } from '../../context/ToastContext';
import { Destination } from '../../types';
import { extractApiError } from '../../services/api';

interface DestinationFormData {
  name: string;
  nameEn: string;

  nameFr: string;
  nameTr: string;
  nameRu: string;
  slug: string;
  country: string;
  countryEn: string;

  countryFr: string;
  countryTr: string;
  countryRu: string;
  coverImage: string;
  description: string;
  descriptionEn: string;

  descriptionFr: string;
  descriptionTr: string;
  descriptionRu: string;
  tags: string;
  seoTitle: string;
  seoTitleEn: string;

  seoTitleFr: string;
  seoTitleTr: string;
  seoTitleRu: string;
  seoDescription: string;
  seoDescriptionEn: string;

  seoDescriptionFr: string;
  seoDescriptionTr: string;
  seoDescriptionRu: string;
  isFeatured: boolean;
  isActive: boolean;
}

const EMPTY_FORM: DestinationFormData = {
  name: '',
  nameEn: '',

  nameFr: '',
  nameTr: '',
  nameRu: '',
  slug: '',
  country: '',
  countryEn: '',

  countryFr: '',
  countryTr: '',
  countryRu: '',
  coverImage: '',
  description: '',
  descriptionEn: '',

  descriptionFr: '',
  descriptionTr: '',
  descriptionRu: '',
  tags: '',
  seoTitle: '',
  seoTitleEn: '',

  seoTitleFr: '',
  seoTitleTr: '',
  seoTitleRu: '',
  seoDescription: '',
  seoDescriptionEn: '',

  seoDescriptionFr: '',
  seoDescriptionTr: '',
  seoDescriptionRu: '',
  isFeatured: false,
  isActive: true,
};

const AdminDestinationsPage: React.FC = () => {
  const {
    destinations, loading, error, create, update, remove,
    pageNumber, totalPages, totalCount, hasPreviousPage, hasNextPage, goToPage,
  } = useAdminDestinations();
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [form, setForm] = useState<DestinationFormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof DestinationFormData, string>>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const slugify = (v: string) =>
    v.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (d: Destination) => {
    setEditing(d);
    setForm({
      name: d.name,
      nameEn: d.nameEn || '',

      nameFr: d.nameFr || '',
      nameTr: d.nameTr || '',
      nameRu: d.nameRu || '',
      slug: d.slug,
      country: d.country || '',
      countryEn: d.countryEn || '',

      countryFr: d.countryFr || '',
      countryTr: d.countryTr || '',
      countryRu: d.countryRu || '',
      coverImage: d.coverImage || '',
      description: d.description || '',
      descriptionEn: d.descriptionEn || '',

      descriptionFr: d.descriptionFr || '',
      descriptionTr: d.descriptionTr || '',
      descriptionRu: d.descriptionRu || '',
      tags: (d as any).tags || '',
      seoTitle: (d as any).seoTitle || '',
      seoTitleEn: d.seoTitleEn || '',

      seoTitleFr: d.seoTitleFr || '',
      seoTitleTr: d.seoTitleTr || '',
      seoTitleRu: d.seoTitleRu || '',
      seoDescription: (d as any).seoDescription || '',
      seoDescriptionEn: d.seoDescriptionEn || '',

      seoDescriptionFr: d.seoDescriptionFr || '',
      seoDescriptionTr: d.seoDescriptionTr || '',
      seoDescriptionRu: d.seoDescriptionRu || '',
      isFeatured: (d as any).isFeatured ?? d.featured ?? false,
      isActive: (d as any).isActive ?? true,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof DestinationFormData, string>> = {};
    if (!form.name.trim()) errs.name = 'اسم الوجهة مطلوب';
    if (!form.slug.trim()) errs.slug = 'الرابط مطلوب';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        nameEn: form.nameEn.trim() || undefined,

        nameFr: form.nameFr.trim() || undefined,
        nameTr: form.nameTr.trim() || undefined,
        nameRu: form.nameRu.trim() || undefined,
        slug: form.slug.trim(),
        country: form.country.trim(),
        countryEn: form.countryEn.trim() || undefined,

        countryFr: form.countryFr.trim() || undefined,
        countryTr: form.countryTr.trim() || undefined,
        countryRu: form.countryRu.trim() || undefined,
        coverImage: form.coverImage.trim(),
        description: form.description.trim(),
        descriptionEn: form.descriptionEn.trim() || undefined,

        descriptionFr: form.descriptionFr.trim() || undefined,
        descriptionTr: form.descriptionTr.trim() || undefined,
        descriptionRu: form.descriptionRu.trim() || undefined,
        tags: form.tags.trim(),
        seoTitle: form.seoTitle.trim(),
        seoTitleEn: form.seoTitleEn.trim() || undefined,

        seoTitleFr: form.seoTitleFr.trim() || undefined,
        seoTitleTr: form.seoTitleTr.trim() || undefined,
        seoTitleRu: form.seoTitleRu.trim() || undefined,
        seoDescription: form.seoDescription.trim(),
        seoDescriptionEn: form.seoDescriptionEn.trim() || undefined,

        seoDescriptionFr: form.seoDescriptionFr.trim() || undefined,
        seoDescriptionTr: form.seoDescriptionTr.trim() || undefined,
        seoDescriptionRu: form.seoDescriptionRu.trim() || undefined,
        isFeatured: form.isFeatured,
        isActive: form.isActive,
      };
      if (editing) {
        await update(editing.id, payload as any);
        toast.success('تم تعديل الوجهة بنجاح');
      } else {
        await create(payload as any);
        toast.success('تمت إضافة الوجهة بنجاح');
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
      toast.success('تم حذف الوجهة');
    } catch (err) {
      toast.error(extractApiError(err));
    }
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div dir="rtl">
        <AdminPageHeader
          title="إدارة الوجهات"
          subtitle={`${totalCount} وجهة مسجلة`}
          action={
            <button onClick={openCreate} className="btn-primary flex items-center gap-2 py-2.5 px-5">
              <Plus className="w-4 h-4" /> إضافة وجهة
            </button>
          }
        />

        {loading ? <Spinner /> : error ? <ErrorBox message={error} /> : destinations.length === 0 ? (
          <EmptyState message="لا توجد وجهات بعد" icon={<MapPin className="w-10 h-10" />} />
        ) : (
          <>
            <AdminTable headers={['الوجهة', 'البلد', 'الرابط', 'مميز', 'الحالة', 'إجراءات']}>
              {destinations.map(d => (
                <tr key={d.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {d.coverImage ? (
                        <img src={d.coverImage} alt={d.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white/30" />
                        </div>
                      )}
                      <span className="font-sans text-white text-sm font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-sans text-white/50 text-sm">{d.country || '—'}</td>
                  <td className="px-4 py-3.5 font-sans text-white/30 text-xs">{d.slug}</td>
                  <td className="px-4 py-3.5">
                    {((d as any).isFeatured ?? d.featured)
                      ? <Badge label="مميز" color="gold" />
                      : <span className="text-white/20 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${
                      (d as any).isActive !== false
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {(d as any).isActive !== false ? 'نشطة' : 'معطلة'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(d)} className="p-1.5 text-white/30 hover:text-sand-400 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(d.id)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
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

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editing ? 'تعديل الوجهة' : 'إضافة وجهة جديدة'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <InputField
              label="اسم الوجهة *"
              required
              value={form.name}
              error={formErrors.name}
              onChange={e => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
              placeholder="باريس"
            />
            <InputField
              label="Name (English)"
              value={form.nameEn}
              onChange={e => setForm({ ...form, nameEn: e.target.value })}
              placeholder="Paris"
              dir="ltr"
            />
            <InputField
              label="Nom (Français)"
              value={form.nameFr}
              onChange={e => setForm({ ...form, nameFr: e.target.value })}
              placeholder="Paris"
              dir="ltr"
            />
            <InputField
              label="İsim (Türkçe)"
              value={form.nameTr}
              onChange={e => setForm({ ...form, nameTr: e.target.value })}
              placeholder="Paris"
              dir="ltr"
            />
            <InputField
              label="Название (Русский)"
              value={form.nameRu}
              onChange={e => setForm({ ...form, nameRu: e.target.value })}
              placeholder="Paris"
              dir="ltr"
            />
            <InputField
              label="الرابط (Slug) *"
              required
              value={form.slug}
              error={formErrors.slug}
              onChange={e => setForm({ ...form, slug: slugify(e.target.value) })}
              placeholder="paris"
            />
            <InputField
              label="البلد"
              value={form.country}
              onChange={e => setForm({ ...form, country: e.target.value })}
              placeholder="فرنسا"
            />
            <InputField
              label="Country (English)"
              value={form.countryEn}
              onChange={e => setForm({ ...form, countryEn: e.target.value })}
              placeholder="France"
              dir="ltr"
            />
            <InputField
              label="Pays (Français)"
              value={form.countryFr}
              onChange={e => setForm({ ...form, countryFr: e.target.value })}
              placeholder="France"
              dir="ltr"
            />
            <InputField
              label="Ülke (Türkçe)"
              value={form.countryTr}
              onChange={e => setForm({ ...form, countryTr: e.target.value })}
              placeholder="France"
              dir="ltr"
            />
            <InputField
              label="Страна (Русский)"
              value={form.countryRu}
              onChange={e => setForm({ ...form, countryRu: e.target.value })}
              placeholder="France"
              dir="ltr"
            />
            <ImageUploadField
              label="صورة الغلاف"
              value={form.coverImage}
              onChange={(val) => setForm({ ...form, coverImage: val })}
              error={formErrors.coverImage}
            />
            <TextareaField
              label="الوصف"
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="وصف مختصر عن الوجهة..."
            />
            <TextareaField
              label="Description (English)"
              rows={3}
              value={form.descriptionEn}
              onChange={e => setForm({ ...form, descriptionEn: e.target.value })}
              placeholder="Short description of the destination..."
              dir="ltr"
            />
            <TextareaField
              label="Description (Français)"
              rows={3}
              value={form.descriptionFr}
              onChange={e => setForm({ ...form, descriptionFr: e.target.value })}
              placeholder="Brève description de la destination..."
              dir="ltr"
            />
            <TextareaField
              label="Açıklama (Türkçe)"
              rows={3}
              value={form.descriptionTr}
              onChange={e => setForm({ ...form, descriptionTr: e.target.value })}
              placeholder="Destinasyonun kısa açıklaması..."
              dir="ltr"
            />
            <TextareaField
              label="Описание (Русский)"
              rows={3}
              value={form.descriptionRu}
              onChange={e => setForm({ ...form, descriptionRu: e.target.value })}
              placeholder="Краткое описание направления..."
              dir="ltr"
            />
            <InputField
              label="الوسوم (Tags)"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="شاطئ، ثقافة، مغامرة"
            />
            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="عنوان SEO"
                value={form.seoTitle}
                onChange={e => setForm({ ...form, seoTitle: e.target.value })}
                placeholder="عنوان للمحركات البحثية"
              />
              <InputField
                label="SEO Title (English)"
                value={form.seoTitleEn}
                onChange={e => setForm({ ...form, seoTitleEn: e.target.value })}
                placeholder="SEO title in English"
                dir="ltr"
              />
              <InputField
                label="Titre SEO (Français)"
                value={form.seoTitleFr}
                onChange={e => setForm({ ...form, seoTitleFr: e.target.value })}
                placeholder="Titre SEO en français"
                dir="ltr"
              />
              <InputField
                label="SEO Başlığı (Türkçe)"
                value={form.seoTitleTr}
                onChange={e => setForm({ ...form, seoTitleTr: e.target.value })}
                placeholder="Türkçe SEO başlığı"
                dir="ltr"
              />
              <InputField
                label="SEO заголовок (Русский)"
                value={form.seoTitleRu}
                onChange={e => setForm({ ...form, seoTitleRu: e.target.value })}
                placeholder="SEO-заголовок на русском"
                dir="ltr"
              />
              <InputField
                label="وصف SEO"
                value={form.seoDescription}
                onChange={e => setForm({ ...form, seoDescription: e.target.value })}
                placeholder="وصف مختصر للمحركات البحثية"
              />
              <InputField
                label="SEO Description (English)"
                value={form.seoDescriptionEn}
                onChange={e => setForm({ ...form, seoDescriptionEn: e.target.value })}
                placeholder="SEO description in English"
                dir="ltr"
              />
              <InputField
                label="Description SEO (Français)"
                value={form.seoDescriptionFr}
                onChange={e => setForm({ ...form, seoDescriptionFr: e.target.value })}
                placeholder="Description SEO en français"
                dir="ltr"
              />
              <InputField
                label="SEO Açıklaması (Türkçe)"
                value={form.seoDescriptionTr}
                onChange={e => setForm({ ...form, seoDescriptionTr: e.target.value })}
                placeholder="Türkçe SEO açıklaması"
                dir="ltr"
              />
              <InputField
                label="SEO описание (Русский)"
                value={form.seoDescriptionRu}
                onChange={e => setForm({ ...form, seoDescriptionRu: e.target.value })}
                placeholder="SEO-описание на русском"
                dir="ltr"
              />
            </div>
            <div className="flex gap-6 pt-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-sand-500"
                />
                <span className="font-sans text-white/60 text-sm">وجهة مميزة</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={e => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-sand-500"
                />
                <span className="font-sans text-white/60 text-sm">نشطة</span>
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? 'جاري الحفظ...' : editing ? 'حفظ التعديلات' : 'إضافة الوجهة'}
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
          message="هل أنت متأكد من حذف هذه الوجهة؟ لا يمكن التراجع عن هذه العملية."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDestinationsPage;