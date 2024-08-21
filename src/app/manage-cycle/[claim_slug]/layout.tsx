import * as React from "react";
import { Metadata } from "next";
import SideMenus from "./_components/SideMenus/menus";


export const metadata: Metadata = {
  title: "Manage claim",
  description: "cycle management",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-[calc(100vh-146.5px)] w-full overflow-hidden">
      <SideMenus />
      {children}
    </div>
  );
};

