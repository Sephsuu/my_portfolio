"use client"

import { ComponentProps, ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import { Textarea } from "../ui/textarea"

interface AppTextareaProps extends ComponentProps<"textarea"> {
    label?: string
    className?: string
    textareaClassName?: string
    labelClassName?: string
    labelCharacter?: ReactNode | LucideIcon
    labelCharacterClassName?: string
}

export function AppTextarea({
    label,
    className,
    textareaClassName,
    labelClassName,
    labelCharacter,
    labelCharacterClassName,
    onChange,
    ...props
}: AppTextareaProps) {
    let renderedLabelCharacter = labelCharacter as ReactNode
    if (typeof labelCharacter === "function") {
        const Icon = labelCharacter as LucideIcon
        renderedLabelCharacter = <Icon size={16} />
    }

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            {label && (
                <span className={`text-sm font-medium text-foreground ${labelClassName ?? ""}`}>
                    {label}
                </span>
            )}

            <div className="relative">
                {labelCharacter ? (
                    <span
                        className={`pointer-events-none absolute left-3 top-3 text-sm text-muted-foreground ${labelCharacterClassName ?? ""}`}
                    >
                        {renderedLabelCharacter}
                    </span>
                ) : null}

                <Textarea
                    className={`w-full rounded-md border-input px-3 py-2 text-sm ${labelCharacter ? "pl-8" : ""} ${textareaClassName ?? ""}`}
                    onChange={onChange}
                    {...props}
                />
            </div>
        </div>
    )
}
