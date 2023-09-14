import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";

interface AuthenticatedRequest extends NextRequest {
    user: {
        id: string;
        username: string;
    };
}

export async function middleware(req: NextRequest) {
    try {
        let token: string | undefined;

        if (req.cookies.has("token")) {
            token = req.cookies.get("token")?.value;
        } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
            token = req.headers.get("Authorization")?.substring(7);
        }

        if (!token) throw new Error('Token Missing!')

        const response = NextResponse.next();

        const { id, username } = await verifyJWT<{ id: string, username: string }>(token);

        response.headers.set("X-USER-ID", id);
        response.headers.set("X-USER-USERNAME", username);

        (req as AuthenticatedRequest).user = { id, username };

    } catch (err) {
        console.log("err", err);
        req.cookies.delete('token')
        req.cookies.delete('username')

        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: [
        '/private/:path*',
    ],
}
