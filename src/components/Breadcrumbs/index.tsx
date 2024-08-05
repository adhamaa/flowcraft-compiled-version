"use client";

import useBreadcrumbs, { Breadcrumb } from '@/hooks/useBreadcrumbs';
import { Icon } from '@iconify-icon/react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


function Breadcrumbs({ items, className, route }: {
  items?: Breadcrumb[];
  className?: string;
  route?: string;
}) {
  const pathname = usePathname();
  const excludePaths = (
    pathname !== "/manage-claim" &&
    pathname !== "/cycle" &&
    !pathname.includes("/auth") &&
    !pathname.includes("/cycle/restructure")
  );
  const breadcrumbs = useBreadcrumbs({ route }).breadcrumbs;
  items = items ? items : breadcrumbs;
  return excludePaths && (
    <div className={clsx('flex border-b-2 border-[#EBEAEA] items-center col-span-full p-6 gap-4 w-screen h-max', className)}>
      <MantineBreadcrumbs
        separator={
          <Icon icon="tabler:chevron-right" width="1.2rem" />
        }
        separatorMargin="md"
        mt="xs"
      >
        {items.map((item, index) => (
          <Anchor
            key={index}
            href={item.href}

            c="#0F172A"
            size='lg'
          >
            {item.icon ? <Icon icon={item.icon as string}></Icon> : item.title}
          </Anchor>
        ))}
      </MantineBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;