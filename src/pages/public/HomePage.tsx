import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Clock, Hash, Users, Plane, Hotel, Camera, Phone, MapPin, FileText } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { SectionHeader, Spinner } from '../../components/ui/index';
import ProgramCard from '../../components/ui/ProgramCard';
import DestinationCard from '../../components/ui/DestinationCard';
import ArticleCard from '../../components/ui/ArticleCard';
import { usePrograms } from '../../hooks/usePrograms';
import { useDestinations } from '../../hooks/useDestinations';
import { useArticles } from '../../hooks/useArticles';
import { useOffers } from '../../hooks/useOffers';
import { leadsService } from '../../services/otherServices';

const PHONE_NUMBER = '966544817995';
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;
const PHONE_URL = `tel:+${PHONE_NUMBER}`;

// أحجام الصور اتقللت من w=1920&q=90 إلى w=1400&q=70 لتقليل حجم التحميل
// بشكل ملحوظ (الفرق بصريًا في خلفية شبه شفافة تقريبًا معدوم، لكن الفرق
// في حجم الملف كبير جدًا).
const HERO_SLIDE_IMAGES = ['/maldivesImg.jpg', '/parisImg.jpg', '/dubaiImg.jpg', '/switzerlandImg.jpg', '/indonesiaImg.jpg'];

/**
 * فحص مرن لحالة "النشاط" على عنصر البرنامج.
 * بعض الـ APIs ترجع `active` وبعضها يرجع `isActive` — هذه الدالة تتعامل مع الحالتين
 * بدل الاعتماد على اسم حقل واحد بشكل صارم، وهو ما كان يسبب اختفاء البرامج من الصفحة الرئيسية.
 */
const isProgramActive = (p: { active?: boolean; isActive?: boolean }) => {
  if (typeof p.active === 'boolean') return p.active;
  if (typeof p.isActive === 'boolean') return p.isActive;
  return true;
};

const HeroSlideshow: React.FC = () => {
  const { t, i18n } = useTranslation();
  const heroSlides = (t('homePage.heroSlides', { returnObjects: true }) as Array<{ label: string; sublabel: string }>).map((s, i) => ({
    img: HERO_SLIDE_IMAGES[i],
    label: s.label,
    sublabel: s.sublabel,
  }));
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [, setTransitioning] = useState(false);
  // بنسجل بس السلايدات اللي فعلاً اتعرضت، عشان لا نحمّل الـ 5 صور
  // مرة واحدة من أول ما الصفحة تفتح — كل صورة بتتحمّل أول ما دورها يجي.
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));

const HERO_SLIDES = heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setPrev(current);
      setTimeout(() => {
        setCurrent((c) => {
          const next = (c + 1) % HERO_SLIDES.length;
          setLoadedSlides((prevLoaded) => {
            if (prevLoaded.has(next)) return prevLoaded;
            const updated = new Set(prevLoaded);
            updated.add(next);
            return updated;
          });
          return next;
        });
        setTimeout(() => {
          setPrev(null);
          setTransitioning(false);
        }, 900);
      }, 100);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, HERO_SLIDES.length]);

  return (
    // will-change-transform + transform-gpu لإجبار المتصفح يستخدم الـ GPU
    // بدل الـ CPU للـ layer ده، وده بيقلل الـ lag وقت الـ scroll بشكل كبير
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden transform-gpu">
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        const isPrev = idx === prev;
        return (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out will-change-[opacity] transform-gpu"
            style={{
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
            }}
          >
            {loadedSlides.has(idx) && (
              <img
                src={slide.img}
                alt={slide.label}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                decoding="async"
                // will-change-transform + transform-gpu بيثبتوا الصورة على layer منفصل
                // فبيقلل إعادة الـ paint وقت الـ scroll أو الـ animation
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out will-change-transform transform-gpu ${isActive ? 'scale-110' : 'scale-100'}`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
          </div>
        );
      })}

      {/* تقليل شدة الـ blur من blur-3xl لـ blur-2xl + إضافة transform-gpu وwill-change
          عشان الـ blur الثقيل ده كان بيتسبب في إعادة رسم (repaint) مكلفة جدًا
          مع كل فريم أثناء الـ scroll، خصوصًا إنه شغال جوه animation مستمر (animate-float) */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-sand-500/10 rounded-full blur-2xl animate-float z-10 will-change-transform transform-gpu" />
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-ocean-500/10 rounded-full blur-2xl animate-float z-10 will-change-transform transform-gpu" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center" dir={i18n.dir()}>


        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
          {t('homePage.heroTitlePart1')} <span className="text-gradient">{t('homePage.heroTitlePart2')}</span><br />
          {t('homePage.heroTitlePart3')}
        </h1>

        <p className="font-accent text-xl md:text-2xl text-stone-300 italic max-w-2xl mx-auto mb-8">
          {t('homePage.heroSubtitle')}
        </p>


        {/* ── عنوان المنشأة، الرقم الضريبي، رقم السجل التجاري ── */}
        {/* تقليل الـ backdrop-blur من md لـ sm، لأن الـ backdrop-filter من أثقل
            خصائص الـ CSS على الأداء، وتكراره في 3 عناصر متجاورة كان بيضاعف التكلفة */}
        <div className="inline-flex flex-col sm:flex-row items-stretch justify-center gap-px mb-10 overflow-hidden rounded-2xl border border-white/10">
          {/* العنوان */}
          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-sm px-6 py-3 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-sand-400 flex-shrink-0" />
            <div className="text-right">
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-widest leading-none mb-0.5">{t('homePage.establishmentAddress')}</p>
              <p className="font-sans text-white text-sm font-medium leading-tight">
                 {t('homePage.addressShort')}
              </p>
            </div>
          </div>

          {/* فاصل */}
          <div className="hidden sm:block w-px bg-white/10" />
          <div className="block sm:hidden h-px bg-white/10" />

          {/* الرقم الضريبي */}
          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-sm px-6 py-3 w-full sm:w-auto">
            <FileText className="w-4 h-4 text-sand-400 flex-shrink-0" />
            <div className="text-right">
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-widest leading-none mb-0.5">{t('footer.taxNumber')}</p>
              <p className="font-sans text-white text-sm font-medium leading-tight tracking-wider" dir="ltr">
                314643915700003
              </p>
            </div>
          </div>

          {/* فاصل */}
          <div className="hidden sm:block w-px bg-white/10" />
          <div className="block sm:hidden h-px bg-white/10" />

          {/* رقم السجل التجاري */}
          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-sm px-6 py-3 w-full sm:w-auto">
            <Hash className="w-4 h-4 text-sand-400 flex-shrink-0" />
            <div className="text-right">
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-widest leading-none mb-0.5">{t('footer.crNumber')}</p>
              <p className="font-sans text-white text-sm font-medium leading-tight tracking-wider" dir="ltr">
                7053753773
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/programs" className="btn-primary flex items-center gap-2 text-base py-4 px-10">
            <span>{t('aboutPage.exploreProgramsCta')}</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>



      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { programs, loading: pLoading } = usePrograms();
  const { destinations, loading: dLoading } = useDestinations();
  const { articles, loading: aLoading } = useArticles();
  const { offers } = useOffers();

  const today = new Date().toISOString().split('T')[0];

  /* ── SEO: عنوان الصفحة والوصف التعريفي ── */
 useEffect(() => {
    // Title
    document.title = t('homePage.pageTitle');

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = t('homePage.pageDescription');

    return () => {
      // استعادة عنوان افتراضي عند مغادرة الصفحة إن أردت
      // document.title = 'المجرة الكونية';
    };
  }, [t]);
  
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    departureCity: '',
    destinationId: '',
    travelDate: '',
    durationDays: 1,
    travelersCount: 1,
  });
  const [leadSent, setLeadSent] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadLoading(true);
    try {
      await (leadsService.create as Function)({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        message: leadForm.message,
        departureCity: leadForm.departureCity,
        destinationId: leadForm.destinationId || undefined,
        travelDate: leadForm.travelDate,
        durationDays: Number(leadForm.durationDays),
        travelersCount: Number(leadForm.travelersCount),
      });
      setLeadSent(true);
    } catch {
      // handle error
    } finally {
      setLeadLoading(false);
    }
  };

  // البرامج النشطة فقط، مع فحص مرن لاسم حقل الحالة (active أو isActive)
  const activePrograms = programs.filter(isProgramActive);

  return (
    <PublicLayout>
      <HeroSlideshow />


      <section className="py-24 bg-white" dir={i18n.dir()}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              tag={t('destinationsPage.eyebrow')}
              title=""
              highlight={t('homePage.destinationsHighlight')}
              subtitle={t('homePage.destinationsSubtitle')}
            />
            <Link to="/destinations" className="hidden md:flex items-center gap-2 text-sand-400 hover:text-sand-300 font-sans text-sm transition-colors">
              <span>{t('homePage.viewAll')}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {dLoading ? (
            <Spinner />
          ) : destinations.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t('destinationsPage.placeholderDestinations', { returnObjects: true }) as Array<{ name: string; country: string; img: string; slug: string }>).slice(0, 3).map((d) => (
                <Link key={d.slug} to={`/destinations/${d.slug}`} className="card-hover group relative block rounded-2xl overflow-hidden h-72">
                  <img src={d.img} alt={d.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 right-5">
                    <p className="font-sans text-stone-300 text-xs mb-1">{d.country}</p>
                    <h3 className="font-display text-2xl font-bold text-white">{d.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinations.slice(0, 6).map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-stone-50" dir={i18n.dir()}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              tag={t('programsPage.eyebrow')}
              title=""
              highlight={t('homePage.programsHighlight')}
              subtitle={t('homePage.programsSubtitle')}
            />
            <Link to="/programs" className="hidden md:flex items-center gap-2 text-sand-400 hover:text-sand-300 font-sans text-sm transition-colors">
              <span>{t('homePage.viewAll')}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {pLoading ? (
            <Spinner />
          ) : activePrograms.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t('homePage.placeholderPrograms', { returnObjects: true }) as Array<{ title: string; price: number; days: number; people: number; img: string }>).map((p) => (
                <div key={p.title} className="card-hover group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 right-3">
                      <span className="font-display text-2xl font-bold text-white">{p.price.toLocaleString(i18n.language === 'ar' ? 'ar-EG' : 'en-US')} {t('homePage.currencyShort')}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-stone-800 mb-3">{p.title}</h3>
                    <div className="flex items-center gap-4 text-stone-500">
                      <span className="font-sans text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {p.days} {t('programDetail.days')}</span>
                      <span className="font-sans text-xs flex items-center gap-1"><Users className="w-3 h-3" /> {p.people} {t('homePage.peopleWord')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activePrograms.slice(0, 6).map((p) => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {offers.filter(o => o.isActive).length > 0 && (
        <section className="py-16 bg-white" dir={i18n.dir()}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sand-700 to-sand-900" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80')] opacity-10 bg-cover bg-center" />
              <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <span className="font-sans text-sand-100 text-xs uppercase tracking-widest mb-3 block">{t('homePage.exclusiveOffers')}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                    {offers[0]?.title || t('homePage.defaultOfferTitle')}
                  </h3>
                  <p className="font-sans text-stone-200 text-sm max-w-md">
                    {offers[0]?.description || t('homePage.defaultOfferDesc')}
                  </p>
                </div>
                <Link to="/offers" className="flex-shrink-0 bg-white text-sand-700 font-sans font-bold px-8 py-3.5 rounded-sm text-sm uppercase tracking-wider hover:bg-sand-50 transition-colors">
                  {t('destinationDetail.bookNow')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-stone-50" dir={i18n.dir()}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag={t('homePage.whyUsTag')}
            title=""
            highlight={t('homePage.whyUsHighlight')}
            subtitle={t('homePage.whyUsSubtitle')}
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: <Shield className="w-7 h-7" />, title: t('homePage.feature1Title'), desc: t('homePage.feature1Desc') },
              { icon: <Star className="w-7 h-7" />, title: t('homePage.feature2Title'), desc: t('homePage.feature2Desc') },
              { icon: <Users className="w-7 h-7" />, title: t('homePage.feature3Title'), desc: t('homePage.feature3Desc') },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-stone-200 rounded-2xl p-8 text-center hover:border-sand-300 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-sand-50 flex items-center justify-center text-sand-500 mx-auto mb-6">
                  {f.icon}
                </div>
                <h4 className="font-display text-xl font-bold text-stone-800 mb-3">{f.title}</h4>
                <p className="font-sans text-stone-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" dir={i18n.dir()}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Plane className="w-6 h-6" />, title: t('homePage.service1Title'), desc: t('homePage.service1Desc') },
              { icon: <Hotel className="w-6 h-6" />, title: t('homePage.service2Title'), desc: t('homePage.service2Desc') },
              { icon: <Camera className="w-6 h-6" />, title: t('homePage.service3Title'), desc: t('homePage.service3Desc') },
            ].map((svc) => (
              <div key={svc.title} className="flex items-start gap-5 bg-stone-50 border border-stone-200 rounded-xl p-6 hover:border-sand-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center text-sand-500 flex-shrink-0">
                  {svc.icon}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-stone-800 mb-1">{svc.title}</h4>
                  <p className="font-sans text-stone-500 text-sm">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-stone-50" dir={i18n.dir()}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              tag={t('blogPage.eyebrow')}
              title=""
              highlight={t('blogPage.titlePart1') + ' ' + t('blogPage.titlePart2')}
              subtitle={t('blogPage.subtitle')}
            />
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-sand-400 hover:text-sand-300 font-sans text-sm transition-colors">
              <span>{t('homePage.readMore')}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {aLoading ? (
            <Spinner />
          ) : articles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(t('homePage.placeholderArticles', { returnObjects: true }) as Array<{ title: string; date: string; img: string }>).map((a) => (
                <div key={a.title} className="group" dir={i18n.dir()}>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img src={a.img} alt={a.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="font-sans text-stone-500 text-xs mb-2">{a.date}</p>
                  <h3 className="font-display text-lg font-semibold text-stone-800 group-hover:text-sand-600 transition-colors">{a.title}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-white" dir={i18n.dir()}>
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            tag={t('homePage.bookNowTag')}
            title=""
            highlight={t('homePage.bookNowHighlight')}
            subtitle={t('homePage.bookNowSubtitle')}
            center
          />

          {leadSent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center mt-10">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="font-display text-2xl font-bold text-stone-800 mb-2">{t('homePage.thankYouContact')}</h4>
              <p className="font-sans text-stone-600 text-sm">{t('homePage.teamWillContact')}</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="bg-stone-50 border border-stone-200 rounded-2xl p-8 md:p-10 mt-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('homePage.fullName')} *</label>
                  <input
                    required
                    value={leadForm.name}
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder={t('contactPage.namePlaceholder')}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('homePage.phoneNumber')} *</label>
                  <input
                    required
                    value={leadForm.phone}
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+20 1xx xxx xxxx"
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('homePage.email')} *</label>
                <input
                  required
                  type="email"
                  value={leadForm.email}
                  onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('contactPage.departureCity')} *</label>
                  <input
                    required
                    value={leadForm.departureCity}
                    onChange={e => setLeadForm({ ...leadForm, departureCity: e.target.value })}
                    placeholder={t('homePage.cairoPlaceholder')}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('contactPage.destination')} *</label>
                  {destinations.length > 0 ? (
                    <select
                      required
                      value={leadForm.destinationId}
                      onChange={e => setLeadForm({ ...leadForm, destinationId: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-400 transition-colors"
                    >
                      <option value="" disabled>{t('contactPage.chooseDestination')}</option>
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required
                      value={leadForm.destinationId}
                      onChange={e => setLeadForm({ ...leadForm, destinationId: e.target.value })}
                      placeholder={t('homePage.destinationExamplesPlaceholder')}
                      className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-400 transition-colors"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('contactPage.travelDate')} *</label>
                  <input
                    required
                    type="date"
                    min={today}
                    value={leadForm.travelDate}
                    onChange={e => setLeadForm({ ...leadForm, travelDate: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('homePage.tripDurationDays')} *</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={60}
                    value={leadForm.durationDays}
                    onChange={e => setLeadForm({ ...leadForm, durationDays: Math.min(60, Math.max(1, Number(e.target.value))) })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('contactPage.travelersCount')} *</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={50}
                    value={leadForm.travelersCount}
                    onChange={e => setLeadForm({ ...leadForm, travelersCount: Math.min(50, Math.max(1, Number(e.target.value))) })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">{t('homePage.yourMessage')}</label>
                <textarea
                  rows={4}
                  value={leadForm.message}
                  onChange={e => setLeadForm({ ...leadForm, message: e.target.value })}
                  placeholder={t('homePage.dreamTripPlaceholder')}
                  className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={leadLoading}
                className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {leadLoading ? (
                  <><Spinner className="py-0" /><span>{t('contactPage.sending')}</span></>
                ) : (
                  t('homePage.sendYourRequest')
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('partnersPage.contactViaWhatsapp')}
          className="group relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-110 active:scale-95"
          style={{ backgroundColor: '#25D366' }}
        >
          <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#25D366' }} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white relative z-10">
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.737 5.46 2.025 7.748L0 32l8.47-2.003A15.938 15.938 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 01-6.765-1.849l-.485-.288-5.025 1.188 1.213-4.889-.317-.502A13.253 13.253 0 012.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.274-9.874c-.398-.199-2.357-1.163-2.722-1.295-.365-.133-.631-.199-.897.199-.266.398-1.031 1.295-1.264 1.562-.232.266-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.976-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.175-.811.179-.179.398-.465.598-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.2-.897-2.162-1.23-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.396 1.363-1.396 3.325s1.43 3.856 1.629 4.122c.199.266 2.814 4.297 6.817 6.026.953.411 1.696.657 2.275.841.956.304 1.826.261 2.515.158.767-.114 2.357-.963 2.69-1.894.332-.93.332-1.727.232-1.894-.1-.166-.365-.266-.763-.465z" />
          </svg>
          <span className="absolute left-full ml-3 whitespace-nowrap bg-black/80 text-white text-xs font-sans px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {t('footer.whatsapp')}
          </span>
        </a>

        <a
          href={PHONE_URL}
          aria-label={t('homePage.callUsAria')}
          className="group relative w-14 h-14 rounded-full bg-sand-500 hover:bg-sand-400 flex items-center justify-center shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          <Phone className="w-6 h-6 text-white relative z-10" />
          <span className="absolute left-full ml-3 whitespace-nowrap bg-black/80 text-white text-xs font-sans px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {t('homePage.callUsAria')}
          </span>
        </a>
      </div>
    </PublicLayout>
  );
};

export default HomePage;