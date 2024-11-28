import axios from 'axios';

export const fetchMarketSingleCoinData = async (id: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`);

  return { data };
};

export const fetchMarketCoinListAllData = async (currency: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}//markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);

  return { data };
};

export const fetchMarketHistoricalChartData = async (id: string, currency: string, days: Date) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}/market_chart?vs_currency=${currency}&days=${days}`);

  return { data };
};

export const fetchMarketTrendingCoinData = async (currency: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);

  return { data };
}