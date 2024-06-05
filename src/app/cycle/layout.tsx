import * as React from "react";
import Header from "./_components/Header";
import clsx from "clsx";
import { BASE_PATH, auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cycle",
  description: "Business Process Cycle",
};

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <div className="flex h-[calc(100vh-66px)]">
        <div className={clsx('grid grid-rows-[4rem_auto] h-screen transition-all duration-300 overflow-hidden')}
        >
          <Header />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
