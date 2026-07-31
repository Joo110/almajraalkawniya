// src/pages/public/PartnersPage.tsx
import React, { useState } from 'react';
import { Building2, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { SectionHeader, EmptyState } from '../../components/ui/index';
import { partners, PartnerOffer } from '../../data/partnersData';

const WHATSAPP_NUMBER = '966544817995';

const buildWhatsappLink = (partnerName: string) => {
  const message = `مرحبًا، أرغب بالاستفسار عن عروض ${partnerName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const PartnersPage: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ offers: PartnerOffer[]; index: number } | null>(null);

  const openLightbox = (offers: PartnerOffer[], index: number) => setLightbox({ offers, index });
  const closeLightbox = () => setLightbox(null);
  const nextImage = () =>
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index + 1) % prev.offers.length } : prev
    );
  const prevImage = () =>
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index - 1 + prev.offers.length) % prev.offers.length } : prev
    );

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* Hero */}
        <section className="relative h-72 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80"
            alt="شركاؤنا"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 text-center px-6" dir="rtl">
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">
              — شراكة نجاح —
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              شركاؤنا <span className="text-gradient">الآخرين</span>
            </h1>
            <p className="font-accent text-lg text-white/75 italic">
              تعرف على شركائنا وعروضهم الحصرية
            </p>
          </div>
        </section>

        {/* Partners list */}
        <section className="py-20 bg-stone-50" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              tag="شركاؤنا"
              title=""
              highlight="الشركات المتعاونة معنا"
              subtitle="كل شركة وتحتها أحدث عروضها الخاصة"
              center
            />

            {partners.length === 0 ? (
              <EmptyState
                message="لا يوجد شركاء مضافين بعد"
                icon={<Building2 className="w-10 h-10" />}
              />
            ) : (
              <div className="space-y-16">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8"
                  >
                    {/* Partner header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-200">
                      <div className="flex items-center gap-4">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-16 h-16 rounded-xl object-cover border border-stone-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-sand-500/15 flex items-center justify-center text-sand-500">
                            <Building2 className="w-7 h-7" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-display text-2xl font-bold text-stone-900">
                            {partner.name}
                          </h3>
                          {partner.description && (
                            <p className="font-sans text-stone-500 text-sm mt-1">
                              {partner.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <a
                        href={buildWhatsappLink(partner.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        تواصل عبر واتساب
                      </a>
                    </div>

                    {/* Offers grid */}
                    {partner.offers.length === 0 ? (
                      <p className="font-sans text-stone-400 text-sm">
                        لا توجد عروض حالياً لهذه الشركة
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {partner.offers.map((offer, i) => (
                          <button
                            key={offer.id}
                            onClick={() => openLightbox(partner.offers, i)}
                            className="group text-right rounded-xl overflow-hidden border border-stone-200 hover:border-sand-300 hover:shadow-md transition-all duration-300"
                          >
                            <div className="aspect-[3/4] overflow-hidden bg-stone-100 flex items-center justify-center">
                              <img
                                src={offer.image}
                                alt={offer.title || partner.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            {(offer.title || offer.description) && (
                              <div className="p-4">
                                {offer.title && (
                                  <h4 className="font-display font-bold text-stone-900 text-sm mb-1">
                                    {offer.title}
                                  </h4>
                                )}
                                {offer.description && (
                                  <p className="font-sans text-stone-500 text-xs leading-relaxed">
                                    {offer.description}
                                  </p>
                                )}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 left-6 text-white/80 hover:text-white"
              onClick={closeLightbox}
              aria-label="إغلاق"
            >
              <X className="w-8 h-8" />
            </button>

            {lightbox.offers.length > 1 && (
              <button
                className="absolute right-4 md:right-10 text-white/80 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="السابق"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            <div
              className="max-w-3xl w-full text-center"
              onClick={(e) => e.stopPropagation()}
              dir="rtl"
            >
              <img
                src={lightbox.offers[lightbox.index].image}
                alt={lightbox.offers[lightbox.index].title || ''}
                className="w-full max-h-[75vh] object-contain rounded-xl mx-auto"
              />
              {lightbox.offers[lightbox.index].title && (
                <h4 className="text-white font-display font-bold text-xl mt-4">
                  {lightbox.offers[lightbox.index].title}
                </h4>
              )}
              {lightbox.offers[lightbox.index].description && (
                <p className="text-white/70 font-sans text-sm mt-2">
                  {lightbox.offers[lightbox.index].description}
                </p>
              )}
            </div>

            {lightbox.offers.length > 1 && (
              <button
                className="absolute left-4 md:left-10 text-white/80 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="التالي"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default PartnersPage;