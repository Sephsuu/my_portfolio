"use client"

import { ComponentProps, ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import { Input } from "../ui/input"

interface AppInputProps extends ComponentProps<"input"> {
    label?: string
    className?: string
    inputClassName?: string
    labelClassName?: string
    labelCharacter?: ReactNode | LucideIcon
    labelCharacterClassName?: string
}

export function AppInput({
    label,
    className,
    inputClassName,
    labelClassName,
    labelCharacter,
    labelCharacterClassName,
    onChange,
    ...props
}: AppInputProps) {
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
                        className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground ${labelCharacterClassName ?? ""}`}
                    >
                        {renderedLabelCharacter}
                    </span>
                ) : null}

                <Input
                    className={`w-full rounded-md border-input px-3 py-2 text-sm ${labelCharacter ? "pl-8" : ""} ${inputClassName ?? ""}`}
                    onChange={onChange}
                    {...props}
                />
            </div>
        </div>
    )
}
