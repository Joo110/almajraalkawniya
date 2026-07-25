import { useState, useEffect, useCallback } from 'react';
import { Offer, CreateOfferRequest, Lead, BookingStatus, PagedResult } from '../types';
import { offersService, leadsService } from '../services/otherServices';
import { extractApiError } from '../services/api';

type ListResponse<T> = {
  items?: T[];
};

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data;
  return (data as ListResponse<T>)?.items ?? [];
}

// ======================================================
// ================ OFFERS (PUBLIC) ======================
// ======================================================
export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await offersService.getAll();
      setOffers(normalizeList<Offer>(data));
    } catch (e) {
      setError(extractApiError(e));
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { offers, loading, error, refetch: fetchAll };
}

// ======================================================
// ================ OFFERS (ADMIN) =======================
// ======================================================
export function useAdminOffers(pageSize = 10) {
  const [data, setData] = useState<PagedResult<Offer> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchAll = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        const res = await offersService.adminGetAll(page, pageSize);

        setData(res);
        setPageNumber(res.pageNumber ?? page);
      } catch (e) {
        setError(extractApiError(e));
        setData(null);
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

  const create = async (payload: CreateOfferRequest) => {
    await offersService.adminCreate(payload);
    await fetchAll(data?.pageNumber ?? 1);
  };

  const update = async (id: string, payload: Partial<CreateOfferRequest>) => {
    await offersService.adminUpdate(id, payload);
    await fetchAll(data?.pageNumber ?? 1);
  };

  const remove = async (id: string) => {
    await offersService.adminDelete(id);
    await fetchAll(data?.pageNumber ?? 1);
  };

  return {
    offers: data?.items ?? [],

    loading,
    error,

    create,
    update,
    remove,

    refetch: fetchAll,

    pageNumber: data?.pageNumber ?? pageNumber,
    totalPages: data?.totalPages ?? 1,
    totalCount: data?.totalCount ?? 0,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    hasNextPage: data?.hasNextPage ?? false,

    goToPage,
  };
}

// ======================================================
// ================= LEADS (ADMIN FIXED) =================
// ======================================================
export function useAdminLeads(pageSize = 10) {
  const [data, setData] = useState<PagedResult<Lead> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchAll = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        const res = await leadsService.adminGetAll(page, pageSize);

        setData(res);
        setPageNumber(res.pageNumber ?? page);
      } catch (e) {
        setError(extractApiError(e));
        setData(null);
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

  const updateStatus = async (id: string, status: BookingStatus) => {
    await leadsService.adminUpdateStatus(id, { status });

    // 👇 مهم: reload الصفحة الحالية من API الحقيقي
    const currentPage = data?.pageNumber ?? 1;
    await fetchAll(currentPage);
  };

  return {
    leads: data?.items ?? [],

    loading,
    error,

    updateStatus,

    refetch: fetchAll,

    pageNumber: data?.pageNumber ?? pageNumber,
    totalPages: data?.totalPages ?? 1,
    totalCount: data?.totalCount ?? 0,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    hasNextPage: data?.hasNextPage ?? false,

    goToPage,
  };
}