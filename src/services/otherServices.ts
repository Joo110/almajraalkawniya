import api, { cachedGet } from './api';
import { Offer, CreateOfferRequest, Lead, CreateLeadRequest, UpdateLeadStatusRequest, QuizRequest, PagedResult, OfferType } from '../types';

/**
 * تطبيع بيانات العرض القادمة من السيرفر.
 * السبب: لاحظنا إن السيرفر مش دايمًا بيرجّع الحقول بنفس الـ casing
 * (isActive / IsActive) أو بنفس نوع البيانات (type كرقم أو كنص)،
 * فبنوحّدهم هنا مركزيًا بدل ما نصلح كل مكان بيستخدم Offer لوحده.
 */
function normalizeOffer(raw: any): Offer {
  const isActiveRaw = raw?.isActive ?? raw?.IsActive ?? raw?.active ?? raw?.Active;
  const typeRaw = raw?.type ?? raw?.Type;

  const typeNum = Number(typeRaw);
  const validType = [OfferType.Percentage, OfferType.Fixed, OfferType.Bundle].includes(typeNum)
    ? (typeNum as OfferType)
    : OfferType.Percentage;

  return {
    id: raw?.id ?? raw?.Id,
    title: raw?.title ?? raw?.Title ?? '',
    type: validType,
    value: Number(raw?.value ?? raw?.Value ?? 0),
    description: raw?.description ?? raw?.Description ?? '',
    startDate: raw?.startDate ?? raw?.StartDate ?? '',
    endDate: raw?.endDate ?? raw?.EndDate ?? '',
    isActive: isActiveRaw === true || isActiveRaw === 'true' || isActiveRaw === 1,
  };
}

function normalizeOfferList(list: any[]): Offer[] {
  return (list ?? []).map(normalizeOffer);
}

/**
 * يتأكد إن الحمولة اللي هتتبعت للسيرفر (Create/Update) نضيفة وصالحة:
 * - type لازم يكون رقم من قيم الـ Enum (1/2/3)، وإلا الباك إند بيرفضه
 *   برسالة "$.type could not be converted".
 * - isActive لازم يكون boolean حقيقي مش string/undefined.
 * - value لازم يكون رقم، مش نص فاضي.
 */
export function sanitizeOfferPayload(data: CreateOfferRequest): CreateOfferRequest {
  const typeNum = Number(data.type);
  const validType = [OfferType.Percentage, OfferType.Fixed, OfferType.Bundle].includes(typeNum)
    ? (typeNum as OfferType)
    : (() => {
        throw new Error('نوع العرض غير صالح، من فضلك اختر نوع العرض من القائمة');
      })();

  if (!data.startDate || !data.endDate) {
    throw new Error('لازم تحدد تاريخ البداية وتاريخ النهاية');
  }

  return {
    title: (data.title || '').trim(),
    type: validType,
    value: Number(data.value) || 0,
    description: data.description || '',
    startDate: data.startDate,
    endDate: data.endDate,
    isActive: data.isActive === true,
  };
}

export const offersService = {
  getAll: async (): Promise<Offer[]> => {
    // مُخزّنة مؤقتًا (cache) لتقليل عدد نداءات الـ API المتكررة في الصفحة الرئيسية
    const data = await cachedGet<any[]>('/api/offers');
    return normalizeOfferList(Array.isArray(data) ? data : (data as any)?.items ?? []);
  },
  adminGetAll: async (pageNumber = 1, pageSize = 10): Promise<PagedResult<Offer>> => {
    const res = await api.get('/api/admin/offers', { params: { pageNumber, pageSize } });
    const raw = res.data;
    return {
      ...raw,
      items: normalizeOfferList(raw?.items ?? []),
    };
  },
  adminGetById: async (id: string): Promise<Offer> => {
    const res = await api.get(`/api/admin/offers/${id}`);
    return normalizeOffer(res.data);
  },
  adminCreate: async (data: CreateOfferRequest): Promise<{ id: string }> => {
    // الباك إند بيستنى الحقول مباشرة من غير أي غلاف (CreateOfferRequest مباشرة)
    const payload = sanitizeOfferPayload(data);
    const res = await api.post('/api/admin/offers', payload);
    return res.data;
  },
  adminUpdate: async (id: string, data: CreateOfferRequest): Promise<void> => {
    // على عكس الـ Create، الـ Update endpoint بيستنى الحقول مباشرة
    // من غير غلاف "request" (نمط مختلف بين الـ Create Command والـ Update Command).
    // ملحوظة: الباك إند لا يدعم Partial Update — لازم نبعت كل الحقول دايمًا
    // (Type = CreateOfferRequest كامل، مش Partial)، وإلا الـ Validator هيرفض الطلب.
    const payload = sanitizeOfferPayload(data);
    await api.put(`/api/admin/offers/${id}`, payload);
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