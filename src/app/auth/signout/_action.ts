'use server';

import { signOut as nasignout } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut(redirectTo?: string) {
  await nasignout({
    // redirect: false,
    // redirectTo,
  });
  // redirect(redirectTo || "/")
  revalidatePath("/")
}
