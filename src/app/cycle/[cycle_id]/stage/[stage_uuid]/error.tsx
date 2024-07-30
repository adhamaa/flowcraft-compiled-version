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
    <div className="grid h-full place-items-center p-8">
      <h1 className="font-mono drop-shadow">{error.message}</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}