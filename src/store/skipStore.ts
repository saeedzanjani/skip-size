import { create } from 'zustand';
import axios from 'axios';
import type { Skip, SkipStore } from '../types/skip';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const useSkipStore = create<SkipStore>((set) => ({
  skips: [],
  selectedSkip: null,
  loading: false,
  error: null,

  fetchSkips: async (postcode: string, area: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Skip[]>(
        `${API_BASE_URL}/skips/by-location`,
        {
          params: { postcode, area },
        }
      );
      set({ skips: response.data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch skips',
        loading: false,
      });
    }
  },

  selectSkip: (skip: Skip) => set({ selectedSkip: skip }),

  clearSelection: () => set({ selectedSkip: null }),
}));
