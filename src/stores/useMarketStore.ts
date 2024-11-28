import { create } from 'zustand';

interface MarketStore {
  marketData: any;
  setMarketData: (data: any) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  marketData: null,
  setMarketData: (data) => set({ marketData: data }),
}));