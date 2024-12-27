import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="py-10 w-[1200px] mx-auto">
      <header>
        <h1>Coin Market</h1>
      </header>
      {children}
    </div>
  );
}