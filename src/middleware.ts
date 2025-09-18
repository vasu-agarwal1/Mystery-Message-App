import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
 

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request})
    const url = request.nextUrl

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if(token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify')
        )
    ){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If user is not authenticated and trying to access protected routes, redirect to sign-in
    if(!token && url.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // Allow all other requests to proceed
    return NextResponse.next()
}
 

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*'
    ]
}