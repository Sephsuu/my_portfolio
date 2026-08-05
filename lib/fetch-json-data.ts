/**
 * Fetches and parses a JSON file stored under `public/data`.
 *
 * @example
 * const projects = await fetchJsonData<Project[]>("projects.json");
 */
export async function fetchJsonData<T>(
    filePath: string,
    init: RequestInit = {},
): Promise<T> {
    const normalizedPath = filePath.replace(/^\/+/, "");

    if (
        !normalizedPath ||
        !normalizedPath.endsWith(".json") ||
        normalizedPath.includes("..")
    ) {
        throw new Error("A valid JSON path inside public/data is required");
    }

    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");

    const response = await fetch(`/data/${normalizedPath}`, {
        ...init,
        headers,
    });

    if (!response.ok) {
        throw new Error(
            `Unable to load /data/${normalizedPath} (${response.status})`,
        );
    }

    return (await response.json()) as T;
}
