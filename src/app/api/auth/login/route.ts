import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // In a real app, verify credentials with Prisma

    const response = NextResponse.json({ success: true, user: { id: 'user_123', email: body.email } })

    // Set a session cookie for 7 days
    response.cookies.set({
      name: 'session',
      value: 'prototype-session-token',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (_error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
