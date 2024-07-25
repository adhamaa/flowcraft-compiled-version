"use client";

import { createBreadcrumbs } from '@/lib/helper';
import { Breadcrumbs as BC, Anchor } from '@mantine/core';
import { usePathname } from 'next/navigation';


function Breadcrumbs() {
  const pathname = usePathname()
  const generatedBreadcrumbs = createBreadcrumbs(`http://localhost:3030/${pathname}`);
  const items = generatedBreadcrumbs.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <BC separator="→" separatorMargin="md" mt="xs">
        {items}
      </BC>
    </>
  );
};

export default Breadcrumbs;