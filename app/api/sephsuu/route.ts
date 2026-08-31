import { NextRequest, NextResponse } from "next/server";

import {
    RequestServerError,
    requestServerData,
} from "@/lib/http/request-server";
import type { SephsuuRequest } from "@/service/sephsuu.service";

const API_BASE_URL = (
    process.env.SEPHSUU_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "https://papiverse-chatbot.onrender.com"
).replace(/\/$/, "");

export async function POST(request: NextRequest) {
    const payload = await request.json().catch(() => null);
    const userInput =
        payload && typeof payload === "object" && "user_input" in payload
            ? payload.user_input
            : null;

    if (typeof userInput !== "string" || !userInput.trim()) {
        return NextResponse.json(
            { message: "A non-empty user_input value is required." },
            { status: 400 }
        );
    }

    const requestBody: SephsuuRequest = {
        user_input: userInput.trim(),
    };

    try {
        const response = await requestServerData(
            `${API_BASE_URL}/sephsuu`,
            "POST",
            undefined,
            requestBody
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        if (error instanceof RequestServerError) {
            return NextResponse.json(
                {
                    message: error.message,
                    details: error.payload,
                },
                { status: error.status }
            );
        }

        return NextResponse.json(
            { message: "Unable to reach the Sephsuu assistant." },
            { status: 502 }
        );
    }
}
