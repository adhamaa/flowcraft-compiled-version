import * as React from "react";
import { Metadata } from "next";
import SideMenus from "../_components/SideMenus/menus";
import TitleSection from "@/components/TitleSection";



export const metadata: Metadata = {
  title: "Manage Account",
  description: "Account management",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[calc(100vh-146.5px)] overflow-hidden">
      <TitleSection title='Manage Account' className='h-max w-full border-b-2 border-[var(--fc-border-gray)]' />
      <div className='flex w-full h-full font-notoSans'>
        <SideMenus />
        {children}
      </div>
    </div>
  );
};

