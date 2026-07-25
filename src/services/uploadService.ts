import api, { BASE_URL } from './api';

/**
 * برفع ملف صورة (Blob/File) لـ /api/admin/uploads/image ويرجع رابط
 * كامل (absolute URL) جاهز يتخزن في حقل زي CoverImage.
 */
export async function uploadImage(file: File | Blob, fileName = 'image.jpg'): Promise<string> {
  const formData = new FormData();
  // لو Blob من الـ canvas مش File، بنديله اسم صريح عشان الباك اند يقدر يقرأ الامتداد
  const fileToSend = file instanceof File ? file : new File([file], fileName, { type: file.type || 'image/jpeg' });
  formData.append('file', fileToSend);

  const res = await api.post('/api/admin/uploads/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const relativeOrAbsoluteUrl: string = res.data?.url;
  if (!relativeOrAbsoluteUrl) {
    throw new Error('لم يرجع السيرفر رابط الصورة.');
  }

  // لو الباك اند رجّع رابط نسبي زي /uploads/covers/xxx.jpg نكمّله برابط كامل
  if (relativeOrAbsoluteUrl.startsWith('http://') || relativeOrAbsoluteUrl.startsWith('https://')) {
    return relativeOrAbsoluteUrl;
  }
  return `${BASE_URL}${relativeOrAbsoluteUrl}`;
}
