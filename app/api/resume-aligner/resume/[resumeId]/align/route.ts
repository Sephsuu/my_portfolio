import { NextRequest, NextResponse } from "next/server";

import {
    getResumeAlignerErrorMessage,
    getResumeAlignerUrl,
} from "@/lib/http/resume-aligner-server";
import {
    RequestServerError,
    requestServerData,
} from "@/lib/http/request-server";
import type { AlignedResumeResult } from "@/service/resume-aligner.service";

export async function POST(
    _request: NextRequest,
    context: { params: Promise<{ resumeId: string }> },
) {
    const { resumeId } = await context.params;

    try {
        const response = await requestServerData<AlignedResumeResult>(
            getResumeAlignerUrl(
                `/resume/${encodeURIComponent(resumeId)}/align`,
            ),
            "POST",
            { Accept: "application/json" },
        );

        return NextResponse.json(response.data, { status: response.status });
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
            { message: "Unable to reach the resume alignment service." },
            { status: 502 },
        );
    }
}
