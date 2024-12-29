import { ReactNode } from 'react';
import { Metadata } from 'next';
import axios from 'axios';
import { coinListAllMockData } from '@/data/coinListAllMockData';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  
  let coinListAll;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/markets?vs_currency=KWD&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    coinListAll = response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      coinListAll = coinListAllMockData;
    } else {
      console.error("API 요청 실패", error);
      coinListAll = coinListAllMockData;
    }
  }
  const product = coinListAll.find((item: any) => item.symbol === id);
  
  if (!product) {
    return {
      title: 'Coin Market',
      description: '정보를 찾을 수 없습니다.',
      openGraph: {
        type: "website",
        url: `https://crypto-git-main-eunjees-projects.vercel.app/`,
        title: "Coin Market",
        description: "Coin Market에서 코인 시세를 확인해보세요.",
        siteName: "Coin Market",
        images: ["https://raw.githubusercontent.com/wwowww/crypto/b2e6f9c9ac0308d62f6b3c22a427347d5391e388/public/og.jpg"],
      },
    };
  }

  return {
    title: `${product?.name} | ￦ ${product?.current_price.toLocaleString()}` || 'Coin Market',
    description: `${product?.name}은 현재 ￦ ${product?.current_price.toLocaleString()}입니다. Coin Market에서 코인 시세를 확인해보세요.` || 'Coin Market에서 코인 시세를 확인하세요.',
    openGraph: {
      type: "website",
      url: `https://crypto-git-main-eunjees-projects.vercel.app/${product?.symbol}`,
      title: `${product?.name} | ￦ ${product?.current_price.toLocaleString()}` || 'Coin Market을 통해 시세를 확인하세요!',
      description: `${product?.name}은 현재 ￦ ${product?.current_price.toLocaleString()}입니다. Coin Market에서 코인 시세를 확인해보세요.` || 'Coin Market에서 코인 시세를 확인하세요.',
      siteName: "Coin Market",
      images: [product?.image || 'https://raw.githubusercontent.com/wwowww/crypto/b2e6f9c9ac0308d62f6b3c22a427347d5391e388/public/og.jpg'],
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
