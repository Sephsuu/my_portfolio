import "server-only";

export const SEPHSUU_API_BASE_URL = (
    process.env.SEPHSUU_API_URL ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");

export function getSephsuuApiUrl(path: string) {
    return `${SEPHSUU_API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
