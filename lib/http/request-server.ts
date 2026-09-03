import "server-only";

import { getSephsuuApiUrl } from "@/lib/http/api-server";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequestServerResponseType = "json" | "text" | "arrayBuffer";

export class RequestServerError extends Error {
    status: number;
    payload: unknown;

    constructor(message: string, status: number, payload: unknown) {
        super(message);
        this.name = "RequestServerError";
        this.status = status;
        this.payload = payload;
    }
}

type RequestServerOptions = {
    onUnauthorized?: () => void | Promise<void>;
    onForbidden?: () => void | Promise<void>;
    responseType?: RequestServerResponseType;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    signal?: AbortSignal;
};

async function readErrorPayload(response: Response) {
    const contentType = response.headers.get("Content-Type") ?? "";

    return contentType.includes("application/json")
        ? response.json().catch(() => null)
        : response.text().catch(() => null);
}

function getErrorMessage(payload: unknown, status: number) {
    if (payload && typeof payload === "object") {
        if ("message" in payload && typeof payload.message === "string") {
            return payload.message;
        }

        if ("detail" in payload) {
            const detail = payload.detail;
            if (typeof detail === "string") return detail;

            if (Array.isArray(detail)) {
                const messages = detail
                    .map((item) =>
                        item && typeof item === "object" && "msg" in item
                            ? String(item.msg)
                            : null,
                    )
                    .filter((message): message is string => Boolean(message));

                if (messages.length > 0) return messages.join(" ");
            }
        }
    }

    if (typeof payload === "string" && payload.trim()) return payload;
    return `Request failed (${status})`;
}

export async function requestServerData<T = unknown>(
    url: string,
    method: RequestMethod,
    headers?: HeadersInit,
    body?: unknown,
    options?: RequestServerOptions,
): Promise<{ status: number; data: T; headers: Headers }> {
    const {
        onUnauthorized,
        onForbidden,
        responseType = "json",
        cache,
        redirect,
        signal,
    } = options ?? {};
    const fullUrl = /^https?:\/\//i.test(url) ? url : getSephsuuApiUrl(url);
    const finalHeaders = new Headers(headers ?? {});

    if (!finalHeaders.has("Accept")) {
        finalHeaders.set(
            "Accept",
            responseType === "text"
                ? "text/plain, text/html"
                : responseType === "arrayBuffer"
                  ? "application/octet-stream"
                  : "application/json",
        );
    }

    if (
        body !== undefined &&
        !(body instanceof FormData) &&
        !finalHeaders.has("Content-Type")
    ) {
        finalHeaders.set("Content-Type", "application/json");
    }

    const response = await fetch(fullUrl, {
        method,
        headers: finalHeaders,
        cache,
        redirect,
        signal,
        body:
            body instanceof FormData
                ? body
                : body !== undefined
                  ? JSON.stringify(body)
                  : undefined,
    });

    if (response.status === 401 && onUnauthorized) await onUnauthorized();
    if (response.status === 403 && onForbidden) await onForbidden();

    if (!response.ok) {
        const payload = await readErrorPayload(response);
        throw new RequestServerError(
            getErrorMessage(payload, response.status),
            response.status,
            payload,
        );
    }

    const data = (
        responseType === "text"
            ? await response.text()
            : responseType === "arrayBuffer"
              ? await response.arrayBuffer()
              : await response.json().catch(() => null)
    ) as T;

    return { status: response.status, data, headers: response.headers };
}
