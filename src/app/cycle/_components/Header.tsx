'use client';
import { Button, ColorInput, Group, Input, Stack, Switch, Tabs, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import { Icon } from '@iconify-icon/react';
import * as React from 'react'
import { useSideMenu } from "@/hooks/useSideMenu";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

function Header({ darkmode = false, className }: { darkmode?: boolean; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const { layoutColSpan, setLayoutColSpan, sideMenuColSpan, setSideMenuColSpan } = useSideMenu();

  const [activeTab, setActiveTab] = React.useState<string | null>(pathname.split('/')[1] || '/');
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
    <header className={clsx('flex border-b-2 border-[#EBEAEA] items-center col-span-full p-8 gap-4 w-screen', className)}>
      <h1
        className="text-2xl font-bold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#895CF3] dark:hover:text-[#895CF3]"
        onClick={() => router.push("/")}
      >Flowcraft</h1>
      <Tabs
        classNames={{
          root: "mr-auto",
          tab: "!py-[1.6rem] hover:bg-transparent border-b-2 dark:border-white hover:dark:border-white data-[active=true]:border-[#895CF3] data-[active=true]:dark:border-[#895CF3] data-[active=true]:text-[#895CF3] data-[active=true]:border-[#895CF3] data-[active=true]:dark:border-[#895CF3] data-[active=true]:font-semibold",
        }}
        value={activeTab as string}
        onChange={(value) => router.push(`/${value}`)}>
        <Tabs.List>
          <Tabs.Tab value="cycle" >Cycle</Tabs.Tab>
          <Tabs.Tab value="about">About</Tabs.Tab>
          <Tabs.Tab value="documentation">Documentation</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <div className="flex items-center gap-4">
        <Input
          type="search"
          leftSectionPointerEvents="auto"
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")} className="hover:text-[#895CF3] cursor-pointer" />}
          placeholder="Search"
          radius="md"
          classNames={{
            input: '!rounded-lg !border-none p-2 w-96 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent focus:!bg-white transition-all duration-300 ease-in-out !bg-[#F1F4F5]',
          }}
        />
        {darkmode && <Switch
          ref={switchRef}
          classNames={{
            thumb: "cursor-pointer",
            track: "cursor-pointer",
            trackLabel: "text-[#eee83f] dark:text-[#f4f4f4]",
          }}
          onChange={() => toggleColorScheme()}
          size="lg"
          color={isLight ? "cyan" : "dark.4"}
          onLabel={<Icon width={24} icon="line-md:moon-to-sunny-outline-loop-transition" />}
          offLabel={<Icon width={24} icon="line-md:sunny-outline-to-moon-loop-transition" />}
        />}
      </div>
    </header>
  )
}

export default Header