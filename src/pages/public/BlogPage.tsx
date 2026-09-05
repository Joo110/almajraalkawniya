import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSEO from '../../hooks/useSEO';
import { Search } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner, ErrorBox, EmptyState } from '../../components/ui/index';
import { useArticles } from '../../hooks/useArticles';

const BlogPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  useSEO({ title: t('blogPage.seoTitle'), description: t('blogPage.seoDescription'), path: '/blog' });
  const { articles, loading, error } = useArticles();
  const [search, setSearch] = useState('');

  const placeholderArticles = t('blogPage.placeholderArticles', { returnObjects: true }) as Array<{ id: string; title: string; slug: string; coverImage: string }>;
  const placeholderData = placeholderArticles.map(a => ({ ...a, publishedAt: new Date().toISOString() }));

  const data = articles.length > 0 ? articles : placeholderData;
  const filtered = data.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        {/* Hero */}
        <section className="relative h-72 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
            alt="blog"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 text-center px-6" dir={i18n.dir()}>
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">— {t('blogPage.eyebrow')} —</span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              {t('blogPage.titlePart1')} <span className="text-gradient">{t('blogPage.titlePart2')}</span>
            </h1>
            <p className="font-accent text-lg text-white/70 italic">
              {t('blogPage.subtitle')}
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 bg-white border-b border-stone-200" dir={i18n.dir()}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('blogPage.searchPlaceholder')}
                className="w-full bg-white border border-stone-300 rounded-xl pr-12 pl-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 bg-stone-50" dir={i18n.dir()}>
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorBox message={error} />
            ) : filtered.length === 0 ? (
              <EmptyState message={t('blogPage.noResults')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default BlogPage;
