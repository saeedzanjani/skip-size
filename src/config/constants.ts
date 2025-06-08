import type { ApiConfig, SkipApiEndpoints } from '../types';

// API Configuration
export const API_CONFIG: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'https://app.wewantwaste.co.uk/api',
} as const;

// API Endpoints
export const SKIP_ENDPOINTS: SkipApiEndpoints = {
  BY_LOCATION: '/skips/by-location',
} as const;

// Pagination Defaults
export const DEFAULT_PAGINATION = {
  page: 1,
  perPage: 10,
} as const;
