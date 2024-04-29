import NextAuth, { NextAuthConfig } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes"
import { NextResponse } from "next/server"
import Credentials from "next-auth/providers/credentials"

class InvalidLoginError extends Error {
  code = "Invalid identifier or password"
}

export const authConfig = {
  providers: [
    // GitHub,
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('credentials:', credentials)
        const { username, password } = credentials
        console.log({ username, password })
        let user = null

        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        user = {
          id: "1",
          name: credentials.username as string,
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
  // adapter: DrizzleAdapter(db),
  debug: true,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    // async session({ session, user }) {
    //   session.user.id = user.id
    //   return session
    // },
    authorized({ auth, request }) {
      console.log('auth:', auth)
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
  }
} satisfies NextAuthConfig

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig)