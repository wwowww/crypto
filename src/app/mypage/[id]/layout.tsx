import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "마이페이지 | Coin Market",
  description: "Coin Market에 오신 것을 환영합니다. 내 정보와 관심 코인을 확인해보세요.",
  openGraph: {
    type: "website",
    url: "https://crypto-nlrot22ak-eunjees-projects.vercel.app/",
    title: "마이페이지 | Coin Market",
    description: "Coin Market의 마이페이지에서 내 정보와 관심 코인 정보를 확인해보세요!",
    siteName: "Coin Market",
    images: ["https://raw.githubusercontent.com/wwowww/crypto/b2e6f9c9ac0308d62f6b3c22a427347d5391e388/public/og.jpg"],
  },
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
};


const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-full py-[64px] w-[1200px] my-[48px] mx-auto">{children}</div>
  );
}

export default RootLayout;