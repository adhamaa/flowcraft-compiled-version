import ColapsableMenu from '@/app/(home)/_components/ColapsableMenu';
import { SideMenuProvider } from '@/hooks/useSideMenu';
import Providers from '@/provider';
import '@/styles/globals.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'Safwa Business Process',
  description: 'Internal business process user interface for Safwa',
};

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}