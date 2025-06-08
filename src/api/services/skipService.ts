import type { Skip } from '../../types';
import { skipApi } from './skipApi';
import type { SkipLocationParams } from '../../types';

export interface SkipService {
  fetchSkipsByLocation: (postcode: string, area: string) => Promise<Skip[]>;
  invalidateCache: (postcode?: string, area?: string) => void;
  getCacheStatus: () => { size: number; keys: string[] };
}

export class CachedSkipService implements SkipService {
  private cache: Map<string, { data: Skip[]; timestamp: number }>;
  private readonly CACHE_TTL: number;

  constructor(cacheTTL: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.CACHE_TTL = cacheTTL;
  }

  private getCacheKey(postcode: string, area: string): string {
    return `${postcode}-${area}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  async fetchSkipsByLocation(postcode: string, area: string): Promise<Skip[]> {
    const cacheKey = this.getCacheKey(postcode, area);
    const cached = this.cache.get(cacheKey);

    if (cached && this.isCacheValid(cached.timestamp)) {
      console.debug('📦 Using cached skip data for', cacheKey);
      return cached.data;
    }

    try {
      console.debug('🔄 Fetching fresh skip data for', cacheKey);
      const params: SkipLocationParams = { postcode, area };
      const skips = await skipApi.getSkipsByLocation(params);
      console.debug('📥 Received API response:', skips);

      if (!Array.isArray(skips)) {
        console.error('❌ Invalid API response: expected array of skips:', skips);
        throw new Error('Invalid API response: expected array of skips');
      }

      this.cache.set(cacheKey, {
        data: skips,
        timestamp: Date.now(),
      });

      return skips;
    } catch (error: unknown) {
      console.error('❌ Error fetching skips:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to fetch skips: ${errorMessage}`);
    }
  }

  invalidateCache(postcode?: string, area?: string): void {
    if (postcode && area) {
      const key = this.getCacheKey(postcode, area);
      this.cache.delete(key);
      console.debug('🗑️ Invalidated cache for', key);
    } else {
      this.cache.clear();
      console.debug('🗑️ Cleared all cache');
    }
  }

  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const skipService = new CachedSkipService();
