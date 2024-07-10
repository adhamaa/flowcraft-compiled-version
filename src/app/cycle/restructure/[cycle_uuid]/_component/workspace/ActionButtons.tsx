'use client';

import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as  React from 'react'
import { useFormContext } from 'react-hook-form';
import { addEdge, ConnectionLineType, Edge } from 'reactflow';
import { useActionIcons } from './WorkInProgress/hooks/useActionIcons';


const ActionButtons = () => {
  const { isEditable, toggleIsEditable } = useActionIcons();

  const { onApply, onReset, onSave, onDraft, setUpdateEdges } = useWorkInProgressDiagram();
  const method = useFormContext();
  const { handleSubmit } = method;

  // const onDraft = (data: any) => {
  //   setUpdateEdges({
  //     curr_stage_uuid: data.curr_stage_uuid,
  //     previous_stage: data.previous_stage,
  //     next_stage: data.next_stage
  //   })
  // };

  const buttons = [
    {
      label: 'Reset',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onReset as never,
      color: '#F1F5F9',
      icon: { name: "heroicons-outline:x-circle", width: '1.5rem' },
    },
    {
      label: 'Apply',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onApply as never,
      color: '#F1F5F9',
      icon: { name: "heroicons-outline:check-circle", width: '1.5rem' },
    },
    {
      label: 'Draft',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onDraft as never,
      color: '#895CF3',
      icon: { name: "heroicons-outline:folder", width: '1.5rem' },
    },
    {
      label: 'Save',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onSave as never,
      color: '#895CF3',
      icon: { name: "heroicons:arrow-right-end-on-rectangle-20-solid", width: '1.5rem', rotate: 45 },
    },
  ] satisfies CustomButtonProps[];

  return (
    <div className="flex justify-end gap-3">
      {buttons.map(({ label, canShow, icon, onClick, color, ...btnProps }, index) => canShow && (
        <Button
          key={index}
          variant="filled"
          color={color}
          radius="md"
          size="sm"
          fz='0.9rem'
          autoContrast
          leftSection={<Icon width={icon.width} icon={icon.name} rotate={icon.rotate} />}
          onClick={onClick}
          {...btnProps}
        >
          {label}
        </Button>
      ))}
    </div>
  )
};

export default ActionButtons