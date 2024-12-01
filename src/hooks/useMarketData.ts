import { useQuery } from '@tanstack/react-query';
import { fetchMarketSingleCoinData, fetchMarketCoinListAllData, fetchMarketHistoricalChartData, fetchMarketTrendingCoinData } from '@/app/api/fetchMarketData';
import { useMarketStore } from '@/stores/useMarketStore';
import { Market } from "@/types";
import { coinListAllMockData } from '@/data/coinListAllMockData';

export const useMarketData = ({id, currency, days}: Market) => {
  const { setMarketData } = useMarketStore();

  const { data: singleCoin } = useQuery({
    queryKey: ['singleCoin', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetchMarketSingleCoinData(id);
      setMarketData(response); // Zustand 스토어 저장
      
      return response.data; // ReactQuery 캐시에 저장
    },
  });

  const { data: coinListAll } = useQuery({
    queryKey: ['coinListAll', currency],
    queryFn: async () => {
      if (!currency) return null;
      try {
        const response = await fetchMarketCoinListAllData(currency);
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 429) {
          console.warn('API 429 Error(Too many Requests)로 인해 일시적으로 mock data기 사용됩니다.');
          return coinListAllMockData;
        }

        if (error.response?.status === 500) {
          console.error(error.message);
          return null;
        }
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { data: HistoricalChart } = useQuery({
    queryKey: ['HistoricalChart', currency],
    queryFn: async () => {
      if (!id || !currency || !days) return null;
      const response = await fetchMarketHistoricalChartData(id, currency, days);
      setMarketData(response);

      return response.data;
    },
  })

  const { data: TrendingCoin } = useQuery({
    queryKey: ['TrendingCoin', currency],
    queryFn: async () => {
      if (!currency) return null;
      const response = await fetchMarketTrendingCoinData(currency);
      setMarketData(response);
      
      return response.data;
    }
  })

  return { singleCoin, coinListAll, HistoricalChart, TrendingCoin };
};
