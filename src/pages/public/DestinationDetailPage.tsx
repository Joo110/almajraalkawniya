import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowRight, MessageCircle, Star, Compass } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import ProgramCard from '../../components/ui/ProgramCard';
import { Spinner } from '../../components/ui/index';
import { useDestinationBySlug } from '../../hooks/useDestinations';
import { usePrograms } from '../../hooks/usePrograms';

const WHATSAPP_NUMBER = '966544817995';

const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { destination, loading } = useDestinationBySlug(slug || '');
  const { programs } = usePrograms();

  const relatedPrograms = programs.filter(
    p => p.active && p.destinationId === destination?.id
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `مرحباً، أود الاستفسار عن رحلة إلى ${destination?.name || 'وجهتكم'} وأريد الحجز.`
  )}`;

  if (loading) {
    return (
      <PublicLayout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      </PublicLayout>
    );
  }

  if (!destination) {
    return (
      <PublicLayout>
        <div className="bg-white min-h-screen flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <p className="font-display text-2xl text-stone-900 mb-4">الوجهة غير موجودة</p>
            <Link to="/destinations" className="btn-primary">العودة للوجهات</Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* HERO */}
        <section className="relative h-[75vh] flex items-end overflow-hidden">
          <img
            src={destination.coverImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80'}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />

          <div className="absolute top-10 left-10 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full">
            <Star className="w-3.5 h-3.5 text-sand-400 fill-current" />
            <span className="font-sans text-white/75 text-xs">وجهة مميزة</span>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full" dir="rtl">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-sans mb-8 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              العودة للوجهات
            </Link>

            <div className="flex items-center gap-2 text-sand-400 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="font-sans text-sm tracking-wide">{destination.country || 'وجهة عالمية'}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-none">
                {destination.name}
              </h1>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-xl font-sans font-bold text-white text-base shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #1aab52 100%)' }}
              >
                <MessageCircle className="w-5 h-5" />
                احجز الآن عبر واتساب
              </a>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-20 bg-white" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            {destination.description && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 items-start">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-0.5 bg-sand-500" />
                    <span className="font-sans text-sand-500 text-xs uppercase tracking-widest">عن الوجهة</span>
                  </div>
                  <p className="font-sans text-stone-600 text-lg leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-sand-500/15 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-sand-500" />
                    </div>
                    <span className="font-sans text-stone-700 text-sm font-semibold">معلومات سريعة</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                      <span className="font-sans text-stone-500 text-xs">الدولة</span>
                      <span className="font-sans text-stone-900 text-sm">{destination.country || '—'}</span>
                    </div>
                 
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-sans font-bold text-white text-sm transition-all duration-300 hover:opacity-90 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #25D366 0%, #1aab52 100%)' }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    احجز الآن
                  </a>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-0.5 bg-sand-500" />
                    <span className="font-sans text-sand-500 text-xs uppercase tracking-widest">البرامج</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                    رحلات إلى <span className="text-gradient">{destination.name}</span>
                  </h2>
                </div>
                {relatedPrograms.length > 0 && (
                  <span className="font-sans text-stone-500 text-sm hidden md:block">
                    {relatedPrograms.length} برنامج متاح
                  </span>
                )}
              </div>

              {relatedPrograms.length === 0 ? (
                <div className="bg-stone-50 rounded-2xl p-14 text-center border border-stone-200 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-5 border border-stone-200">
                    <Compass className="w-7 h-7 text-stone-400" />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/programs" className="btn-primary inline-flex items-center gap-2">
                      استعرض جميع البرامج
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-bold text-white text-sm transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #25D366 0%, #1aab52 100%)' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      تواصل معنا
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPrograms.map(p => <ProgramCard key={p.id} program={p} />)}
                </div>
              )}
            </div>

            <div className="mt-20 relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sand-700/80 to-sand-900/90" />
              <div
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.coverImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80'})` }}
              />
              <div className="relative px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8" dir="rtl">
                <div>
                  <span className="font-sans text-sand-200 text-xs uppercase tracking-widest mb-3 block">هل أنت مستعد؟</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    ابدأ رحلتك إلى {destination.name} الآن
                  </h3>
                  <p className="font-sans text-white/70 text-sm">
                    تواصل مع فريقنا وسنصمم لك رحلة لا تُنسى
                  </p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-3 bg-white text-sand-800 font-sans font-bold px-10 py-4 rounded-xl text-base shadow-lg hover:bg-sand-50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  احجز الآن عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default DestinationDetailPage;