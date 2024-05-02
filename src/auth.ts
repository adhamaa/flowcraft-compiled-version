import NextAuth, { Account, CredentialsSignin, NextAuthConfig, Profile, Session, User } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { and, db, eq } from "@/db"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes"
import { NextResponse } from "next/server"
import Credentials from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { Adapter, AdapterUser } from "next-auth/adapters"
import { Fernet } from "fernet-nodejs"
import { accounts, sessions, users, verificationTokens } from "./db/schema/users"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

function customAdapter(): Adapter {
  const adapter = DrizzleAdapter(db);

  // Overwrite createUser method on adapter
  adapter.createUser = async (data): Promise<AdapterUser & { password: string | null }> => {
    const id = crypto.randomUUID()
    await db.insert(users).values({ ...data, id })
    return await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then((res) => res[0])
  };

  adapter.getUser = async (data) => {
    const thing =
      (await db
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0])) ?? null

    return thing
  };

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

  adapter.linkAccount = async (rawAccount) => {
    await db.insert(accounts).values(rawAccount)
  }

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

    console.log('dbAccount:', dbAccount)
    if (!dbAccount) {
      return null
    }

    return dbAccount.user
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

  return {
    ...adapter,
  };
}

export const CustomAdapter = customAdapter();

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        userid: { label: "User ID" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('credentials:', credentials)
        const { userid, password } = credentials
        console.log({ userid, password })
        let user = null

        const pwHash = Fernet.encrypt(password as string, process.env.FERNET_KEY as string)

        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        user = {
          id: "1",
          name: credentials.userid as string,
          encrypted_password: pwHash,
          email: ""
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("No user found")
        }

        // return user object with the their profile data
        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    // signIn: "/auth/signin",
  },
  callbacks: {
    // async jwt(params: {
    //   token: JWT;
    //   user: User | AdapterUser;
    //   account: Account | null;
    //   profile?: Profile | undefined;
    //   trigger?: "signIn" | "signUp" | "update" | undefined;
    //   isNewUser?: boolean | undefined;
    //   session?: Session | undefined;
    // }) {
    //   if (params.user) {
    //     params.token.id = params.user.id
    //   }
    //   return params.token
    // },
    // async session(params: {
    //   session: Session & { user: { id: string } };
    //   user: User | AdapterUser;
    // }) {
    //   params.session.user.id = params.user.id as string
    //   return params.session
    // },
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const paths = ["/cycle", "/profile", "/documentation", "/maintenance"];
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
      }

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }


      return true
    },
  },
  session: {
    // strategy: 'database',
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
} satisfies NextAuthConfig

export const { handlers, auth, signOut, signIn } = NextAuth({ adapter: CustomAdapter, ...authConfig })