import { useQuery } from '@tanstack/react-query';
import { fetchMarketSingleCoinData, fetchMarketCoinListAllData, fetchMarketHistoricalChartData, fetchMarketTrendingCoinData } from '@/app/api/fetchMarketData';
import { useMarketStore } from '@/stores/useMarketStore';
import { Market } from "@/types";

export const useMarketData = ({id, currency, days}: Market) => {
  const { setMarketData } = useMarketStore();

  const { data: singleCoin } = useQuery({
    queryKey: ['singleCoin', id],
    queryFn: async () => {
      const marketSingCoinData = await fetchMarketSingleCoinData(id);
      setMarketData(marketSingCoinData); // Zustand 스토어 저장
      
      return marketSingCoinData; // ReactQuery 캐시에 저장
    },
  });

  const { data: coinListAll } = useQuery({
    queryKey: ['coinListAll', currency],
    queryFn: async () => {
      const marketCoinListAllData = await fetchMarketCoinListAllData(currency);
      setMarketData(marketCoinListAllData);

      return marketCoinListAllData;
    },
  })

  const { data: HistoricalChart } = useQuery({
    queryKey: ['HistoricalChart', currency],
    queryFn: async () => {
      const marketHistoricalChartData = await fetchMarketHistoricalChartData(id, currency, days);
      setMarketData(marketHistoricalChartData);

      return marketHistoricalChartData;
    },
  })

  const { data: TrendingCoin } = useQuery({
    queryKey: ['TrendingCoin', currency],
    queryFn: async () => {
      const marketTrendingCoinData = await fetchMarketTrendingCoinData(currency);
      setMarketData(marketTrendingCoinData);
      
      return marketTrendingCoinData;
    }
  })

  return { singleCoin, coinListAll, HistoricalChart, TrendingCoin };
};
