import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import DestinationCard from '../../components/ui/DestinationCard';
import { Spinner, ErrorBox, EmptyState } from '../../components/ui/index';
import { useDestinations } from '../../hooks/useDestinations';

const DestinationsPage: React.FC = () => {
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
          <div className="relative z-10 text-center px-6" dir="rtl">
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">— استكشف —</span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              وجهاتنا <span className="text-gradient">السياحية</span>
            </h1>
            <p className="font-accent text-lg text-white/70 italic">
              اختر وجهتك المفضلة من بين أجمل الأماكن حول العالم
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-10 bg-white border-b border-stone-200" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن وجهة..."
                className="w-full bg-white border border-stone-300 rounded-xl pr-12 pl-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500 transition-colors shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-stone-50" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorBox message={error} />
            ) : filtered.length === 0 ? (
              destinations.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'باريس', country: 'فرنسا', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', slug: 'paris' },
                    { name: 'طوكيو', country: 'اليابان', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', slug: 'tokyo' },
                    { name: 'سانتوريني', country: 'اليونان', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', slug: 'santorini' },
                    { name: 'دبي', country: 'الإمارات', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', slug: 'dubai' },
                    { name: 'مالديف', country: 'المالديف', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80', slug: 'maldives' },
                    { name: 'روما', country: 'إيطاليا', img: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80', slug: 'rome' },
                  ].map(d => (
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
                <EmptyState message="لا توجد نتائج لبحثك" />
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