import { signJWT } from '@/lib/token';
import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';

export async function POST(req: Request) {
    const body = await req.json()
    const { username, password } = body

    const JWT_EXPIRES_IN = "1"; // hours

    try {
        const token = await signJWT(
            { id: createId(), username, },
            { exp: `${JWT_EXPIRES_IN}h` }
        );

        const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60 * 60;

        const cookieOptions = {
            name: "token",
            value: token,
            httpOnly: true, // can not be accessed by JavaScript
            path: "/",
            secure: process.env.NODE_ENV !== "development",
            maxAge: tokenMaxAge,
        };

        const response = NextResponse.json(
            {
                status: "success",
                token,
            },
            {
                status: 200,
            }
        );

        await Promise.all([
            response.cookies.set(cookieOptions),
            response.cookies.set({
                name: "logged-in",
                value: "true",
                maxAge: tokenMaxAge,
            }),
            response.cookies.set({
                name: "username",
                value: username,
                maxAge: tokenMaxAge,
            }),
        ]);

        return response;

    } catch (error) {
        console.log("error", error);

        return NextResponse.json({
            message: "Failed to log in"
        }, {
            status: 500
        })
    }
}
