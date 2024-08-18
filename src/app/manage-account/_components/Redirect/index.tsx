"use client";

import * as React from 'react'
import { redirect, usePathname } from 'next/navigation';

const Redirect = () => {
  const pathname = usePathname();
  React.useEffect(() => {
    if (pathname === '/manage-account') redirect('/manage-account/profile');
  }, [pathname])
  return null;
}

export default Redirect