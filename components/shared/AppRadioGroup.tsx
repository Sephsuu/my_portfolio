"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type RadioOption = {
    label: string
    value: string
    id?: string
    disabled?: boolean
}

interface AppRadioGroupProps {
    label?: string
    name?: string
    value: string
    onChange: (value: string) => void
    options: RadioOption[]
    className?: string
    labelClassName?: string
    groupClassName?: string
    itemClassName?: string
    optionLabelClassName?: string
}

export function AppRadioGroup({
    label,
    name,
    value,
    onChange,
    options,
    className,
    labelClassName,
    groupClassName,
    itemClassName,
    optionLabelClassName,
}: AppRadioGroupProps) {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        	{label && <div className={cn("mt-2", labelClassName)}>{label}</div>}

			<RadioGroup
				className={cn("mt-2 flex", groupClassName)}
				value={value}
				name={name}
				onValueChange={onChange}
			>
			{options.map((option, index) => {
				const optionId = option.id ?? `${name ?? "radio"}-${index}`

				return (
				<div key={option.value} className={cn("flex items-center space-x-2", itemClassName)}>
					<RadioGroupItem
						value={option.value}
						id={optionId}
						disabled={option.disabled}
						className="border-input"
					/>
					<Label htmlFor={optionId} className={cn(optionLabelClassName)}>
						{option.label}
					</Label>
				</div>
				)
			})}
			</RadioGroup>
      </div>
    )
}
