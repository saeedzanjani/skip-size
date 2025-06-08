import type { Skip } from '../types/skip';
import { skipService } from '../api/services';
import { createFetchStore, type FetchStore } from './createFetchStore';

// Create the skip store using the generic fetch store creator
export const useSkipStore = createFetchStore<Skip, [string, string]>(
  skipService.fetchSkipsByLocation.bind(skipService),
  {
    data: [],
    selectedItem: null,
    loading: false,
    error: null,
  },
  {
    debounceMs: 300,
    onFetchStart: () => console.debug('🔄 Starting skip fetch'),
    onFetchSuccess: (data) => console.debug('✅ Skip fetch successful:', data),
    onFetchError: (error) => console.error('❌ Skip fetch error:', error.message),
  }
);

// Type the store for better type safety
export type SkipStore = FetchStore<Skip, [string, string]>;

// Selectors with skip-specific names
export const useSkipLoading = () => useSkipStore(state => state.loading);
export const useSkipError = () => useSkipStore(state => state.error);
export const useSkips = () => useSkipStore(state => state.data);
export const useSelectedSkip = () => useSkipStore(state => state.selectedItem);
