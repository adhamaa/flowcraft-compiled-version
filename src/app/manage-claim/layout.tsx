import * as React from "react";
import clsx from "clsx";
import { BASE_PATH, auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Management",
  description: "Manage Claims",
};

export default async function Layout({
  children
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
