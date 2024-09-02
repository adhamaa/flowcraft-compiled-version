'use client';

import * as React from 'react'
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useActionIcons } from './WorkInProgress/hooks/useActionIcons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { Select } from 'react-hook-form-mantine';

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
  input?: React.HTMLInputTypeAttribute;
}

type ActionList = Action[];

const ActionIcons = ({
  type = "action",
  className,
  ...props
}: {
  type: "action" | "history";
  className?: string;
  [key: string]: any;
}) => {
  const refetch = props.history?.refetch;
  const method = useFormContext();
  const { reset, setFocus, setValue } = method;

  const { isEditable, toggleIsEditable } = useActionIcons();

  const handleToggle = <E extends Event>(e: E): void => {
    const action_id = (e.target as HTMLElement).offsetParent?.id;
    toggleIsEditable(action_id as string);
    reset();
  };

  const toggleSort = <E extends Event>(e: E): void => {
    const currentValue = method.getValues('sort');
    const newValue = currentValue === 'asc' ? 'desc' : 'asc';
    setValue('sort', newValue);
  };

  const actionList: ActionList & any = [
    ...(type === "action" ? [{
      id: "add",
      label: "Add",
      icon: { name: "heroicons:plus-circle", width: "1.75rem" },
      component: 'button',
      type: 'submit',
      disabled: false,
      onClick: handleToggle as never,
      color: isEditable.add ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.add ? "white" : "black"
    },
    {
      id: "move",
      label: "Move",
      icon: { name: "heroicons:arrows-pointing-in", width: "1.75rem" },
      component: 'button',
      type: 'submit',
      disabled: false,
      onClick: handleToggle as never,
      color: isEditable.move ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.move ? "white" : "black"
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: { name: "heroicons-outline:document-duplicate", width: "1.5rem" },
      component: 'button',
      type: 'submit',
      disabled: false,
      onClick: handleToggle as never,
      color: isEditable.duplicate ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.duplicate ? "white" : "black"
    },
    {
      id: "delete",
      label: "Delete",
      icon: { name: "heroicons-outline:trash", width: "1.5rem" },
      component: 'button',
      type: 'submit',
      disabled: false,
      onClick: handleToggle as never,
      color: isEditable.delete ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.delete ? "white" : "black"
    },
    {
      id: "restore",
      label: "Restore",
      icon: { name: "heroicons-outline:refresh", width: "1.5rem" },
      component: 'button',
      type: 'submit',
      disabled: false,
      onClick: handleToggle as never,
      color: isEditable.restore ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.restore ? "white" : "black"
    },
    {
      id: "disjoint",
      label: "Disjoint",
      icon: { name: "heroicons-outline:scissors", width: "1.5rem" },
      component: 'button',
      type: 'submit',
      disabled: false,
      onClick: handleToggle as never,
      color: isEditable.disjoint ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.disjoint ? "white" : "black"
    }] : []),
    ...(type === "history" ? [{
      id: "refresh",
      label: "Refresh",
      icon: { name: "heroicons-outline:refresh", width: "1.5rem" },
      component: 'button',
      type: 'button',
      disabled: false,
      onClick: refetch,
      color: isEditable.refresh ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.refresh ? "white" : "black"
    }, {
      id: "filter",
      label: "Filter",
      icon: { name: "heroicons:adjustments-vertical", width: "1.5rem" },
      component: 'button',
      type: 'button',
      input: 'select',
      disabled: false,
      // onClick: handleToggle as never,
      color: isEditable.filter ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.filter ? "white" : "black"
    }, {
      id: "sort",
      label: "Sort",
      icon: { name: "heroicons:arrows-up-down-solid", width: "1.5rem" },
      component: 'button',
      type: 'button',
      disabled: false,
      onClick: toggleSort,
      color: isEditable.sort ? "var(--fc-brand-700)" : "var(--fc-neutral-100)",
      c: isEditable.sort ? "white" : "black"
    }] : []),
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
    <div className={clsx('flex gap-3', className)}>
      {actionList.map((action: Action) => !action.input ? (
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
      ) : (
        <SelectInputWrapper key={action.id}>
          {({ ref, toggle }) => (
            <Tooltip label={action.label}>
              <ActionIcon
                ref={ref}
                id={action.id}
                component={action.component as "button"}
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
                onClick={toggle}
              >
                <Icon
                  icon={action.icon.name}
                  width={action.icon.width}
                />
              </ActionIcon>
            </Tooltip>
          )}
        </SelectInputWrapper>
      ))}
    </div>
  )
};

export default ActionIcons;

function SelectInputWrapper({ children }: { children?: React.ReactNode | ((props: { ref: React.RefObject<HTMLButtonElement>, toggle: () => void }) => React.ReactNode) }) {
  const [dropdownOpened, { toggle, close }] = useDisclosure();
  const ref = useClickOutside(() => close(), ['mouseup', 'touchend']);
  return (
    <div className="relative inline-block">
      <Select
        name='action'
        rightSection={<></>} // disable right section
        data={['add', 'move', 'duplicate', 'delete', 'restore', 'disjoint']}
        classNames={{
          input: 'absolute inset-0 opacity-0 w-full h-full cursor-default',
          dropdown: '!w-40',
        }}
        dropdownOpened={dropdownOpened}
        checkIconPosition='left'
      />
      {typeof children === 'function' ? children({ ref, toggle }) : children}
    </div>
  );
};