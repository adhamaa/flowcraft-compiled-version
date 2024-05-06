import * as React from "react";
import clsx from "clsx";
import Header from "../cycle/_components/Header";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <div className={clsx('grid grid-rows-[4rem_auto] h-screen transition-all duration-300 overflow-hidden')}
    >
      <Header {...{ session }} />
      {children}
    </div>
  );
}