// src/components/shared/AppDatePeriodButton.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { CalendarDays, Store } from "lucide-react";
import {
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    Day,
    format,
    isSameDay,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
} from "date-fns";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

type PeriodType = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";

type AppDatePeriodButtonProps = {
    selectedItem?: string;
    startDate: string;
    endDate: string;
    onClick: () => void;
    selectedItemPlaceholder?: string;
    itemIcon?: ReactNode;
    dateIcon?: ReactNode;
    showItemIcon?: boolean;
    showDateIcon?: boolean;
    className?: string;
    weekStartsOn?: Day;
};

export function AppDatePeriodButton({
    selectedItem,
    startDate,
    endDate,
    onClick,
    selectedItemPlaceholder,
    itemIcon = <Store size={20} />,
    dateIcon = <CalendarDays size={20} />,
    showItemIcon = true,
    showDateIcon = true,
    className = "",
    weekStartsOn = 0,
}: AppDatePeriodButtonProps) {
    const parseDate = (value: string) => {
        return value ? new Date(`${value}T00:00:00`) : undefined;
    };

    const start = useMemo(() => parseDate(startDate), [startDate]);
    const end = useMemo(() => parseDate(endDate), [endDate]);

    const shouldDisplaySelectedItem = Boolean(selectedItem || selectedItemPlaceholder);

    const periodType = useMemo<PeriodType>(() => {
        if (!start || !end) return "Custom";

        if (isSameDay(start, end)) {
            return "Daily";
        }

        const weekStart = startOfWeek(start, { weekStartsOn });
        const weekEnd = endOfWeek(start, { weekStartsOn });

        if (isSameDay(start, weekStart) && isSameDay(end, weekEnd)) {
            return "Weekly";
        }

        const monthStart = startOfMonth(start);
        const monthEnd = endOfMonth(start);

        if (
            isSameDay(start, monthStart) &&
            isSameDay(end, monthEnd)
        ) {
            return "Monthly";
        }

        const quarterStart = startOfQuarter(start);
        const quarterEnd = endOfQuarter(start);

        if (
            isSameDay(start, quarterStart) &&
            isSameDay(end, quarterEnd)
        ) {
            return "Quarterly";
        }

        return "Custom";
    }, [start, end, weekStartsOn]);

    const displayDate = useMemo(() => {
        if (!start || !end) return "Select Date";

        if (periodType === "Daily") {
            return format(start, "MMMM dd, yyyy");
        }

        if (periodType === "Weekly") {
            return `${format(start, "MMMM dd, yyyy")} - ${format(end, "MMMM dd, yyyy")}`;
        }

        if (periodType === "Monthly") {
            return format(start, "MMMM yyyy");
        }

        if (periodType === "Quarterly") {
            return `Q${Math.floor(start.getMonth() / 3) + 1} ${format(start, "yyyy")}`;
        }

        return `${format(start, "MMMM dd, yyyy")} - ${format(end, "MMMM dd, yyyy")}`;
    }, [start, end, periodType]);

    return (
        <div
            onClick={onClick}
            className={`flex-center-y w-fit cursor-pointer gap-3 rounded-md border border-slate-300 bg-light px-4 py-2 text-base font-bold shadow-sm ${className}`}
        >
            {shouldDisplaySelectedItem ? (
                <>
                    {showItemIcon ? itemIcon : null}

                    <div className="truncate">
                        {selectedItem || selectedItemPlaceholder}
                    </div>

                    <span className="text-slate-400">|</span>
                </>
            ) : null}

            {showDateIcon ? dateIcon : null}

            <div className="origin-left scale-x-110 truncate">
                {displayDate}
            </div>

            <Badge className={cn("uppercase bg-darkbrown font-bold rounded-sm",
                periodType === 'Daily' ? 'w-12 ml-2' :
                periodType === 'Weekly' ? 'w-15 ml-4.5' :
                (periodType === 'Quarterly' || periodType === 'Monthly') ? 'ml-1'
                : periodType === 'Custom' ? 'ml-4'
                : ''
            )}>
                {periodType}
            </Badge>
        </div>
    );
}
