'use client';
import { Anchor, Avatar, Menu, Switch, Tabs, useMantineColorScheme } from "@mantine/core";
import { Icon } from '@iconify-icon/react';
import * as React from 'react'
import { useParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useGlobalState } from "@/hooks/useGlobalState";
import { signOut } from "@/app/auth/signout/_action";
import { useSession } from "next-auth/react";
import SpotlightSearch from "@/components/form/SpotlightSearch";

function Header({ darkmode = false, className }: { darkmode?: boolean; className?: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const cycle_id = params.cycle_id;
  const profilePage = pathname.split('/')[1] === 'profile';
  const { setSelectedApp } = useGlobalState();

  const [activeTab, setActiveTab] = React.useReducer((state: any, value: any) => {
    router.push(`/${value}`);
    state = value;
    return state;
  }, "cycle");
  console.log('activeTab:', activeTab)
  const switchRef = React.useRef<HTMLInputElement>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const isLight = colorScheme === "light";

  const profileImg = true;

  React.useEffect(() => {
    if (switchRef.current) {
      switchRef.current.checked = isLight;
    }
  }, [isLight]);

  const menulist = [
    { value: "cycle", label: "Home", disabled: false },
    { value: "maintenance", label: "Maintenance", disabled: true },
    { value: "documentation", label: "Documentation", disabled: false },
    { value: "about", label: "About", disabled: false },
  ]

  return (
    <header className={clsx('flex border-b-2 border-[#EBEAEA] items-center col-span-full p-8 gap-4 w-screen h-[66px] sticky top-0 bg-white z-10', className)}>
      <h1
        className="text-2xl font-bold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#895CF3] dark:hover:text-[#895CF3]"
        onClick={() => {
          setSelectedApp('');
          router.push("/")
        }}
      >Flowcraft</h1>
      <Tabs
        classNames={{
          root: "mr-auto",
          tab: "!py-[1.6rem] hover:bg-transparent border-b-2 dark:border-white hover:dark:border-white data-[active=true]:border-[#895CF3] data-[active=true]:dark:border-[#895CF3] data-[active=true]:text-[#895CF3] data-[active=true]:border-[#895CF3] data-[active=true]:dark:border-[#895CF3] data-[active=true]:font-semibold",
        }}
        value={!cycle_id ? activeTab as string: "none"}
        onChange={setActiveTab}
      >
        <Tabs.List>
          {menulist.map((tab) => ["Documentation"].includes(tab.label) ? (
            <Menu
              key={tab.value}
              shadow="md"
              width={200}
              trigger="click-hover"
            >
              <Menu.Target>
                <Tabs.Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
                  {tab.label}
                </Tabs.Tab>
              </Menu.Target>
              <Menu.Dropdown>
                {[{
                  label: "White Paper",
                  value: "white-paper",
                  disabled: false,
                  onClick: () => window.open("/pdf/BizProcessWhitePaper.pdf", "_blank")
                }].map(({ label, value, disabled, onClick }) =>
                  <Menu.Item
                    key={value}
                    component="button"
                    onClick={onClick}
                    disabled={disabled}
                    value={value}
                  >
                    {label}
                  </Menu.Item>)}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Tabs.Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <div className="flex items-center gap-4">
        <Anchor
          component="button"
          disabled
          // href="#"
          // target="_blank"
          onClick={() => console.log("clicked")}
          underline="hover"
          c="#895CF3"
          className="disabled:cursor-default disabled:!no-underline disabled:opacity-50 hover:text-[#895CF3] dark:hover:text-[#895CF3] transition-all duration-300 ease-in-out"
        >
          How To Use?
        </Anchor>
        <SpotlightSearch />
        <Menu
          shadow="md"
          width={200}
          trigger="click-hover"
        >
          <Menu.Target>
            <Anchor
              component="button"
              // disabled
              // href="#"
              // target="_blank"
              onClick={() => router.push("/profile")}
              underline="hover"
              c="#895CF3"
              className="disabled:cursor-default disabled:!no-underline disabled:opacity-50 hover:text-[#895CF3] dark:hover:text-[#895CF3] transition-all duration-300 ease-in-out"
            >
              {profileImg ?
                <Avatar classNames={{ root: profilePage ? 'border-2 border-[#9747FF]/100 drop-shadow-[0_0_3px_#9747FF]' : '' }} src={session?.user?.image} alt="it's me" />
                :
                <Avatar classNames={{ root: profilePage ? 'border-2 border-[#9747FF]/100 drop-shadow-[0_0_3px_#9747FF]' : '' }} color="#895CF3" radius="xl">AA</Avatar>
              }
            </Anchor>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label><span className="text-[0.6rem]">{session?.user?.name}</span></Menu.Label>
            <Menu.Item
              component="button"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              Log out
            </Menu.Item>
            {/* <Menu.Divider /> */}
            {/* <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
              >
                Delete my account
              </Menu.Item> */}
          </Menu.Dropdown>
        </Menu>
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
    </header >

  )
}

export default Header