"use client";

import type { MouseEvent, ReactNode } from "react";

type ScrollToSectionLinkProps = {
    targetId: string;
    className?: string;
    children: ReactNode;
};

export function ScrollToSectionLink({
    targetId,
    className,
    children,
}: ScrollToSectionLinkProps) {
    const scrollToSection = (event: MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById(targetId);
        if (!target) return;

        event.preventDefault();

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
        });

        window.history.replaceState(null, "", `#${targetId}`);
    };

    return (
        <a
            href={`#${targetId}`}
            onClick={scrollToSection}
            className={className}
        >
            {children}
        </a>
    );
}
