import { Chart } from "@/types";
import axios from "axios";

export const fetchMarketCandlePeriod = async ({count, period, market}: Chart) => {
  let url = "";

  if (period === "minutes") {
    url = `https://api.bithumb.com/v1/candles/minutes/1?market=KRW-${market}&count=${count}`;
  } else if (period === "days") {
    url = `https://api.bithumb.com/v1/candles/days?market=KRW-${market}&count=${count}`;
  } else if (period === "weeks") {
    url = `https://api.bithumb.com/v1/candles/weeks?market=KRW-${market}&count=${count}`;
  } else if (period === "months") {
    url = `https://api.bithumb.com/v1/candles/months?market=KRW-${market}&count=${count}`;
  }

  try {
    const response = await axios.get(url);
    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
