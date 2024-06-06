'use client';

import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as  React from 'react'

const buttons = [
  {
    label: 'Reset',
    type: 'button',
    disabled: false,
    canShow: true,
    onClick: () => { },
    variant: "filled",
    color: "#F1F5F9",
    radius: "md",
    size: "sm",
    fz: '0.9rem',
    classNames: {
      root: 'text-black/70 hover:text-black disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    },
    icon: <Icon width='1.5rem' icon="heroicons-outline:x-circle" />,
  },
  {
    label: 'Apply',
    type: 'button',
    disabled: false,
    canShow: true,
    onClick: () => { },
    variant: "filled",
    color: "#F1F5F9",
    radius: "md",
    size: "sm",
    fz: '0.9rem',
    classNames: {
      root: 'text-black/70 hover:text-black disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    },
    icon: <Icon width='1.5rem' icon="heroicons-outline:check-circle" />,
  },
  {
    label: 'Save',
    type: 'button',
    disabled: false,
    canShow: true,
    onClick: () => { },
    variant: "filled",
    color: "#F1F5F9",
    radius: "md",
    size: "sm",
    fz: '0.9rem',
    classNames: {
      root: 'text-black/70 hover:text-black disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    },
    icon: <Icon width='1.5rem' icon="heroicons:arrow-right-end-on-rectangle-20-solid" rotate='45' />,
  },
] satisfies CustomButtonProps[];

const ActionButtons = () => (
  <div className="flex justify-end gap-3">
    {buttons.map(({ label, canShow, icon, ...btn }, index) => canShow && (
      <Button
        key={index}
        {...btn}
        leftSection={icon}
      >
        {label}
      </Button>
    ))}
  </div>
);

export default ActionButtons