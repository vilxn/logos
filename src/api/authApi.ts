import client from './client';
import { tokenStorage } from './auth';

interface LoginPayload { email: string; password: string; }
interface LoginResponse { token: string; }

interface RegisterPayload { email: string; password: string; firstname: string; lastname: string; role: string; }
interface RegisterResponse { email: string; id: number; token: string; }
interface RegisterBody { email: string; password: string; "first-name": string; "last-name": string; role: string; }

export const authApi = {
  login: async (payload: LoginPayload): Promise<void> => {
    const { data } = await client.post<LoginResponse>('/auth/login', payload);
    tokenStorage.set(data.token);
  },

  register: async (payload: RegisterPayload): Promise<void> => {
    const body: RegisterBody = {
      email: payload.email,
      password: payload.password,
      "first-name": payload.firstname,
      "last-name": payload.lastname,
      role: payload.role,
    };

    const { data } = await client.post<RegisterResponse>('/auth/register', body);
    localStorage.setItem("email", data.email);
    localStorage.setItem("id", data.id.toString());
    tokenStorage.set(data.token);
  },

  logout: (): void => {
    tokenStorage.clear();
  },
};