import * as React from "react";
import clsx from "clsx";
import { BASE_PATH, auth } from "@/auth";
// import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div>{children}</div>
  );
}