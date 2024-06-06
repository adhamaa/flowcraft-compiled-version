'use client';

import { signOut } from '@/app/auth/signout/_action';
import toast from '@/components/toast';
import { authRoutes } from '@/routes';
import { useIdle } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react'

export function KickToLogin() {
  const idleTime = process.env.NEXT_PUBLIC_IDLE_TIME, signoutTime = process.env.NEXT_PUBLIC_SIGNOUT_TIME
  const router = useRouter();
  const pathname = usePathname();
  const checkIdleRoute = !authRoutes.includes(pathname);

  const idle = useIdle(idleTime, {
    initialState: false,
  });

  React.useEffect(() => {
    let idleTimeOut: NodeJS.Timeout;

    if (idle && checkIdleRoute) {
      toast.warning(
        `You have been idle for too long. You will be signed out in ${process.env.NEXT_PUBLIC_SIGNOUT_TIME} seconds.`,
      );

      idleTimeOut = setTimeout(async () => {
        await signOut();
        router.push(`/`);
      }, signoutTime * 1000);
    }
    return () => {
      clearTimeout(idleTimeOut);
    };
  }, [idle, checkIdleRoute, signoutTime, router]);
  return null;
}