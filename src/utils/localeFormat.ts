/**
 * يحوّل كود اللغة الحالي في i18next (ar / en / fr) إلى الـ locale المناسب
 * لدوال Intl / toLocaleDateString / toLocaleString.
 */
export function toIntlLocale(lang: string): string {
  switch (lang) {
    case 'ar':
      return 'ar-EG';
    case 'fr':
      return 'fr-FR';
    case 'en':
    default:
      return 'en-US';
  }
}

/** نفس الفكرة لكن بصيغة locale سعودية (تُستخدم في تنسيق الأسعار مثلاً) */
export function toIntlLocaleSA(lang: string): string {
  switch (lang) {
    case 'ar':
      return 'ar-SA';
    case 'fr':
      return 'fr-FR';
    case 'en':
    default:
      return 'en-US';
  }
}
