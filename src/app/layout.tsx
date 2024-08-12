
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/Header';
import Providers from '@/provider';
import '@/styles/globals.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});


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
    <html lang="en" className={`${inter.variable} ${notoSans.variable}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Header />
          <Breadcrumbs />
          {children}
        </Providers>
      </body>
    </html>
  );
}