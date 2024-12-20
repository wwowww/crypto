import { useChartStore } from "@/stores/useChartStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketCandlePeriod } from "@/app/api/fetchChartData";
import { Chart } from "@/types";

export const useChartData = ({ count, period, market }: Chart) => {
  const { setChartData } = useChartStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chartData", period, count, market],
    queryFn: async () => {
      const data = await fetchMarketCandlePeriod({count, period, market});
      setChartData(data);
      return data.reverse();
    }
  });

  const chartData = data || [];

  return {
    chartData,
    isLoading,
    isError,
  };
};
