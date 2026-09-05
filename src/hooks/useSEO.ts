import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * اللغات المدعومة في الموقع (لازم تتطابق مع i18n/index.ts وقيم lang في الباك اند)
 * ملحوظة: fr موجودة كترجمة واجهة فقط، الباك اند لسه مش بيدعم محتوى بالفرنسي
 * فهيرجع للعربي تلقائيًا كـ fallback (نفس سلوك الـ backend الحالي).
 */
export const SUPPORTED_LANGS = ['ar', 'en', 'tr', 'ru', 'fr'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://almajraalkawniya.com';

export interface SEOOptions {
  /** عنوان الصفحة (بيتحط في <title> و og:title و twitter:title) */
  title: string;
  /** الوصف التعريفي (meta description و og:description) */
  description: string;
  /** الرابط النسبي للصفحة الحالية بدون اللغة، مثال: /destinations/paris */
  path?: string;
  /** صورة المشاركة (og:image) - اختياري */
  image?: string;
  /** نوع المحتوى لـ og:type - افتراضيًا website */
  type?: 'website' | 'article';
  /** منع الفهرسة (لصفحات الأدمن مثلاً) */
  noIndex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

function removeHreflangLinks() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
}

/**
 * Hook للـ SEO: بيستخدم في أي صفحة عامة عشان يظبط:
 * - <title>
 * - meta description
 * - canonical URL
 * - Open Graph / Twitter Card tags
 * - hreflang alternate links لكل اللغات المدعومة (لتحسين ظهور الموقع
 *   في نتائج البحث بلغات مختلفة، وتجنب مشاكل المحتوى المكرر)
 */
export function useSEO({ title, description, path, image, type = 'website', noIndex = false }: SEOOptions) {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || 'ar';

  useEffect(() => {
    if (!title) return;

    // Title
    document.title = title;

    // Meta description
    setMeta('name', 'description', description);

    // Robots
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Canonical + hreflang
    const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
    const canonicalUrl = `${SITE_URL}${cleanPath}`;
    setLink('canonical', canonicalUrl);

    removeHreflangLinks();
    SUPPORTED_LANGS.forEach((lang) => {
      setLink('alternate', `${SITE_URL}${cleanPath}?lang=${lang}`, lang);
    });
    // x-default يوجّه لمحركات البحث للنسخة الافتراضية (العربية)
    setLink('alternate', `${SITE_URL}${cleanPath}`, 'x-default');

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:locale', currentLang);
    if (image) setMeta('property', 'og:image', image);

    // Twitter Card
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (image) setMeta('name', 'twitter:image', image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noIndex, currentLang]);
}

export default useSEO;
