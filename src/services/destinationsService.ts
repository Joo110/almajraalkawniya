import api, { cachedGet } from './api';
import { Destination, CreateDestinationRequest, PagedResult } from '../types';

export const destinationsService = {
  getAll: async (): Promise<Destination[]> => {
    // مُخزّنة مؤقتًا (cache) لتقليل عدد نداءات الـ API المتكررة في الصفحة الرئيسية
    return cachedGet<Destination[]>('/api/destinations');
  },
  getBySlug: async (slug: string): Promise<Destination> => {
    const res = await api.get(`/api/destinations/${slug}`);
    return res.data;
  },
  adminGetAll: async (pageNumber = 1, pageSize = 10): Promise<PagedResult<Destination>> => {
    const res = await api.get('/api/admin/destinations', { params: { pageNumber, pageSize } });
    return res.data;
  },
  adminGetById: async (id: string): Promise<Destination> => {
    const res = await api.get(`/api/admin/destinations/${id}`);
    return res.data;
  },
  adminCreate: async (data: CreateDestinationRequest): Promise<{ id: string }> => {
    const res = await api.post('/api/admin/destinations', data);
    return res.data;
  },
  adminUpdate: async (id: string, data: Partial<CreateDestinationRequest>): Promise<void> => {
    await api.put(`/api/admin/destinations/${id}`, data);
  },
  adminDelete: async (id: string): Promise<void> => {
    await api.delete(`/api/admin/destinations/${id}`);
  },
};
