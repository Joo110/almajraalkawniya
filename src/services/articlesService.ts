import api, { cachedGet } from './api';
import { Article, CreateArticleRequest, PagedResult } from '../types';

export const articlesService = {
  getAll: async (): Promise<Article[]> => {
    // مُخزّنة مؤقتًا (cache) لتقليل عدد نداءات الـ API المتكررة في الصفحة الرئيسية
    return cachedGet<Article[]>('/api/articles');
  },
  getBySlug: async (slug: string): Promise<Article> => {
    const res = await api.get(`/api/articles/${slug}`);
    return res.data;
  },
  adminGetAll: async (pageNumber = 1, pageSize = 10): Promise<PagedResult<Article>> => {
    const res = await api.get('/api/admin/articles', { params: { pageNumber, pageSize } });
    return res.data;
  },
  adminGetById: async (id: string): Promise<Article> => {
    const res = await api.get(`/api/admin/articles/${id}`);
    return res.data;
  },
  adminCreate: async (data: CreateArticleRequest): Promise<{ id: string }> => {
    const res = await api.post('/api/admin/articles', data);
    return res.data;
  },
  adminUpdate: async (id: string, data: Partial<CreateArticleRequest>): Promise<void> => {
    await api.put(`/api/admin/articles/${id}`, data);
  },
  adminDelete: async (id: string): Promise<void> => {
    await api.delete(`/api/admin/articles/${id}`);
  },
};
