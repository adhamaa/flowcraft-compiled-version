import { auth as middleware } from 'auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default middleware((request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/cycle', request.url))
  }

  return NextResponse.next()
})


// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}