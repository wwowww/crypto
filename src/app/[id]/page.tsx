'use client';

import { useParams } from 'next/navigation'; 
import { useMarketData } from '@/hooks/useMarketData';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import NavCoinTable from '@/components/NavCoinTable/NavCoinTable';
import CoinChart from '@/components/CoinChart/CoinChart';

export default function MarketPage() {
  // const { id } = useParams();
  // const { currency } = useCurrencyStore();

  // const { singleCoin } = useMarketData({
  //   id: id?.toString(),
  //   currency: currency,
  // });

  // if (!singleCoin) {
  //   return <div>레이지로딩</div>;
  // }

  return (
    <div>
      {/* <NavCoinTable /> */}
      <CoinChart />
    </div>
  );
}
