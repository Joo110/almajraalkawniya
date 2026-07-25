import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import ProgramCard from '../../components/ui/ProgramCard';
import { Spinner, ErrorBox, EmptyState } from '../../components/ui/index';
import { usePrograms } from '../../hooks/usePrograms';
import { Program } from '../../types';

type ProgramWithStatus = Program & {
  active?: boolean;
  isActive?: boolean;
};

const ProgramsPage: React.FC = () => {
  const { programs, loading, error } = usePrograms();
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(999999);
  const [maxDays, setMaxDays] = useState<number>(999);

  const isProgramActive = (p: ProgramWithStatus) => {
    if (typeof p.active === 'boolean') return p.active;
    if (typeof p.isActive === 'boolean') return p.isActive;
    return true;
  };

  const filtered = useMemo(() => {
    return (programs as ProgramWithStatus[])
      .filter((p) => isProgramActive(p))
      .filter((p) => (p.title || '').toLowerCase().includes(search.toLowerCase()))
      .filter((p) => Number(p.price || 0) <= maxPrice)
      .filter((p) => Number(p.durationDays || 0) <= maxDays);
  }, [programs, search, maxPrice, maxDays]);

  return (
    <PublicLayout>
      <div className="bg-white min-h-screen text-stone-800">
        {/* Hero */}
        <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80"
            alt="programs"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />
          <div className="relative z-10 text-center px-6" dir="rtl">
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">
              — برامجنا —
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              البرامج <span className="text-gradient">السياحية</span>
            </h1>
            <p className="font-accent text-lg text-white/75 italic">
              رحلات مصممة بعناية لكل الميزانيات والأذواق
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b border-stone-200" dir="rtl">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 max-w-sm w-full">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن برنامج..."
                className="w-full bg-white border border-stone-300 rounded-xl pr-12 pl-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500 transition-colors shadow-sm"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-stone-500" />
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-700 text-sm focus:outline-none focus:border-sand-500 transition-colors shadow-sm"
              >
                <option value={999999}>كل الأسعار</option>
                <option value={5000}>أقل من ٥,٠٠٠ ريال</option>
                <option value={10000}>أقل من ١٠,٠٠٠ ريال</option>
                <option value={20000}>أقل من ٢٠,٠٠٠ ريال</option>
              </select>

              <select
                value={maxDays}
                onChange={(e) => setMaxDays(Number(e.target.value))}
                className="bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-700 text-sm focus:outline-none focus:border-sand-500 transition-colors shadow-sm"
              >
                <option value={999}>كل المدد</option>
                <option value={5}>٥ أيام أو أقل</option>
                <option value={7}>أسبوع أو أقل</option>
                <option value={14}>أسبوعين أو أقل</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 bg-stone-50" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorBox message={error} />
            ) : programs.length === 0 ? (
              <EmptyState message="لا توجد برامج بعد" />
            ) : filtered.length === 0 ? (
              <EmptyState message="لا توجد برامج تطابق بحثك" />
            ) : (
              <>
                <p className="font-sans text-stone-500 text-sm mb-6">
                  {filtered.length} برنامج
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((p) => (
                    <ProgramCard key={p.id} program={p} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ProgramsPage;