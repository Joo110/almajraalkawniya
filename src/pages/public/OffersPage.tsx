import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MessageCircle, ArrowLeft } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { Spinner, ErrorBox, Badge } from '../../components/ui/index';
import { useOffers } from '../../hooks/useOffers';
import { Offer, OfferType } from '../../types';
import { toIntlLocale, toIntlLocaleSA } from '../../utils/localeFormat';

const WHATSAPP_NUMBER = '966544817995';

const buildWhatsappLink = (title: string, msgTemplate: string) => {
  const message = msgTemplate.replace('{title}', title);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const offerTypeLabel = (type: OfferType | string, t: (k: string) => string) => {
  switch ((type || '').toString().toLowerCase()) {
    case 'percentage':
      return { label: t('offersPage.typePercentage'), color: 'green' as const };
    case 'fixed':
    case 'value':
      return { label: t('offersPage.typeFixed'), color: 'blue' as const };
    case 'bundle':
      return { label: t('offersPage.typeBundle'), color: 'gold' as const };
    default:
      return { label: t('offersPage.typeDefault'), color: 'gold' as const };
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(toIntlLocale(document.documentElement.lang), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const OffersPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { offers, loading, error } = useOffers();

  const activeOffers = offers.filter(
    (o) => (o as Offer & { isActive?: boolean }).isActive !== false
  );

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* Hero */}
        <section className="relative h-72 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1600&q=80"
            alt="offers"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 text-center px-6" dir={i18n.dir()}>
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">
              — {t('offersPage.eyebrow')} —
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              {t('offersPage.titlePart1')} <span className="text-gradient">{t('offersPage.titlePart2')}</span>
            </h1>
            <p className="font-accent text-lg text-white/75 italic">
              {t('offersPage.subtitle')}
            </p>
          </div>
        </section>

        {/* Offers */}
        <section className="py-20 bg-stone-50" dir={i18n.dir()}>
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorBox message={error} />
            ) : activeOffers.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(t('offersPage.placeholderOffers', { returnObjects: true }) as Array<{ title: string; type: OfferType; value: number; desc: string; end: string }>).map((o, i) => {
                  const typeInfo = offerTypeLabel(o.type, t);

                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md hover:border-sand-300 transition-all duration-300 card-hover flex flex-col"
                    >
                      <div className="bg-gradient-to-br from-sand-100 to-sand-50 p-6 border-b border-stone-200">
                        <div className="mb-4">
                          <Badge label={typeInfo.label} color={typeInfo.color} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
                          {o.title}
                        </h3>
                        <div className="font-display text-4xl font-black text-gradient">
                          {o.type === OfferType.Percentage
                            ? `${o.value}%`
                            : `${o.value.toLocaleString(toIntlLocaleSA(i18n.language))} ${t('offersPage.currency')}`}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="font-sans text-stone-600 text-sm mb-4 leading-relaxed">
                          {o.desc}
                        </p>
                        <div className="flex items-center gap-2 text-stone-500 text-xs mb-5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{t('offersPage.ends')}: {o.end}</span>
                        </div>
                        <a
                          href={buildWhatsappLink(o.title, t('offersPage.whatsappMessage'))}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-sans text-sm font-semibold py-2.5 rounded-xl transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {t('offersPage.bookViaWhatsapp')}
                          <ArrowLeft className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOffers.map((o) => {
                  const typeInfo = offerTypeLabel(o.type, t);
                  const endDate = formatDate(o.endDate);
                  const startDate = formatDate(o.startDate);
                  const description = o.description || '';

                  return (
                    <div
                      key={o.id}
                      className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md hover:border-sand-300 transition-all duration-300 card-hover flex flex-col"
                    >
                      <div className="bg-gradient-to-br from-sand-100 to-sand-50 p-6 border-b border-stone-200">
                        <div className="mb-4">
                          <Badge label={typeInfo.label} color={typeInfo.color} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
                          {o.title}
                        </h3>
                        <div className="font-display text-4xl font-black text-gradient">
                          {String(o.type).toLowerCase() === 'percentage'
                            ? `${o.value}%`
                            : `${o.value.toLocaleString(toIntlLocaleSA(i18n.language))} ${t('offersPage.currency')}`}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="font-sans text-stone-600 text-sm mb-4 leading-relaxed">
                          {description}
                        </p>

                        <div className="flex flex-col gap-2 text-stone-500 text-xs mb-5">
                          {startDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{t('offersPage.starts')}: {startDate}</span>
                            </div>
                          )}
                          {endDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{t('offersPage.ends')}: {endDate}</span>
                            </div>
                          )}
                        </div>

                        <a
                          href={buildWhatsappLink(o.title, t('offersPage.whatsappMessage'))}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-sans text-sm font-semibold py-2.5 rounded-xl transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {t('offersPage.bookViaWhatsapp')}
                          <ArrowLeft className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default OffersPage;