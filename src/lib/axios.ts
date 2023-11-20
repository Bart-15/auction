import axios, { AxiosInstance } from 'axios';

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
});
