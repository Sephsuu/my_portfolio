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
                `/resume/${encodeURIComponent(resumeId)}/pdf${query}`,
            ),
            { headers: { Accept: "application/pdf" }, cache: "no-store" },
        );

        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            return NextResponse.json(
                {
                    message:
                        getResumeAlignerPayloadMessage(payload) ??
                        "Resume PDF unavailable.",
                },
                { status: response.status },
            );
        }

        return new NextResponse(response.body, {
            status: response.status,
            headers: {
                "Content-Type":
                    response.headers.get("Content-Type") ?? "application/pdf",
                "Content-Disposition":
                    response.headers.get("Content-Disposition") ??
                    `attachment; filename="aligned-resume-${resumeId}.pdf"`,
                "Cache-Control": "no-store",
            },
        });
    } catch {
        return NextResponse.json(
            { message: "Unable to reach the resume PDF service." },
            { status: 502 },
        );
    }
}
