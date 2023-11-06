import { NextResponse } from 'next/server'



export function middleware(request) {

    const path = request.nextUrl.pathname;

    const isPunlicPath = path === '/login' || path === '/';
    const token = request.cookies.get('token')?.value || '';
    const isAdmin = token.admin; // Assuming you have isAdmin as a Boolean in the decoded token

    if(isAdmin === true){

        if (isPunlicPath && token) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    } else {

        if (isPunlicPath && token) {
            return NextResponse.redirect(new URL('/user', request.url))
        }
    }
    

    if (!isPunlicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/admin',
        '/user',
    ]

}