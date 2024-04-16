'use client';

import { Icon } from "@iconify-icon/react";
import { Button } from "@mantine/core";
import clsx from "clsx";
import * as React from "react";

const TitleSection = ({ title }: { title: string }) => {
  return (
    <section className={clsx('flex items-center px-20 py-10')}>
      <h1 className='font-bold text-xl'>{title}</h1>
      {title === 'Business Process Cycle' && <Button
        disabled
        variant='default'
        color='#895CF3'
        radius='md'
        size="sm"
        fz={14}
        ml='auto'
        leftSection={< Icon className='cursor-pointer rounded' icon="heroicons-outline:plus-circle" width="1rem" height="1rem" />}
        // onClick={onClick}
        classNames={{
          root: 'disabled:bg-[##F1F5F9]',
          label: 'disabled:text-[##94A3B8]',
        }}
      >
        Add Business Process
      </Button>}
    </section>
  )
};

export default TitleSection;