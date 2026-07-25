import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner, ErrorBox, EmptyState } from '../../components/ui/index';
import { useArticles } from '../../hooks/useArticles';

const PLACEHOLDER_ARTICLES = [
  { id: '1', title: '١٠ أسرار لتوفير المال أثناء السفر', slug: 'save-money-travel', coverImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', publishedAt: new Date().toISOString() },
  { id: '2', title: 'أفضل وقت لزيارة اليابان في ٢٠٢٦', slug: 'best-time-japan', coverImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80', publishedAt: new Date().toISOString() },
  { id: '3', title: 'دليلك الشامل لاستكشاف باريس', slug: 'paris-guide', coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', publishedAt: new Date().toISOString() },
  { id: '4', title: 'أجمل شواطئ المالديف التي يجب زيارتها', slug: 'maldives-beaches', coverImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80', publishedAt: new Date().toISOString() },
  { id: '5', title: 'نصائح للسفر مع العائلة والأطفال', slug: 'family-travel', coverImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', publishedAt: new Date().toISOString() },
  { id: '6', title: 'أفضل المطاعم في دبي لعام ٢٠٢٦', slug: 'dubai-restaurants', coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', publishedAt: new Date().toISOString() },
];

const BlogPage: React.FC = () => {
  const { articles, loading, error } = useArticles();
  const [search, setSearch] = useState('');

  const data = articles.length > 0 ? articles : PLACEHOLDER_ARTICLES;
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
          <div className="relative z-10 text-center px-6" dir="rtl">
            <span className="font-sans text-sand-400 text-xs uppercase tracking-widest mb-3 block">— المدونة —</span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              دليلك <span className="text-gradient">للسفر الذكي</span>
            </h1>
            <p className="font-accent text-lg text-white/70 italic">
              نصائح ومقالات من خبراء السفر تساعدك في رحلتك
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 bg-white border-b border-stone-200" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث في المقالات..."
                className="w-full bg-white border border-stone-300 rounded-xl pr-12 pl-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 bg-stone-50" dir="rtl">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorBox message={error} />
            ) : filtered.length === 0 ? (
              <EmptyState message="لا توجد مقالات تطابق بحثك" />
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