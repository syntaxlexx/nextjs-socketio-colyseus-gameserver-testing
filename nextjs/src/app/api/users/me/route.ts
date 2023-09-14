import { NextResponse } from "next/server"
import { getCookie } from "cookies-next";
import { verifyJWT } from "@/lib/token";

export async function GET(req: Request) {
    const token = getCookie('token', { req })

    try {
        const { id, username } = await verifyJWT<{ id: string, username: string }>(token);

        // get user from DB if you have to

        return NextResponse.json({
            status: "OK",
            data: {
                user: {
                    id,
                    username
                }
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "You are not logged in, please provide to gain access"
        }, {
            status: 401
        })
    }
}