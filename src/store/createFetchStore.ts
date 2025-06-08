import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import debounce from 'lodash/debounce';

export interface FetchState<T> {
  data: T[];
  selectedItem: T | null;
  loading: boolean;
  error: string | null;
}

export interface FetchStore<T, P extends unknown[]> extends FetchState<T> {
  fetchData: (...args: P) => Promise<void>;
  selectItem: (item: T) => void;
  clearSelection: () => void;
  clearError: () => void;
}

export interface FetchOptions<T> {
  debounceMs?: number;
  onFetchStart?: () => void;
  onFetchSuccess?: (data: T[]) => void;
  onFetchError?: (error: Error) => void;
}

export const createFetchStore = <T, P extends unknown[]>(
  fetchFn: (...args: P) => Promise<T[]>,
  initialState: Partial<FetchState<T>> = {},
  options: FetchOptions<T> = {}
) => {
  const {
    debounceMs = 300,
    onFetchStart,
    onFetchSuccess,
    onFetchError
  } = options;

  const createFetchData = (
    set: Parameters<StateCreator<FetchStore<T, P>>>[0],
    get: Parameters<StateCreator<FetchStore<T, P>>>[1]
  ) => {
    const debouncedFetch = debounce(async (...args: P) => {
      if (get().loading) {
        console.debug('⏳ Fetch already in progress, skipping');
        return;
      }

      console.debug('🔄 Starting fetch with args:', args);
      set({ loading: true, error: null });
      onFetchStart?.();

      try {
        const data = await fetchFn(...args);
        console.debug('✅ Fetch successful, updating store with data:', data);
        set({ data, loading: false });
        onFetchSuccess?.(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
        console.error('❌ Fetch error:', errorMessage);
        set({
          error: errorMessage,
          loading: false
        });
        onFetchError?.(error instanceof Error ? error : new Error(errorMessage));
      }
    }, debounceMs);

    return async (...args: P): Promise<void> => {
      console.debug('🚀 Fetch requested with args:', args);
      await debouncedFetch(...args);
    };
  };

  return create<FetchStore<T, P>>((set, get) => ({
    data: [],
    selectedItem: null,
    loading: false,
    error: null,
    ...initialState,
    fetchData: createFetchData(set, get),
    selectItem: (item: T) => set({ selectedItem: item }),
    clearSelection: () => set({ selectedItem: null }),
    clearError: () => set({ error: null }),
  }));
};
