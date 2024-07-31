
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/Header';
import Providers from '@/provider';
import '@/styles/globals.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Safwa Business Process',
    template: `%s | Safwa Business Process`,
  },
  description: 'Internal business process user interface for Safwa',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
};

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <Breadcrumbs />
          {children}
        </Providers>
      </body>
    </html>
  );
}