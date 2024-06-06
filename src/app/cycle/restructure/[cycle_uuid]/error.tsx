"use client";

import { Button } from "@mantine/core";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grid h-[calc(100vh-66px)] place-items-center p-8">
      <h1 className="font-mono drop-shadow">{error.message}</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}