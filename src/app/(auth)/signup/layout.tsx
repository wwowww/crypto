import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 | Coin Market",
  description: "Coin Market에 오신 것을 환영합니다. 회원가입 후 이용해주세요.",
  openGraph: {
    type: "website",
    url: "https://crypto-git-main-eunjees-projects.vercel.app/signup",
    title: "회원가입 | Coin Market",
    description: "Coin Market에서 회원가입 후, 다양한 코인 시세를 확인해보세요!",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
