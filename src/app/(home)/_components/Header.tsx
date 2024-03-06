'use client';
import { Button, ColorInput, Group, Stack, Switch, Tabs, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import { Icon } from '@iconify-icon/react';
import * as React from 'react'
import { useSideMenu } from "@/hooks/useSideMenu";

function Header() {
  const { layoutColSpan, setLayoutColSpan, sideMenuColSpan, setSideMenuColSpan } = useSideMenu();

  const [activeTab, setActiveTab] = React.useState<string | null>('cycle');
  const switchRef = React.useRef<HTMLInputElement>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const isLight = colorScheme === "light";

  const toggleSideMenu = () => {
    setLayoutColSpan(layoutColSpan === 0 ? 10 : 0)
    setSideMenuColSpan(sideMenuColSpan === 0 ? 1 : 0)
  };

  React.useEffect(() => {
    if (switchRef.current) {
      switchRef.current.checked = isLight;
    }
  }, [isLight]);

  return (
    <header className='flex border-b-2 items-center col-span-full p-4'>
      <h1 className="text-2xl">Flowcraft</h1>
      <Tabs classNames={{
        // root: "mr-auto",
        tab: "py-[1.55rem] hover:bg-transparent border-b-2 dark:border-white hover:dark:border-white data-[active=true]:border-[#9747FF] data-[active=true]:dark:border-[#9747FF]",
        tabLabel: "text-[#9747FF]",
      }} value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="cycle">Cycle</Tabs.Tab>
          <Tabs.Tab value="about">About</Tabs.Tab>
          <Tabs.Tab value="documentaion">Documentation</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-10 hover:bg-blue-700 mr-auto"
        onClick={toggleSideMenu}
      >
        {layoutColSpan !== 20 ? ">" : "<"}
      </button>
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