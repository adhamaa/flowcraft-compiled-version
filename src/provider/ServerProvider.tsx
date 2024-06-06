'use server';

import { BASE_PATH, auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react'

export default async function ServerProvider({ children }: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      {children}
    </SessionProvider>
  )

}
