import type { Skip, SkipLocationParams } from '../../types';
import { apiClient } from '../client';
import { SKIP_ENDPOINTS, DEFAULT_PAGINATION } from '../../config';

// Custom error class for API-specific errors
export class SkipApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'SkipApiError';
  }
}

// Base API class for common functionality
abstract class BaseApi {
  protected getEndpoint(path: string): string {
    return path;
  }

  protected async handleRequest<T>(
    request: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    try {
      return await request();
    } catch (error) {
      const statusCode = error instanceof Response ? error.status : undefined;
      throw new SkipApiError(
        `${errorMessage}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        statusCode,
        error
      );
    }
  }
}

export class SkipApi extends BaseApi {
  public async getSkipsByLocation(
    params: SkipLocationParams
  ): Promise<Skip[]> {
    const { postcode, area, page = DEFAULT_PAGINATION.page, perPage = DEFAULT_PAGINATION.perPage } = params;
    console.debug('🌐 Making API request to fetch skips:', { postcode, area, page, perPage });

    return this.handleRequest(
      async () => {
        const endpoint = this.getEndpoint(SKIP_ENDPOINTS.BY_LOCATION);
        console.debug('🔗 API endpoint:', endpoint);

        const response = await apiClient.get<Skip[]>(
          endpoint,
          {
            params: { postcode, area, page, per_page: perPage },
          }
        );
        console.debug('📥 Raw API response:', response);
        return response;
      },
      'Failed to fetch skips by location'
    );
  }

  // Add more methods here as needed
}

// Create a singleton instance
export const skipApi = new SkipApi();
