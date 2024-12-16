'use client';

import { useUserStore } from '@/stores/useUserStore';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const RootLayout = ({children}: {children: ReactNode}) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user || user?.id === '') {
      redirect("/");
    }
  }, [user]);
  
  return (
    <div className="h-full p-10">{children}</div>
  );
}

export default RootLayout;