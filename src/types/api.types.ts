// Generic API response type
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

// Pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  per_page: number;
}

// API configuration
export interface ApiConfig {
  baseUrl: string;
  version?: string;
}

// Skip API specific types
export interface SkipLocationParams {
  postcode: string;
  area: string;
  page?: number;
  perPage?: number;
}

export interface SkipApiEndpoints {
  BY_LOCATION: string;
  // Add more endpoints as needed
}
