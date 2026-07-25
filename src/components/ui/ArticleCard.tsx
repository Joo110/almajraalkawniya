import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, BookOpen } from 'lucide-react';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const img =
    article.coverImage ||
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80';

  const date = new Date(article.publishedAt).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      to={`/blog/${article.slug}`}
      dir="rtl"
      className="group block overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.14)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="relative aspect-[16/10]">
          <img
            src={img}
            alt={article.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
              <Calendar className="h-3.5 w-3.5 text-amber-300" />
              {date}
            </div>

            <h3 className="line-clamp-2 text-xl font-black leading-snug text-white sm:text-2xl">
              {article.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-stone-500">
          <BookOpen className="h-4 w-4 text-stone-400" />
          <span>مقالة مميزة من مدونة الرحلات</span>
        </div>
     
        <div className="inline-flex items-center justify-between rounded-2xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition-all duration-300 group-hover:bg-stone-800">
          <span>اقرأ المزيد</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowLeft className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;