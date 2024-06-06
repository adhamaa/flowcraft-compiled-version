import * as React from 'react'
import ServerProvider from './ServerProvider';
import ClientProvider from './ClientProvider';

export default function Providers({ children }: {
  children: React.ReactNode;
}) {
  return (
    <ServerProvider>
      <ClientProvider>
        {children}
      </ClientProvider>
    </ServerProvider>
  )
}
