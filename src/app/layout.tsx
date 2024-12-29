import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProviders from "@/utils/ReactQueryProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/components/UserProvider/UserProvider";
import Modal from "@/components/Modal/Modal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "가상자산 플랫폼 | Coin Market",
  description: "Coin Market에서 코인 시세를 확인해보세요.",
  openGraph: {
    type: "website",
    url: "https://crypto-git-main-eunjees-projects.vercel.app",
    title: "가상자산 플랫폼 | Coin Market",
    description: "Coin Market에서 코인 시세를 확인해보세요.",
    siteName: "Coin Market",
    images: ['https://raw.githubusercontent.com/wwowww/crypto/b2e6f9c9ac0308d62f6b3c22a427347d5391e388/public/og.jpg'],
  },
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Modal />
          <Toaster />
          <Header />
          <ReactQueryProviders>
            {children}
          </ReactQueryProviders>
        </UserProvider>
      </body>
    </html>
  );
}
