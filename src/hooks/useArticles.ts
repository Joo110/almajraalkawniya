import { useState, useEffect, useCallback } from 'react';
import { Article, CreateArticleRequest } from '../types';
import { articlesService } from '../services/articlesService';
import { extractApiError } from '../services/api';

type ListResponse<T> = {
  items?: T[];
};

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data;
  return (data as ListResponse<T>)?.items ?? [];
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await articlesService.getAll();
      setArticles(normalizeList<Article>(data));
    } catch (e) {
      setError(extractApiError(e));
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { articles, loading, error, refetch: fetchAll };
}

export function useArticleBySlug(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slug) {
        setArticle(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await articlesService.getBySlug(slug);

        if (isMounted) {
          setArticle(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(extractApiError(e));
          setArticle(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { article, loading, error };
}

export function useAdminArticles(pageSize = 10) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchAll = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        const data = await articlesService.adminGetAll(page, pageSize);

        setArticles(data.items ?? []);
        setTotalCount(data.totalCount ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setHasPreviousPage(data.hasPreviousPage ?? false);
        setHasNextPage(data.hasNextPage ?? false);
        setPageNumber(data.pageNumber ?? page);
      } catch (e) {
        setError(extractApiError(e));
        setArticles([]);
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchAll(1);
  }, [fetchAll]);

  const goToPage = (page: number) => fetchAll(page);

  const create = async (data: CreateArticleRequest) => {
    await articlesService.adminCreate(data);
    await fetchAll(1);
  };

  const update = async (id: string, data: Partial<CreateArticleRequest>) => {
    await articlesService.adminUpdate(id, data);
    await fetchAll(pageNumber);
  };

  const remove = async (id: string) => {
    await articlesService.adminDelete(id);
    await fetchAll(pageNumber);
  };

  return {
    articles,
    loading,
    error,
    create,
    update,
    remove,
    refetch: fetchAll,
    pageNumber,
    totalPages,
    totalCount,
    hasPreviousPage,
    hasNextPage,
    goToPage,
  };
}