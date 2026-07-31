import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-800 border-t border-white/10 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-5">

        {/* Grid: 2 cols on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo3.jpeg"
                alt="شعار المجرة الكونية"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="font-display text-xl font-bold">
                <span className="text-gradient">المجرة</span>
                <span className="text-white"> الكونية</span>
              </span>
            </Link>
            <p className="font-sans text-white/60 text-sm leading-relaxed mb-5" dir="rtl">
              نصنع تجارب سفر لا تُنسى، ونأخذك إلى أجمل الوجهات حول العالم بأسلوب يليق بأحلامك.
            </p>

            {/* روابط السوشيال ميديا */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.instagram.com/almajraalkawniya2026?igsh=MTlzMWRmaGY3MTZzOA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-sand-400 hover:bg-white/15 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@almajraalkawniya?_r=1&_d=f01g3e90l4be92&sec_uid=MS4wLjABAAAAuGlEYo5kCArKG7Yql_tpeu_rTS9BhQiKbEJRokPsEtbf2tiT7u1NI5jczCNOMrgc&share_author_id=7643864611427779605&sharer_language=ar&source=h5_m&u_code=f3ia5ifcifhdka&timestamp=1781629933&user_id=7643864611427779605&sec_user_id=MS4wLjABAAAAuGlEYo5kCArKG7Yql_tpeu_rTS9BhQiKbEJRokPsEtbf2tiT7u1NI5jczCNOMrgc&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7649618006575007505&share_link_id=ebb192ac-8c2e-4c9d-8069-2a5249e49e4c&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تيك توك"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-sand-400 hover:bg-white/15 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6 5.82c-.93-.62-1.6-1.59-1.84-2.74h-3.18v13.4c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.3 0 .59.05.86.13v-3.23a6.1 6.1 0 0 0-.86-.06A6.07 6.07 0 0 0 2.7 16.48a6.07 6.07 0 0 0 6.07 6.07 6.07 6.07 0 0 0 6.07-6.07V9.4a7.5 7.5 0 0 0 4.37 1.4V7.62a4.85 4.85 0 0 1-2.61-1.8z" />
                </svg>
              </a>

              <a
                href="https://www.snapchat.com/add/almajraalkawniy?share_id=IcAmDl12nuQ&locale=ar-EG"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="سناب شات"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-sand-400 hover:bg-white/15 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5c2.6 0 4.16 1.94 4.27 4.04.05.96 0 1.8-.03 2.4.45.18.96.32 1.4.34.46.02.85.33.85.82 0 .54-.5.78-.85 1-.27.17-.55.4-.55.7 0 .17.12.43.3.74.4.66 1.04 1.4 1.04 1.92 0 .58-.6.85-1.34 1.02-.27.06-.4.2-.45.4-.06.27-.1.6-.5.78-.42.18-1.16.06-1.7.2-.5.13-.78.62-1.4 1.03-.6.4-1.4.6-2.04.6s-1.44-.2-2.04-.6c-.62-.4-.9-.9-1.4-1.03-.54-.14-1.28-.02-1.7-.2-.4-.18-.44-.5-.5-.78-.05-.2-.18-.34-.45-.4-.74-.17-1.34-.44-1.34-1.02 0-.52.64-1.26 1.04-1.92.18-.3.3-.57.3-.74 0-.3-.28-.53-.55-.7-.35-.22-.85-.46-.85-1 0-.5.39-.8.85-.82.44-.02.95-.16 1.4-.34-.03-.6-.08-1.44-.03-2.4C7.84 4.44 9.4 2.5 12 2.5z" />
                </svg>
              </a>

              <a
                href="https://wa.me/966544817995"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-sand-400 hover:bg-white/15 transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* روابط الموقع */}
          <div dir="rtl">
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-widest mb-4">
              روابط الموقع
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: 'من نحن' },
                { to: '/destinations', label: 'الوجهات' },
                { to: '/programs', label: 'البرامج السياحية' },
                { to: '/offers', label: 'العروض الخاصة' },
                { to: '/terms', label: 'الشروط والأحكام' },
                { to: '/refund-policy', label: 'سياسة الاسترجاع' },
                { to: '/bank-accounts', label: 'الحسابات البنكية' },
                { to: '/site-documentation', label: 'توثيق الموقع' },
                { to: '/blog', label: 'المدونة' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-sans text-white/60 hover:text-sand-400 text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل معنا — full width on mobile */}
          <div className="col-span-2 md:col-span-1" dir="rtl">
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-widest mb-4">
              تواصل معنا
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sand-500 mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/Uah4tmngpQmNrDYP6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-white/60 hover:text-sand-400 text-sm transition-colors duration-200"
                >
                      الرياض حي السويدي شارع الملك عبدالعزيز بن عبدالرحمن سعود الفرعي  رقم المبنى 6249 الرمز البريد 13342
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sand-500 flex-shrink-0" />
                <a
                  href="tel:+966544817995"
                  className="font-sans text-white/60 hover:text-sand-400 text-sm transition-colors duration-200"
                  dir="ltr"
                >
                  +966 54 481 7995
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Send className="w-4 h-4 text-sand-500 flex-shrink-0" />
                <a
                  href="https://wa.me/966544817995"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-white/60 hover:text-sand-400 text-sm transition-colors duration-200"
                  dir="ltr"
                >
                  +966 54 481 7995
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sand-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:almajara.alkawnia.travel@gmail.com"
                  className="font-sans text-white/60 hover:text-sand-400 text-xs break-all transition-colors duration-200"
                  dir="ltr"
                >
                  almajara.alkawnia.travel@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* وسائل الدفع المتاحة */}
        <div className="border-t border-white/10 pt-6 pb-6" dir="rtl">
          <p className="font-sans text-white/40 text-xs text-center uppercase tracking-widest mb-4">
            وسائل الدفع المتاحة
          </p>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-sm px-4 py-3 max-w-full">
              <img
                src="/paymentinfo.webp"
                alt="وسائل الدفع المتاحة: Visa, Mastercard, تحويل بنكي, تمارا, tabby"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* الترخيص والسجل التجاري */}
        <div className="border-t border-white/10 pt-6 pb-6" dir="rtl">
          <p className="font-sans text-white/40 text-xs text-center leading-relaxed">
            وكالة سفر وسياحة — رقم السجل التجاري: <span dir="ltr" className="inline-block">7053753773</span>
            {' '}|{' '}
            الرقم الضريبي: <span dir="ltr" className="inline-block">314643915700003</span>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-white/30 text-xs text-center md:text-right" dir="rtl">
            © {new Date().getFullYear()} وكالة المجرة الكونية للسفر والسياحة — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="font-sans text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link
              to="/terms"
              className="font-sans text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              الشروط والأحكام
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;