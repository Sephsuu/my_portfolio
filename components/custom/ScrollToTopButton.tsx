"use client";

import { ChevronUp } from "lucide-react";

export function ScrollToTopButton() {
    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Back to top"
            className="fixed right-5 bottom-5 z-50 flex size-18 cursor-pointer items-center justify-center rounded-full border border-roast/10 bg-white text-roast shadow-[0_8px_24px_rgba(28,25,23,0.18)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-feather hover:shadow-[0_12px_30px_rgba(28,25,23,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roast/40 focus-visible:ring-offset-2 sm:right-12 sm:bottom-12"
        >
            <ChevronUp className="size-12" aria-hidden="true" />
        </button>
    );
}
