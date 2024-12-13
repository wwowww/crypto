'use client';

import { useUserStore } from '@/stores/useUserStore';
import { redirect } from "next/navigation"
import { ReactNode, useEffect } from 'react';

const AuthLayout = ({children}: {children: ReactNode}) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user.id) {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}

export default AuthLayout;