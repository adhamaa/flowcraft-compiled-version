import * as React from "react";
import SideMenus from "../_components/SideMenus/menus";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cycle Info",
  description: "Cycle General Information",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Breadcrumbs route="cycle" />
      <div className="flex h-[calc(100vh-146.5px)]">
        {/* --------- right side collapsable menus ---------- */}
        <SideMenus />
        {/* ----------- left side content */}
        {children}
      </div>
    </>
  );
};

