import { useChartStore } from "@/stores/useChartStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketCandlePeriod } from "@/app/api/fetchChartData";
import { Chart } from "@/types";

export const useChartData = ({ count, period }: Chart) => {
  const { setChartData } = useChartStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chartData", period, count],
    queryFn: async () => {
      const data = await fetchMarketCandlePeriod({count, period});
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      setChartData(data);
    },
  });

  const chartData = data || [];

  return {
    chartData,
    isLoading,
    isError,
  };
};
