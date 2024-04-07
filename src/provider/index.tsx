"use client";
import * as React from 'react'
import { GlobalStateProvider } from '@/hooks/useGlobalState';
import { SideMenuProvider } from '@/hooks/useSideMenu'
import { MantineProvider, createTheme } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme({
  fontFamily: 'inherit',
});

const queryClient = new QueryClient()

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SideMenuProvider >
          <GlobalStateProvider>
            {children}
          </GlobalStateProvider>
        </SideMenuProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default Providers