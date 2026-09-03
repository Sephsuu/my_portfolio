"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

type TabItem = {
    icon?: LucideIcon;
    title: string;
    key: string;
    disabled?: boolean;
    activeClassName?: string;
};

interface TabSwitcherProps {
    tabs: string[] | TabItem[];
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
    buttonClassName?: string;
    className?: string;
}

export function AppTabSwitcher({
    tabs,
    selectedTab,
    setSelectedTab,
    buttonClassName,
    className,
}: TabSwitcherProps) {
    const normalizedTabs = useMemo(
        () =>
            tabs.map((item) =>
                typeof item === "string"
                    ? {
                          key: item,
                          title: item,
                          icon: undefined,
                          disabled: false,
                          activeClassName: undefined,
                      }
                    : {
                          key: item.key,
                          title: item.title,
                          icon: item.icon,
                          disabled: item.disabled,
                          activeClassName: item.activeClassName,
                      },
            ),
        [tabs],
    );
    const selectedTabIsAvailable = normalizedTabs.some(
        (item) => item.key === selectedTab && !item.disabled,
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
            <div className="flex w-max items-center rounded-full border bg-muted p-0.5 shadow-sm sm:min-w-0">
                {normalizedTabs.map((item, i) => (
                    <Button
                        key={item.key ?? i}
                        type="button"
                        onClick={() => setSelectedTab(item.key)}
                        className={`${buttonClassName ?? ""} h-9 min-w-max shrink-0 rounded-full bg-transparent px-3 text-muted-foreground shadow-none hover:bg-background/70 hover:text-foreground sm:px-4
                ${effectiveSelectedTab === item.key ? (item.activeClassName ?? "bg-primary! text-primary-foreground! hover:bg-primary/90") : ""}`}
                        disabled={item.disabled}
                    >
                        {item.icon ? (
                            <div className="flex min-w-0 items-center justify-center gap-2">
                                <item.icon className="h-4 w-4 shrink-0" />
                                <span className="whitespace-nowrap">
                                    {item.title}
                                </span>
                            </div>
                        ) : (
                            <span className="whitespace-nowrap">
                                {item.title}
                            </span>
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}
