import { create } from 'zustand';

interface MarketStore {
  marketData: any;
  setMarketData: (data: any) => void;
  fetchMarketData: () => Promise<void>;
}

export const useMarketStore = create<MarketStore>((set) => ({
  marketData: null,
  setMarketData: (data) => set({ marketData: data }),
  fetchMarketData: async () => {
    const response = await fetch('/api/proxy');
    const data = await response.json();
    set({ marketData: data });
  },
}));