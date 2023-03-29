import { CONFIG } from '../config/envs';

export const API_URL = CONFIG.isDev
  ? 'http://localhost:3000'
  : 'https://payment-api-v1-production.up.railway.app';

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
