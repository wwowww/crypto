import { create } from "zustand";

interface TableState {
  currency: 'KRW' | 'USD' | string;
  symbol: '₩' | '$' | string;
  setCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<TableState>((set) => ({
  currency: 'KRW',
  symbol: '₩',
  setCurrency: (currency) => {
    set({ currency, symbol: currency === 'KRW' ? '₩' : '$' });
  },
}));