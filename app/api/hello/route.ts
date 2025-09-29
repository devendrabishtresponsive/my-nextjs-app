// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const now = new Date().toISOString();
    return NextResponse.json({
        message: "Hello from Vercel serverless function (App Router)!",
        now,
    });
}

export async function POST(request: Request) {
    // echo body
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({
        received: body,
        message: "POST received",
        now: new Date().toISOString(),
    });
}