'use client';

import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as  React from 'react'


const ActionButtons = () => {
  const { onApply, onReset, onSave } = useWorkInProgressDiagram();

  const buttons = [
    {
      label: 'Reset',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onReset,
      icon: { name: "heroicons-outline:x-circle", width: '1.5rem' },
    },
    {
      label: 'Apply',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onApply,
      icon: { name: "heroicons-outline:check-circle", width: '1.5rem' },
    },
    {
      label: 'Save',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onSave,
      icon: { name: "heroicons:arrow-right-end-on-rectangle-20-solid", width: '1.5rem', rotate: 45 },
    },
  ] satisfies CustomButtonProps[];

  return (
    <div className="flex justify-end gap-3">
      {buttons.map(({ label, canShow, icon, onClick, ...btnProps }, index) => canShow && (
        <Button
          key={index}
          variant="filled"
          color="#F1F5F9"
          radius="md"
          size="sm"
          fz='0.9rem'
          autoContrast
          leftSection={<Icon width={icon.width} icon={icon.name} rotate={icon.rotate} />}
          onClick={() => {
            onClick()
            console.log('clicked')
          }}
          {...btnProps}
        >
          {label}
        </Button>
      ))}
    </div>
  )
};

export default ActionButtons