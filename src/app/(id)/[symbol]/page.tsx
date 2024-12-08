'use client';

import NavCoinTable from '@/components/NavCoinTable/NavCoinTable';
import dynamic from 'next/dynamic';

const CandleChart = dynamic(() => import("@/components/CandleCharts/CandleCharts"), {
  ssr: false,
});

export default function MarketPage() {
  return (
    <div className='flex'>
      {/* <NavCoinTable /> */}
      
      <CandleChart />
    </div>
  );
}
