import "server-only";

import { RequestServerError } from "@/lib/http/request-server";

const API_BASE_URL = (
    process.env.RESUME_ALIGNER_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://127.0.0.1:8000"
).replace(/\/$/, "");

export function getResumeAlignerUrl(path: string) {
    return `${API_BASE_URL}/resume-aligner${path}`;
}

export function getResumeAlignerErrorMessage(error: RequestServerError) {
    return getResumeAlignerPayloadMessage(error.payload) ?? error.message;
}

export function getResumeAlignerPayloadMessage(payload: unknown) {
    if (!payload || typeof payload !== "object" || !("detail" in payload)) {
        return null;
    }

    const detail = (payload as { detail?: unknown }).detail;

    if (typeof detail === "string") return detail;

    if (Array.isArray(detail)) {
        const messages = detail
            .map((item) =>
                item && typeof item === "object" && "msg" in item
                    ? String(item.msg)
                    : null,
            )
            .filter((message): message is string => Boolean(message));

        return messages.length > 0 ? messages.join(" ") : null;
    }

    return null;
}
