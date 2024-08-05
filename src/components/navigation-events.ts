'use client';

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { setAuditTrail } from '@/lib/service';
import { useSession } from 'next-auth/react';

export function NavigationEvents() {
  const { data: session } = useSession();
  const user_id = session?.user?.user_id;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageUrl = `${pathname}?${searchParams}`;
  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUrl = `${pathname}`
    if (prevUrlRef.current && prevUrlRef.current !== currentUrl) {
      setAuditTrail({
        action: `page_routing`,
        location_url: pageUrl,
        object: 'src/components/navigation-events.ts',
        process_state: 'ROUTING',
        sysfunc: '"useEffect" func ',
        userid: user_id as string,
        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
        notes: `User navigated to "${currentUrl}" from "${prevUrlRef.current}"`,
        json_object: {
          previous_url: prevUrlRef.current,
          current_url: currentUrl,
        },
      });
    }

    prevUrlRef.current = currentUrl;
  }, [pathname, searchParams])
  return null;
};
