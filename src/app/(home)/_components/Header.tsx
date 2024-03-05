'use client';
import { Button, ColorInput, Group, Stack, Switch, Tabs, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import { Icon } from '@iconify-icon/react';
import * as React from 'react'

function Header() {
  const [activeTab, setActiveTab] = React.useState<string | null>('cycle');
  const switchRef = React.useRef<HTMLInputElement>(null);
  const { setColorScheme, clearColorScheme, colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const isLight = colorScheme === "light";

  function cn(...classNames: string[]): string {
    return classNames.filter(Boolean).join(' ');
  }

  React.useEffect(() => {
    if (switchRef.current) {
      switchRef.current.checked = isLight;
    }
  }, [isLight]);

  return (
    <header className='flex border-b-2 items-center col-span-full p-4'>
      <h1 className="text-2xl">Flowcraft</h1>
      <Tabs classNames={{
        tab: "py-[1.55rem] hover:bg-transparent border-b-2 dark:border-white hover:dark:border-white data-[active=true]:border-orange-500 data-[active=true]:dark:border-orange-500",
      }} value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="cycle">Cycle</Tabs.Tab>
          <Tabs.Tab value="about">About</Tabs.Tab>
          <Tabs.Tab value="documentaion">Documentation</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {/* <ul className='flex space-x-8 ml-8 mr-auto'>
        <li>
          <h3 className="text-sm">Cycle</h3>
        </li>
        <li>
          <h3 className="text-sm">About</h3>
        </li>
        <li>
          <h3 className="text-sm">Documentation</h3>
        </li>
      </ul> */}
      <Switch
        ref={switchRef}
        classNames={{
          thumb: "cursor-pointer",
          track: "cursor-pointer"
        }}
        onChange={() => toggleColorScheme()}
        size="lg"
        color={isLight ? "cyan" : "dark.4"}
        onLabel={<Icon width={24} icon="line-md:moon-to-sunny-outline-loop-transition" style={{ color: "#eee83f" }} />}
        offLabel={<Icon width={24} icon="line-md:sunny-outline-to-moon-loop-transition" style={{ color: "#f4f4f4" }} />} />
    </header>
  )
}

export default Header