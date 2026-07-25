import api from './api';
import { LoginRequest, AuthUser } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<{ token: string }> => {
    const res = await api.post('/api/auth/login', data);
    return res.data;
  },
  me: async (): Promise<AuthUser> => {
    const res = await api.get('/api/auth/me');
    return res.data;
  },
};
