'use client';

import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as  React from 'react'
import { useFormContext } from 'react-hook-form';
import { addEdge, ConnectionLineType, Edge } from 'reactflow';


const ActionButtons = () => {
  const { onApply, onReset, onSave, nodes, edges, setUpdateEdges } = useWorkInProgressDiagram();
  const method = useFormContext();
  const { handleSubmit } = method;

  const onSaveSubmit = (data: any) => {
    setUpdateEdges({
      curr_stage_uuid: data.curr_stage_uuid,
      previous_stage: data.previous_stage,
      next_stage: data.next_stage
    })
  };

  const buttons = [
    {
      label: 'Reset',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onReset as never,
      icon: { name: "heroicons-outline:x-circle", width: '1.5rem' },
    },
    {
      label: 'Apply',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onApply as never,
      icon: { name: "heroicons-outline:check-circle", width: '1.5rem' },
    },
    {
      label: 'Save',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onSaveSubmit as never,
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
          onClick={handleSubmit(onClick)}
          {...btnProps}
        >
          {label}
        </Button>
      ))}
    </div>
  )
};

export default ActionButtons