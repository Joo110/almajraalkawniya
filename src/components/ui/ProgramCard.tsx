import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, Users, Sparkles, BadgeDollarSign } from 'lucide-react';
import { Program } from '../../types';

interface ProgramCardProps {
  program: Program;
}


function safeParse<T>(value: unknown, fallback: T): T {
  try {
    if (typeof value !== 'string') return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normalizeImage(item: unknown): string {
  if (typeof item === 'string') return item;

  if (item && typeof item === 'object') {
    const obj = item as { url?: string; image?: string; src?: string; path?: string };
    return obj.url || obj.image || obj.src || obj.path || '';
  }

  return '';
}

function getCoverImage(program: Program): string | null {
  const p = program as any;

  const directCover =
    p.coverImageUrl ||
    p.coverImageUrlPath ||
    p.imageUrl ||
    p.image ||
    p.thumbnail ||
    '';

  if (directCover && typeof directCover === 'string' && !directCover.trim().startsWith('[')) {
    return directCover;
  }

  const parsedCover = safeParse<unknown[]>(p.coverImage, []);
  const coverImages = parsedCover.map(normalizeImage).filter(Boolean);

  if (coverImages.length > 0) return coverImages[0];

  const gallery = safeParse<unknown[]>(p.galleryJson, []);
  const galleryImages = gallery.map(normalizeImage).filter(Boolean);

  if (galleryImages.length > 0) return galleryImages[0];

  return null;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const p = program as any;
  const coverImg = getCoverImage(program);
  const featured = Boolean(p.featured);
  const price = Number(program.price || 0).toLocaleString('ar-SA');
  const slug = p.slug || program.id;

  return (
    <article
      dir="rtl"
      className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.14)]"
    >
      {/* Image */}
      {coverImg ? (
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/3]">
            <img
              src={coverImg}
              alt={program.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              {featured && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400/95 px-3 py-1 text-xs font-bold text-stone-950 shadow-lg shadow-amber-500/20 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  مميز
                </span>
              )}
              <h3 className="line-clamp-2 text-xl font-black leading-snug text-white sm:text-2xl">
                {program.title}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-stone-900 px-5 py-6 sm:px-6 sm:py-8">
          {featured && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400/95 px-3 py-1 text-xs font-bold text-stone-950 shadow-lg shadow-amber-500/20 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              مميز
            </span>
          )}
          <h3 className="line-clamp-2 text-xl font-black leading-snug text-white sm:text-2xl">
            {program.title}
          </h3>
          <p className="mt-2 text-sm text-white/70">لا توجد صورة لهذا البرنامج</p>
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-stone-50 p-4 text-stone-700">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock3 className="h-4 w-4 text-stone-400" />
            <span>{program.durationDays} يوم</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium sm:justify-end">
            <Users className="h-4 w-4 text-stone-400" />
            <span>الحد الاقصي {program.maxPeople} أشخاص</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <BadgeDollarSign className="h-4 w-4 text-amber-600" />
            <span>السعر:</span>
            <span className="text-xl font-black text-stone-900">{price} ر.س</span>
          </div>
        </div>

        <Link
          to={`/programs/${slug}`}
          className="mt-4 inline-flex w-full items-center justify-between rounded-2xl bg-stone-900 px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/15"
        >
          <span>اعرف المزيد</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowLeft className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </article>
  );
};

export default ProgramCard;