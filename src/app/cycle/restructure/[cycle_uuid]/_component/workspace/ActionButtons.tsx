'use client';

import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as  React from 'react'
import { useFormContext } from 'react-hook-form';
import { addEdge, ConnectionLineType, Edge } from 'reactflow';
import { ActionType, useActionIcons } from './WorkInProgress/hooks/useActionIcons';
import { useParams, useRouter } from 'next/navigation';

type ActionButtonsType = {
  label: string;
  canShow: boolean;
  icon: { name: string; width: string; rotate?: number };
  onClick?: (e: any) => void;
  color: string;
  c?: string;
  disabled: boolean;
  type: 'button';
};

const ActionButtons = () => {
  const router = useRouter();
  const params = useParams();
  const cycle_uuid = params.cycle_uuid as string;

  const { isEditable: isEditData, reset: resetIsEditable, getAction, getIsAnyEditable } = useActionIcons();

  const { onApply, onReset, onSave, onDraft, deselectAllNodes } = useWorkInProgressDiagram();

  const isEditable = getIsAnyEditable(isEditData as { [key in ActionType]: boolean });

  const method = useFormContext();
  const { handleSubmit, reset } = method;

  const action = getAction(isEditData as { [key in ActionType]: boolean });

  const onApplySubmit = (data: any, e: any) => onApply({ action: action as ActionType, data, callback: reset });

  const buttons: ActionButtonsType[] = [
    {
      label: 'Reset',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: () => onReset(reset),
      color: 'var(--fc-neutral-100)',
      c: 'var(--bc-neutral-900)',
      icon: { name: "heroicons-outline:x-circle", width: '1.5rem' },
    },
    {
      label: 'Apply',
      type: 'button',
      disabled: !isEditable,
      canShow: true,
      onClick: handleSubmit(onApplySubmit),
      color: 'var(--fc-brand-700)',
      icon: { name: "heroicons-outline:check-circle", width: '1.5rem' },
    },
    // {
    //   label: 'Draft',
    //   type: 'button',
    //   disabled: !isEditable,
    //   canShow: true,
    //   onClick: onDraft,
    //   color: 'var(--fc-brand-700)',
    //   icon: { name: "heroicons-outline:folder", width: '1.5rem' },
    // },
    {
      label: 'Save',
      type: 'button',
      disabled: !isEditable,
      canShow: true,
      onClick: () => {
        onSave(cycle_uuid, (message) => {
          if (message.success) {
            resetIsEditable();
            window.location.reload();
          }
        });
      },
      color: 'var(--fc-brand-700)',
      icon: { name: "heroicons:arrow-right-end-on-rectangle-20-solid", width: '1.5rem', rotate: 45 },
    },
    // {
    //   label: 'Refresh',
    //   type: 'button',
    //   disabled: false,
    //   canShow: true,
    //   onClick: () => window.location.reload(),
    //   color: 'var(--fc-neutral-100)',
    //   icon: { name: "heroicons:refresh", width: '1.5rem' },
    // }
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