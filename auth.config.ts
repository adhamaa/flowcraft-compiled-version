import GitHub from "next-auth/providers/github"
import type { Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin, type NextAuthConfig } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { ZodError } from "zod"
import { signInSchema } from "@/lib/zod"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      username: { label: "Username" },
      password: { label: "Password", type: "password" },
    },
    // async authorize({ request }: { request: { username: string, password: string } }) {
    //   const response = await fetch(request)
    //   if (!response.ok) return null
    //   return (await response.json()) ?? null
    // },
    // async authorize(credentials) {
    //   throw new InvalidLoginError()
    // },
    authorize: async (credentials: {
      username: string;
      password: string;
    }) => {
      return {
        id: 1,
        name: credentials.username,
        password: credentials.password,
        email: "test@test.com",
      }
      // try {
      //   // let user = null

      //   // const { email, password } = await signInSchema.parseAsync(credentials)

      //   // // logic to salt and hash password
      //   // const pwHash = saltAndHashPassword(password)

      //   // // logic to verify if user exists
      //   // user = await getUserFromDb(email, pwHash)

      //   // if (!user) {
      //   //   throw new Error("User not found.")
      //   // }

      //   // return json object with the user data
      //   return {
      //     id: 1,
      //     name: "Test User",
      //     email: "test@test.com",
      //   }

      // } catch (error) {
      //   if (error instanceof ZodError) {
      //     // Return `null` to indicate that the credentials are invalid
      //     return null
      //   }
      // }
    },
  } as never),
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export default {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  // adapter: DrizzleAdapter(db),
  providers,
  pages: {
    // signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const paths = ["/cycle", "/profile"]
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }

      return true
    },
  },
} satisfies NextAuthConfig