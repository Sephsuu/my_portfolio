"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"
import { LucideIcon } from "lucide-react"

type SelectItemOption = string | { label: string; value: string }
type NormalizedSelectItem = {
    label: string
    value: string
    raw: SelectItemOption
}
type GroupedSelectItems = {
    groupLabel: string
    items: { label: string; value: string }[]
}

interface GenericSelectProps {
    label?: string
    groupLabel?: string
    placeholder?: string
    items?: SelectItemOption[]
    groupedItems?: GroupedSelectItems[]
    value: string
    onChange: (value: string) => void
    className?: string
    hideIcon?: boolean;
    triggerClassName?: string;
    labelClassName?: string;
    searchable?: boolean
    searchPlaceholder?: string
    filterFn?: (item: string | { label: string; value: string }, keyword: string) => boolean
    leftIcon?: LucideIcon
}

export function AppSelect({
    label,
    groupLabel,
    placeholder = "Select an option",
    items = [],
    groupedItems,
    value,
    onChange,
    className,
    hideIcon = false,
    triggerClassName,
    labelClassName,
    searchable = false,
    searchPlaceholder = "Search...",
    filterFn,
    leftIcon: LeftIcon
}: GenericSelectProps) {
    const [search, setSearch] = useState("")
    const hasGroupedItems = Array.isArray(groupedItems) && groupedItems.length > 0

    const normalizedItems = useMemo(() => {
        return items.map((item) => ({
            label: typeof item === "string" ? item : item.label,
            value: typeof item === "string" ? item : item.value,
            raw: item,
        }))
    }, [items])

    const normalizedGroupedItems = useMemo(() => {
        return (groupedItems ?? []).map((group) => ({
            groupLabel: group.groupLabel,
            items: group.items.map((item) => ({
                label: item.label,
                value: item.value,
                raw: item,
            })),
        }))
    }, [groupedItems])

    const filteredItems = useMemo(() => {
        const keyword = search.trim().toLowerCase()
        if (!searchable || !keyword) return normalizedItems

        return normalizedItems.filter((item) => {
            if (filterFn) return filterFn(item.raw, keyword)
            return item.label.toLowerCase().includes(keyword)
        })
    }, [normalizedItems, search, searchable, filterFn])

    const filteredGroupedItems = useMemo(() => {
        const keyword = search.trim().toLowerCase()
        if (!searchable || !keyword) return normalizedGroupedItems

        return normalizedGroupedItems
            .map((group) => ({
                ...group,
                items: group.items.filter((item) => {
                    if (filterFn) return filterFn(item.raw, keyword)
                    return item.label.toLowerCase().includes(keyword)
                }),
            }))
            .filter((group) => group.items.length > 0)
    }, [normalizedGroupedItems, search, searchable, filterFn])

    const renderItems = (itemsToRender: NormalizedSelectItem[], keyPrefix = "item") => (
        itemsToRender.map((item, idx) => (
            <SelectItem key={`${keyPrefix}-${item.value}-${idx}`} value={item.value}>
                {item.label}
            </SelectItem>
        ))
    )

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            {label && <span className={`text-sm font-medium text-foreground ${labelClassName ?? ""}`}>{label}</span>}

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger 
                    hideIcon={hideIcon}
                    className={`w-full rounded-md border-input ${triggerClassName ?? ""}`}
                >
                    {LeftIcon && <LeftIcon className="h-4 w-4 shrink-0" />}
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent
                    align="start"
                    className="w-(--radix-select-trigger-width)"
                    position="popper"
                >
                    {searchable && (
                        <div className="sticky top-0 z-10 bg-popover px-1 pb-2">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                placeholder={searchPlaceholder}
                            />
                        </div>
                    )}
                    {hasGroupedItems ? (
                        filteredGroupedItems.map((group, groupIndex) => (
                            <SelectGroup key={`${group.groupLabel}-${groupIndex}`}>
                                <SelectLabel>{group.groupLabel}</SelectLabel>
                                {renderItems(group.items, group.groupLabel)}
                            </SelectGroup>
                        ))
                    ) : (
                        <SelectGroup>
                            {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                            {renderItems(filteredItems)}
                        </SelectGroup>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}
