import React, {  useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Star,
  RotateCcw,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { useDestinations } from '../../hooks/useDestinations';

const WHATSAPP_URL = 'https://wa.me/966544817995';

type Option = { id: string; label: string; desc: string; emoji: string };
type Question = { id: number; question: string; options: Option[] };

type DestinationLike = {
  id?: string | number;
  name: string;
  country?: string;
  image?: string;
  img?: string;
  tags?: string[];
  description?: string;
  bestFor?: string;
  priceRange?: string;
  slug?: string;
};

type DestinationResult = {
  name: string;
  country: string;
  img: string;
  tags: string[];
  description: string;
  bestFor: string;
  priceRange: string;
  slug: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: 'مع من ستسافر؟',
    options: [
      { id: 'solo', label: 'وحدك', desc: 'رحلات مرنة وتجربة شخصية', emoji: '🧳' },
      { id: 'friends', label: 'أصدقاء', desc: 'مغامرة وذكريات مشتركة', emoji: '👯' },
      { id: 'family', label: 'عائلة', desc: 'راحة وخيارات مناسبة للأطفال', emoji: '👨‍👩‍👧‍👦' },
      { id: 'couple', label: 'أزواج', desc: 'تجربة رومانسية وتوازن', emoji: '💑' },
      { id: 'honeymoon', label: 'شهر عسل', desc: 'خصوصية واسترخاء فاخر', emoji: '🥂' },
    ],
  },
  {
    id: 2,
    question: 'ما نوع الرحلة المفضلة لك؟',
    options: [
      { id: 'adventure', label: 'مغامرة وطبيعة', desc: 'أنشطة خارجية وطبيعة خلابة', emoji: '🏔️' },
      { id: 'culture', label: 'ثقافة وتاريخ', desc: 'متاحف وآثار وتراث', emoji: '🏛️' },
      { id: 'relax', label: 'استرخاء وشواطئ', desc: 'بحر وشمس وراحة', emoji: '🏖️' },
      { id: 'city', label: 'مدن وتسوق', desc: 'حياة عصرية ومراكز تجارية', emoji: '🌆' },
    ],
  },
  {
    id: 3,
    question: 'ما الميزانية المتوقعة للشخص؟',
    options: [
      { id: 'budget', label: 'اقتصادية', desc: 'أقل من ٥٠٠٠ ر.س', emoji: '💰' },
      { id: 'mid', label: 'متوسطة', desc: '٥٠٠٠ - ١٥٠٠٠ ر.س', emoji: '💳' },
      { id: 'luxury', label: 'فاخرة', desc: 'أكثر من ١٥٠٠٠ ر.س', emoji: '💎' },
    ],
  },
  {
    id: 4,
    question: 'كم مدة الرحلة المثالية لك؟',
    options: [
      { id: 'short', label: 'قصيرة (٣-٥ أيام)', desc: 'عطلة سريعة ومركزة', emoji: '⚡' },
      { id: 'medium', label: 'متوسطة (٧-١٠ أيام)', desc: 'استكشاف كافٍ وراحة', emoji: '🗓️' },
      { id: 'long', label: 'طويلة (+٢ أسبوع)', desc: 'انغماس كامل في الوجهة', emoji: '✈️' },
    ],
  },
  {
    id: 5,
    question: 'أي طقس تفضل؟',
    options: [
      { id: 'hot', label: 'حار وشمسي', desc: 'شمس ودفء على مدار اليوم', emoji: '☀️' },
      { id: 'mild', label: 'معتدل', desc: 'لا حر شديد ولا برد قارس', emoji: '🌤️' },
      { id: 'cold', label: 'بارد وثلوج', desc: 'تجربة الشتاء الأصيلة', emoji: '❄️' },
      { id: 'any', label: 'لا يهمني', desc: 'المهم التجربة', emoji: '🌈' },
    ],
  },
  {
    id: 6,
    question: 'ما الأولوية القصوى في رحلتك؟',
    options: [
      { id: 'food', label: 'تجربة المأكولات', desc: 'أطباق محلية وتجارب طعام', emoji: '🍜' },
      { id: 'photo', label: 'التصوير والمناظر', desc: 'أماكن خلابة للصور', emoji: '📸' },
      { id: 'luxury_stay', label: 'الإقامة الفاخرة', desc: 'فنادق راقية وخدمة ممتازة', emoji: '🏨' },
      { id: 'activities', label: 'الأنشطة والرياضة', desc: 'تجارب نشطة ومليئة بالحركة', emoji: '🎯' },
    ],
  },
  {
    id: 7,
    question: 'ما مدى تجربتك في السفر؟',
    options: [
      { id: 'first', label: 'أول مرة أسافر خارجيًا', desc: 'أريد وجهة سهلة ومريحة', emoji: '🌟' },
      { id: 'some', label: 'سافرت قليلًا', desc: 'بعض التجارب السابقة', emoji: '✈️' },
      { id: 'experienced', label: 'مسافر متمرس', desc: 'أبحث عن وجهات غير مألوفة', emoji: '🗺️' },
    ],
  },
  {
    id: 8,
    question: 'متى تريد السفر؟',
    options: [
      { id: 'now', label: 'خلال شهر', desc: 'رحلة عاجلة', emoji: '🚀' },
      { id: 'soon', label: 'خلال ٣ أشهر', desc: 'وقت للتخطيط', emoji: '📅' },
      { id: 'later', label: 'بعد ٦ أشهر أو أكثر', desc: 'تخطيط مبكر', emoji: '🗓️' },
      { id: 'flexible', label: 'مرن', desc: 'حسب أفضل العروض', emoji: '🎲' },
    ],
  },
];

const normalizeDestination = (d: DestinationLike): DestinationResult => {
  // الحقل بيرجع من الباك إند بأسماء/حالات مختلفة حسب الـ endpoint
  // (coverImage / CoverImage / image / Image / img)، فبندوّر عليه بكل
  // الاحتمالات قبل ما نستسلم للصورة الافتراضية الثابتة
  const raw = d as Record<string, unknown>;
  const resolvedImage =
    d.image ||
    d.img ||
    (raw.coverImage as string | undefined) ||
    (raw.CoverImage as string | undefined) ||
    (raw.Image as string | undefined) ||
    (raw.Img as string | undefined);

  return {
    name: d.name,
    country: d.country || '',
    img: resolvedImage || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80',
    tags: Array.isArray(d.tags) ? d.tags : [],
    description: d.description || '',
    bestFor: d.bestFor || '',
    priceRange: d.priceRange || '',
    slug: d.slug || String(d.id || d.name).toLowerCase().replace(/\s+/g, '-'),
  };
};

const getRecommendations = (destinations: DestinationResult[], answers: Record<number, string>): DestinationResult[] => {
  const selectedTags = Object.values(answers);
  const scored = destinations.map(dest => ({
    ...dest,
    score: dest.tags.filter(tag => selectedTags.includes(tag)).length,
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, 2);
};

const WhereToTravelPage: React.FC = () => {
  const { destinations, loading } = useDestinations();

  const normalizedDestinations = useMemo<DestinationResult[]>(() => {
    return (destinations || []).map((d: DestinationLike) => normalizeDestination(d));
  }, [destinations]);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<DestinationResult[]>([]);

  const q = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
  };

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const recs = getRecommendations(normalizedDestinations, newAnswers);
      setResults(recs);
      setDone(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      const prevQ = currentQ - 1;
      setCurrentQ(prevQ);
      setSelected(answers[questions[prevQ].id] || null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setDone(false);
    setResults([]);
  };

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* HERO */}
        <section className="relative pt-32 pb-16 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
              alt="bg"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/75" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-sand-400" />
              <span className="font-sans text-white/80 text-sm">وين أسافر؟</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              اختر <span className="text-gradient">رحلتك المثالية</span> الآن
            </h1>
            <p className="font-sans text-white/70 text-lg max-w-2xl mx-auto">
              استكشف أفضل البرامج السياحية المصممة خصيصًا لك — احجز بسهولة وبأفضل سعر
            </p>
          </div>
        </section>

        {/* QUIZ / RESULTS */}
        <section className="py-16 pb-32 bg-white" dir="rtl">
          <div className="max-w-3xl mx-auto px-6">
            {loading ? (
              <div className="bg-stone-50 rounded-2xl p-10 text-center border border-stone-200 shadow-sm">
                <p className="font-sans text-stone-600">جاري تحميل الوجهات...</p>
              </div>
            ) : !done ? (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-stone-500 text-sm">
                      السؤال {currentQ + 1} من {questions.length}
                    </span>
                    <span className="font-sans text-sand-500 text-sm font-medium">
                      {Math.round(progress)}٪
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sand-500 to-sand-400 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 md:p-10 mb-6 border border-stone-200 shadow-sm">
                  <div className="text-center mb-8">
                    <p className="font-sans text-sand-500 text-xs uppercase tracking-widest mb-3">
                      اضغط على الكارت للاختيار
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900">
                      {q.question}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`group relative text-right p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                          selected === opt.id
                            ? 'border-sand-400 bg-sand-50 shadow-md'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        {selected === opt.id && (
                          <div className="absolute top-3 left-3">
                            <CheckCircle className="w-5 h-5 text-sand-500" />
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                          <div>
                            <p
                              className={`font-display text-lg font-bold mb-1 transition-colors ${
                                selected === opt.id ? 'text-sand-600' : 'text-stone-900'
                              }`}
                            >
                              {opt.label}
                            </p>
                            <p className="font-sans text-stone-500 text-xs">{opt.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentQ === 0}
                    className="flex items-center gap-2 text-stone-500 hover:text-stone-900 disabled:opacity-20 disabled:cursor-not-allowed font-sans text-sm transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 font-sans text-xs transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!selected}
                    className={`flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-xl transition-all ${
                      selected
                        ? 'bg-sand-500 hover:bg-sand-400 text-white shadow-lg shadow-sand-500/20'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{currentQ < questions.length - 1 ? 'التالي' : 'اعرض النتائج'}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 rounded-full bg-sand-500/15 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-sand-500 fill-current" />
                  </div>
                  <h2 className="font-display text-3xl font-black text-stone-900 mb-2">
                    وجهتاك المثاليتان!
                  </h2>
                  <p className="font-sans text-stone-500 text-sm">
                    اخترنا لك وجهتين من الوجهات الموجودة عندك بناءً على إجاباتك
                  </p>
                </div>

                {results.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 shadow-sm">
                    <p className="font-sans text-stone-600 mb-2">
                      ما لقينا تطابق قوي بناءً على الإجابات.
                    </p>
                    <p className="font-sans text-stone-500 text-sm">
                      تأكد إن كل وجهة عندك فيها `tags` عشان التوصيات تشتغل بدقة.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-6 inline-flex items-center gap-2 bg-sand-500 hover:bg-sand-400 text-white font-sans font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>أعد الاختبار</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {results.map((dest, i) => (
                      <div
                        key={dest.slug}
                        className={`bg-white rounded-2xl overflow-hidden border shadow-sm ${
                          i === 0 ? 'border-sand-300' : 'border-stone-200'
                        }`}
                      >
                        {i === 0 && (
                          <div className="bg-gradient-to-r from-sand-600 to-sand-500 px-4 py-2 text-center">
                            <span className="font-sans text-white text-xs font-bold uppercase tracking-wider">
                              ⭐ الاختيار الأفضل لك
                            </span>
                          </div>
                        )}
                        <div className="relative h-52 overflow-hidden">
                          <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-4 right-4">
                            <p className="font-sans text-white/70 text-xs">{dest.country}</p>
                            <h3 className="font-display text-3xl font-black text-white">{dest.name}</h3>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="font-sans text-stone-600 text-sm mb-3 leading-relaxed">
                            {dest.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-sans text-stone-400 text-xs">الأنسب لـ:</span>
                            <span className="font-sans text-sand-500 text-xs font-medium">
                              {dest.bestFor}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-sans text-stone-400 text-xs">الأسعار تبدأ من:</span>
                            <span className="font-display text-sand-500 text-sm font-bold">
                              {dest.priceRange}
                            </span>
                          </div>
                          <Link
                            to={`/destinations/${dest.slug}`}
                            className="block w-full text-center bg-sand-50 hover:bg-sand-100 border border-sand-200 hover:border-sand-300 text-sand-600 font-sans text-sm py-2.5 rounded-lg transition-all"
                          >
                            استكشف الوجهة
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                    ما لقيت رحلتك؟ خلّنا نصممها لك خصيصًا
                  </h3>
                  <p className="font-sans text-stone-500 text-sm mb-6">
                    تواصل معنا الآن واحصل على عرض سعر خلال دقائق
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-sans font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>تواصل عبر واتساب</span>
                    </a>
                    <Link
                      to="/programs"
                      className="flex items-center gap-2 btn-primary text-sm py-3.5 px-8"
                    >
                      <span>استكشف كل البرامج</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 flex items-center gap-2 text-stone-400 hover:text-stone-700 font-sans text-xs transition-colors mx-auto"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>أعد الاختبار من البداية</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default WhereToTravelPage;