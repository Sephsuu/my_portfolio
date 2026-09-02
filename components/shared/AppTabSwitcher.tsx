"use client"

import { Button } from "@/components/ui/button"
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
        <div className={`max-w-full overflow-x-auto pb-1 ${className ?? ""}`}>
            <div className="flex w-max items-center rounded-full border border-slate-300 bg-slate-50 p-0.5 shadow-sm sm:min-w-0">
                {normalizedTabs.map((item, i) => (
                    <Button
                        key={item.key ?? i}
                        type="button"
                        onClick={() => setSelectedTab(item.key)}
                        className={`${buttonClassName ?? ""} h-9 min-w-max shrink-0 rounded-full border-slate-300 bg-slate-50 px-3 text-dark hover:border hover:border-darkbrown/30 hover:bg-transparent hover:text-darkbrown sm:px-4
                ${effectiveSelectedTab === item.key && "bg-darkbrown! text-white! hover:opacity-100"}`}
                        disabled={item.disabled}
                    >
                        {item.icon ? (
                            <div className="flex-center min-w-0 gap-2">
                                <item.icon className="h-4 w-4 shrink-0" />
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
