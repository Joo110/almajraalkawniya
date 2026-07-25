import { useState, useEffect, useCallback } from 'react';
import { Program, CreateProgramRequest } from '../types';
import { programsService } from '../services/programsService';
import { extractApiError } from '../services/api';

type ListResponse<T> = {
  items?: T[];
};

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data;
  return (data as ListResponse<T>)?.items ?? [];
}

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await programsService.getAll();
      setPrograms(normalizeList<Program>(data));
    } catch (e) {
      setError(extractApiError(e));
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { programs, loading, error, refetch: fetchAll };
}

export function useProgramBySlug(slug: string) {
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slug) {
        setProgram(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await programsService.getBySlug(slug);

        if (isMounted) {
          setProgram(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(extractApiError(e));
          setProgram(null);
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

  return { program, loading, error };
}

export function useAdminPrograms(pageSize = 10) {
  const [programs, setPrograms] = useState<Program[]>([]);
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

        const data = await programsService.adminGetAll(page, pageSize);

        setPrograms(data.items ?? []);
        setTotalCount(data.totalCount ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setHasPreviousPage(data.hasPreviousPage ?? false);
        setHasNextPage(data.hasNextPage ?? false);
        setPageNumber(data.pageNumber ?? page);
      } catch (e) {
        setError(extractApiError(e));
        setPrograms([]);
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

  const create = async (data: CreateProgramRequest) => {
    await programsService.adminCreate(data);
    await fetchAll(1);
  };

  const update = async (id: string, data: Partial<CreateProgramRequest>) => {
    await programsService.adminUpdate(id, data);
    await fetchAll(pageNumber);
  };

  const remove = async (id: string) => {
    await programsService.adminDelete(id);
    await fetchAll(pageNumber);
  };

  return {
    programs,
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