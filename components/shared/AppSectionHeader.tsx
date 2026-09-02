import { cn } from "@/lib/utils"
import React from "react"

export function AppSectionHeader({title, spanTitle, description, className, descriptionClassName}: {
    title: string | React.ReactNode
    spanTitle?: string 
    description?: string
    className?: string
    descriptionClassName?: string
}) {
    return (
        <div className={cn(className)}>
            <div className="text-xl font-bold">{title} <span className="text-darkbrown">{spanTitle}</span></div>
            <div className={cn("text-sm text-slate-500", descriptionClassName)}>
                {description}
            </div>
        </div>
    )
}