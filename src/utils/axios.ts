import axios, { AxiosInstance } from 'axios';

import { PublicEnvs } from './envConfig';

const config = {
  baseURL: PublicEnvs.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export const axioConfig: AxiosInstance = axios.create(config);
