import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Shield,
  Users,
  Award,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle,
  Phone,
} from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { SectionHeader } from '../../components/ui/index';

const WHATSAPP_URL = 'https://wa.me/966544817995';

const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* ══════════════════ HERO ══════════════════ */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=85"
              alt="about hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          </div>

          <div className="absolute top-1/3 right-20 w-40 h-40 bg-sand-500/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/3 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '3s' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" dir="rtl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-2 rounded-full mb-8">
              <Globe className="w-4 h-4 text-sand-400" />
              <span className="font-sans text-white/80 text-sm">قصتنا مع السفر</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              من نحن<span className="text-gradient">؟</span>
            </h1>

            <p className="font-accent text-xl text-white/70 italic max-w-2xl mx-auto leading-relaxed">
              نحن لسنا مجرد وكالة سفر — نحن صانعو الذكريات، رفاقك في كل مغامرة، وشركاؤك نحو آفاق لم تكتشفها بعد
            </p>
          </div>
        </section>

        {/* ══════════════════ STORY ══════════════════ */}
        <section className="py-24 bg-white" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-sand-500/10 border border-sand-500/20 px-4 py-1.5 rounded-full mb-6">
                  <span className="font-sans text-sand-500 text-xs uppercase tracking-wider">قصتنا</span>
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">
                  بدأنا بـ<span className="text-gradient">حلم</span>
                  <br />
                  وصنعنا واقعًا
                </h2>

                <p className="font-sans text-stone-600 text-base leading-relaxed mb-6">
                  في عام ٢٠١٤، انطلقنا من حلم بسيط: أن يكون السفر متاحًا للجميع بجودة عالية وأسعار منافسة. منذ ذلك الحين، أصبحنا الشريك الموثوق لأكثر من ١٠٠٠ عائلة وفرد حول العالم.
                </p>

                <p className="font-sans text-stone-600 text-base leading-relaxed mb-8">
                  فريقنا من المتخصصين العرب يفهم احتياجاتك، يتحدث لغتك، ويعيش شغفك للاستكشاف. كل رحلة نصممها تحمل بصمة شخصية تليق بأحلامك.
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    'أكثر من ١٠ سنوات من الخبرة في السياحة',
                    'فريق متخصص من ٥٠+ مستشار سفر',
                    'شراكات حصرية مع أفضل الفنادق عالميًا',
                    'دعم على مدار الساعة طوال رحلتك',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sand-500 flex-shrink-0" />
                      <span className="font-sans text-stone-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80"
                    alt="travel"
                    className="rounded-2xl h-64 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80"
                    alt="travel"
                    className="rounded-2xl h-64 w-full object-cover mt-8"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=80"
                    alt="travel"
                    className="rounded-2xl h-52 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"
                    alt="travel"
                    className="rounded-2xl h-52 w-full object-cover mt-4"
                  />
                </div>

                <div className="absolute -bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-4 border border-stone-200 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sand-500/15 flex items-center justify-center">
                      <Star className="w-5 h-5 text-sand-500 fill-current" />
                    </div>
                    <div>
                      <p className="font-display text-xl font-bold text-stone-900">٩٨٪</p>
                      <p className="font-sans text-stone-500 text-xs">نسبة رضا العملاء</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ NUMBERS ══════════════════ */}
        <section className="py-20 bg-stone-50 border-y border-stone-200" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: <Globe className="w-6 h-6" />, value: '+١٠٠٠', label: 'رحلة منجزة بنجاح' },
                { icon: <Users className="w-6 h-6" />, value: '+٥٠٠٠', label: 'عميل سعيد' },
                { icon: <Star className="w-6 h-6" />, value: '+٥٠', label: 'وجهة حول العالم' },
                { icon: <Award className="w-6 h-6" />, value: '+١٠', label: 'سنوات من الخبرة' },
              ].map((s) => (
                <div key={s.label} className="group">
                  <div className="flex justify-center mb-3 text-sand-500/70 group-hover:text-sand-500 transition-colors">
                    {s.icon}
                  </div>
                  <p className="font-display text-4xl md:text-5xl font-black text-gradient mb-2">
                    {s.value}
                  </p>
                  <p className="font-sans text-stone-600 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ VALUES ══════════════════ */}
        <section className="py-24 bg-white" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              tag="قيمنا"
              title="ما الذي"
              highlight="يميزنا"
              subtitle="نؤمن بأن كل تفصيلة تصنع الفارق"
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
              {[
                {
                  icon: <Heart className="w-7 h-7" />,
                  title: 'الشغف بالسفر',
                  desc: 'نحن لا نعمل في السياحة، نعيش السياحة. كل عضو في فريقنا مسافر شغوف يفهم ما تبحث عنه.',
                },
                {
                  icon: <Shield className="w-7 h-7" />,
                  title: 'الأمانة والشفافية',
                  desc: 'لا أسعار مخفية ولا مفاجآت. كل ما تدفعه واضح من اللحظة الأولى.',
                },
                {
                  icon: <TrendingUp className="w-7 h-7" />,
                  title: 'التميز في الخدمة',
                  desc: 'لا نقبل بأقل من الممتاز. كل تفصيلة في رحلتك تمر بمراجعة دقيقة لضمان تجربة لا تُنسى.',
                },
                {
                  icon: <Globe className="w-7 h-7" />,
                  title: 'شبكة عالمية',
                  desc: 'شراكاتنا مع أفضل الفنادق والشركات حول العالم تمنحك أسعارًا لا تجدها في أي مكان آخر.',
                },
                {
                  icon: <Users className="w-7 h-7" />,
                  title: 'خدمة شخصية',
                  desc: 'لست مجرد رقم حجز. مستشارك الشخصي يتابعك من بداية التخطيط حتى العودة إلى بيتك.',
                },
                {
                  icon: <Award className="w-7 h-7" />,
                  title: 'ضمان الرضا',
                  desc: 'لو ما كنت راضيًا ١٠٠٪ عن خدمتنا، نعيد لك حقك. بدون أسئلة.',
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="bg-stone-50 rounded-2xl p-7 border border-stone-200 shadow-sm hover:border-sand-300 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-sand-500/15 flex items-center justify-center text-sand-500 mb-5 group-hover:bg-sand-500/20 transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="font-sans text-stone-600 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ CTA ══════════════════ */}
        <section className="py-24 bg-stone-50" dir="rtl">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="bg-white rounded-3xl p-10 md:p-16 border border-stone-200 shadow-sm">
              <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 mb-4">
                جاهز تبدأ<span className="text-gradient"> رحلتك</span>؟
              </h2>
              <p className="font-sans text-stone-600 text-base mb-8 max-w-md mx-auto">
                تواصل معنا الآن وسيساعدك أحد مستشارينا في تصميم رحلة أحلامك
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/programs"
                  className="btn-primary flex items-center gap-2 py-4 px-10"
                >
                  <span>استكشف البرامج</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-stone-300 hover:border-sand-400/40 text-stone-700 hover:text-stone-900 font-sans text-sm px-8 py-4 rounded-xl transition-all bg-white"
                >
                  <Phone className="w-4 h-4" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;