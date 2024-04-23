'use server';

import { revalidateTag } from "next/cache";

export const clientRevalidateTag = (tag: string) => {
  revalidateTag(tag);
}