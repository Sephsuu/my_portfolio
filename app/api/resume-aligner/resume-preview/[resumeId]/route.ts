import { NextRequest, NextResponse } from "next/server";

import {
    getResumeAlignerPayloadMessage,
    getResumeAlignerUrl,
} from "@/lib/http/resume-aligner-server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ resumeId: string }> },
) {
    const { resumeId } = await context.params;
    const version = request.nextUrl.searchParams.get("version");
    const query = version ? `?version=${encodeURIComponent(version)}` : "";

    try {
        const response = await fetch(
            getResumeAlignerUrl(
                `/resume-preview/${encodeURIComponent(resumeId)}${query}`,
            ),
            { headers: { Accept: "text/html" }, cache: "no-store" },
        );

        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            return NextResponse.json(
                {
                    message:
                        getResumeAlignerPayloadMessage(payload) ??
                        "Resume preview unavailable.",
                },
                { status: response.status },
            );
        }

        return new NextResponse(await response.text(), {
            status: response.status,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "no-store",
            },
        });
    } catch {
        return NextResponse.json(
            { message: "Unable to reach the resume preview service." },
            { status: 502 },
        );
    }
}
