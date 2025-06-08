import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config';

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    public originalError: AxiosError
  ) {
    super(originalError.message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private static instance: ApiClient;
  private client: ReturnType<typeof axios.create>;

  private constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: unknown) => {
        return Promise.reject(new ApiError(0, null, error as AxiosError));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          return Promise.reject(
            new ApiError(
              axiosError.response.status,
              axiosError.response.data,
              axiosError
            )
          );
        }
        if (axiosError.request) {
          return Promise.reject(
            new ApiError(0, 'No response received', axiosError)
          );
        }
        return Promise.reject(
          new ApiError(0, axiosError.message, axiosError)
        );
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = ApiClient.getInstance();
