import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes: everything in (dashboard)
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/wallets') ||
    pathname.startsWith('/send-payment') ||
    pathname.startsWith('/fx-convert') ||
    pathname.startsWith('/liquidity') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/transactions') ||
    pathname.startsWith('/payouts') ||
    pathname.startsWith('/reconciliation') ||
    pathname.startsWith('/compliance') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/api-access')

  const session = request.cookies.get('session')?.value

  if (isProtectedRoute && !session) {
    // Redirect unauthorized users to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
