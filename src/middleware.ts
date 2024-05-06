// import { auth as middleware } from 'auth'
import NextAuth from 'next-auth';
import { authConfig } from '@/auth';

// const auth = NextAuth(authConfig).auth;
export default NextAuth(authConfig).auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.png).*)"],
}

