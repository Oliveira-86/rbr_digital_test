'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import React from 'react';
import { Providers } from './Chakra';

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </Providers>
  );
}
