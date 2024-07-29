'use client';

import { Icon } from "@iconify-icon/react";
import { Button } from "@mantine/core";
import clsx from "clsx";
import * as React from "react";

const TitleSection = ({ title, className }: { title: string; className?: string; }) => {
  return (
    <section className={clsx('flex items-center px-20 py-10', className)}>
      <h1 className='font-semibold text-xl'>{title}</h1>
      {title === 'Business Process Cycle' && <Button
        disabled
        variant='filled'
        color='#F1F5F9'
        c='#0F172A'
        radius='md'
        size="sm"
        fz={14}
        ml='auto'
        leftSection={
          < Icon className='cursor-pointer rounded' icon="heroicons-outline:plus-circle" width="1rem" height="1rem" />
        }
        // onClick={onClick}
        classNames={{
          root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
        }}
      >
        Add Business Process
      </Button>}
    </section>
  )
};

export default TitleSection;