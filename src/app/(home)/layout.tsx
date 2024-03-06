'use client';
import * as React from "react";
import ColapsableMenu from "./_components/ColapsableMenu";
import HomeContent from "./_components/Content";
import Header from "./_components/Header";
import { useSideMenu } from "@/hooks/useSideMenu";

function Layout() {
  const { layoutColSpan } = useSideMenu();

  return (
    <div className='grid grid-rows-[4rem_auto] h-screen transition-all duration-300'
      style={{ gridTemplateColumns: `${layoutColSpan}rem auto` }}
    >
      <Header />
      <ColapsableMenu />
      <HomeContent />
    </div>
  );
}

export default Layout;