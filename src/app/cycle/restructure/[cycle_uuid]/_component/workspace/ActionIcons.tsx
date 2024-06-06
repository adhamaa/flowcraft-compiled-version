'use client';

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import * as React from 'react'

interface Action {
  id: string;
  label: string;
  icon: { name: string; width?: string };
  component: "button" | "a";
  type: "button" | "submit" | "reset";
  disabled: boolean;
}

const actions: Action[] = [
  { id: "Add", label: "Add", icon: { name: "heroicons:plus-circle", width: "1.75rem" }, component: 'button', type: 'submit', disabled: false },
  { id: "Move", label: "Move", icon: { name: "heroicons:arrows-pointing-in", width: "1.75rem" }, component: 'button', type: 'submit', disabled: false },
  { id: "Duplicate", label: "Duplicate", icon: { name: "heroicons-outline:document-duplicate", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false },
  { id: "Delete", label: "Delete", icon: { name: "heroicons-outline:trash", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false },
  { id: "Restore", label: "Restore", icon: { name: "heroicons-outline:refresh", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false },
  { id: "Disjoint", label: "Disjoint", icon: { name: "heroicons-outline:scissors", width: "1.5rem" }, component: 'button', type: 'submit', disabled: false }
];

const ActionIcons = () => (
  <div className='flex gap-3'>
    {actions.map(action => (
      <Tooltip key={action.id} label={action.label}>
        <ActionIcon
          id={action.id}
          component={action.component}
          type={action.type}
          disabled={action.disabled}
          variant="filled"
          color="#F1F5F9"
          size="2.5rem"
          radius="md"
          aria-label={action.label}
          autoContrast
          classNames={{
            root: 'text-black/70 hover:text-black disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
          }}
        >
          <Icon
            icon={action.icon.name}
            width={action.icon.width}
          />
        </ActionIcon>
      </Tooltip>
    ))}
  </div>
);

export default ActionIcons