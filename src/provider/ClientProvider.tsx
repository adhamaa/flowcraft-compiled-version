"use client";

import * as React from 'react'
import { GlobalStateProvider } from '@/hooks/useGlobalState';
import { SideMenuProvider } from '@/hooks/useSideMenu'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import '@mantine/notifications/styles.css';
import modals from '@/app/cycle/_components/Modals';
import { OnbordaProvider } from 'onborda';

import { NavigationEvents } from '@/components/navigation-events';
import { KickToLogin } from '@/components/kick-to-login';
import { SessionProvider } from 'next-auth/react';

const theme = createTheme({
  fontFamily: 'inherit',
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // supsends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <SessionProvider>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>
            <ModalsProvider modals={modals}>
              <Notifications position="top-right" classNames={{
                root: 'w-max'
              }} />
              <SideMenuProvider >
                <GlobalStateProvider>
                  <OnbordaProvider>
                    <KickToLogin /> {/* running effect to kick out user when idle */}
                    <NavigationEvents /> {/* running effect to track navigation */}
                    {children}
                  </OnbordaProvider>
                </GlobalStateProvider>
              </SideMenuProvider>
            </ModalsProvider>
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </MantineProvider>
    </SessionProvider >
  )
}