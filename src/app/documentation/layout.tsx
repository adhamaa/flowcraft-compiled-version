import * as React from "react";
import clsx from "clsx";
import Header from "../cycle/_components/Header";
import { BASE_PATH, auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <div className={clsx('grid grid-rows-[4rem_auto] h-screen transition-all duration-300 overflow-hidden')}
      >
        <Header />
        <Breadcrumbs />
        {children}
      </div>
    </SessionProvider>
  );
}