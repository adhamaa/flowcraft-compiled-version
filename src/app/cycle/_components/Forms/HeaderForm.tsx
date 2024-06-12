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
  type: 'stages' | 'general';
  toggleExpand: () => void;
  toggleEdit?: () => void;
  isEdit?: boolean;
  isFullscreen?: boolean;
}) => {
  const searchParams = useSearchParams();
  const datasource_type = searchParams.get('data_source') as DatasourceType;
  const canDisplay = datasource_type === 'database';

  if (!type) throw new Error('type is required');

  const buttons = [
    {
      label: 'Duplicate',
      type: 'button',
      disabled: type === 'stages' && !isEdit,
      canShow: canDisplay && type === 'stages' && !isEdit,
      onClick: () => { },

      variant: "filled",
      color: "#F1F5F9",
      c: "#0F172A",
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
      canShow: canDisplay && !isEdit,
      onClick: () => { },

      variant: "filled",
      color: "#F1F5F9",
      c: "#0F172A",
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
      canShow: canDisplay && !isEdit,
      onClick: toggleEdit as () => void,

      variant: "filled",
      color: "#895CF3",
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
      canShow: (canDisplay && type === 'stages' && isEdit) as boolean,
      onClick: toggleEdit as () => void,

      variant: "white",
      color: "#F1F5F9",
      c: "#0F172A",
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
      canShow: (canDisplay && type === 'general' && isEdit) as boolean,
      onClick: () => { },

      variant: "filled",
      color: "#895CF3",
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
      canShow: (canDisplay && type === 'general' && isEdit) as boolean,
      onClick: toggleEdit as () => void,

      variant: "white",
      color: "#F1F5F9",
      c: "#0F172A",
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
      canDisplay && type === 'general' && 'justify-end'
    )}>
      {canDisplay && (
        <>
          {type === 'general' ? (
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
      {!canDisplay && (
        <>
          {type === 'general' && <h1 className="text-2xl font-semibold">General Information</h1>}
          {type === 'stages' && <h1 className="text-2xl font-semibold">Stage Information</h1>}
        </>
      )}
    </div>
  );
};

export default HeaderForm;
