import { CONFIG } from '../config/envs';
const API_VERSION = '/v1/api';
export const API_URL = CONFIG.isDev
  ? `http://localhost:3000${API_VERSION}`
  : `https://payment-api-v1-production.up.railway.app${API_VERSION}`;

export enum API_URLS {
  PAYMENTS = 'payments',
  MEDIA = 'media',
}

export const DEFAULT_PAYMENTS: string[] = [
  'Gas',
  'Acova',
  'Basura',
  'Flores casa',
  'Comida Python',
  'IUSI Casa',
  'Cafe Casa',
];

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const DEFAULT_PERSONS: string[] = ['Moi', 'Elisa'];
