import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
 
    const token: any = request.cookies.get("token")?.value;
    const tokenDecode: any = token ? jwtDecode(token) : null;
    const now = new Date();
    const nowUnix = Math.floor(now.getTime() / 1000);

    // Redirect login
    if (!token || nowUnix > tokenDecode?.exp) {
        let response = NextResponse.redirect(new URL('/', request.url));
        // Eliminar cookies del navegador 
        response.cookies.delete("isAuth");
        response.cookies.delete("user");
        response.cookies.delete("token");
        
        return response;
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/dashboard/:path*'
    ]
}