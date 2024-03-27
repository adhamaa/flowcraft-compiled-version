import * as React from "react";
import ColapsableMenu from "./_components/ColapsableMenu";
import HomeContent from "./_components/Content";
import Header from "./_components/Header";
import { useSideMenu } from "@/hooks/useSideMenu";
import clsx from "clsx";
import Shell from "./_components/Shell";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  // const { layoutColSpan } = useSideMenu();

  return (
    <div className={clsx('grid grid-rows-[4rem_auto] h-screen transition-all duration-300 overflow-hidden')}
    // style={{ gridTemplateColumns: `${layoutColSpan}rem auto` }}
    >
      <Header />
      {children}
    </div>
  );
}
