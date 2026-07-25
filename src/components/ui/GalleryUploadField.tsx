import React, { useRef, useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { compressImageToBlob } from '../../utils/imageCompression';
import { uploadImage } from '../../services/uploadService';

interface GalleryUploadFieldProps {
  label: string;
  /** قيمة الفورم كـ JSON string، زي ما كانت قبل كده */
  value: string;
  onChange: (jsonValue: string) => void;
  error?: string;
  maxDimension?: number;
  quality?: number;
}

function parseGallery(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string');
    return [];
  } catch {
    return [];
  }
}

/**
 * مكوّن لإدارة معرض صور البرنامج (Gallery):
 * - رفع صور من الجهاز: كل صورة بتتضغط في المتصفح وبعدين بترفع فعليًا على
 *   الباك اند (/api/admin/uploads/image)، وبيتخزن في المصفوفة الرابط
 *   القصير اللي بيرجعه السيرفر بس.
 * - إضافة رابط صورة يدويًا.
 * - حذف أي صورة من القائمة.
 * القيمة بتتخزّن كـ JSON array زي ما كانت الصيغة الأصلية بالظبط.
 */
const GalleryUploadField: React.FC<GalleryUploadFieldProps> = ({
  label,
  value,
  onChange,
  error,
  maxDimension = 1280,
  quality = 0.82,
}) => {
  const images = parseGallery(value);
  const [urlInput, setUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateImages = (next: string[]) => {
    onChange(JSON.stringify(next));
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploading(true);

    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    setProgress({ done: 0, total: imageFiles.length });

    const uploaded: string[] = [];
    try {
      for (const file of imageFiles) {
        const blob = await compressImageToBlob(file, maxDimension, quality);
        const url = await uploadImage(blob, file.name.replace(/\.[^.]+$/, '') + '.jpg');
        uploaded.push(url);
        setProgress((p) => (p ? { ...p, done: p.done + 1 } : p));
      }
      updateImages([...images, ...uploaded]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'حصل خطأ أثناء رفع الصور');
      // نضيف أي صور نجحت قبل ما يحصل الخطأ
      if (uploaded.length > 0) updateImages([...images, ...uploaded]);
    } finally {
      setUploading(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    updateImages([...images, trimmed]);
    setUrlInput('');
  };

  const removeAt = (idx: number) => {
    updateImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div dir="rtl">
      <label className="block font-sans text-white/60 text-xs uppercase tracking-wider mb-2">{label}</label>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden h-20 border border-white/10">
              <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="absolute top-1 left-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5"
                aria-label="حذف الصورة"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs hover:border-sand-500/40 transition-colors disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading
            ? `جاري الرفع... ${progress ? `(${progress.done}/${progress.total})` : ''}`
            : 'رفع صور من الجهاز'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="أو الصق رابط صورة..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 font-sans text-white text-xs placeholder-white/20 focus:outline-none focus:border-sand-500/50 transition-colors"
        />
        <button
          type="button"
          onClick={addUrl}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-sand-300 hover:border-sand-500/40 transition-colors"
          aria-label="إضافة رابط"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {uploadError && <p className="mt-1 text-red-400 text-xs">{uploadError}</p>}
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default GalleryUploadField;
