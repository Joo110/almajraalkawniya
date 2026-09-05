import React from 'react';
import { useTranslation } from 'react-i18next';
import useSEO from '../../hooks/useSEO';
import PublicLayout from '../../components/layout/PublicLayout';

interface PrivacySection {
  title: string;
  body: string;
}

const PrivacyPolicyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  useSEO({ title: t('privacy.seoTitle'), description: t('privacy.seoDescription'), path: '/privacy' });
  const sections = t('privacy.sections', { returnObjects: true }) as PrivacySection[];

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        <section className="relative h-44 md:h-48 flex items-start justify-center overflow-hidden bg-charcoal-900 pt-24 md:pt-28">
          <div className="relative z-10 text-center px-6" dir={i18n.dir()}>
            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">
              {t('privacy.titlePart1')} <span className="text-gradient">{t('privacy.titlePart2')}</span>
            </h1>
            <p className="font-sans text-white/60 text-sm">{t('privacy.lastUpdated')}</p>
          </div>
        </section>

        <section className="py-16 bg-white" dir={i18n.dir()}>
          <div className="max-w-3xl mx-auto px-6 space-y-10">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <p className="font-sans text-stone-600 text-sm leading-8">
                <Trans t={t} intro />
              </p>
            </div>

            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-stone-900 mb-3">
                  {section.title}
                </h2>
                <p className="font-sans text-stone-600 text-sm leading-8 whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

const Trans: React.FC<{ t: (k: string) => string; intro?: boolean }> = ({ t }) => (
  <>
    {t('privacy.introPart1')} <strong>{t('privacy.agencyName')}</strong> ({t('footer.crNumber')}: 7053753773)
    {' '}{t('privacy.introPart2')}
  </>
);

export default PrivacyPolicyPage;
