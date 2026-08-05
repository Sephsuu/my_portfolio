/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type FetchResult<T> = T | T[] | { content: T[] };

export function useFetchData<T>(
    fetchFn: (...args: any[]) => Promise<FetchResult<T>>,
    deps: any[] = [],
    args: any[] = [],
    page = 0,
    size = 1000,
    enabled = true,
) {
    const [items, setItems] = useState<T | T[] | null>(null);
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        if (!fetchFn || args.some((arg) => arg === undefined || arg === null)) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const result = await fetchFn(...args, page, size);

                if (!isMounted) return;

                if (
                    result &&
                    typeof result === "object" &&
                    "content" in result
                ) {
                    setItems(result.content);
                } else {
                    setItems(result as T | T[]);
                }
            } catch (err: any) {
                if (!isMounted) return;

                const message =
                    err?.message || err?.error || "Failed to fetch data";

                setError(message);
                toast.error(message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        void fetchData();

        return () => {
            isMounted = false;
        };
        // The caller controls refetching through `deps`.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size, enabled, ...deps]);

    const data = Array.isArray(items) ? items : [];

    return { data, loading, error };
}
