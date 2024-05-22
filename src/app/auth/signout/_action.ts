'use server';

import { signOut as nasignout } from "@/auth";
import { revalidatePath } from "next/cache";

export async function signOut({
  redirect,
  redirectTo,
}: {
  redirect?: boolean;
  redirectTo?: string;
} = {
  }) {
  await nasignout({
    redirect: redirect,
    redirectTo: redirectTo,
  });
  // revalidatePath("/")
}
