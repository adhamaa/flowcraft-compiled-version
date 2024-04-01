import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('pathname:', pathname)

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/cycle', request.url))
  }

  return NextResponse.next()
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}