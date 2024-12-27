import { ReactNode } from 'react';
import { Metadata } from 'next';
import axios from 'axios';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  
  const coinListAll = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/markets?vs_currency=KWD&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  const product = coinListAll.data.find((item: any) => item.symbol === id);

  if (!product) {
    return {
      title: 'Coin Market',
      description: '정보를 찾을 수 없습니다.',
      openGraph: {
        images: ['https://raw.githubusercontent.com/wwowww/crypto/9630be17f62e7ebf89d447f09a84614058920d4e/public/coin.svg'],
      },
    };
  }

  return {
    title: `${product?.name} | ￦ ${product?.total_volume.toLocaleString('ko-KR')}` || 'Coin Market',
    description: `${product?.name}은 현재 ￦ ${product?.total_volume.toLocaleString('ko-KR')}입니다. Coin Market에서 코인 시세를 확인해보세요.` || 'Coin Market에서 코인 시세를 확인하세요.',
    openGraph: {
      images: [product?.image || 'https://raw.githubusercontent.com/wwowww/crypto/9630be17f62e7ebf89d447f09a84614058920d4e/public/coin.svg'],
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="py-10 w-[1200px] mx-auto">
      {children}
    </div>
  );
}
