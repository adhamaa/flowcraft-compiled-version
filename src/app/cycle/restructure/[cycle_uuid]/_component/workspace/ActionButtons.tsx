'use client';

import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as  React from 'react'
import { useFormContext } from 'react-hook-form';
import { ActionType, useActionIcons } from './WorkInProgress/hooks/useActionIcons';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setAuditTrail } from '@/lib/service';
import { useSession } from 'next-auth/react';
import useQueryString from '@/hooks/useQueryString';

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
  const { data: session } = useSession();
  const userId = session?.user?.user_id;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_uuid = params.cycle_uuid as string;
  const cycle_id = searchParams.get('cycle_id');
  const selected_app = searchParams.get('selected_app');
  const pageUrl = `${pathname}?${searchParams}`;

  const { isEditable: isEditData, reset: resetIsEditable, getAction, getIsAnyEditable } = useActionIcons();

  const { onApply, onReset, onSave, onDraft, deselectAllNodes, fetchNodesEdges } = useWorkInProgressDiagram();

  const isEditable = getIsAnyEditable(isEditData as { [key in ActionType]: boolean });
  const { remainQueryString } = useQueryString();
  const method = useFormContext();
  const { handleSubmit, reset } = method;

  const action = getAction(isEditData as { [key in ActionType]: boolean });

  const onApplySubmit = (data: any, e: any) => onApply({
    action: action as ActionType, data, callback: () => {
      reset();
      setAuditTrail({
        action: 'apply_' + (action as string) + '_restructure_cycle',
        notes: `Apply ${action} on restructuring cycle`,
        object: 'src/app/cycle/restructure/[cycle_uuid]/_component/workspace/ActionButtons.tsx',
        process_state: 'RESTRUCTURE_CYCLE',
        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
        sysfunc: '"onApplySubmit" func',
        userid: userId as string,
        json_object: { ...data },
        location_url: pageUrl,
      });
    }
  });

  const onSaveSubmit = () => onSave({
    cycle_uuid, callback: ({ data, ...response }) => {
      if (response.success) {
        setAuditTrail({
          action: 'save_restructure_cycle',
          notes: `Save restructuring cycle`,
          object: 'src/app/cycle/restructure/[cycle_uuid]/_component/workspace/ActionButtons.tsx',
          process_state: 'TRIGGERAPI',
          sysapp: 'FLOWCRAFTBUSINESSPROCESS',
          sysfunc: '"onSaveSubmit" func',
          userid: userId as string,
          json_object: { ...response },
          location_url: pageUrl,
        }).then(() => {
          resetIsEditable();
          router.push(`/cycle/restructure/${cycle_uuid}?${remainQueryString()}`);
        });
      }
    }
  });

  const onResetSubmit = () => onReset(reset);

  const buttons: ActionButtonsType[] = [
    {
      label: 'Reset',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: onResetSubmit,
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
      onClick: onSaveSubmit,
      color: 'var(--fc-brand-700)',
      icon: { name: "heroicons:arrow-right-end-on-rectangle-20-solid", width: '1.5rem', rotate: 45 },
    },
    {
      label: 'Refresh',
      type: 'button',
      disabled: false,
      canShow: true,
      onClick: () => fetchNodesEdges({
        cycle_id: cycle_id as string,
        apps_label: selected_app as any
      }),
      color: 'var(--fc-neutral-100)',
      icon: { name: "heroicons:refresh", width: '1.5rem' },
    }
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