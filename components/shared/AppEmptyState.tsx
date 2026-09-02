import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

export function AppEmptyState({title, label, className, search, additionalContent}: {
    label: string,
    search?: string
    title?: string 
    className?: string
    additionalContent?: React.ReactNode
}) {
    return (
        <div className={cn(
            "animate-fade-in-up flex-center flex-col bg-light pb-8 pt-4 shadow-xs border border-slate-200",
            className
        )}>
            <Image
                src='/images/brown_logo.png'
                alt="KP Logo"
                width={100}
                height={100}
                className="opacity-25!"
            />
            <div className="font-semibold">{title ?? `No results ${search ? `found for "${search}".` : 'found.'}`}</div>
            <div className="text-sm text-gray-500">{label}</div>
            {additionalContent}
        </div>
    )
}