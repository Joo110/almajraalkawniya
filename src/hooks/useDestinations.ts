import { useState, useEffect, useCallback } from 'react';
import { Destination, CreateDestinationRequest } from '../types';
import { destinationsService } from '../services/destinationsService';
import { extractApiError } from '../services/api';

type ApiListResponse<T> = {
  items?: T[];
};

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await destinationsService.getAll();

      const list = Array.isArray(data)
        ? data
        : (data as ApiListResponse<Destination>)?.items ?? [];

      setDestinations(list);
    } catch (e) {
      setError(extractApiError(e));
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { destinations, loading, error, refetch: fetchAll };
}

export function useDestinationBySlug(slug: string) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slug) {
        setDestination(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await destinationsService.getBySlug(slug);

        if (isMounted) {
          setDestination(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(extractApiError(e));
          setDestination(null);
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

  return { destination, loading, error };
}

export function useAdminDestinations(pageSize = 10) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
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

        const data = await destinationsService.adminGetAll(page, pageSize);

        setDestinations(data.items ?? []);
        setTotalCount(data.totalCount ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setHasPreviousPage(data.hasPreviousPage ?? false);
        setHasNextPage(data.hasNextPage ?? false);
        setPageNumber(data.pageNumber ?? page);
      } catch (e) {
        setError(extractApiError(e));
        setDestinations([]);
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

  const create = async (data: CreateDestinationRequest) => {
    await destinationsService.adminCreate(data);
    await fetchAll(1);
  };

  const update = async (id: string, data: Partial<CreateDestinationRequest>) => {
    await destinationsService.adminUpdate(id, data);
    await fetchAll(pageNumber);
  };

  const remove = async (id: string) => {
    await destinationsService.adminDelete(id);
    await fetchAll(pageNumber);
  };

  return {
    destinations,
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