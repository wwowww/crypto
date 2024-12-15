'use client';

import { ReactNode } from 'react';

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-full p-10">{children}</div>
  );
}

export default RootLayout;