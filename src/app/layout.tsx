import ColapsableMenu from '@/app/(home)/_components/ColapsableMenu';
import '@/styles/globals.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'Safwa Business Process',
  description: 'Internal business process user interface for Safwa',
};

const theme = createTheme({
  fontFamily: 'inherit',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}