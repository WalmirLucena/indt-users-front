import axios from 'axios';
import { GetUsersResponse, LoginParams, LoginResponse, UpdateParams, UpdateResponse } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getUsers = async (endpoint: string): Promise<GetUsersResponse> => {
  try {
    const response = await api.get(endpoint);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export const login = async (endpoint: string, data: LoginParams): Promise<LoginResponse> => {
  const response = await api.post(endpoint, data);
  return { data: response.data, status: response.status };
};

export const updateUser = async (endpoint: string, data: UpdateParams): Promise<UpdateResponse> => {
  const response = await api.patch(endpoint, data);
  return { status: response.status };
};

export const removeUser = async (endpoint: string): Promise<UpdateResponse> => {
  const response = await api.delete(endpoint);
  return { status: response.status };
};

export default api;
