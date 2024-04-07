import * as React from "react";
import clsx from "clsx";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      {children}
    </div>
  );
}
