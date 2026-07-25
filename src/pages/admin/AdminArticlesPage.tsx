import React, { useState } from 'react';
import { Plus, Pencil, Trash2, FileText, Calendar } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  AdminPageHeader, AdminTable, Modal, InputField, TextareaField,
  ConfirmDialog, Spinner, ErrorBox, EmptyState, Pagination
} from '../../components/ui/index';
import ImageUploadField from '../../components/ui/ImageUploadField';
import { useAdminArticles } from '../../hooks/useArticles';
import { useToast } from '../../context/ToastContext';
import {  Article } from '../../types';
import { extractApiError } from '../../services/api';

interface ArticleFormData {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  isPublished: boolean;
}

const toISOLocal = (dateStr: string) => {
  if (!dateStr) return new Date().toISOString();
  return new Date(dateStr).toISOString();
};

const todayInput = () => new Date().toISOString().slice(0, 16);

const EMPTY: ArticleFormData = {
  title: '',
  slug: '',
  content: '',
  coverImage: '',
  seoTitle: '',
  seoDescription: '',
  publishedAt: todayInput(),
  isPublished: true,
};

const AdminArticlesPage: React.FC = () => {
  const {
    articles, loading, error, create, update, remove,
    pageNumber, totalPages, totalCount, hasPreviousPage, hasNextPage, goToPage,
  } = useAdminArticles();
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<ArticleFormData>(EMPTY);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ArticleFormData, string>>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const slugify = (v: string) =>
    v.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0600-\u06FF-]/g, '');

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (a: Article) => {
    setEditing(a);
    setForm({
      title: a.title,
      slug: a.slug,
      content: a.content || '',
      coverImage: a.coverImage || '',
      seoTitle: (a as any).seoTitle || '',
      seoDescription: (a as any).seoDescription || '',
      publishedAt: a.publishedAt
        ? new Date(a.publishedAt).toISOString().slice(0, 16)
        : todayInput(),
      isPublished: (a as any).isPublished ?? true,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ArticleFormData, string>> = {};
    if (!form.title.trim()) errs.title = 'عنوان المقال مطلوب';
    if (!form.slug.trim()) errs.slug = 'الرابط مطلوب';
    if (!form.publishedAt) errs.publishedAt = 'تاريخ النشر مطلوب';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        content: form.content.trim(),
        coverImage: form.coverImage.trim(),
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
        publishedAt: toISOLocal(form.publishedAt),
        isPublished: form.isPublished,
      };
      if (editing) {
        await update(editing.id, payload as any);
        toast.success('تم تعديل المقال بنجاح');
      } else {
        await create(payload as any);
        toast.success('تم نشر المقال بنجاح');
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
      toast.success('تم حذف المقال');
    } catch (err) {
      toast.error(extractApiError(err));
    }
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div dir="rtl">
        <AdminPageHeader
          title="إدارة المقالات"
          subtitle={`${totalCount} مقال منشور`}
          action={
            <button onClick={openCreate} className="btn-primary flex items-center gap-2 py-2.5 px-5">
              <Plus className="w-4 h-4" /> كتابة مقال
            </button>
          }
        />

        {loading ? <Spinner /> : error ? <ErrorBox message={error} /> : articles.length === 0 ? (
          <EmptyState message="لا توجد مقالات بعد" icon={<FileText className="w-10 h-10" />} />
        ) : (
          <>
            <AdminTable headers={['المقال', 'الرابط', 'تاريخ النشر', 'الحالة', 'إجراءات']}>
              {articles.map(a => (
                <tr key={a.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {a.coverImage ? (
                        <img src={a.coverImage} alt={a.title} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-white/20" />
                        </div>
                      )}
                      <span className="font-sans text-white text-sm font-medium line-clamp-1">{a.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-sans text-white/30 text-xs">{a.slug}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-white/40 text-xs font-sans">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(a.publishedAt).toLocaleDateString('ar-EG')}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${
                      (a as any).isPublished
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-white/10 text-white/40'
                    }`}>
                      {(a as any).isPublished ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(a)} className="p-1.5 text-white/30 hover:text-sand-400 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(a.id)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
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
          title={editing ? 'تعديل المقال' : 'كتابة مقال جديد'}
        >
          <form onSubmit={handleSave} className="space-y-5">
            <InputField
              label="عنوان المقال *"
              required
              value={form.title}
              error={formErrors.title}
              onChange={e => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
              placeholder="دليلك الشامل لاستكشاف باريس"
            />
            <InputField
              label="الرابط (Slug) *"
              required
              value={form.slug}
              error={formErrors.slug}
              onChange={e => setForm({ ...form, slug: slugify(e.target.value) })}
              placeholder="paris-guide"
            />
            <ImageUploadField
              label="صورة الغلاف"
              value={form.coverImage}
              onChange={(val) => setForm({ ...form, coverImage: val })}
              error={formErrors.coverImage}
            />
            <TextareaField
              label="محتوى المقال"
              rows={8}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="اكتب محتوى المقال هنا..."
            />
            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="عنوان SEO"
                value={form.seoTitle}
                onChange={e => setForm({ ...form, seoTitle: e.target.value })}
                placeholder="عنوان للمحركات البحثية"
              />
              <InputField
                label="وصف SEO"
                value={form.seoDescription}
                onChange={e => setForm({ ...form, seoDescription: e.target.value })}
                placeholder="وصف مختصر للمحركات البحثية"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-white/50 text-xs uppercase tracking-wider mb-2">
                  تاريخ النشر *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={form.publishedAt}
                  onChange={e => setForm({ ...form, publishedAt: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-white text-sm focus:outline-none focus:border-sand-500/50 transition-colors"
                />
                {formErrors.publishedAt && (
                  <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.publishedAt}</p>
                )}
              </div>
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={e => setForm({ ...form, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-sand-500"
                  />
                  <span className="font-sans text-white/60 text-sm">نشر المقال فوراً</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? 'جاري الحفظ...' : editing ? 'حفظ التعديلات' : 'نشر المقال'}
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
          message="هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminArticlesPage;