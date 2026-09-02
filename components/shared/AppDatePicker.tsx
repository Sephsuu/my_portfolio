"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import type { ComponentProps, ReactNode } from "react"

type CalendarProps = ComponentProps<typeof Calendar>

interface AppDatePickerProps {
  label?: string
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  displayFormat?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  required?: boolean
  className?: string
  labelClassName?: string
  buttonClassName?: string
  popoverContentClassName?: string
  popoverAlign?: "start" | "center" | "end"
  calendarClassName?: string
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "disabled" | "className">
  disabledDate?: (date: Date) => boolean
  allowFutureDates?: boolean
  allowedFutureDates?: boolean
  renderTrigger?: (props: {
    value?: Date
    formattedValue?: string
    placeholder: string
    disabled: boolean
    required: boolean
  }) => ReactNode
}

export function AppDatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  displayFormat = "PP",
  open,
  onOpenChange,
  disabled = false,
  required = false,
  className,
  labelClassName,
  buttonClassName,
  popoverContentClassName,
  popoverAlign = "start",
  calendarClassName,
  calendarProps,
  disabledDate,
  allowFutureDates = false,
  allowedFutureDates = false,
  renderTrigger,
}: AppDatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const shouldAllowFutureDates = allowFutureDates || allowedFutureDates
  const today = new Date()
  const fallbackEndMonth = shouldAllowFutureDates ? new Date(today.getFullYear() + 10, 11, 31) : today

  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : internalOpen

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const isDateDisabled = (date: Date) => {
    if (!shouldAllowFutureDates && date > today) return true
    return disabledDate?.(date) ?? false
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <div className={cn("text-sm font-medium text-foreground", labelClassName)}>{label}</div>}

      <Popover open={currentOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {renderTrigger ? (
            renderTrigger({
              value,
              formattedValue: value ? format(value, displayFormat) : undefined,
              placeholder,
              disabled,
              required,
            })
          ) : (
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              aria-required={required}
              className={cn(
                "w-full justify-start rounded-md border-input text-left font-normal",
                !value && "text-muted-foreground",
                buttonClassName
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {value ? format(value, displayFormat) : <span>{placeholder}</span>}
            </Button>
          )}
        </PopoverTrigger>

        <PopoverContent className={cn("w-auto p-0", popoverContentClassName)} align={popoverAlign}>
          <Calendar
            mode="single"
            selected={value}
            disabled={isDateDisabled}
            onSelect={(date) => {
              if (date && isDateDisabled(date)) return
              onChange(date)
              if (date) setOpen(false)
            }}
            endMonth={calendarProps?.endMonth ?? fallbackEndMonth}
            className={cn("rounded-md border shadow-sm", calendarClassName)}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
