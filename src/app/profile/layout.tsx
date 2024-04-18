import * as React from "react";
import clsx from "clsx";
import Header from "../cycle/_components/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className={clsx('grid grid-rows-[4rem_auto] h-screen transition-all duration-300 overflow-hidden')}
    >
      <Header />
      {children}
    </div>
  );
}