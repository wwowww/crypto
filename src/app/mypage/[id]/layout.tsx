import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "마이페이지 | Coin Market",
  description: "Coin Market에 오신 것을 환영합니다. 내 정보와 관심 코인을 확인해보세요.",
};


const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-full py-[64px] w-[1200px] my-[48px] mx-auto">{children}</div>
  );
}

export default RootLayout;