'use client';

import * as React from "react";
import { Icon } from "@iconify-icon/react";
import { ActionIcon, Button, Menu, MenuDivider, MenuDropdown, MenuItem, MenuLabel, MenuTarget, rem } from "@mantine/core";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

const TitleSection = ({ title, multiple = false, className }: { title: string | string[]; multiple?: boolean; className?: string; }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isManageClaim = pathname === '/manage-claim';
  const isCycle = pathname === '/cycle';

  const initialTitle = multiple ? isManageClaim ? 'Claim Management' : isCycle ? 'Business Process' : undefined : title;

  const [opened, setOpened] = React.useState(false);
  // handle selected item in dropdown menu 
  // with useReducer to simplify the logic
  const [selected, setSelected] = React.useReducer((state: string, current: React.MouseEvent<HTMLDivElement> & { target: { textContent: string; }; }) => {
    const title = current.target.textContent;
    state = title;
    return state;
  }, initialTitle as string); // initial value

  if (multiple && !Array.isArray(title)) {
    throw new Error('"title" props should be an array when "multiple" props is true');
  }

  return (
    <section className={clsx('flex items-center px-20 py-10', className)}>
      {!multiple && <h1 className='font-semibold text-xl'>{selected}</h1>}
      <Menu
        opened={opened}
        onChange={setOpened}
        shadow="md"
        width="target" >
        {multiple && <MenuTarget>
          <span className="flex items-center space-x-4 min-w-60">
            <h1 className='font-semibold text-xl'>{selected}</h1>
            <ActionIcon
              variant="transparent"
              color="black"
              size="lg"
              radius="md"
              aria-label="Home Selection"
              ml="auto"
              onClick={() => setOpened((o) => !o)}
            >
              <Icon
                icon="heroicons:chevron-down"
                width="2rem"
                rotate={opened ? 90 : 0}
              />
            </ActionIcon>
          </span>
        </MenuTarget>}

        <MenuDropdown onClick={setSelected}>
          {multiple && (title as string[]).map((t, i) => (
            <MenuItem
              key={i}
              onClick={() => router.push(
                t === 'Claim Management' ? '/manage-claim' : '/cycle'
              )}
            >
              {t}
            </MenuItem>
          ))}
        </MenuDropdown>
      </Menu>


      {title === 'Business Process' && <Button
        disabled
        variant='filled'
        color='var(--fc-neutral-100)'
        c='var(--fc-neutral-900)'
        radius='md'
        size="sm"
        fz={14}
        ml='auto'
        leftSection={
          < Icon className='cursor-pointer rounded' icon="heroicons-outline:plus-circle" width="1rem" height="1rem" />
        }
        // onClick={onClick}
        classNames={{
          root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
        }}
      >
        Add Business Process
      </Button>}
    </section>
  )
};

export default TitleSection;