"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { useEffect, useMemo } from "react"

type TabItem = {
    icon?: LucideIcon
    title: string
    key: string
    disabled?: boolean
}

interface TabSwitcherProps {
    tabs: string[] | TabItem[]
    selectedTab: string
    setSelectedTab: (tab: string) => void
    buttonClassName?: string
    className?: string
}

export function AppTabSwitcher({ tabs, selectedTab, setSelectedTab, buttonClassName, className }: TabSwitcherProps) {
    const normalizedTabs = useMemo(
        () => tabs.map((item) =>
            typeof item === "string"
                ? { key: item, title: item, icon: undefined, disabled: false }
                : { key: item.key, title: item.title, icon: item.icon, disabled: item.disabled }
        ),
        [tabs]
    );
    const selectedTabIsAvailable = normalizedTabs.some(
        (item) => item.key === selectedTab && !item.disabled
    );
    const fallbackTab = normalizedTabs.find((item) => !item.disabled);
    const effectiveSelectedTab = selectedTabIsAvailable
        ? selectedTab
        : fallbackTab?.key;

    useEffect(() => {
        if (selectedTabIsAvailable || !fallbackTab) return;

        setSelectedTab(fallbackTab.key);
    }, [fallbackTab, selectedTabIsAvailable, setSelectedTab]);

    return (
        <div
            className={cn(
                "max-w-full overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                className
            )}
        >
            <div
                role="tablist"
                aria-label="Choose a view"
                className="grid w-max grid-flow-col auto-cols-fr items-center rounded-full border-4 border-white bg-[#f7f6f5] shadow-[0_9px_24px_rgba(26,15,10,0.18)] ring-1 ring-black/5 sm:min-w-0"
            >
                {normalizedTabs.map((item, i) => (
                    <Button
                        key={item.key ?? i}
                        type="button"
                        variant="ghost"
                        role="tab"
                        aria-selected={effectiveSelectedTab === item.key}
                        tabIndex={effectiveSelectedTab === item.key ? 0 : -1}
                        onClick={() => setSelectedTab(item.key)}
                        className={cn(
                            "h-11 w-full min-w-max shrink-0 rounded-full bg-transparent px-5 text-sm font-semibold tracking-wide text-dark shadow-none transition-[background-color,color,box-shadow,transform] duration-200 hover:bg-[#eee9e6] hover:text-darkbrown focus-visible:ring-2 focus-visible:ring-darkbrown/30 focus-visible:ring-offset-2 active:scale-[0.98] sm:h-12 sm:px-7 sm:text-base",
                            effectiveSelectedTab === item.key &&
                                "bg-darkbrown text-white shadow-[0_6px_16px_rgba(88,56,42,0.32)] hover:bg-darkbrown hover:text-white",
                            buttonClassName
                        )}
                        disabled={item.disabled}
                    >
                        {item.icon ? (
                            <div className="flex-center min-w-0 gap-2">
                                <item.icon className="h-5 w-5 shrink-0 stroke-[2.25]" />
                                <span className="whitespace-nowrap">{item.title}</span>
                            </div>
                        ) : (
                            <span className="whitespace-nowrap">{item.title}</span>
                        )}
                    </Button>
                ))}
            </div>
        </div>
    )
}
