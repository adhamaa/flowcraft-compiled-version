'use server';

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function SigninAction(credentials: LoginCredentials, redirectTo?: string) {
  const callbackUrl = await signIn('credentials', {
    email: credentials.email,
    password: credentials.password,
    redirect: false,
    redirectTo,
  });
  redirect(callbackUrl)
}
