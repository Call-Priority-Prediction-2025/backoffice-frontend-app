import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { verifyToken } from "./app/services/auth-service";

const SECRET_KEY = process.env.SECRET_KEY;

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");

    if (token && request.nextUrl.pathname == "/auth/sign-in") {
        return NextResponse.redirect(new URL('/dashboard/prediction', request.url))
    }

    if (!token && request.nextUrl.pathname !== "/auth/sign-in") {
        const loginUrl = new URL("/auth/sign-in", request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Verifikasi token dengan fetch ke server
    // if (token && token.value) {
    //     try {
    //         const response = await verifyToken(token.value);

    //         // Token valid, lanjutkan permintaan
    //         return NextResponse.next();
    //     } catch (error) {
    //         // Jika token tidak valid, hapus token dari cookies, dan redirect ke halaman login
    //         const loginUrl = new URL("/auth/sign-in", request.url);
    //         const response = NextResponse.redirect(loginUrl);
    //         response.cookies.delete("token");

    //         // Menampilkan alert swal di frontend dengan menambahkan header khusus
    //         response.headers.set("X-Invalid-Token", "true");
    //         return response;
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/sign-in"],
}