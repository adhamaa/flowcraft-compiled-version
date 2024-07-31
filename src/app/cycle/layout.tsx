import * as React from "react";
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
      <div className="flex h-full w-full">
        {children}
      </div>
    </SessionProvider>
  );
}
