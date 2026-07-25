import api, { cachedGet } from './api';
import { Program, CreateProgramRequest, PagedResult } from '../types';

export const programsService = {
  getAll: async (): Promise<Program[]> => {
    // مُخزّنة مؤقتًا (cache) لتقليل عدد نداءات الـ API المتكررة في الصفحة الرئيسية
    return cachedGet<Program[]>('/api/programs');
  },
  getBySlug: async (slug: string): Promise<Program> => {
    const res = await api.get(`/api/programs/${slug}`);
    return res.data;
  },
  adminGetAll: async (pageNumber = 1, pageSize = 10): Promise<PagedResult<Program>> => {
    const res = await api.get('/api/admin/programs', { params: { pageNumber, pageSize } });
    return res.data;
  },
  adminGetById: async (id: string): Promise<Program> => {
    const res = await api.get(`/api/admin/programs/${id}`);
    return res.data;
  },
  adminCreate: async (data: CreateProgramRequest): Promise<{ id: string }> => {
    const res = await api.post('/api/admin/programs', data);
    return res.data;
  },
  adminUpdate: async (id: string, data: Partial<CreateProgramRequest>): Promise<void> => {
    await api.put(`/api/admin/programs/${id}`, data);
  },
  adminDelete: async (id: string): Promise<void> => {
    await api.delete(`/api/admin/programs/${id}`);
  },
};
