import React, { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, X, ImageIcon } from 'lucide-react';
import { compressImageToBlob } from '../../utils/imageCompression';
import { uploadImage } from '../../services/uploadService';

interface ImageUploadFieldProps {
  label: string;
  /** القيمة الحالية: رابط الصورة النهائي (بعد الرفع على السيرفر) */
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** أقصى عرض/ارتفاع للصورة الناتجة بعد الضغط (px) */
  maxDimension?: number;
  /** جودة الـ JPEG بعد الضغط (0 - 1) */
  quality?: number;
}

/**
 * حقل موحّد لصورة الغلاف:
 * - تبويب "رفع من الجهاز": يقرأ الصورة، يضغطها في المتصفح (تصغير الأبعاد
 *   + إعادة ترميز JPEG بدون أي فلاتر ألوان)، وبعدين يرفعها فعليًا على
 *   الباك اند عبر POST /api/admin/uploads/image، ويحفظ في الـ form
 *   الرابط القصير اللي بيرجعه السيرفر (مش الصورة نفسها كـ base64).
 * - تبويب "رابط": بيسيب المستخدم يكتب رابط صورة خارجي زي ما كان الوضع الأول.
 */
const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  error,
  maxDimension = 1280,
  quality = 0.82,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [status, setStatus] = useState<'idle' | 'compressing' | 'uploading' | 'done'>('idle');
  const [sizeInfo, setSizeInfo] = useState<{ before: number; after: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined | null) => {
    if (!file) return;
    setUploadError(null);
    setSizeInfo(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('من فضلك اختر ملف صورة صالح');
      return;
    }

    // معاينة فورية محلية لحد ما الرفع يخلص
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    try {
      setStatus('compressing');
      const beforeSize = file.size;
      const blob = await compressImageToBlob(file, maxDimension, quality);

      setStatus('uploading');
      const uploadedUrl = await uploadImage(blob, file.name.replace(/\.[^.]+$/, '') + '.jpg');

      setSizeInfo({ before: beforeSize, after: blob.size });
      onChange(uploadedUrl);
      setStatus('done');
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'حصل خطأ أثناء رفع الصورة');
      setStatus('idle');
    } finally {
      URL.revokeObjectURL(objectUrl);
      setLocalPreview(null);
    }
  };

  const formatKB = (bytes: number) => `${(bytes / 1024).toFixed(0)} KB`;
  const displayImage = localPreview || value;
  const busy = status === 'compressing' || status === 'uploading';

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-2">
        <label className="block font-sans text-white/60 text-xs uppercase tracking-wider">{label}</label>
        <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors ${
              mode === 'upload' ? 'bg-sand-500/20 text-sand-300' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Upload className="w-3 h-3" /> رفع من الجهاز
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors ${
              mode === 'url' ? 'bg-sand-500/20 text-sand-300' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <LinkIcon className="w-3 h-3" /> رابط
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onClick={() => !busy && inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!busy) handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`cursor-pointer border border-dashed ${
            error || uploadError ? 'border-red-500/50' : 'border-white/15'
          } rounded-lg px-4 py-6 text-center hover:border-sand-500/40 transition-colors ${busy ? 'opacity-70 pointer-events-none' : ''}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {status === 'compressing' ? (
            <p className="text-white/50 text-sm">جاري ضغط الصورة...</p>
          ) : status === 'uploading' ? (
            <p className="text-white/50 text-sm">جاري رفع الصورة على السيرفر...</p>
          ) : (
            <div className="flex flex-col items-center gap-1 text-white/40">
              <ImageIcon className="w-6 h-6" />
              <p className="text-sm">اضغط أو اسحب الصورة هنا للرفع من الجهاز</p>
              <p className="text-[11px] text-white/25">هيتم ضغطها ورفعها تلقائيًا بدون تغيير الألوان</p>
            </div>
          )}
        </div>
      ) : (
        <input
          value={value}
          onChange={(e) => {
            setSizeInfo(null);
            onChange(e.target.value);
          }}
          placeholder="https://..."
          className={`w-full bg-white/5 border ${
            error ? 'border-red-500/50' : 'border-white/10'
          } rounded-lg px-4 py-2.5 font-sans text-white text-sm placeholder-white/20 focus:outline-none focus:border-sand-500/50 transition-colors`}
        />
      )}

      {uploadError && <p className="mt-1 text-red-400 text-xs">{uploadError}</p>}
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}

      {sizeInfo && (
        <p className="mt-1 text-[11px] text-emerald-400/80">
          تم الضغط والرفع: {formatKB(sizeInfo.before)} ← {formatKB(sizeInfo.after)}
        </p>
      )}

      {displayImage && (
        <div className="relative mt-3 rounded-xl overflow-hidden h-32">
          <img src={displayImage} alt="preview" className="w-full h-full object-cover" />
          {!busy && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                setSizeInfo(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
              aria-label="إزالة الصورة"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
