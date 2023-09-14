import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const response = NextResponse.json({ status: "success" }, {
        status: 200,
    });

    await Promise.all([
        response.cookies.set({
            name: "token",
            value: "",
            maxAge: -1,
        }),
        response.cookies.set({
            name: "logged-in",
            value: "",
            maxAge: -1,
        }),
        response.cookies.set({
            name: "username",
            value: "",
            maxAge: -1,
        }),
    ]);

    return response;
}
