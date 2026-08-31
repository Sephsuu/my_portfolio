"use client";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestClientOptions = {
    onUnauthorized?: () => void;
};

type DownloadClientOptions = RequestClientOptions & {
    method?: RequestMethod;
    headers?: HeadersInit;
    body?: unknown;
    accept?: string;
    fallbackErrorMessage?: string;
};

export class RequestClientError extends Error {
    status: number;
    payload: unknown;

    constructor(message: string, status: number, payload: unknown) {
        super(message);
        this.name = "RequestClientError";
        this.status = status;
        this.payload = payload;
    }
}

export async function requestClientData<T = unknown>(
    url: string,
    method: RequestMethod,
    headers?: HeadersInit,
    body?: unknown,
    options?: RequestClientOptions
): Promise<T> {
    const { onUnauthorized } = options ?? {};

    const createHeaders = () => {
        const finalHeaders = new Headers(headers ?? {});

        if (!(body instanceof FormData)) {
            if (!finalHeaders.has("Accept")) {
                finalHeaders.set("Accept", "application/json");
            }

            if (!finalHeaders.has("Content-Type")) {
                finalHeaders.set("Content-Type", "application/json");
            }
        }

        return finalHeaders;
    };

    const doFetch = () => {
        return fetch(url, {
            method,
            headers: createHeaders(),
            body:
                body instanceof FormData
                    ? body
                    : body
                    ? JSON.stringify(body)
                    : undefined,
        });
    };

    const res = await doFetch();

    if (res.status === 401 && onUnauthorized) {
        onUnauthorized();
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const message =
            data && typeof data === "object" && "message" in data
                ? String((data as { message?: unknown }).message)
                : `Request failed (${res.status})`;

        throw new RequestClientError(message, res.status, data);
    }

    return data as T;
}

export async function downloadClientFile(
    url: string,
    fileName: string,
    options?: DownloadClientOptions
) {
    const {
        method = "GET",
        headers,
        body,
        accept = "application/pdf",
        fallbackErrorMessage = "Failed to download file",
        onUnauthorized,
    } = options ?? {};

    const createHeaders = () => {
        const finalHeaders = new Headers(headers ?? {});

        if (!finalHeaders.has("Accept")) {
            finalHeaders.set("Accept", accept);
        }

        if (body && !(body instanceof FormData) && !finalHeaders.has("Content-Type")) {
            finalHeaders.set("Content-Type", "application/json");
        }

        return finalHeaders;
    };

    const doFetch = () => {
        return fetch(url, {
            method,
            headers: createHeaders(),
            body:
                body instanceof FormData
                    ? body
                    : body
                    ? JSON.stringify(body)
                    : undefined,
        });
    };

    const res = await doFetch();

    if (res.status === 401 && onUnauthorized) {
        onUnauthorized();
    }

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new RequestClientError(
            text || fallbackErrorMessage,
            res.status,
            text || null
        );
    }

    if (typeof window === "undefined") {
        throw new RequestClientError(
            "File download is only available in the browser.",
            500,
            null
        );
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);

    return { message: "success" };
}
