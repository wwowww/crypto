import type { Metadata } from 'next';
import axios from 'axios';

type Props = {
  params?: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const coinListAll = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/markets?vs_currency=KWD&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  const product = coinListAll.data.find((item: any) => item.symbol === params?.id);
  console.log(coinListAll.data, product, params?.id, "product")

  return {
    title: `${product?.name} | ￦ ${product?.total_volume.toLocaleString('ko-KR')}` || 'Coin Market',
    description: `${product?.name}은 현재 ￦ ${product?.total_volume.toLocaleString('ko-KR')}입니다. Coin Market에서 코인 시세를 확인해보세요.` || 'Coin Market에서 코인 시세를 확인하세요.',
    openGraph: {
      images: [product?.image || 'default-image.jpg'],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-10 w-[1200px] mx-auto">
      {children}
    </div>
  );
}
