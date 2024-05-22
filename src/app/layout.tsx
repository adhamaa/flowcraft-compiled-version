import { BASE_PATH, auth } from '@/auth';
import { SideMenuProvider } from '@/hooks/useSideMenu';
import Providers from '@/provider';
import '@/styles/globals.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from "next";
import { SessionProvider } from 'next-auth/react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Safwa Business Process',
  description: 'Internal business process user interface for Safwa',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <SessionProvider basePath={BASE_PATH} session={session}>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}