import * as React from "react";
import SideMenus from "../_components/ColapsableMenu/menus";

export default async function Layout({
  children,

}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-[calc(100vh-66px)]">
      {/* --------- right side collapsable menus ---------- */}
      <SideMenus />
      {/* ----------- left side content */}
      {children}
    </div>
  );
};

