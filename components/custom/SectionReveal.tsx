"use client"

import {
    ComponentPropsWithoutRef,
    useEffect,
    useRef,
    useState,
} from "react"

export function SectionReveal({
    className = "",
    children,
    ...props
}: ComponentPropsWithoutRef<"section">) {
    const sectionRef = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const section = sectionRef.current

        if (!section) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px",
            }
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            data-visible={isVisible}
            className={`section-reveal ${className}`}
            {...props}
        >
            {children}
        </section>
    )
}
