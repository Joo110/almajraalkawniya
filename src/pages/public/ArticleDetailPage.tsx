import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { Spinner } from '../../components/ui/index';
import { useArticleBySlug } from '../../hooks/useArticles';

export const ArticleDetailPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useArticleBySlug(slug || '');

  if (loading) {
    return (
      <PublicLayout>
        <div className="bg-white min-h-screen">
          <Spinner />
        </div>
      </PublicLayout>
    );
  }

  if (!article) {
    return (
      <PublicLayout>
        <div className="bg-white min-h-screen flex items-center justify-center" dir={i18n.dir()}>
          <div className="text-center">
            <p className="font-display text-2xl text-stone-900 mb-4">{t('articleDetail.notFound')}</p>
            <Link to="/blog" className="btn-primary">
              {t('articleDetail.backToBlog')}
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const date = new Date(article.publishedAt).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 py-24" dir={i18n.dir()}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm font-sans mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            {t('articleDetail.backToBlog')}
          </Link>

          {article.coverImage && (
            <div className="relative h-72 rounded-2xl overflow-hidden mb-8 shadow-sm border border-stone-200">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-stone-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span className="font-sans text-sm">{date}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-black text-stone-900 mb-8 leading-tight">
            {article.title}
          </h1>

          {article.content && (
            <div className="font-body text-stone-700 leading-relaxed text-lg prose prose-stone max-w-none">
              {article.content}
            </div>
          )}
        </article>
      </div>
    </PublicLayout>
  );
};

export default ArticleDetailPage;