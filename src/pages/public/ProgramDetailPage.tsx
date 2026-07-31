import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Star,
  MessageCircle,
} from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { Spinner } from '../../components/ui/index';
import TamaraBadge from '../../components/ui/Tamarabadge';
import { useProgramBySlug } from '../../hooks/usePrograms';

type ItineraryItem = {
  day?: number | string;
  title?: string;
  description?: string;
};

function parseJsonArray<T = any>(value?: string | null): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeTextList(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * يحوّل قيمة includes/excludes إلى مصفوفة نصوص، بغض النظر عن شكلها الأصلي:
 * - لو هي بالفعل Array (قادمة من مصدر مختلف عن الـ DTO المعرّف) → نحولها مباشرة
 * - لو نص JSON صالح زي '["شيء1","شيء2"]' → نفكّه كمصفوفة
 * - غير كده (نص عادي مفصول بأسطر) → نستخدم normalizeTextList
 *
 * الكاست بيمر عبر `unknown` أولاً لأن TypeScript يرفض تحويل `string` مباشرة
 * إلى `any[]` لعدم وجود تداخل كافٍ بين النوعين.
 */
function toStringList(raw: unknown): string[] {
  if (!raw) return [];

  // الحالة النادرة: القيمة وصلت بالفعل كمصفوفة رغم تعريف النوع كـ string
  if (Array.isArray(raw)) {
    return raw.map(String).map((x) => x.trim()).filter(Boolean);
  }

  const text = String(raw);

  // جرّب نفكّها كـ JSON array أولاً (مثال: '["تذاكر طيران","إقامة فندقية"]')
  const parsed = parseJsonArray<string>(text);
  if (parsed.length > 0) {
    return parsed.map(String).map((x) => x.trim()).filter(Boolean);
  }

  // غير كده، نص عادي مفصول بأسطر
  return normalizeTextList(text);
}

function isItineraryItem(item: unknown): item is ItineraryItem {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80';
const ProgramDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { program, loading, error } = useProgramBySlug(slug || '');

  const gallery = useMemo(
    () => parseJsonArray<string>(program?.galleryJson),
    [program?.galleryJson]
  );

  const itinerary = useMemo(
    () => parseJsonArray<ItineraryItem | string>(program?.itineraryJson),
    [program?.itineraryJson]
  );

  const includesList = useMemo(
    () => toStringList(program?.includes),
    [program?.includes]
  );

  const excludesList = useMemo(
    () => toStringList(program?.excludes),
    [program?.excludes]
  );

  if (loading) {
    return (
      <PublicLayout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      </PublicLayout>
    );
  }

  if (error || !program) {
    return (
      <PublicLayout>
        <div className="bg-white min-h-screen flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <p className="font-display text-2xl text-stone-900 mb-4">البرنامج غير موجود</p>
            <Link to="/programs" className="btn-primary">
              عودة للبرامج
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const coverImg = gallery[0] || DEFAULT_COVER;

  const whatsappNumber = '966544817995';
  const whatsappMessage = encodeURIComponent(
    `مرحبًا، أريد الحجز في برنامج: ${program.title}\nالمدة: ${program.durationDays} يوم\nالسعر: ${Number(program.price || 0).toLocaleString('ar-SA')} ريال\nالرابط: ${window.location.href}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        <section className="relative h-[60vh] flex items-end overflow-hidden">
          <img src={coverImg} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full" dir="rtl">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm font-sans mb-6 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للبرامج</span>
            </Link>

            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              {program.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white/75">
                <Clock className="w-4 h-4 text-sand-400" />
                <span className="font-sans text-sm">{program.durationDays} يوم</span>
              </div>

              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-sans text-sm font-semibold">4.8 (٣٢ تقييم)</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {gallery.length > 1 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">صور الرحلة</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {gallery.slice(1, 4).map((img: string, i: number) => (
                        <div key={i} className="rounded-xl overflow-hidden h-32 border border-stone-200 shadow-sm">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" /> يشمل البرنامج
                    </h3>
                    <ul className="space-y-2">
                      {includesList.length > 0 ? (
                        includesList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-sans text-stone-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-stone-400">لا توجد بيانات</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" /> لا يشمل البرنامج
                    </h3>
                    <ul className="space-y-2">
                      {excludesList.length > 0 ? (
                        excludesList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-sans text-stone-600 text-sm">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-stone-400">لا توجد بيانات</li>
                      )}
                    </ul>
                  </div>
                </div>

                {itinerary.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">البرنامج اليومي</h2>
                    <div className="space-y-4">
                      {itinerary.map((day, i) => {
                        const normalized = isItineraryItem(day) ? day : { title: String(day) };
                        const dayNumber =
                          normalized.day !== undefined && normalized.day !== null
                            ? normalized.day
                            : i + 1;

                        return (
                          <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex gap-5 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-sand-500/15 flex items-center justify-center flex-shrink-0">
                              <span className="font-display text-sand-500 font-bold text-sm">{dayNumber}</span>
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-sans font-semibold text-stone-900 mb-1">
                                {normalized.title || `اليوم ${dayNumber}`}
                              </h4>
                              {normalized.description ? (
                                <p className="font-sans text-stone-600 text-sm">
                                  {normalized.description}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-stone-50 border border-stone-200 rounded-2xl p-7 shadow-sm">
                  <div className="text-center mb-6 pb-6 border-b border-stone-200">
                    <span className="font-sans text-stone-500 text-xs uppercase tracking-wider block mb-1">
                      السعر للفرد
                    </span>
                    <span className="font-display text-4xl font-black text-gradient">
                      {Number(program.price || 0).toLocaleString('ar-SA')} ريال
                    </span>
                  </div>

                  <TamaraBadge itemType="Program" itemId={program.id} />

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full py-4 text-center inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    احجز عبر واتساب
                  </a>

                  <p className="text-center text-stone-500 text-xs mt-3 leading-relaxed">
                    سيتم تحويلك مباشرة إلى واتساب لإرسال طلب الحجز.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ProgramDetailPage;