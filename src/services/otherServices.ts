import api, { cachedGet } from './api';
import { Offer, CreateOfferRequest, Lead, CreateLeadRequest, UpdateLeadStatusRequest, QuizRequest, PagedResult } from '../types';

export const offersService = {
  getAll: async (): Promise<Offer[]> => {
    // مُخزّنة مؤقتًا (cache) لتقليل عدد نداءات الـ API المتكررة في الصفحة الرئيسية
    return cachedGet<Offer[]>('/api/offers');
  },
  adminGetAll: async (pageNumber = 1, pageSize = 10): Promise<PagedResult<Offer>> => {
    const res = await api.get('/api/admin/offers', { params: { pageNumber, pageSize } });
    return res.data;
  },
  adminGetById: async (id: string): Promise<Offer> => {
    const res = await api.get(`/api/admin/offers/${id}`);
    return res.data;
  },
  adminCreate: async (data: CreateOfferRequest): Promise<{ id: string }> => {
    const res = await api.post('/api/admin/offers', data);
    return res.data;
  },
  adminUpdate: async (id: string, data: Partial<CreateOfferRequest>): Promise<void> => {
    await api.put(`/api/admin/offers/${id}`, data);
  },
  adminDelete: async (id: string): Promise<void> => {
    await api.delete(`/api/admin/offers/${id}`);
  },
};

export const leadsService = {
  create: async (data: CreateLeadRequest): Promise<{ id: string }> => {
    const res = await api.post('/api/leads', data);
    return res.data;
  },
  adminGetAll: async (pageNumber = 1, pageSize = 10): Promise<PagedResult<Lead>> => {
    const res = await api.get('/api/admin/leads', { params: { pageNumber, pageSize } });
    return res.data;
  },
  adminGetById: async (id: string): Promise<Lead> => {
    const res = await api.get(`/api/admin/leads/${id}`);
    return res.data;
  },
  adminUpdateStatus: async (id: string, data: UpdateLeadStatusRequest): Promise<void> => {
    await api.put(`/api/admin/leads/${id}/status`, data);
  },
};

export const quizService = {
  analyze: async (data: QuizRequest): Promise<any> => {
    const res = await api.post('/api/quiz/analyze', data);
    return res.data;
  },
};
