'use client';

import * as React from 'react'
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useActionIcons } from './WorkInProgress/hooks/useActionIcons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { useFormContext } from 'react-hook-form';

interface Action {
  id: string;
  label: string;
  icon: { name: string; width?: string };
  color?: string;
  c?: string;
  component: "button" | "a";
  type: "button" | "submit" | "reset";
  disabled: boolean;
  onClick?: () => void;
}


const ActionIcons = () => {
  const method = useFormContext();
  const { reset, setFocus } = method;

  const { isEditable, toggleIsEditable } = useActionIcons();

  const handleToggle = <E extends Event>(e: E): void => {
    const action_id = (e.target as HTMLElement).offsetParent?.id;
    toggleIsEditable(action_id as string);
    reset();
  };

  const actionList: Action[] = [
    {
      id: "add", label: "Add", icon: { name: "heroicons:plus-circle", width: "1.75rem" }, component: 'button', type: 'submit', disabled: false, onClick: handleToggle as never, color: isEditable.add ? "#895CF3" : "#F1F5F9", c: isEditable.add ? "white" : "black"
    },
    {
      id: "move", label: "Move", icon: { name: "heroicons:arrows-pointing-in", width: "1.75rem" }, component: 'button', type: 'submit', disabled: false, onClick: handleToggle as never, color: isEditable.move ? "#895CF3" : "#F1F5F9", c: isEditable.move ? "white" : "black"
    },
    {
      id: "duplicate", label: "Duplicate", icon: { name: "heroicons-outline:document-duplicate", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false, onClick: handleToggle as never, color: isEditable.duplicate ? "#895CF3" : "#F1F5F9", c: isEditable.duplicate ? "white" : "black"
    },
    {
      id: "delete", label: "Delete", icon: { name: "heroicons-outline:trash", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false, onClick: handleToggle as never, color: isEditable.delete ? "#895CF3" : "#F1F5F9", c: isEditable.delete ? "white" : "black"
    },
    {
      id: "restore", label: "Restore", icon: { name: "heroicons-outline:refresh", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false, onClick: handleToggle as never, color: isEditable.restore ? "#895CF3" : "#F1F5F9", c: isEditable.restore ? "white" : "black"
    },
    {
      id: "disjoint", label: "Disjoint", icon: { name: "heroicons-outline:scissors", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false, onClick: handleToggle as never, color: isEditable.disjoint ? "#895CF3" : "#F1F5F9", c: isEditable.disjoint ? "white" : "black"
    }
  ];

  React.useEffect(() => {
    if (isEditable.add) {
      setFocus('curr_stage_name');
    }
    if (!isEditable.add) {
      setFocus('curr_stage_uuid');
    }
  }, [isEditable, setFocus]);


  return (
    <div className='flex gap-3'>
      {actionList.map(action => (
        <Tooltip key={action.id} label={action.label}>
          <ActionIcon
            id={action.id}
            component={action.component}
            type={action.type}
            disabled={action.disabled}
            variant="filled"
            color={action.color}
            c={action.c}
            size="2.5rem"
            radius="md"
            aria-label={action.label}
            autoContrast
            classNames={{
              root: 'text-black/70 hover:text-black disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
            }}
            onClick={action.onClick}
          >
            <Icon
              icon={action.icon.name}
              width={action.icon.width}
            />
          </ActionIcon>
        </Tooltip>
      ))}
    </div>
  )
};

export default ActionIcons