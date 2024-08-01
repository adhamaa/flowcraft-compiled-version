"use server";

import { revalidatePath } from "next/cache";

export const revalidateCustomPath = (path: string, type?: 'layout' | 'page'): void => revalidatePath(path, type);

