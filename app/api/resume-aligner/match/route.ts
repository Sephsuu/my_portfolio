import { NextRequest, NextResponse } from "next/server";

import {
    RequestServerError,
    requestServerData,
} from "@/lib/http/request-server";
import {
    getResumeAlignerErrorMessage,
    getResumeAlignerUrl,
} from "@/lib/http/resume-aligner-server";
import type { ResumeMatchResult } from "@/service/resume-aligner.service";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILENAME_LENGTH = 255;
const MAX_JOB_DESCRIPTION_LENGTH = 50_000;

function isValidFilename(filename: string) {
    return (
        filename.length > 0 &&
        filename.length <= MAX_FILENAME_LENGTH &&
        !/[\u0000-\u001f\u007f]/.test(filename) &&
        !filename.includes("/") &&
        !filename.includes("\\") &&
        filename.toLowerCase().endsWith(".pdf")
    );
}

export async function POST(request: NextRequest) {
    const formData = await request.formData().catch(() => null);
    const file = formData?.get("file");
    const jobDescription = formData?.get("job_description");

    if (!(file instanceof File)) {
        return NextResponse.json(
            { message: "A PDF resume is required." },
            { status: 400 },
        );
    }

    if (!isValidFilename(file.name)) {
        return NextResponse.json(
            { message: "A valid PDF filename is required." },
            { status: 400 },
        );
    }

    if (file.type !== "application/pdf") {
        return NextResponse.json(
            { message: "Only PDF files are allowed." },
            { status: 400 },
        );
    }

    if (file.size === 0) {
        return NextResponse.json(
            { message: "PDF file must not be empty." },
            { status: 400 },
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { message: "PDF file must be 5 MiB or smaller." },
            { status: 413 },
        );
    }

    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
        return NextResponse.json(
            { message: "job_description must not be blank." },
            { status: 422 },
        );
    }

    if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
        return NextResponse.json(
            { message: "Job description must be 50,000 characters or fewer." },
            { status: 422 },
        );
    }

    const fileBytes = await file.arrayBuffer();
    const signature = new TextDecoder().decode(fileBytes.slice(0, 5));

    if (signature !== "%PDF-") {
        return NextResponse.json(
            { message: "The uploaded file is not a valid PDF." },
            { status: 400 },
        );
    }

    const body = new FormData();
    body.append(
        "file",
        new Blob([fileBytes], { type: "application/pdf" }),
        file.name,
    );
    body.append("job_description", jobDescription.trim());

    try {
        const response = await requestServerData<ResumeMatchResult>(
            getResumeAlignerUrl("/match"),
            "POST",
            { Accept: "application/json" },
            body,
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
            { message: "Unable to reach the resume matching service." },
            { status: 502 },
        );
    }
}
