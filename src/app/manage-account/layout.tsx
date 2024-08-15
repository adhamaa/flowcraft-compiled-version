import * as React from "react";
import { BASE_PATH, auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex h-full">
      {children}
    </div>
  );
}