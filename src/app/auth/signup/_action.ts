'use server';

import { db, sql } from "@/db";
import { CustomAdapter } from "@/db/Adapter";
import { accounts, users } from "@/db/schema/users";
import { registerSchema } from "@/lib/validation";
import { Fernet } from "fernet-nodejs";
import { AdapterUser } from "next-auth/adapters";

export type SignupCredentials = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type CustomUser = AdapterUser & {
  password: string;
  encrypted_password: string;
};

type SiggnupReturnType = {
  result: 'success' | 'error';
  data?: CustomUser;
  message: string;
};

export async function SignupAction(credentials: SignupCredentials): Promise<SiggnupReturnType> {

  const result = await registerSchema.safeParseAsync(credentials);
  if (!result.success) {
    throw new Error('Invalid data');
  }

  const { username, email, password } = result.data;

  // check if user exists
  const user = await CustomAdapter.getUserByEmail?.(email as string);
  if (user) {
    throw new Error('User already exist with this email');
  }

  const encryptedPassword = Fernet.encrypt(password as string, process.env.FERNET_KEY as string)

  // create user and account with transaction
  const response = await db.transaction(async (trx) => {
    const user = await trx.insert(users).values({
      name: username,
      email,
      password: encryptedPassword,
    }).execute();

    const [{ id }] = await trx.select({ id: users.id }).from(users).where(sql`${users.email} = ${email}`).execute();

    const account = await trx.insert(accounts).values({
      userId: id as unknown as string,
      type: 'email',
      provider: 'credentials',
      providerAccountId: id as unknown as string,
    }).execute();

  }).then(() => ({
    result: 'success',
    message: 'User created',
  }));

  return response as unknown as SiggnupReturnType;

  // throw new Error('Error creating user');
}
