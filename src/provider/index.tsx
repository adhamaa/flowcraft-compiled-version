import { SideMenuProvider } from '@/hooks/useSideMenu'
import { MantineProvider, createTheme } from '@mantine/core'
import * as React from 'react'

const theme = createTheme({
  fontFamily: 'inherit',
});

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MantineProvider theme={theme}>
      <SideMenuProvider >
        {children}
      </SideMenuProvider>
    </MantineProvider>
  )
}

export default Providers