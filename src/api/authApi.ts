import client from './client';
import { tokenStorage } from './auth';

interface LoginPayload { email: string; password: string; }
interface LoginResponse { token: string; }

interface RegisterPayload { email: string; password: string; firstname: string; lastname: string; role: string; }

export const authApi = {
  login: async (payload: LoginPayload): Promise<void> => {
    const { data } = await client.post<LoginResponse>('/auth/login', payload);
    tokenStorage.set(data.token);
  },

  logout: (): void => {
    tokenStorage.clear();
  },
};