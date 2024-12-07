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
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      const reversedData = data.reverse();
      setChartData(reversedData);
    },
  });

  const chartData = data || [];

  return {
    chartData,
    isLoading,
    isError,
  };
};
