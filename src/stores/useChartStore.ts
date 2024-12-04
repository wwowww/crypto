import { create } from 'zustand';

interface ChartStore {
  chartData: any;
  setChartData: (data: any) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartData: null,
  setChartData: (data) => set({ chartData: data }),
}));