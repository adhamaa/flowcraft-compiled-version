import { DatasourceType } from '@/constant/datasource';
import { Icon } from '@iconify-icon/react';
import { Button, ButtonFactory, ButtonProps } from '@mantine/core';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

export type CustomButtonProps = ButtonProps & {
  label: string;
  type: 'button' | 'submit';
  onClick: () => void;
  canShow: boolean;
  icon?: React.ReactNode | { name: string; width: string; rotate?: number };
}

const HeaderForm = ({ toggleEdit, isEdit, toggleExpand, type, isFullscreen }: {
  type: 'stages' | 'general' | 'profile';
  toggleExpand: () => void;
  toggleEdit?: () => void;
  isEdit?: boolean;
  isFullscreen?: boolean;
}) => {
  const searchParams = useSearchParams();
  const datasource_type = searchParams.get('data_source') as DatasourceType;
  const isDatabase = datasource_type === 'database';
  const isProfile = type === 'profile';
  const isStages = type === 'stages';
  const isGeneral = type === 'general';

  if (!type) throw new Error('type is required');

  const buttons = [
    {
      label: 'Duplicate',
      type: 'button',
      disabled: isStages && !isEdit,
      canShow: isDatabase && isStages && !isEdit,
      onClick: () => { },

      variant: "filled",
      color: "var(--fc-neutral-100)",
      c: "var(--fc-neutral-900)",
      radius: "md",
      size: "sm",
      fz: 14,
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      icon: <Icon width='1rem' icon="heroicons-outline:duplicate" />,
    },
    {
      label: 'Delete',
      type: 'button',
      disabled: true,
      canShow: isDatabase && !isEdit,
      onClick: () => { },

      variant: "filled",
      color: "var(--fc-neutral-100)",
      c: "var(--fc-neutral-900)",
      radius: "md",
      size: "sm",
      fz: 14,
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      icon: <Icon width='1rem' icon="heroicons-outline:trash" />,
    },
    {
      label: 'Edit',
      type: 'button',
      disabled: false,
      canShow: (isDatabase || isProfile) && !isEdit,
      onClick: toggleEdit as () => void,

      variant: "filled",
      color: isProfile ? "var(--fc-neutral-100)" : "var(--fc-brand-700)",
      c: isProfile ? "var(--fc-neutral-900)" : "default",
      radius: "md",
      size: "sm",
      fz: 14,
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      icon: <Icon width='1rem' icon="heroicons-outline:pencil-alt" />,
    },
    {
      label: 'Close',
      type: 'button',
      disabled: false,
      canShow: (isDatabase && isStages && isEdit) as boolean,
      onClick: toggleEdit as () => void,

      variant: "white",
      color: "var(--fc-neutral-100)",
      c: "var(--fc-neutral-900)",
      radius: "md",
      size: "sm",
      fz: 14,
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      // icon: <Icon width='1rem' icon="bi:arrow-right" />,
    },
    {
      label: 'Save',
      type: 'submit',
      disabled: false,
      canShow: (((isDatabase && isGeneral) || isProfile) && isEdit) as boolean,
      onClick: () => { }, // trigger from useform submit

      variant: "filled",
      color: "var(--fc-brand-700)",
      radius: "md",
      size: "sm",
      fz: 14,
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      // icon: <Icon width='1rem' icon="bi:arrow-right" />,
    },
    {
      label: 'Cancel',
      type: 'button',
      disabled: false,
      canShow: (((isDatabase && isGeneral) || isProfile) && isEdit) as boolean,
      onClick: toggleEdit as () => void,

      variant: "white",
      color: "var(--fc-neutral-100)",
      c: "var(--fc-neutral-900)",
      radius: "md",
      size: "sm",
      fz: 14,
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      // icon: <Icon width='1rem' icon="bi:arrow-right" />,
    }
  ] satisfies CustomButtonProps[];

  return (
    <div className={clsx(
      'flex px-14 py-6 items-center border-b',
      isDatabase && isGeneral && 'justify-end'
    )}>
      {isProfile && <h1 className="text-2xl font-semibold mr-auto">Profile Details</h1>}
      {(isDatabase || isProfile) && (
        <>
          {isGeneral || isProfile ? (
            <div className="flex gap-4">
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
          ) : (
            <h1 className="text-2xl font-semibold">Stage Information</h1>
          )}
        </>
      )}
      {!isDatabase && (
        <>
          {isGeneral && <h1 className="text-2xl font-semibold">General Information</h1>}
          {isStages && <h1 className="text-2xl font-semibold">Stage Information</h1>}
        </>
      )}
    </div>
  );
};

export default HeaderForm;
