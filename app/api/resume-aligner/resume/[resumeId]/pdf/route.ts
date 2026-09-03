import { NextRequest, NextResponse } from "next/server";

import {
    getResumeAlignerErrorMessage,
    getResumeAlignerUrl,
} from "@/lib/http/resume-aligner-server";
import {
    RequestServerError,
    requestServerData,
} from "@/lib/http/request-server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ resumeId: string }> },
) {
    const { resumeId } = await context.params;
    const version = request.nextUrl.searchParams.get("version");
    const query = version ? `?version=${encodeURIComponent(version)}` : "";

    try {
        const response = await requestServerData<ArrayBuffer>(
            getResumeAlignerUrl(
                `/resume/${encodeURIComponent(resumeId)}/pdf${query}`,
            ),
            "GET",
            { Accept: "application/pdf" },
            undefined,
            { responseType: "arrayBuffer", cache: "no-store" },
        );

        return new NextResponse(response.data, {
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
    } catch (error) {
        if (error instanceof RequestServerError) {
            return NextResponse.json(
                {
                    message: getResumeAlignerErrorMessage(error),
                    details: error.payload,
                },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: "Unable to reach the resume PDF service." },
            { status: 502 },
        );
    }
}
