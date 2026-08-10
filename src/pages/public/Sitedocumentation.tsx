import React from 'react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '../../components/layout/PublicLayout';

const SiteDocumentation: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <PublicLayout>
      <div className="bg-white min-h-screen">
        <section className="relative h-44 md:h-48 flex items-start justify-center overflow-hidden bg-charcoal-900 pt-24 md:pt-28">
          <div className="relative z-10 text-center px-6" dir={i18n.dir()}>
            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">
              {t('siteDoc.titlePart1')} <span className="text-gradient">{t('siteDoc.titlePart2')}</span>
            </h1>
          </div>
        </section>

        <section className="bg-white py-16" dir={i18n.dir()}>
          <div className="max-w-5xl mx-auto px-5 flex justify-center">
            <img
              src="/site-documentation.jpeg"
              alt={t('siteDoc.imgAlt')}
              className="w-full max-w-4xl rounded-2xl shadow-lg object-contain"
            />
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default SiteDocumentation;