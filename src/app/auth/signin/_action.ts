'use server';

import { signIn as nasignIn } from "@/auth";
import { redirect } from "next/navigation";

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function signIn(credentials: LoginCredentials, redirectTo?: string) {
  const callbackUrl = await nasignIn('credentials', {
    email: credentials.email,
    password: credentials.password,
    redirect: false,
    redirectTo,
  });
  redirect(callbackUrl)
}
