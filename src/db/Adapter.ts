import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { and, db, eq } from ".";
import { accounts, sessions, users, verificationTokens } from "./schema/users";

function customAdapter(): Adapter {
  const adapter = DrizzleAdapter(db);

  // Overwrite createUser method on adapter
  adapter.createUser = async (data): Promise<AdapterUser & { password: string | null }> => {
    const id = crypto.randomUUID()
    await db.insert(users).values({ ...data, id })
    // @ts-ignore
    return await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then((res) => res[0])
  };
  // @ts-ignore
  adapter.getUser = async (data) => {
    const thing =
      (await db
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0])) ?? null

    return thing
  };
  // @ts-ignore
  adapter.getUserByEmail = async (data) => {
    const user =
      (await db
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0])) ?? null

    return user
  };

  adapter.createSession = async (data) => {
    await db.insert(sessions).values(data)

    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, data.sessionToken))
      .then((res) => res[0])
  };
  // @ts-ignore
  adapter.getSessionAndUser = async (data) => {
    const sessionAndUser =
      (await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0])) ?? null

    return sessionAndUser
  };
  // @ts-ignore
  adapter.updateUser = async (data) => {
    if (!data.id) {
      throw new Error("No user id.")
    }

    await db.update(users).set(data).where(eq(users.id, data.id))

    return await db
      .select()
      .from(users)
      .where(eq(users.id, data.id))
      .then((res) => res[0])
  };

  adapter.updateSession = async (data) => {
    await db
      .update(sessions)
      .set(data)
      .where(eq(sessions.sessionToken, data.sessionToken))

    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, data.sessionToken))
      .then((res) => res[0])
  };

  // @ts-ignore
  // create an update for account login_count by userId
  adapter.updateAccountLoginCount = async (userId) => {
    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .then((res) => res[0] ?? null)

    if (!account) {
      return null
    }

    await db
      .update(accounts)
      .set({ login_count: account.login_count as number + 1 })
      .where(eq(accounts.userId, userId))

    return await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .then((res) => res[0])
  };


  adapter.linkAccount = async (rawAccount) => {
    await db.insert(accounts).values(rawAccount)
  }
  // @ts-ignore
  adapter.getUserByAccount = async (account) => {
    const dbAccount =
      (await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .leftJoin(users, eq(accounts.userId, users.id))
        .then((res) => res[0])) ?? null

    if (!dbAccount) {
      return null
    }

    return { ...dbAccount.tbl_fc_user, login_count: dbAccount.tbl_fc_account.login_count }
  };

  adapter.deleteSession = async (sessionToken) => {
    const session =
      (await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .then((res) => res[0])) ?? null

    await db
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken))

    return session
  };

  // @ts-ignore
  adapter.createVerificationToken = async (token) => {
    await db.insert(verificationTokens).values(token)

    return await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.identifier, token.identifier))
      .then((res) => res[0])
  };

  adapter.useVerificationToken = async (token) => {
    try {
      const deletedToken =
        (await db
          .select()
          .from(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          )
          .then((res) => res[0])) ?? null

      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, token.identifier),
            eq(verificationTokens.token, token.token)
          )
        )

      return deletedToken
    } catch (err) {
      throw new Error("No verification token found.")
    }
  };
  // @ts-ignore
  adapter.deleteUser = async (id) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then((res) => res[0] ?? null)

    await db.delete(users).where(eq(users.id, id))

    return user
  };

  adapter.unlinkAccount = async (account) => {
    await db
      .delete(accounts)
      .where(
        and(
          eq(accounts.providerAccountId, account.providerAccountId),
          eq(accounts.provider, account.provider)
        )
      )

    return undefined
  };
  // @ts-ignore
  return {
    ...adapter,
  };
}

export const CustomAdapter = customAdapter();