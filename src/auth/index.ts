import NextAuth, { Account, CredentialsSignin, NextAuthConfig, Profile, Session, User } from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "../routes"
import { NextResponse } from "next/server"
import Credentials from "next-auth/providers/credentials"
import { JWT, encode } from "next-auth/jwt"
import { CustomAdapter } from "@/db/Adapter"
import { ZodError } from "zod"
import { Fernet } from "fernet-nodejs"
import { loginSchema } from "../lib/validation"
import { DrizzleError } from "drizzle-orm"
import { AdapterUser } from "next-auth/adapters"
import { randomUUID } from "crypto"

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

export const BASE_PATH = '/api/auth'

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        identifier: {
          label: 'Email',
          type: 'email',
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = await loginSchema.parseAsync(credentials);

          const { email, password } = result;

          const user = await CustomAdapter.getUserByEmail?.(email as string)

          if (!user) {
            throw new InvalidLoginError("User account does not exist");
          }

          const passwordDB = Fernet.decrypt(user.password, process.env.FERNET_KEY as string)

          const passwordsMatch = password === passwordDB;

          if (!passwordsMatch) {
            throw new InvalidLoginError("Password is not correct");
          }

          return user;
        } catch (error) {
          if (
            error instanceof DrizzleError
          ) {
            throw new InvalidLoginError(
              "System error. Please contact support"
            );
          }

          if (error instanceof ZodError) {
            throw new InvalidLoginError(error.errors[0].message);
          }

          throw error;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt(params: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: "signIn" | "signUp" | "update" | undefined;
      isNewUser?: boolean | undefined;
      session?: Session | undefined;
    }) {
      if (params.account?.provider === "credentials") {
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
        const sessionToken = randomUUID();

        const session = await CustomAdapter.createSession!({
          userId: params.user.id!,
          sessionToken,
          expires,
        });

        params.token.sessionId = session.sessionToken;
      }

      return params.token;
    },
    // async session(params: {
    //   session: Session & { user: { id: string } };
    //   user: User | AdapterUser;
    // }) {
    //   params.session.user = params.user as AdapterUser;
    //   // params.session.user.id = params.user.id as string
    //   return params.session
    // },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      const isRelativeUrl = url.startsWith("/");
      if (isRelativeUrl) {
        return `${baseUrl}${url}`;
      }

      const isSameOriginUrl = new URL(url).origin === baseUrl;
      const alreadyRedirected = url.includes('callbackUrl=')
      if (isSameOriginUrl && alreadyRedirected) {
        const originalCallbackUrl = decodeURIComponent(url.split('callbackUrl=')[1]);

        return originalCallbackUrl;
      }

      if (isSameOriginUrl) {
        return url;
      }

      return baseUrl;
    },
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const paths = [
        ...(process.env.WITH_AUTH === 'true' ? ["/cycle"] : []),
        "/profile",
        "/documentation",
        "/maintenance"
      ];
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
      }

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL(`${BASE_PATH}/signin`, nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }

      return true
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    // async encode(arg) {
    //   return (arg.token?.sessionId as string) ?? encode(arg);
    // },
  },
  events: {
    async signOut(message) {
      if ("session" in message && message.session?.sessionToken) {
        await CustomAdapter.deleteSession!(message.session.sessionToken);
      }
    },
  },
  trustHost: true,
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  basePath: BASE_PATH,
} satisfies NextAuthConfig

export const { handlers, auth, signOut, signIn } = NextAuth({ adapter: CustomAdapter, ...authConfig })

// extend nextauth types
declare module "next-auth" {
  interface Session {
    sessionId: string;
  }

  interface User {
    password: string;
  }
}