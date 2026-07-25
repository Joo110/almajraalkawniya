import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL || 'https://almajara.runasp.net';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default api;

/**
 * ==========================================================
 * Simple in-memory GET cache + de-duplication
 * ==========================================================
 * الهدف: تقليل عدد نداءات الـ API المتكررة لنفس البيانات
 * (زي عناوين الصفحة الرئيسية اللي بتتنادى في كل مرة تفتح الصفحة).
 *
 * - أي طلب GET بيتعمله cache لمدة CACHE_TTL_MS.
 * - لو في طلبين لنفس الرابط حصلوا في نفس اللحظة (زي React StrictMode
 *   أو تنقل سريع بين الصفحات) هيشتركوا في نفس الـ Promise بدل ما
 *   يبعتوا Request منفصل لكل واحد.
 * - في حالة الخطأ، بيتشال من الـ cache عشان محاولة تالية تقدر تعيد الطلب.
 */
const CACHE_TTL_MS = 60_000; // دقيقة واحدة كفاية لبيانات عامة زي الوجهات/البرامج

type CacheEntry = { time: number; promise: Promise<any> };
const getCache = new Map<string, CacheEntry>();

function buildCacheKey(url: string, params?: Record<string, unknown>) {
  return params && Object.keys(params).length > 0
    ? `${url}?${JSON.stringify(params)}`
    : url;
}

/**
 * استخدم الدالة دي بدل api.get() في أي endpoint عام (public) بيتقرأ كتير
 * ونادرًا ما يتغير (destinations / programs / articles / offers ... إلخ).
 * لا تستخدمها في endpoints الأدمن (create/update/delete) أو أي بيانات
 * لازم تكون دايمًا Fresh.
 */
export function cachedGet<T = any>(url: string, params?: Record<string, unknown>): Promise<T> {
  const key = buildCacheKey(url, params);
  const cached = getCache.get(key);

  if (cached && Date.now() - cached.time < CACHE_TTL_MS) {
    return cached.promise;
  }

  const promise = api
    .get(url, { params })
    .then((res) => res.data)
    .catch((err) => {
      getCache.delete(key);
      throw err;
    });

  getCache.set(key, { time: Date.now(), promise });
  return promise;
}

/** تفريغ الـ cache كله يدويًا (مثلاً بعد تعديل بيانات من لوحة التحكم) */
export function clearApiCache() {
  getCache.clear();
}

/**
 * Extracts a human-readable Arabic error message from an Axios error.
 * Handles ASP.NET Core ValidationProblemDetails, ProblemDetails, and plain messages.
 */
export function extractApiError(err: unknown): string {
  if (!axios.isAxiosError(err)) return 'حدث خطأ غير متوقع';

  const data = err.response?.data;
  if (!data) {
    if (err.code === 'ERR_NETWORK') return 'لا يوجد اتصال بالسيرفر';
    return 'حدث خطأ في الاتصال';
  }

  // ASP.NET Core ValidationProblemDetails: { errors: { field: [msg, ...] } }
  if (data.errors && typeof data.errors === 'object') {
    const messages: string[] = [];
    for (const field of Object.keys(data.errors)) {
      const fieldErrors = data.errors[field];
      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      }
    }
    if (messages.length > 0) return messages.join(' • ');
  }

  // ProblemDetails: { title, detail }
  if (data.detail) return data.detail;
  if (data.title) return data.title;

  // Simple message string
  if (typeof data === 'string') return data;
  if (data.message) return data.message;

  const status = err.response?.status;
  if (status === 400) return 'البيانات المدخلة غير صحيحة';
  if (status === 404) return 'العنصر غير موجود';
  if (status === 409) return 'البيانات موجودة مسبقاً';
  if (status === 500) return 'خطأ في السيرفر، حاول مرة أخرى';

  return 'حدث خطأ غير متوقع';
}
