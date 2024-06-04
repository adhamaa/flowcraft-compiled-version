import * as React from "react";
import SideMenus from "../_components/ColapsableMenu/menus";
import { Apps_label, Datasource_type } from "@/lib/service/client";

export default async function Layout({
  children,
  // params: { cycle_id },
  // searchParams: {
  //   selected_app,
  //   data_source
  // }
}: {
  children: React.ReactNode;
  // params: { cycle_id: string },
  // searchParams: {
  //   selected_app: Apps_label;
  //   data_source: Datasource_type;
  // }
}) {
  // console.log('cycle_id:', cycle_id)
  // console.log('selected_app:', selected_app)
  // console.log('data_source:', data_source)

  return (
    <div className="flex h-[calc(100vh-66px)]">
      {/* --------- right side collapsable menus ---------- */}
      <SideMenus />
      {/* ----------- left side content */}
      {children}
    </div>
  );
};

