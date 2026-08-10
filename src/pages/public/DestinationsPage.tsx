import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import DestinationCard from '../../components/ui/DestinationCard';
import { Spinner, ErrorBox, EmptyState } from '../../components/ui/index';
import { useDestinations } from '../../hooks/useDestinations';

const DestinationsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { destinations, loading, error } = useDestinations();
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    (d.country || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* Hero */}
        <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
            alt="destinations"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 text-center px-6" dir={i18n.dir()}>
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">— {t('destinationsPage.eyebrow')} —</span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              {t('destinationsPage.titlePart1')} <span className="text-gradient">{t('destinationsPage.titlePart2')}</span>
            </h1>
            <p className="font-accent text-lg text-white/70 italic">
              {t('destinationsPage.subtitle')}
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-10 bg-white border-b border-stone-200" dir={i18n.dir()}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('destinationsPage.searchPlaceholder')}
                className="w-full bg-white border border-stone-300 rounded-xl pr-12 pl-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500 transition-colors shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-stone-50" dir={i18n.dir()}>
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorBox message={error} />
            ) : filtered.length === 0 ? (
              destinations.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(t('destinationsPage.placeholderDestinations', { returnObjects: true }) as Array<{ name: string; country: string; img: string; slug: string }>).map(d => (
                    <div key={d.slug} className="card-hover group relative block rounded-2xl overflow-hidden h-72 shadow-sm border border-stone-200 bg-white">
                      <img
                        src={d.img}
                        alt={d.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-5 right-5">
                        <p className="font-sans text-white/70 text-xs mb-1">{d.country}</p>
                        <h3 className="font-display text-2xl font-bold text-white">{d.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message={t('destinationsPage.noResults')} />
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(d => <DestinationCard key={d.id} destination={d} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default DestinationsPage;