import React from 'react';
import { useTranslation } from 'react-i18next';
import useSEO from '../../hooks/useSEO';
import PublicLayout from '../../components/layout/PublicLayout';

const RefundPolicy: React.FC = () => {
  const { t, i18n } = useTranslation();
  useSEO({ title: t('refundPage.seoTitle'), description: t('refundPage.seoDescription'), path: '/refund-policy' });
  const refundItems = t('refundPage.items', { returnObjects: true }) as string[];

  return (
    <PublicLayout>
      <div className="bg-white min-h-screen">
        <section className="relative h-44 md:h-48 flex items-start justify-center overflow-hidden bg-charcoal-900 pt-24 md:pt-28">
          <div className="relative z-10 text-center px-6" dir={i18n.dir()}>
            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">
              {t('refundPage.titlePart1')} <span className="text-gradient">{t('refundPage.titlePart2')}</span>
            </h1>
          </div>
        </section>

        <section className="bg-white py-16" dir={i18n.dir()}>
          <div className="max-w-3xl mx-auto px-5">
            <ul className="space-y-5">
              {refundItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-xl px-5 py-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-500 mt-2 flex-shrink-0" />
                  <p className="font-sans text-stone-700 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>

            <p className="font-sans text-stone-400 text-xs text-center mt-10 leading-relaxed">
              {t('refundPage.note')}
            </p>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default RefundPolicy;
