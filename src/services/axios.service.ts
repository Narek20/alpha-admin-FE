import localStorageKeys from '@utils/localStorageKeys';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  //@ts-ignore
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(localStorageKeys.TOKEN_KEY);

    if (token && config.headers) {
      config.headers['x-access-token'] = `${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
