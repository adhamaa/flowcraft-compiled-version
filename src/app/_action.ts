'use server';

import { signOut, signIn } from "@/auth";

export async function bypassSignout() {
  await signOut({
    redirectTo: "/auth/signin"
  })
}

export async function bypassSignin(formData: FormData) {
  await signIn("credentials", formData)
}