import "server-only";

import { BASE_URL } from "@/lib/utils";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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
};

export async function requestServerData<T = unknown>(
    url: string,
    method: RequestMethod,
    headers?: HeadersInit,
    body?: unknown,
    options?: RequestServerOptions
): Promise<{ status: number; data: T, headers: Headers }> {

    const { onUnauthorized, onForbidden } = options ?? {};

    const isAbsolute = /^https?:\/\//i.test(url);
    const fullUrl = isAbsolute ? url : `${BASE_URL}${url}`;

    const finalHeaders = new Headers(headers ?? {});

    if (!(body instanceof FormData)) {

        if (!finalHeaders.has("Accept")) {
            finalHeaders.set(
                "Accept",
                "application/json"
            );
        }

        if (!finalHeaders.has("Content-Type")) {
            finalHeaders.set(
                "Content-Type",
                "application/json"
            );
        }
    }

    console.log("URL: ", fullUrl);
    console.log("Method: ", method);
    console.log(
        "Headers: ",
        Object.fromEntries(finalHeaders.entries())
    );
    console.log("Body: ", body);

    const res = await fetch(fullUrl, {
        method,
        headers: finalHeaders,
        body:
            body instanceof FormData
                ? body
                : body
                ? JSON.stringify(body)
                : undefined,
    });

    console.log(res);
    console.log("Response Status: ", res.status);
    console.log('\n');
    

    if (res.status === 401) {

        if (onUnauthorized) {
            await onUnauthorized();
        }

        throw new RequestServerError(
            "Unauthorized",
            401,
            { message: "Unauthorized" }
        );
    }

    if (res.status === 403) {

        if (onForbidden) {
            await onForbidden();
        }

        throw new RequestServerError(
            "Forbidden",
            403,
            { message: "Forbidden" }
        );
    }

    const data =
        await res.json().catch(
            () => ({} as T)
        );

    if (!res.ok) {

        const message =
            typeof data === "object" &&
            data &&
            "message" in data
                ? String(
                    (data as { message?: unknown }).message ??
                    `Request failed (${res.status})`
                )
                : `Request failed (${res.status})`;

        throw new RequestServerError(
            message,
            res.status,
            data
        );
    }

    return {
        status: res.status,
        data,
        headers: res.headers
    };
}
