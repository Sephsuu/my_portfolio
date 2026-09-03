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
        const response = await requestServerData<string>(
            getResumeAlignerUrl(
                `/resume-preview/${encodeURIComponent(resumeId)}${query}`,
            ),
            "GET",
            { Accept: "text/html" },
            undefined,
            { responseType: "text", cache: "no-store" },
        );

        return new NextResponse(response.data, {
            status: response.status,
            headers: {
                "Content-Type":
                    response.headers.get("Content-Type") ??
                    "text/html; charset=utf-8",
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
            { message: "Unable to reach the resume preview service." },
            { status: 502 },
        );
    }
}
