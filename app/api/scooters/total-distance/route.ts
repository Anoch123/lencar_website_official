import { NextResponse } from "next/server";

const TARGET = "https://slm-dashboard.vercel.app/api/scooters/total-distance";

export async function GET() {
    try {
        const res = await fetch(TARGET);
        if (!res.ok) {
            return NextResponse.json(
                { message: `Upstream responded with ${res.status}` },
                { status: 502 }
            );
        }
        const data = await res.json();
        return NextResponse.json(data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch {
        return NextResponse.json(
            { message: "Failed to fetch distance data" },
            { status: 502 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
