import { cn } from "@/lib/utils";

type LoaderProps = {
    label?: string;
    className?: string;
};

export function Loader({
    label = "Loading...",
    className,
}: LoaderProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(
                "my-24 text-roast flex items-center justify-center gap-4",
                className,
            )}
        >
            <span
                aria-hidden="true"
                className="size-14 animate-spin rounded-full border-2 border-roast/20 border-t-roast"
            />
            <span className="text-4xl font-medium tracking-wide">{label}</span>
        </div>
    );
}
